import React, { Component } from 'react';
import {
  Button,Dimensions,
  StyleSheet,
  View,
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
  import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/MaterialIcons';


const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const itemHeight = Dimensions.get('window').height;
navigator.geolocation = require('@react-native-community/geolocation');


class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    this.setlocation()
    this.state = {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        routeCoordinates: [],
        distanceTravelled: 0,
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
   
   
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.setlocation();
          });
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
   
      console.log(PermissionsAndroid.RESULTS.GRANTED)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      
        console.log("You can use the location")
        let watchID = Geolocation.watchPosition(
          (position) => {
            //Will give you the location on location change
            
            let currentLatitude = 
            (position.coords.latitude);
            this.setState({latitude:parseFloat(currentLatitude)})
            
            //getting the Longitude from the location json        
            let currentLongitude =   (position.coords.longitude);
             
            this.setState({longitude:parseFloat(currentLongitude)})
             console.log("getting the Latitude from the location json")
         
            
              this.setState({
                  markerData: {latitude:this.state.latitude, longitude:this.state.longitude} 
                });
                
               this.address();
          },
          (error) => {
          //  alert(123)
            console.log(error);
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
    console.log("getaddress")

    Geocoder.init("AIzaSyBAbj7tFB5w8ceVWsYLORrQOeut4pYW7pA");     
    Geocoder.from(this.state.latitude, this.state.longitude).then(json => {
    console.log(json)
            var addressComponent = json.results[0].formatted_address;
            //alert(addressComponent)
            this.setState({address:addressComponent})
            AsyncStorage.setItem("address", addressComponent+"");
        })
  }

  goToHome=async()=>{
    // AsyncStorage.setItem('latitude',  JSON.stringify("8.080213127487237"));
    // AsyncStorage.setItem('longitude',  JSON.stringify("77.5502329878509"));

    AsyncStorage.setItem('latitude',  JSON.stringify(this.state.latitude));
    AsyncStorage.setItem('longitude',  JSON.stringify(this.state.longitude));

    let id = JSON.parse(await AsyncStorage.getItem('customerId'))
    if(id != null && id !='' && id!='0' && id !=undefined){
      let longitude = JSON.parse(await AsyncStorage.getItem('longitude'));
      let address = await AsyncStorage.getItem('address');
      let customerId= JSON.parse(await AsyncStorage.getItem('customerId')); 
      let otpmsg = await AsyncStorage.getItem('otpmsg');
      if (otpmsg == 'verfied') {
          let data={"address1":address,"latitude":this.state.latitude,"longitude":this.state.longitude,"customerid":customerId,
          "oprn":"INS"}
          Api.postwithtoken("saveportalcustomeraddress",data , {
          }).then((result) => {
            let responseType = Master.getResponseType(result);
            let responseValue = Master.getResponseValue(result);
  
            if (responseType == 'S') {
              const { navigate } = this.props.navigation;
              navigate('Home')
            }
  
          })
        }else{
          const { navigate } = this.props.navigation;
          navigate('MobileLogin')
        }
    }else{
      const { navigate } = this.props.navigation;
      navigate('MobileLogin')
    }
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

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
          region={this.getMapRegion()}
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
        <Icon name="room" size={40} style={{color:"#e46c47"}}></Icon>
        </View>
        </View>


        </View>
       
          <View style={{paddingLeft:10,margin:0}}>
            <Text style={{fontSize: 16, paddingBottom: 10 ,fontWeight:'bold',paddingLeft:10,paddingRight:10, textAlign: 'justify',
lineHeight:30}}>{this.state.address}</Text>
          </View>
          
          <View>
          <TouchableOpacity onPress={() => this.goToHome()}>
                        <Text style={[styles.buttonBGcon,styles.ButtonTextcon]}>CONFIRM LOCATION
                        
                            </Text>     
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

export default CurrentLocation;
