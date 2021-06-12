import React, { Component } from 'react';
import {
  StyleSheet, Button, Dimensions, Image,View,Text,TouchableOpacity,
  ScrollView,AsyncStorage} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import TextTicker from 'react-native-text-ticker';
const s = require('../assets/css/style');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    address:""
    }
    this.getCustomerdetails  =  this.getCustomerdetails.bind(this);
    this.getCustomerdetails();
  }

  getCustomerdetails=async ()=> {  
    this.state.address = await AsyncStorage.getItem('address');
    this.setState({ address: address}) 
   
  }

  render() {
    return (

      <View style={{
        flexDirection: 'row', backgroundColor: "white", height: 100, width: "100%",
        alignItems: "stretch", justifyContent: "space-around", borderTopColor: "lightgrey",
        borderTopWidth: 0.7,borderBottomColor: "lightgrey", borderBottomWidth: 0.2
      }}>
        <View style={{ flex: 3 }}>
          <TouchableOpacity >
            <View style={{flexDirection:'row', alignItems: "center", justifyContent: "center" }} >
            <View style={{width:'25%'}}>

                  <Image style={{ width: 100, height: 100 }}
                source={require('../assets/img/logo.png')} />
            </View>

            <View style={{width:'75%',paddingTop:18}}>
                <Text style={{color:'#e78200',fontFamily:'serif',fontWeight:'bold',fontSize:25,
                alignItems:'center',justifyContent:'center',}}>PUZZI</Text>

        <TextTicker  style={{ fontSize: 15 }}   duration={10000}  loop 
      shouldAnimateTreshold={40}  bounce={false}
          repeatSpacer={50}    marqueeDelay={1000}>
         {this.state.address}
        </TextTicker>    
                
            </View>
            </View>
        
          </TouchableOpacity>
        </View>


        {/* <View style={{ flex: 1, flexDirection:"column" }}>
          <TouchableOpacity >
            <View style={{ marginTop:5,alignItems: "center", justifyContent: "center" }} >
              <Icon style={{ color: "#385898" }} name={'facebook'} size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={{ marginTop:5, alignItems: "center", justifyContent: "center" }} >
              <Icon name={'instagram'} size={25} style={{ color: "#cb299b" }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={{ marginTop:5,alignItems: "center", justifyContent: "center" }} >
              <Icon name={'twitter'} size={25} style={{ color: "#1DA1F2" }} />
            </View>
          </TouchableOpacity>
        </View> */}
        
      </View>

    );
  }
}

const styles = StyleSheet.create({

});

export default Header;