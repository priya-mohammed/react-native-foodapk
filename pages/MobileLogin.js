import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,TextInput,Image, ScrollView,TouchableHighlight, AsyncStorage
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Api from "../service/api";
import Master from "../service/master";
import ValidationComponent from 'react-native-form-validator';

const s = require('../assets/css/style');

class MobileLogin extends ValidationComponent{
  constructor(props) {
    super(props);
    this.state = {
      mobno:'',
      name:''
    }
    this.goToOTP = this.goToOTP.bind(this);
  }

  componentDidMount() {
  
  }


  goToOTP=async()=>{
  console.log("otp")

  let token = await AsyncStorage.getItem("apktoken")
//  alert(token)
  this.validate({
    name: {minlength:3, maxlength:15, required: true},  
    mobno: {numbers: true},  
      });


      if(this.isFormValid()){

        let data = {"mobileno":this.state.mobno,"oprn":"PORTALLOGIN","email":this.state.name,
      "token":token}
        Api.post("registercustomer", data,{
        }).then((result) => {
          console.log("result")
          console.log("sdfsdfsdf"+result)
          let responseType = Master.getResponseType(result);
          let responseValue = Master.getResponseValue(result);
          
          // console.log("dfgdfggsgsd"+responseType)
          if (responseType == 'S') {
            AsyncStorage.setItem('customerId',  JSON.stringify(responseValue["id"]));
            AsyncStorage.setItem('otp',  JSON.stringify(responseValue["otp"]));
            AsyncStorage.setItem('customerName',  this.state.name);
            AsyncStorage.setItem('mobileno',  this.state.mobno);
            AsyncStorage.setItem('defaultcoupon',  responseValue["defaultcoupon"]);
            AsyncStorage.setItem('coupondisc',  responseValue["coupondisc"]);
   
            const { navigate } = this.props.navigation;
             navigate('MobileOTP')
          }
    
        })
        // const { navigate } = this.props.navigation;
        // navigate('MobileOTP')
    }


    // if(this.state.mobno !=null && this.state.mobno != '' && this.state.mobno !=undefined){
    
    // }
  
  
  }

  // getErrorMessages(){
    
  // }
  render() {
    return (
      <SafeAreaView >
          <ScrollView keyboardShouldPersistTaps={'true'}>
   <View style={[s.imgotp]}>
      <Image style={{ width: "100%", height: "100%"}}
      source={require('../assets/img/image.png')} />
   </View>
   <View style={s.mlmaincontainer}>

   <Text style={[s.errorvalidatetxt]}>  {this.getErrorMessages()} </Text>
      {/* <View>
         <TextInput
            style={[s.input]}
            placeholder="Name"
            keyboardType="default"
            onChange={(event) => this.setState({ name: event.nativeEvent.text })}
            value={this.state.name} 
            />
      </View>
      <View>
         <TextInput
            style={[s.input]}
            placeholder="Mobile number"
            keyboardType="numeric"
            onChange={(event) => this.setState({ mobno: event.nativeEvent.text })}
            value={this.state.mobno} 
            />
      </View> */}

<View>
         <TextInput
          ref="name"
            style={[s.input]}
            placeholder="Name"
            keyboardType="default"
            onChangeText={(name) => this.setState({name})} value={this.state.name}
            />
      </View>

      <View>
         <TextInput
         ref="number"
            style={[s.input]}
            placeholder="Enter Mobile number"
            keyboardType="numeric"
            onChangeText={(mobno) => this.setState({mobno})} value={this.state.mobno}
            />
      </View>

      <TouchableOpacity onPress={() => this.goToOTP()}>
      <View style={{padding:10,marginTop:20}}>
        
            <Text style={[s.buttonBGItem,s.ButtonTextItem]}>Send OTP&nbsp; </Text>
        
      </View>
      </TouchableOpacity>


      {/* <View style={s.mlcontainer}>
         <View style={{width:'50%'}}>
            <TouchableHighlight
                style={styles.btnClickContain}
               >
               <View
                  style={styles.btnContainer}>
                <Icon
                     name='facebook'
                     size={25}
                     color='lightpink'
                     style={styles.btnIcon}/>
                  <Text style={styles.btnText}>     Facebook</Text>
               </View>
            </TouchableHighlight>
         </View>
         <View style={{width:'50%',marginLeft:10,marginRight:5}}>
            <TouchableHighlight
               style={styles.btnClickContain}
               >
               <View
                  style={styles.btnContainer}>
                  <Icon
                     name='google'
                     size={25}
                     color='#4285F4'
                     style={styles.btnIcon}/> 
                  <Text style={styles.btnText}>  Google</Text>
               </View>
            </TouchableHighlight>
         </View>
      </View> */}

{/* <View style={{ alignItems: "center", justifyContent: "center" }} >
              <Image style={{ width: 100, height: 80 }}
                source={require('../assets/img/logo.png')} />
            </View> */}
      
   </View>
</ScrollView>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  buttonBGItem: {
    color:'white',
    borderRadius:6,
    fontSize: 15,
    fontWeight:"bold"
  
  
},
ButtonTextItem: {
backgroundColor:"black",
padding:15,
textAlign:'center'

  

},  

input: {
  height: 40,
  margin: 12,
  borderWidth: 1,
  borderRadius:6,
  textAlign:'center',
  backgroundColor:'white',borderColor:'white'
},
btnClickContain: {
  justifyContent: 'center',
  backgroundColor: 'white',
  borderRadius: 5,
padding:10,
  marginTop: 5,
  marginBottom: 5,
  marginRight:10
},
btnContainer: {
  flexDirection:"row",
  justifyContent: 'center',
  borderRadius: 10,
},
btnIcon: {
  height: 25,
},
btnText: {
  fontSize: 15,
  color: 'black',
  marginTop: 2,
  fontWeight:'bold'
}

});

export default MobileLogin;