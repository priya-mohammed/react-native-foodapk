import React, { Component } from 'react';
import {
  StyleSheet, Button, Dimensions, ScrollView, Image,
  View,Animated, Text,  TouchableOpacity,  SafeAreaView,AsyncStorage} from "react-native";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CLoader from '../components/CLoader';
import Api from "../service/api";
import Master from "../service/master";
const s = require('../assets/css/style');

class Offers extends React.Component {
  constructor(props) {
    super(props);
    this.load()
    this.state = {
      scrollY: new Animated.Value(0),
      isLoading: false,
      contentLoader : false,
        list:[],
        show:true
    }

    this.loadMoreData  =  this.loadMoreData.bind(this);
  }


  loadMoreData(){

  this.setState({ isLoading: true });
  let mylist = this.state.Items;
  let i = 0;
  for(i=0;i<this.state.data.length;i++){
    mylist.push(this.state.data[i]);
  }

 this.setState({Items :mylist}); 
 this.setState({ isLoading: true });
  }
  load=async()=>{
  
    let customerId= JSON.parse(await AsyncStorage.getItem('customerId'));
   
    Api.get("getofferList/"+customerId, {
    }).then((result) => {
      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);

      if (responseType == 'S') {
        if(responseValue["list"].length > 0){
          this.setState({show:false})
          this.setState({list:responseValue["list"]})
        }else{
          this.setState({show:true})
        }
       
      }

    })
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }
  


  componentDidMount() {

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
     
     
     
        <ScrollView
      scrollEventThrottle={16}
       onScroll={Animated.event(
         [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
         {
           listener: event => {
             if (this.isCloseToBottom(event.nativeEvent)) {
               this.loadMoreData();
             }
           }
         }
       )}

      >

        <View style = {s.heading}>
        <View style={{width:"60%"}}>
         <View style={{flexDirection:"row",backgroundColor:'white'}}>
            <View>
               <View style={s.headingIconborder}>
                  <Icon
                     name='tags'
                     size={14}
                     color='white'
                    />
               </View>
            </View>
         
            <View>
               <View>
                  <Text style={s.headingIconText} >YOUR OFFERS</Text>
               </View>
            </View>
         </View>
      </View>
      </View>
<View>
      <View style={[s.columnsec]}>
        <View>
            <Text style={[s.mycoupons]}>MY COUPONS</Text>
        </View>
        </View>
        <View style={[s.borderwithtxt]}>
              <Text style={[s.mycouponssecsub]}>AVAILABLE COUPONS</Text>
        </View>
        {this.state.show ?
        <View style={{backgroundColor:"white", padding:20, alignItems:"center"}}>
        <Image style={{ width: "100%", height: 300 }}
          source={require('../assets/img/coupon.jpg')} />
          <Text style={{fontWeight:"bold"}}>Sorry !! You have no coupons</Text>
        </View>
        :

       <View>
        
        {
                this.state.list.map && this.state.list.map((item, key) => (
        <View>
        <View style={[s.homesec]}>
            <View style={[s.couponsecsubhead]}>
            <Text style={[s.mycoupons]}>COUPON CODE  :</Text>
            </View>
        <View style={[s.borderwithtxtcolor]}>
        
              <Text style={[s.keema]}>{item.couponCode}</Text>
        </View>
        
        </View>
        
      <View style={[s.columnsec]}>
        <View style={[s.borderligtgray]}>
            <Text style={[s.mycouponsecGet]}>{item.shortDesc}</Text>
       </View>
       <View style={[s.txtwidthsixty]}>
         <Text style={[s.txtaddrs]}>{item.desc}</Text>
       </View>
       <View style={[s.borderligtgray]}>
       <TouchableOpacity>
                   <Text style={{color:'#74a1e0',fontWeight:'bold',paddingTop:5,letterSpacing:0.5,paddingBottom:12}}>+MORE
                   </Text>     
       </TouchableOpacity>
       </View>
</View>
</View>
 ))}
 </View>
}
</View>


        <View>
       

        
</View>
        </ScrollView>
        <Footer forPage="none" navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  btnIcon:{
    color:'#e46c47',textAlign:'center',
    paddingTop:5,
  }
});

export default Offers;