import React, { Component } from 'react';
import {
  Button, Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlightBase, PermissionsAndroid, AsyncStorage
} from "react-native";
import Api from "../service/api";

class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.load();

    this.state = {

    }
  }
  load = async() => {
    let token = await  AsyncStorage.getItem('tokenkey');
    
    fetch("http://192.168.0.6:8085/herostore/forms/getBannerList", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'tokenkey': token
      }
    })
      .then(response => response.json())
      .then(data => {

    
      })
      .catch(err => alert("error"+err));
  }

  
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text>SAras</Text>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({

});

export default Sample;
