import React, { Component } from 'react';
import {
  StyleSheet, Button, Dimensions, ScrollView, Image, Animated,
  View, Text, TouchableOpacity, SafeAreaView, AsyncStorage,RefreshControl
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Api from "../service/api";
import Master from "../service/master";
import { IMAGE_URL } from "../service/config";
import { getDistance, getPreciseDistance } from 'geolib';
import CLoader from '../components/CLoader';
import * as Animatable from 'react-native-animatable';
import Stars from 'react-native-stars';
import Modal from 'react-native-modal';  
const s = require('../assets/css/style');
const itemWidth = Dimensions.get('window').width;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.loadBanners();
    this.state = {
      activeIndex: 0,
      carouselItems: [],
      categoryList: [],
      categoryfinalList: [],
      totallist:[],
      contentLoader: true,
      scrollY: new Animated.Value(0),
      isLoading: true,
      isModalVisible: false,
      length:0,
      currentlatitude:'',
      currentlongitude:''
    }

    this.gotoItemListpage = this.gotoItemListpage.bind(this);

    
  }

  _onRefresh() {
    this.setState({ refreshing: true });    
     this.loadBanners();  
    }

  loadBanners = async () => {

    Api.get("getBannerList", {
    }).then((result) => {
     

      if(result['errorResponse'] != undefined && result['errorResponse'] != null && result['errorResponse'] != ''  ){
        let obj = result['errorResponse'];
        if(obj[0].token == "NOT VALID"){
          
          Api.gettokenkey().then((result2) => {
           
            if(result2 == "S"){
                this.loadBanners();
            }
          });
        }
      }else{
        let responseType = Master.getResponseType(result);
        let responseValue = Master.getResponseValue(result);
  
        if (responseType == 'S') {
          this.setState({ carouselItems: responseValue["homebannerList"] })
          this.category();
        }
      }
      
      this.setState({ refreshing: false });    
    })

  }


  category = async () => {
    let latitude = JSON.parse(await AsyncStorage.getItem('latitude'));
    let longitude = JSON.parse(await AsyncStorage.getItem('longitude'));


    this.setState({currentlatitude:latitude})
    this.setState({currentlongitude:longitude})
    
    Api.get("getHomeCategoryList/"+this.state.length, {
    }).then((result) => {
      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);

    
      if (responseType == 'S') {
          this.setState({ categoryList: responseValue })
          this.setState({ categoryfinalList: responseValue })
          this.setState({length:this.state.categoryList.length})
      
      
          if(this.state.categoryList.length > 0){
         
          for (let i = 0; i < this.state.categoryList.length; i++) {

         
          let pdis = getPreciseDistance(

            { latitude:parseFloat(this.state.currentlatitude),
               longitude: parseFloat(this.state.currentlongitude) },    
            {
              latitude: this.state.categoryList[i]["latitude"],
              longitude: this.state.categoryList[i]["longitude"]
            },
          );

          let distanceinkm = pdis / 1000;   
        
          console.log("distanceinkm is "+distanceinkm)

          if (distanceinkm < 10) {
              let finallist = this.state.totallist;
              let object = {}
              object.supplierName = this.state.categoryList[i]["supplierName"];
              object.categoryList = this.state.categoryList[i]["categoryList"];
              finallist.push(object)
              this.setState({totallist:finallist})
            //  this.getFinalList(this.state.categoryList[i]["supplierId"])
             // this.setState({ isModalVisible: true })
          
          } else {
            this.getFinalList(this.state.categoryList[i]["supplierId"])
         
          }
        }

        if(this.state.totallist.length > 0){

        }else{
          this.setState({ isModalVisible: true })

        }
     
      }else{

      
        // this.setState({length:this.state.length+2})
        // this.category()
      }
        this.setState({ isLoading: false });
        this.setState({ contentLoader: false });
      }

    })
  }

  close(){
    this.setState({ isModalVisible: false })
  }

  getFinalList(supplierId) {
 
    let finallist = this.state.totallist;
    this.state.categoryfinalList = 
    this.state.categoryfinalList.filter(item => item.supplierId != supplierId);
  
    for (let i = 0; i < this.state.categoryfinalList.length; i++) {
      let object = {}
      object.supplierName=this.state.categoryfinalList[i]["supplierName"];
      object.categoryList = this.state.categoryfinalList[i]["categoryList"];
      finallist.push(object)
      this.setState({totallist:finallist})
    }

  }


  _renderHomeBanner({ item, index }) {
    return (

      <View style={{
        backgroundColor: 'floralwhite',
        width: itemWidth,
        height: 200,
      }}>

        <Image style={{ width: "100%", height: 200 }}
          source={{
            uri: IMAGE_URL + item.bannerimageurl
          }} />
      </View>

    )
  }



  _renderHomeChar({ item, index }) {
    return (
      <View style={{
        backgroundColor: 'floralwhite',
        width: itemWidth / 2,
        height: 200,
      }}>
        <Image style={{ width: "100%", height: 200 }}
          source={require('../assets/img/home-banner.png')} />
      </View>
    )
  }

  componentDidMount() {

  }

  gotoItemListpage = (categoryid, supplierid) => {
    AsyncStorage.setItem("categoryid", categoryid + '');
    AsyncStorage.setItem("supplierid", supplierid + '');

    const { navigate } = this.props.navigation;
    navigate('ItemListing')
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  loadMoreData() {
  
    this.setState({ isLoading: true });
    this.setState({length:this.state.length+2})
  
   Api.get("getHomeCategoryList/"+this.state.length, {
  }).then((result) => {
    let responseType = Master.getResponseType(result);
    let responseValue = Master.getResponseValue(result);
    if (responseType == 'S') {
      this.setState({ categoryList: responseValue })
        this.setState({ categoryfinalList: responseValue })
      if(this.state.categoryList.length > 0){
       
      for (let i = 0; i < this.state.categoryList.length; i++) {
        
        let pdis = getPreciseDistance(
          { latitude:this.state.currentlatitude, longitude: this.state.currentlongitude },
          {
            latitude: this.state.categoryList[i]["latitude"],
            longitude: this.state.categoryList[i]["longitude"]
          },
        );

        let distanceinkm = pdis / 1000;
   
        if (distanceinkm < 10) {
          let finallist = this.state.totallist;
            let object = {};
            object.supplierName=this.state.categoryList[i]["supplierName"];
            object.categoryList = this.state.categoryList[i]["categoryList"];
            finallist.push(object)
            this.setState({totallist:finallist})
        
        
        } else {
          this.getFinalList(this.state.categoryList[i]["supplierId"])
        }
      }
    }else{
    
    }
    this.setState({ isLoading: false });
      this.setState({ contentLoader: false });
    }

  })
  }

  _renderHomeProduct = ({ item, index }) => {
    return (
      <View style={{
        width: itemWidth - 100,
        height: 270
      }}>
       
       
        <View style={{ height: "100%" }} >
          <View>
            <TouchableOpacity onPress={() => { this.gotoItemListpage(item.categoryid, item.supplierId) }}>
              <View >
                <Image style={{ width: "100%", height: 150, borderRadius: 5 }}
                  source={{
                    uri: IMAGE_URL + item.image
                  }} />
              </View>
              </TouchableOpacity>

              <View style={{ padding: 10 }}>
              <TouchableOpacity onPress={() => { this.gotoItemListpage(item.categoryid, item.supplierId) }}>
                <View>
                  <Text style={{ fontSize: 16, color: 'black', paddingBottom: 10, fontWeight: 'bold' }}>
                    {item.categoryname}
                  </Text>
                </View>
                </TouchableOpacity>

                {/* <View style={s.homesec}>
                  <View style={s.homesec}>
                    <Icon name="star" size={15} style={[s.txtcolor]} /> 
                    <Icon name="star" size={15} style={[s.txtcolor]} /> 
                    <Icon name="star" size={15} style={[s.txtcolor]} /> 

                    <Icon name="star-half" size={15} style={[s.txtcolor]} />
                    <Icon name="star-outline" size={15} style={[s.txtcolor]} />
                  </View>
                  <Text style={{ fontSize: 15, paddingRight: 5, paddingBottom: 5 }}> 4.1</Text>
                  <Text style={{ fontSize: 11, letterSpacing: 1, paddingBottom: 5, color: 'rgb(156, 156, 156)' }}>3807 (Delivery Reviews)</Text>
                </View> */}

<View style={s.homesec}>
         <Stars
            default={item.rating}
            count={5}
            half={true}
            starSize={50} 
            fullStar={<Icon name={'star'} style={[s.myStarStyle1]}/>}
            emptyStar={<Icon name={'star-border'} style={[s.myStarStyle1, s.myEmptyStarStyle1]}/>}
            halfStar={<Icon name={'star-half'} style={[s.myStarStyle1]}/>}
            disabled = {true}
          /> 
            <Text style={{ fontSize: 15, paddingRight: 5, paddingBottom: 5 }}> {item.rating}</Text>
           
            <Text style={{ fontSize: 12, letterSpacing: 1, paddingBottom: 5, color: 'rgb(156, 156, 156)' ,paddingTop:2}}>3807 (Delivery Reviews)</Text>
          </View>


                <View style={{ paddingBottom: 5 }}>
                  <Text style={{ fontSize: 13, letterSpacing: 0.5, fontWeight: 'bold', color: 'rgb(79, 79, 79)' }}>{item.desc}</Text>
                </View>

                <View style={s.homesec}>
                  <View style={{ backgroundColor: 'rgb(79, 79, 79)', borderRadius: 50, width: 5, height: 5, textAlign: 'center', marginTop: 8, marginRight: 4 }}>
                  </View>
                  <View>
                    <Text style={{ fontSize: 15, color: 'rgb(79, 79, 79)', letterSpacing: 0.5 }}> 20 min Delivery</Text>
                  </View>


                </View>
              </View>


           
          </View>
        </View>
      </View>

    )
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />

        { this.state.contentLoader ?
          <View >
            <CLoader forLoad="main" ></CLoader>
          </View>

          :

          <ScrollView

            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } },

              ],
              {
                listener: event => {
                  if (this.isCloseToBottom(event.nativeEvent)) {
                    this.loadMoreData();
                  }
                }
              },
              { useNativeDriver: true }
            )}

           refreshControl={ <RefreshControl  refreshing={this.state.refreshing}  
            onRefresh={this._onRefresh.bind(this)}  />  }>

            <Animatable.View animation="fadeIn" delay = {100}  >
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Carousel
                  layout={'default'}
                  loop autoplay
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={Dimensions.get('window').width}
                  renderItem={this._renderHomeBanner}
                  onSnapToItem={index => this.setState({ activeIndex: index })} />
              </View>
            </Animatable.View>
            <Animatable.View animation="fadeIn" delay = {100}  >
              <View style={{ justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>

                  <ScrollView horizontal={true}  >
                    <View style={{ width: itemWidth - itemWidth / 2 }}>
                      <Image style={{ width: "96%", height: 200 }}
                        source={require('../assets/img/char-home/1.png')} />
                    </View>

                    <View style={{ width: itemWidth - itemWidth / 2 }}>
                      <Image style={{ width: "96%", height: 200 }}
                        source={require('../assets/img/char-home/3.png')} />
                    </View>
                    <View style={{ width: itemWidth - itemWidth / 2 }}>
                      <Image style={{ width: "96%", height: 200 }}
                        source={require('../assets/img/char-home/2.png')} />
                    </View>
                    <View style={{ width: itemWidth - itemWidth / 2 }}>
                      <Image style={{ width: "96%", height: 200 }}
                        source={require('../assets/img/char-home/4.jpg')} />
                    </View>

                  </ScrollView>
                </View>
              </View>
              </Animatable.View>

            <View >
              {
                this.state.totallist.map && this.state.totallist.map((item, key) => (
                  <View style={{ backgroundColor: "white", borderBottomColor: "#eee", borderBottomWidth:2 }}>
                    <View style={{ padding: 10 }}>
                      <View style={{ paddingBottom: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: "Cochin" }}>{item.supplierName}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Carousel
                          layout={"default"}
                          ref={ref => this.carousel = ref}
                          data={item.categoryList}
                          sliderWidth={Dimensions.get('window').width - 100}
                          itemWidth={Dimensions.get('window').width - 75}
                          renderItem={this._renderHomeProduct}
                          onSnapToItem={index => this.setState({ activeIndex: index })} />
                      </View></View></View>
                ))}
            </View>


            <Modal backdropColor="#00000063" propagateSwipe={true}
              animationIn="slideInDown"
              animationOut="slideOutDown"
              backdropColor="black"
              onBackdropPress={() => this.setState({ isModalVisible: false })}
              isVisible={this.state.isModalVisible}>

              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{
                  backgroundColor: "white", padding: 15, shadowColor: "#000",
                  borderRadius: 10, shadowOffset: { width: 0, height: 2, },
                  shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                }}>
                  <View>
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
                        Notification :</Text>
                    </View>
                    <View style={{ paddingVertical: 5 }}>
                      <Text style={{ fontSize: 16, color: "grey", lineHeight: 30 }}>
                         Sorry...No restaurants available around 10 km.Try from different location.
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row",padding:70, width: "100%", paddingVertical: 10 }}>
                      
                      <TouchableOpacity style={{
                        backgroundColor: "#e46c47", paddingVertical: 8,
                        borderRadius: 10,width: "100%", textAlign: "center"
                      }} onPress={() => this.close()}>
                        <View>
                          <Text style={{
                            fontSize: 16, fontWeight: "bold", color: "white",
                            textAlign: "center"
                          }}>Close
                                                    </Text>
                        </View>
                      </TouchableOpacity>


                    </View>
                  </View>
                </View>
              </View>
            </Modal>


            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
              {this.state.isLoading && <Image style={{ width: 100, height: 80 }}
                source={require('../assets/img/logo-gif.gif')} />}
            </View>
          </ScrollView>
        }
        <Footer navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

});

export default Home;