import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView, TextInput, Image, ScrollView, TouchableHighlight, AsyncStorage,
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Api from "../service/api";
import Master from "../service/master";
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
const s = require('../assets/css/style');

class MobileOTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      successpopup: false,
      modalmsg:"",
    }
  }

  componentDidMount = async()=>{
    let otp = JSON.parse(await AsyncStorage.getItem('otp'));
    alert("One time OTP is "+otp)
  }

  closemodal(){
    this.setState({ successpopup:false})

 }

  sendOTP = async () => {

    let opt = this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4 + this.state.otp5;
  
    if (opt == JSON.parse(await AsyncStorage.getItem('otp'))) {

      AsyncStorage.setItem('otpmsg','verfied');
      let location = JSON.parse(await AsyncStorage.getItem('latitude'));
      
      if (location != null && location != '' && location != '0' && location != undefined) {
      

        let longitude = JSON.parse(await AsyncStorage.getItem('longitude'));
        let address = await AsyncStorage.getItem('address');
        let customerId= JSON.parse(await AsyncStorage.getItem('customerId'));   
           
        let data={"address1":address,"latitude":location,"firstname":"Home",
        "longitude":longitude,"customerid":customerId,"oprn":"INS"}

            Api.post("saveportalcustomeraddress",data , {
            }).then((result) => {
              let responseType = Master.getResponseType(result);
              let responseValue = Master.getResponseValue(result);
              console.log("responseType"+  responseType)
              if (responseType == 'S') {
                const { navigate } = this.props.navigation;
                navigate('Home')
              }
    
            })    
          
        
      } else {
        const { navigate } = this.props.navigation;
        navigate('CurrentLocation')
      }
    } else {
        //  this.setState({ successpopup:true})  
        //  this.setState({ modalmsg:"Invalid otp"})
      // alert("Invalid otp")
    //   Snackbar.show({
    //     text: 'Invalid otp',
    //     textColor:'white',
    //     duration: Snackbar.LENGTH_SHORT,
    //     fontSize:16,textAlign:'center'
    //   });
    }

  }
  goToHome() {
    const { navigate } = this.props.navigation;
    navigate('Home')
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View>
             <Image style={{ width: "100%", height: 300}}
      source={require('../assets/img/image.png')} /> 
          </View>
          <View style={s.mlmaincontainer}>
            <View>
              <Text style={[s.otphead]}>Enter OTP</Text>
            </View>
            <View style={[s.bordr]}>
              <TextInput  style={[s.textinputsec]} ref={"pin1ref"} maxLength={1}
                onChangeText={(otp1) => {
                  this.setState({ otp1: otp1 })
                  if (otp1 != "") {
                    this.refs.pin2ref.focus()
                  }
                }}
                value={this.state.otp1} keyboardType='numeric' ></TextInput>
              <TextInput  style={[s.textinputsec]} maxLength={1} ref={"pin2ref"}
                onChangeText={(otp2) => {
                  this.setState({ otp2: otp2 })
                  if (otp2 != "") {
                    this.refs.pin3ref.focus()
                  }
                  else {
                    this.refs.pin1ref.focus()
                  }
                }}
                value={this.state.otp2} keyboardType='numeric' ></TextInput>
              <TextInput  style={[s.textinputsec]} maxLength={1} ref={"pin3ref"}
                onChangeText={(otp3) => {
                  this.setState({ otp3: otp3 })
                  if (otp3 != "") {
                    this.refs.pin4ref.focus()
                  }
                  else {
                    this.refs.pin2ref.focus()
                  }
                }}
                value={this.state.otp3} keyboardType='numeric' ></TextInput>
              <TextInput  style={[s.textinputsec]} maxLength={1} ref={"pin4ref"}
                onChangeText={(otp4) => {
                  this.setState({ otp4: otp4 })
                  if (otp4 != "") {
                    this.refs.pin5ref.focus()
                  }
                  else {
                    this.refs.pin3ref.focus()
                  }
                }}
                value={this.state.otp4} keyboardType='numeric' ></TextInput>
              <TextInput  style={[s.textinputsec]} maxLength={1} ref={"pin5ref"}
                onChangeText={(otp5) => {
                  this.setState({ otp5: otp5 })
                  if (otp5 != "") {
                    // this.refs.pin6ref.focus()
                  }
                  else {
                    this.refs.pin4ref.focus()
                  }
                }}
                value={this.state.otp5} keyboardType='numeric' ></TextInput>
            </View>
            <View style={[s.otpiconsec]}> 
              <TouchableOpacity onPress={() => this.sendOTP()}>
                <View style={{ paddingBottom: "10%", marginLeft: 10, marginRight: 10, marginTop: 40 }}>

                  <Text style={[s.buttonBGItem,s.ButtonTextItem]}>Proceed OTP&nbsp;
               </Text>

                </View>
              </TouchableOpacity>
            </View>
            
          </View>

          <Modal isVisible={this.state.successpopup}
        backdropColor="#111"
        propagateSwipe={true}
        onBackdropPress={() => this.setState({ successpopup: false })}
        animationIn="slideInUp"
        animationOut="slideOutDown"

      >
        <View style={{ flexDirection: 'column', backgroundColor: 'white', padding: 20 }}>
    
      <View>
          <Icon
                     name='check-circle'
                     size={45}
                style={{color:'green',alignItems:'center',justifyContent:'center',textAlign:'center',paddingBottom:5}}
                     />
      
   
          <Text style={[s.sucessmsg]}>{this.state.modalmsg}</Text>
     

          <TouchableOpacity onPress={() => this.closemodal()}>
          <Text style={[s.fullbuttonBGcon,s.fullButtonTextcon]}>close
                        
                        </Text> 
</TouchableOpacity>
</View>
         </View>
      </Modal>

        </ScrollView>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  buttonBGItem: {
    color: 'white',
    borderRadius: 6,
    fontSize: 20,
    fontWeight: "bold"


  },
  ButtonTextItem: {
    backgroundColor: "black",
    padding: 15,
    textAlign: 'center',
    letterSpacing: 1



  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 6,
    textAlign: 'center',
    backgroundColor: 'white', borderColor: 'white'
  },
  btnClickContain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
  btnText: {
    fontSize: 15,
    color: 'black',
    marginLeft: 10,
    marginTop: 2,
    fontWeight: 'bold'
  }

});

export default MobileOTP;