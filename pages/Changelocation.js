import React, { Component } from 'react';
import {
  Button,Dimensions,
  StyleSheet,
  View,TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlightBase,PermissionsAndroid,AsyncStorage
} from "react-native";
import Api from "../service/api";
import Master from "../service/master";

import MapView, {
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE
  } from "react-native-maps";

import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 8.78825;
const LONGITUDE = 77.4324;
const s = require('../assets/css/style');
const itemHeight = Dimensions.get('window').height;
navigator.geolocation = require('@react-native-community/geolocation');

class ChangeLocation extends React.Component {
  constructor(props) {
    super(props);
    // this.setlocation()
    this.state = {
        latitude: LATITUDE,
        longitude:LONGITUDE,
        routeCoordinates: [],
        distanceTravelled: 0,
        addressheader:'',
        prevLatLng: {},
        coordinate: new AnimatedRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: 0,
          longitudeDelta: 0
        }),
        markerData:{},
        address:''
    }
    this.setlocation = this.setlocation.bind(this)
  }

  componentDidMount=async()=> {

    let editaddressid = await  AsyncStorage.getItem('editAddId')
    let editlatitude = await  AsyncStorage.getItem('editlatitude')
    let editlongitude = await  AsyncStorage.getItem('editlongitude')
    let addresshead = await  AsyncStorage.getItem('addhead')

    if(parseInt(editaddressid) > 0){
     this.setState({latitude:parseFloat(editlatitude)})
     this.setState({longitude:parseFloat(editlongitude)})
     this.setState({addressheader:addresshead})
     this.setState({
      markerData: {latitude:this.state.latitude, longitude:this.state.longitude} 
    });
    }else{
      this.reRenderSomething = this.props.navigation.addListener('focus', () => {
        this.setlocation();
            });
    }
    
 
     
  }

  setlocation=async()=>{
    try {

        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
   
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      
        //alert("You can use the location")
        let watchID = Geolocation.watchPosition(
          (position) => {
            //Will give you the location on location change      

            let currentLatitude = (position.coords.latitude);
            this.setState({latitude:parseFloat(currentLatitude)})   
            
            let currentLongitude = (position.coords.longitude);             
            this.setState({longitude:parseFloat(currentLongitude)})
                                
            this.setState({
             markerData: {latitude:this.state.latitude, longitude:this.state.longitude} 
            });                
            this.address();

          },
          (error) => {
               console.log(error.message);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 1000
          },
        );

      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }

  }
  address(){
    //alert(this.state.latitude)
    Geocoder.init("AIzaSyA2j5uyeCK16tExjoFI2EruS2hGW0f2cCA"); 
    Geocoder.from(this.state.latitude, this.state.longitude)
        .then(json => {
    
         var addressComponent = json.results[0].formatted_address;
        // alert(addressComponent)
            this.setState({address:addressComponent})
            AsyncStorage.setItem("address", addressComponent+"");
        })
  }

  save=async()=>{
    let oprn =(await AsyncStorage.getItem('addoprn'));
    let customerId= JSON.parse(await AsyncStorage.getItem('customerId'));
    let addressid= await AsyncStorage.getItem('editAddId');

        let data={"caid":addressid,"address1":this.state.address,"latitude":this.state.latitude,"longitude":this.state.longitude,"customerid":customerId,
        "oprn":oprn, "firstname":this.state.addressheader}
       
        Api.postwithtoken("saveportalcustomeraddress",data , {
        }).then((result) => {

          let responseType = Master.getResponseType(result);
          let responseValue = Master.getResponseValue(result);
          console.log("responseType"+  responseType)
          if (responseType == 'S') {
            AsyncStorage.setItem('editAddId',"0")
            const { navigate } = this.props.navigation;
            navigate('Address')
          }
        })
     
   
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });


  onRegionChange(region) {
    this.setState({latitude:region["latitude"]})
    this.setState({longitude:region["longitude"]})
    this.address();

}
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
        
         
          <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          initialRegion ={this.getMapRegion()}
          onRegionChangeComplete ={this.onRegionChange.bind(this)}
           >
        
          <Marker
           coordinate={{
            longitude: this.state.longitude ? this.state.longitude : 0,
            latitude: this.state.latitude ? this.state.latitude : 0
          }}                  
          title={'owner location'}
          />
          </MapView>
         
        </View>
        <View style={{ flex: 1 }}>
        </View>
        <View>
        <View style={{ flexDirection:'row',width:'70%',paddingBottom:20 }}>
            <View>

              <Text style={{ fontWeight: 'bold' }}>
               
              </Text>
            </View>
            <View style={{paddingLeft:10,margin:0}}>
              <Text style={{ fontWeight: '500', fontSize: 13, textAlign: 'justify',
                lineHeight: 20}}>{this.state.address}</Text>
            </View>
          
     
        <View style={{width:'30%',marginLeft:20}}>
                    <TouchableOpacity>
                        <Text style={[styles.buttonBG,styles.ButtonText]}>CHANGE&nbsp;
                        
                            </Text>     
                            </TouchableOpacity>
        </View>
        </View>


        </View>

        <View>
         <TextInput
            ref="name"
            style={[s.input]}
            placeholder="AddressHead"
            keyboardType="default"
            onChangeText={(addressheader) => this.setState({addressheader})} 
            value={this.state.addressheader}
            />
          </View>

          <View>
            <Text style={{fontSize: 16, paddingBottom: 10 ,fontWeight:'bold',
            paddingLeft:10,paddingRight:10, textAlign: 'justify',
            lineHeight:30}}>{this.state.address}</Text>
          </View>
          
          <View>
          <TouchableOpacity onPress={() => this.save()}>
             <Text style={[styles.buttonBGcon,styles.ButtonTextcon]}>CONFIRM LOCATION </Text>     
           </TouchableOpacity>
          </View>

       </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  buttonBG: {
    backgroundColor:"#ECE8E7",
    marginTop:0,
    padding:10
  
  
},
ButtonText: {
color:'#e46c47',
    borderRadius:8,
    fontSize: 12,
    fontWeight:"bold"
},  
buttonBGcon:{
  backgroundColor:"#e46c47",
  margin:15,
  padding:10,
  marginBottom:50,
},
ButtonTextcon:{
  color:'white',
    borderRadius:8,
    fontSize: 16,
    fontWeight:"bold",
    textAlign:'center',
    letterSpacing:1,
},
map: {
    // ...StyleSheet.absoluteFillObject,
    // flex:1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width:'100%',
    height:itemHeight/2 + 20
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
});

export default ChangeLocation;
