import React, { Component } from 'react';
import {
  StyleSheet, Button, Dimensions, ScrollView, Image,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const s = require('../assets/css/style');

class PaymentType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  goToOrder() {
    const { navigate } = this.props.navigation;
    navigate('Orders');
  }

  componentDidMount() {

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
        <ScrollView>
        <View style = {s.heading}>
        <View style={{width:"60%"}}>
         <View style={{flexDirection:"row",backgroundColor:'white'}}>
            <View>
               <View style={s.headingIconborder}>
                  <Icon
                     name='credit-card'
                     size={14}
                     color='white'
                    />
               </View>
            </View>
            <View>
               <View>
                  <Text style={s.headingIconText} >PAYMENT TYPES</Text>
               </View>
            </View>
         </View>
      </View>
      </View>
            <TouchableOpacity onPress={() => this.goToOrder()}>
              <View style = {{flex:1, padding: 10, backgroundColor:"white"}}>
                  <Image style={{width: "100%", height: 200}}
                      source={require('../assets/img/payment-type.png')}     />  
              </View> 
             </TouchableOpacity>     
        </ScrollView>
        <Footer forPage="none" navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default PaymentType;