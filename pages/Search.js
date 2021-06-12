import React, { Component } from 'react';
import {StyleSheet,Button, Dimensions, ScrollView, Image,AsyncStorage,
  Animated,View,Text,TouchableOpacity,SafeAreaView} from "react-native";
import Carousel from 'react-native-snap-carousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-gesture-handler';
import Api from "../service/api";
import Master from "../service/master";
import { IMAGE_URL } from "../service/config";

const s = require('../assets/css/style');
const itemWidth = Dimensions.get('window').width;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apktoken:"",
      searchItems: [
        {
          simage: require('../assets/img/product/1.jpg'), 
          sstorename: "Moguls, Gopalapillai", 
          sproductname: "Keema Briyani", 
          sproductamount: "290", 
          sproductdiscount: "10% OFF", 
          sdescribtion: "Fast food, Chinese, Spicy",
          scurrency: "Rs",
        },
        {
          simage: require('../assets/img/product/2.jpg'), 
          sstorename: "Odels, Champaram", 
          sproductname: "Thandoori Keema Briyani", 
          sproductamount: "290", 
          sproductdiscount: "10% OFF", 
          sdescribtion: "Fast food, Chinese, Spicy",
          scurrency: "Rs",
        },
        {
           simage: require('../assets/img/product/3.jpg'), 
           sstorename: "Tizza, Lekkalinm", 
           sproductname: "Vadakkan Keema Briyani",
           sproductamount: "290", 
           sproductdiscount: "10% OFF", 
           sdescribtion: "Fast food, Chinese, Spicy",
           scurrency: "Rs",
        },
        {
          simage: require('../assets/img/product/4.jpg'), 
          sstorename: "Lazzy, Vhaokdd", 
          sproductname: "Keema Briyani", 
          sproductamount: "290", 
          sproductdiscount: "10% OFF", 
          sdescribtion: "Fast food, Chinese, Spicy",
          scurrency: "Rs",
        },
        {
           simage: require('../assets/img/product/1.jpg'), 
           sstorename: "Arrya, Kannilulam", 
           sproductname: "Keema Briyani",
           sproductamount: "290", 
           sproductdiscount: "10% OFF", 
           sdescribtion: "Fast food, Chinese, Spicy",
           scurrency: "Rs",
        },
      ],
      searchterm:'',
      listlength:0,
      scrollY: new Animated.Value(0),
      isLoading: false,
      activeIndex: 0,
      Items: [] ,
      searchproductList:[],
      show:false
    }
    this.loadMoreData  =  this.loadMoreData.bind(this);
    this.setState({listlength : 0});
    this.gotopushnotification();
  }
    

   gotopushnotification = async () => {
  //   let token = await AsyncStorage.getItem("token")
     let apktoken = "cexgyW2STwKjx4H2sTDgTI"
     alert(apktoken)
  //   // Api.get("suppliernotification").then((result) => {
  //   //    let responseType = Master.getResponseType(result);
  //   //    let responseValue = Master.getResponseValue(result); 
     
  //   //   if (responseType == "S") {
  
          Api.postwithNotifytoken('notification/token', {  
          "title": "Puzzi",
         "message": "from api Welcome Please make an Order",
         "token": apktoken
        }
        ).then((result) => {  
          alert("sucess") 
          let responseType = Master.getResponseType(result);
          let responseValue = Master.getResponseValue(result); 
          console.log("ressssssssssssssssssssssssssssssssuulttttttttt  "+result)
          
        })
    }


  //   // })
  // }


  loadMoreData = ()=> {  
    let mylist = this.state.searchproductList;
    this.state.isLoading = true;  
    
    AsyncStorage.getItem('tokenkey', (err, value) => {
      if (err) {
      } else {
        let tokenkey = (JSON.parse(value))
        Api.get("getSearchproduct/"+this.state.searchterm+ "/" + this.state.listlength, tokenkey, {
     }).then((result) => {
    
      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);  

        let data = responseValue["productList"];
        let i = 0;   
     

        if(responseValue["productList"].length > 0){
         this.state.show = true;
         this.setState({ show: true})
         this.setState({ listlength: responseValue["productList"].length}) 
         this.setState({ searchproductList: responseValue["productList"]}) 
        }         

        // if(data.length > 0){
        //   for(i=0;i<data.length;i++){
        //     mylist.push(data[i]);
        //   }
        // }
       //this.setState({searchproductList : mylist});    
       this.setState({ isLoading: false });

     })
   }  
   });

   }


  gotoItemListpage = (categoryid,supplierid) =>{
    AsyncStorage.removeItem("categoryid");
    AsyncStorage.removeItem("supplierid");


    AsyncStorage.setItem("categoryid", categoryid+ '');
    AsyncStorage.setItem("supplierid", supplierid+ '');
    const { navigate } = this.props.navigation;
    navigate('ItemListing');
  }

  componentDidMount() {}


  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  getSearchproductList(search){
    this.setState({ searchterm: search}) 
    this.setState({ isLoading: true });
    AsyncStorage.getItem('tokenkey', (err, value) => {
      if (err) {

      }else {
        let tokenkey = (JSON.parse(value))
        console.log("getSearchproduct/"+search)
        Api.get("getSearchproduct/"+search+ "/" + this.state.listlength, tokenkey, {
        }).then((result) => {
          this.setState({ isLoading: false });
         let responseType =  Master.getResponseType(result);
         let responseValue = Master.getResponseValue(result); 

         if(responseValue["productList"].length > 0){
          this.state.show = true;
          this.setState({ show: true})
          this.setState({ searchproductList: responseValue["productList"]}) 
          this.setState({ listlength: responseValue["productList"].length +  this.state.listlength}) 
         }         
        
         //this.setState({ searchterm: ""}) 
      });
   }
})
  }  

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
       
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

      >

        {/* <View>
            <View>
              <TextInput   style={styles.input}  placeholder=" Search for restaurants and food"
               onChange={(event) => { this.getSearchproductList( event.nativeEvent.text) }} 
               value={this.state.searchterm} />             
            </View>
          </View> */}


<View style={{flexDirection:'row'}}>
            <View style={{width:'80%'}}>
              <TextInput style={styles.input} placeholder=" Search for restaurants and food"
              onChange={(event) => { this.getSearchproductList( event.nativeEvent.text) }} 
              value={this.state.searchterm} />   
              
            </View>
            <View style={{width:'20%',alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity onPress={() => this.goToSearch()} >
              <View>
                <Icon name={'search'} style={[styles.red,styles.input]} size={35} />
              </View>
            </TouchableOpacity>
            </View>
          </View>
         

          {  this.state.show ?
          <View>

        {this.state.searchterm ?     
        
        <Text style={{ backgroundColor: 'white', padding:15, fontSize:16, color:"#666" }}>
          Search Results for {this.state.searchterm} ..</Text>: null }
         
          {
              this.state.searchproductList.map && this.state.searchproductList.map((item, key) => (

            <View style={{ backgroundColor: 'white' }}>
              <View style={{ flexDirection: 'row', padding: 10, borderBottomColor:"#eee", borderBottomWidth:1 }}>
               

               
                <View style={{ width: '30%', paddingLeft: 10 }}>
                <TouchableOpacity onPress={() => { this.gotoItemListpage(item.categoryid,item.supplierid) }}>
                  <View>
                    <Image style={{ width: "100%", height: 80, borderRadius: 5 }}
                       source={{
                        uri: IMAGE_URL + item.image
                      }} />
                  </View></TouchableOpacity>
                </View>


                <View style={{ width: '50%' }}>
                <TouchableOpacity onPress={() => { this.gotoItemListpage(item.categoryid,item.supplierid) }}>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: '700', fontFamily: "Cochin", paddingRight: 10, paddingLeft: 10 }}>{item.suppliername}</Text>
                  </View>
                  </TouchableOpacity>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: '300', fontFamily: "Cochin", paddingRight: 10, paddingLeft: 10 }}>{item.productname}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: '600', fontFamily: "Cochin", paddingRight: 10 }}>Rs {item.productrate}</Text>
                    <Text style={{ fontSize: 13, fontWeight: '600', color: "rgb(214, 27, 105)" }}>10% offer</Text>
                  </View>
                  <View>
                    <Text style={{ lineHeight: 20, fontSize: 13, fontWeight: 'bold', fontFamily: "Cochin", paddingLeft: 10, color: 'rgb(156, 156, 156)' }}>{item.usage}</Text>
                  </View>
                </View>

              </View>
              
            </View>

              ))
  }

          </View>
          :  <View style={{ width:"100%" ,padding:50,alignContent:'center', backgroundColor: "white"}}>
          <Image style={{ width: "100%", height: 250 }}
            source={require('../assets/img/noorderimage.png')} />
        </View>}

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
        {this.state.isLoading &&     <Image style={{ width: 100, height: 80 }}
                source={require('../assets/img/logo-gif.gif')} /> }
      </View>

        </ScrollView>
        <Footer forPage="search" navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width:"100%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'white', borderColor: 'white',
    fontSize: 17
  },

  red:{
    color: "#e46c47",textAlign:'center',paddingTop:12
  }
  
});

export default Search;