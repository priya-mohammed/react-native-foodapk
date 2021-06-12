import React, { Component } from 'react';
import {StyleSheet, Button, Dimensions, ScrollView, Image,Animated,TextInput,
  View,  Text,  TouchableOpacity, AsyncStorage, SafeAreaView} from "react-native";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Api from "../service/api";
import Master from "../service/master";
import { IMAGE_URL } from "../service/config";
import CLoader from '../components/CLoader';
import { Item } from 'native-base';

const s = require('../assets/css/style');

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList:[],
      scrollY: new Animated.Value(0),
      contentLoader: true,
      isLoading: false,   
      show: false,  
      activeIndex: 0,
      length: 0,
      customerid: 0
    } 
    this.loadMoreData  =  this.loadMoreData.bind(this);
    this.getMyOrders  =  this.getMyOrders.bind(this);
    this.setState({length : 0});   
    this.getMyOrders();
  }


  loadMoreData = async()=> {  

    this.state.customerid= JSON.parse(await AsyncStorage.getItem('customerId'));
    let mylist = this.state.orderList;
    this.state.isLoading = true;  
  
    AsyncStorage.getItem('tokenkey', (err, value) => {
      if (err) {
      } else {
        let tokenkey = (JSON.parse(value))
        Api.get("getMyorderList/"+this.state.customerid+'/'+this.state.length, tokenkey, {
     }).then((result) => {
    
      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);  
     
      let data = responseValue["orderList"];
      let i = 0;
            
     // this.state.length= this.state.length + responseValue["orderList"].length;
      this.setState({ length: this.state.length + responseValue["orderList"].length})
 
      if(data.length > 0){
       for(i=0;i<data.length;i++){
         mylist.push(data[i]);
       }
     }
    this.setState({orderList : mylist});    
    this.setState({ isLoading: false });
 
     })
   }  
   });
 
 
   }


  getMyOrders =async() =>{
    this.state.customerid= JSON.parse(await AsyncStorage.getItem('customerId'));
    
    AsyncStorage.getItem('tokenkey', (err, value) => {
      if (err) {
      } else {
        let tokenkey = (JSON.parse(value))
        Api.get("getMyorderList/"+this.state.customerid+'/'+this.state.length, tokenkey, {
     }).then((result) => {
    
      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);  
      this.setState({ orderList: responseValue["orderList"]}) 
      
     // this.state.length= this.state.length + responseValue["orderList"].length;
      this.setState({ length: this.state.length + responseValue["orderList"].length})
      this.setState({ contentLoader: false})
    
      if(responseValue["orderList"].length > 0){
        this.setState({ show: true})
      }else{
        this.setState({ show: false})
      }

     })
   }  
   }); 

  

  }

  goToOrderDeails(orderid) {

    AsyncStorage.setItem("orderid", orderid + '');
    const { navigate } = this.props.navigation;
    navigate('OrderDetail');  
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }
 

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
        { this.state.contentLoader ?
          <View >
            <CLoader forLoad="item" ></CLoader>
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

>
        <View style = {s.heading}>
        <View style={{width:"60%"}}>
         <View style={{flexDirection:"row",backgroundColor:'white'}}>
            <View>
               <View style={s.headingIconborder}>
                  <Icon name='shopping-basket' size={14} color='white'/>
               </View>
            </View>
            <View>
               <View>
                  <Text style={s.headingIconText} >ORDER LIST</Text>
               </View>
            </View>
         </View>
      </View>
      </View>
         
   {this.state.show ?      
   <View style={{ backgroundColor: 'white' }}>

   {
      this.state.orderList.length >0 &&  this.state.orderList.map && this.state.orderList.map((item, key) => (      
            <TouchableOpacity onPress={() => this.goToOrderDeails(item.orderid)}>                
           <View >
              <View style={{ width: "100%", backgroundColor: 'white', paddingLeft: 18, paddingTop: 20 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.suppliername}</Text>
              </View> 


              <View style={{ flexDirection: "row", backgroundColor: 'white' }}>
                <View style={{ width: "60%" }}>
                  <View style={styles.textinputCtrleft}>
                    <Text style={{ fontSize: 15, color: '#909192', paddingLeft: 20,paddingRight: 20, textAlign : "justify" }}>{item.address}</Text>
                    <Text style={{ fontSize: 15, color: '#909192', paddingTop: 10, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: "lightgray", paddingLeft: 20 }}>RS. {item.grandtotal}    
                       <Icon name="chevron-right" size={12} style={{ color: "lightgray", marginTop: 2 }} />  </Text>

                  </View>    
                </View>   
                <View style={{ width: "36%", borderBottomWidth: 1, borderBottomColor: "lightgray", marginRight: 0, alignItems: 'flex-end' }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.textaddr}>{item.orderstatus}  </Text>
                    {
                    item.orderstatus == "Payment Pending" ?
                    <Icon name="exclamation-triangle" size={15} style={{ color: "orange", marginTop: 2 }} />
                    :
                    <Icon name="check-circle" size={15} style={{ color: "green", marginTop: 2 }} />
                    }
                    
                  </View>
                </View>
              </View>
            </View>
            </TouchableOpacity>
         ))}

            <View style={{ backgroundColor: 'white', paddingTop: 50 }}>
            </View>


          </View>

:
          <View>
           <View style={{width:'100%',paddingTop:50}}>           
                  <View>
                     <Image style={{ width: "100%", height: 250, borderRadius: 5, }}
                    source={require('../assets/img/noorderimage.png')} />
                  </View>

             
               </View>

               <View style={{ width: "100%", backgroundColor: 'white', paddingLeft: 80, paddingTop: 20 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>You have no Orders.</Text>
              </View> 

          </View> }

          <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
        {this.state.isLoading &&   <Image style={{ width: 100, height: 80 }}
                source={require('../assets/img/logo-gif.gif')} /> }
      </View>

        </ScrollView>}
        <Footer forPage="none" navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

});

export default Orders;