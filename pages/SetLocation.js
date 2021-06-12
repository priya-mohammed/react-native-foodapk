import React, { Component } from 'react';
import {
  StyleSheet, Button,Dimensions,Image,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,AsyncStorage
} from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Video from 'react-native-video';
const s = require('../assets/css/style');
const itemWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

class SetLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: "Item 1",
          text: "Text 1",
          image:require("../assets/img/set-location-banners/1.png")
        },
        {
          title: "Item 2",
          text: "Text 2",
          image:require("../assets/img/set-location-banners/2.jpg")
        },
        {
          title: "Item 3",
          text: "Text 3",
          image:require("../assets/img/set-location-banners/3.jpg")
        }
      ]
    }
  }

  _renderItem({ item, index }) {
    return (
      <View style={{
        backgroundColor: 'floralwhite',
        width: itemWidth,
        height: itemHeight / 2 + 30 ,
      }}>
        
        <Image style={{ width: "100%", height: "100%" }}
          source={item.image} />
      </View>

    )
  }

  get pagination () {
    const { entries, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={this.state.carouselItems.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'transparent' }}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: 'black'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
}


  componentDidMount=async()=> {
    
  }

  goToCurrentLcoation(){
    const { navigate } = this.props.navigation;
    navigate('CurrentLocation')
  }
  goToMobileno(){
    const { navigate } = this.props.navigation;
    navigate('MobileLogin')
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
{/* <Video 
 style={{
  height: 600

}}
                                 
                                 source={require('../assets/priya/1.m3u8')}
                                
                                 
                               /> */}
                               <Video  style={{
  height: 600

}} source={{uri: "http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8"}}  />
        <View style={{ flex: 2 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <View>
            <Carousel
            inactiveSlideOpacity={1} inactiveSlideScale={1}
              layout={"default"}
              ref={ref => this.carousel = ref}
              data={this.state.carouselItems}
              sliderWidth={itemWidth}
              itemWidth={itemWidth}
              renderItem={this._renderItem}
              onSnapToItem={index => this.setState({ activeIndex: index })} />
              { this.pagination }
          </View>
        </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
          <View style={{ flex: 1, width: '80%'}}>
          <TouchableOpacity onPress={() => this.goToCurrentLcoation()}>
                        <Text style={[s.buttonBGcon,s.ButtonTextcon]}>SET DELIVERY LOCATION
                        
                            </Text>     
                            </TouchableOpacity>

          </View>

          <View style={{ flex: 2, width: '50%', }}>
            <View>
            <Text style={{ fontSize: 13,textAlign: 'center',letterSpacing:1,fontWeight:'bold',lineHeight:50}}>Have an account</Text>
            </View>
            <View>
            <TouchableOpacity onPress={() => this.goToMobileno()}>
                        <Text style={[styles.buttonBGcon,styles.ButtonTextcon]}>LOGIN
                        
                            </Text>     
                            </TouchableOpacity>
                            </View>

          </View>

        </View>

      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  buttonBGcon:{
    backgroundColor:"#e46c47",
 
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
  }
});

export default SetLocation;