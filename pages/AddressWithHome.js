import React, { Component } from 'react';
import {
  Button,AsyncStorage,TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,TextInput,Image, ScrollView,TouchableHighlight
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import Header from '../components/Header';

const s = require('../assets/css/style');

class AddressWithHome extends React.Component {
  constructor(props) {
    super(props);
    this.load();
    this.state = {
      address: "",
      anim: true
    }

  }
  load = async() => {
    let caddreesss = await AsyncStorage.getItem("address")
    this.setState({'address':caddreesss});
  }
  componentDidMount() {
    setTimeout(() => {this.setState({
      anim: false
  });
  const { navigate } = this.props.navigation;
    navigate('Home');
}, 3000);

  }
  
  render() {
  
    return (
      
      <SafeAreaView >

        <View > 

          
          
        <Animatable.View animation="zoomOut" delay={1000}>
        <View style={[s.container]}>
        <View>
    <Image
        style={[s.logo]}
        source={require('../assets/img/logo.png')} />
 </View>
       </View>
          </Animatable.View>
         
          {this.state.anim  ?
          <View>
          
          <Animatable.View animation="zoomIn" delay={1500}  >
          <View style={[s.container2]}>
            <Image   style={[s.map]}
                source={require('../assets/img/map.png')} />
         
            <Text style={{textAlign:"center", width:200, fontSize:15}}>{this.state.address}</Text>
            </View>
          </Animatable.View>
          
          </View>
          :
          null
          }
          
          <View>
          <Animatable.View animation="slideInUp" delay={4000}>
          <View  style={[s.container3]}>
              <Header navigation={this.props.navigation} />
            </View>
          </Animatable.View>
          </View>
          

  
        </View>
            
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
   
  
 



});

export default AddressWithHome;