import React, { Component } from 'react';
import {
  StyleSheet, Button, Dimensions, Image,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const s = require('../assets/css/style');

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  goToHome() {
    const { navigate } = this.props.navigation;
    navigate('Home')
  }
  goToSearch() {
    const { navigate } = this.props.navigation;
    navigate('Search')
  }
  goToCart() {
    const { navigate } = this.props.navigation;
    navigate('Cart')
  }
  goToProfile() {
    const { navigate } = this.props.navigation;
    navigate('Profile')
  }
  render() {
    return (

      <View style={{
        flexDirection: 'row', backgroundColor: "white", height: 50, width: "100%",
        alignItems: "stretch", justifyContent: "space-around", borderTopColor: "lightgrey",
        borderTopWidth: 0.7, borderBottomColor: "lightgrey", borderBottomWidth: 0.2
      }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => this.goToHome()} >
            <View style={{ alignItems: "center", justifyContent: "center" }} >
              <Image style={{ width: 60, height: 50 }}
                source={require('../assets/img/logo.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {this.props.forPage == "search" ?
            <TouchableOpacity onPress={() => this.goToSearch()} >
              <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
                <Icon name={'search'} style={{ color: "#e46c47" }} size={27} />
                <Text style={{ color: "#e46c47", fontSize: 9 }}>Search</Text>
              </View>
            </TouchableOpacity>

            :
            <TouchableOpacity onPress={() => this.goToSearch()} >
              <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
                <Icon name={'search'} style={{ color: "#848484" }} size={27} />
                <Text style={{ color: "#848484", fontSize: 9 }}>Search</Text>
              </View>
            </TouchableOpacity>
          }
        </View>
        <View style={{ flex: 1 }}>
        {this.props.forPage == "cart" ?
          <TouchableOpacity onPress={() => this.goToCart()}>
            <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
              <Icon name={'add-shopping-cart'} style={{ color: "#e46c47" }} size={27} />
              <Text style={{ color: "#e46c47", fontSize: 9 }}>Cart</Text>

            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => this.goToCart()}>
            <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
              <Icon name={'add-shopping-cart'} style={{ color: "#848484" }} size={27} />

              {/* <Badge value="7" status="error" containerStyle={styles.badgeStyle}/> */}

              <Text style={{ color: "#848484", fontSize: 9 }}>Cart</Text>

            </View>
          </TouchableOpacity>
        }
        </View>
        <View style={{ flex: 1 }}>
        {this.props.forPage == "profile" ?
          <TouchableOpacity onPress={() => this.goToProfile()}>
            <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
              <Icon name={'face'} style={{ color: "#e46c47" }} size={27} />
              <Text style={{ color: "#e46c47", fontSize: 9 }}>Profile</Text>

            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => this.goToProfile()}>
            <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
              <Icon name={'face'} style={{ color: "#848484" }} size={27} />
              <Text style={{ color: "#848484", fontSize: 9 }}>Profile</Text>

            </View>
          </TouchableOpacity>
        }
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  badgeStyle:{
    position:'absolute',
    top:-4,
    right:25,
  }
});

export default Footer;