import React, { Component } from 'react';
import {
  StyleSheet, Button, Dimensions, ScrollView, Image,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


const s = require('../assets/css/style');
const itemWidth = Dimensions.get('window').width;

class Placeorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  componentDidMount() {

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
<Header navigation={this.props.navigation} />
<ScrollView>
   <View style={styles.cart}>
      <View style={{width:"60%"}}>
         <View style={{flexDirection:"row",backgroundColor:'white'}}>
            <View>
               <View style={styles.iconborder}>
                  <Icon
                     name='cart-plus'
                     size={20}
                     color='white'
                     style={styles.btnIcon1}/>
               </View>
            </View>
            <View>
               <View>
                  <Text style={styles.iconText}>My Cart</Text>
               </View>
            </View>
         </View>
      </View>
      <View style={{width:"40%"}}>
         <TouchableOpacity>
            <Text style={[styles.buttonBG,styles.ButtonText]}>PLACE ORDER&nbsp;
            </Text>
         </TouchableOpacity>
      </View>
   </View>
   <View style={{backgroundColor:'white'}}>
      <View style={{flexDirection:'row',paddingBottom:10,paddingLeft:10,paddingTop:5,backgroundColor:"white",borderBottomWidth:1,borderBottomColor:'lightgray',margin:10}}>
         <View style={{width:'40%'}}>
            <Image style={{ width: "80%", height: 80, borderRadius: 5 }}
            source={require('../assets/img/product/2.jpg')} />
         </View>
         <View style={{width:'60%'}}>
            <View>
               <Text style={{fontSize: 15, fontWeight: '700',fontFamily: "Cochin",paddingRight:10,paddingLeft:10}}>Kaima Briyani</Text>
            </View>
            <View style={{flexDirection:'row',paddingLeft:10}}>
               <Text style={{fontSize: 13, fontWeight: '600',fontFamily: "Cochin",paddingRight:10}}>Rs 290</Text>
               <Text style={{fontSize: 13,fontWeight: '600',color:"gray"}}> Rs 371</Text>
            </View>
            <View style={{flexDirection:"row",paddingLeft:10,paddingTop:10}}>
               <View style={{width:'50%'}}>
                  <View style={{flexDirection:"row"}}>
                    <View>
                        <Icon  style={{paddingTop:5}} name='minus' size={10} color='#e46c47'/>
                     </View>
                     <View>
                        <Text style={{paddingLeft:15}}>3</Text>
                     </View>
                     <View style={{paddingLeft:15,paddingTop:5,color:"#e46c47"}}>
                        <Icon  name='plus' size={10} color='#e46c47'/>
                     </View>
                  </View>
               </View>
               <View style={{width:'50%'}}>
                  <Text style={{fontSize: 12, fontWeight: '700',fontFamily: "Cochin"}}>Rs 290</Text>
               </View>
            </View>
            <View style={{flexDirection:"row",alignItems:'flex-end',justifyContent:'flex-end'}}>
               <View style={{width:20}}>
                  <Icon  name='trash' size={15} color='#e46c47'/>
               </View>
               <View style={{width:80}}>
                  <Text style={{fontSize: 12, fontWeight: '600',fontFamily: "Cochin",color:'#e46c47',marginTop:10}}>
                  Remove
                  </Text>
               </View>
            </View>
         </View>
      </View>
      {/* second list copy */}
      <View style={{flexDirection:'row',paddingBottom:10,paddingLeft:20,paddingTop:5,backgroundColor:'white'}}>
         <View style={{width:'40%'}}>
            <Image style={{ width: "80%", height: 80, borderRadius: 5 }}
            source={require('../assets/img/product/4.jpg')} />
         </View>
         <View style={{width:'60%'}}>
            <View>
               <Text style={{fontSize: 15, fontWeight: '700',fontFamily: "Cochin",paddingRight:10,paddingLeft:10}}>Chiken Briyani</Text>
            </View>
            <View style={{flexDirection:'row',paddingLeft:10}}>
               <Text style={{fontSize: 13, fontWeight: '600',fontFamily: "Cochin",paddingRight:10}}>Rs 290</Text>
               <Text style={{fontSize: 13,fontWeight: '600',color:"gray"}}> Rs 390</Text>
            </View>
            <View style={{flexDirection:"row",paddingLeft:10,paddingTop:10}}>
               <View style={{width:'50%'}}>
                  <View style={{flexDirection:"row"}}>
                     <View>
                        <Icon  style={{paddingTop:5}} name='minus' size={10} color='#e46c47'/>
                     </View>
                     <View>
                        <Text style={{paddingLeft:15}}>1</Text>
                     </View>
                     <View style={{paddingLeft:15,paddingTop:5,color:"#e46c47"}}>
                        <Icon  name='plus' size={10} color='#e46c47'/>
                     </View>
                  </View>
               </View>
               <View style={{width:'50%'}}>
                  <Text style={{fontSize: 12, fontWeight: '700',fontFamily: "Cochin"}}>Rs 290</Text>
               </View>
            </View>
            <View style={{flexDirection:"row",alignItems:'flex-end',justifyContent:'flex-end'}}>
               <View style={{width:20}}>
                  <Icon  name='trash' size={15} color='#e46c47'/>
               </View>
               <View style={{width:80}}>
                  <Text style={{fontSize: 12, fontWeight: '600',fontFamily: "Cochin",color:'#e46c47',marginTop:10}}>
                  Remove
                  </Text>
               </View>
            </View>
         </View>
      </View>
   </View>
   <View style={{backgroundColor:'white'}}>
<View style={{flex:1,backgroundColor:'#e5ecf6',height:50,marginLeft:10,marginRight:10}}>

</View>
   </View>
   {/* Bill Details */}
   <View>
      <View style={{flexDirection:'column',backgroundColor:'white'}}>
         <View>
            <Text style={{fontSize:18,fontWeight:'bold',paddingLeft:20,paddingTop:10}}>Bill Details</Text>
            </View>
            <View>
         <View style={{flexDirection:'row',paddingTop:5,paddingLeft:20}}>
            <View style={{width:"60%"}}>
                <Text style={{fontSize:15,fontWeight:'bold'}}>Item Total</Text>
            </View>
            <View style={{width:"40%"}}>
                 <Text style={{fontSize:15,fontWeight:'bold',marginLeft:30}}>Rs.715.00</Text>
            </View>
         </View>
         <View style={{flexDirection:'row',paddingTop:5,paddingLeft:20,margin:0}}>
            <View style={{width:"60%"}}>
      <Text style={{fontSize:15,fontWeight:'bold',color:'#74a1e0',borderBottomWidth:1, borderStyle: 'dtted', borderBottomColor: 'red'}}>Delivery Partner Fee</Text>
      </View>
         
            <View style={{width:"40%"}}>
                 <Text style={{fontSize:15,fontWeight:'bold',marginLeft:30}}>Rs.18.00</Text>
            </View>
         </View>
         {/* <View style={{flexDirection:'row',paddingLeft:20}} >
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
            </View> */}
         </View>
         

         <View style={{flexDirection:'row',width:"100%", paddingLeft:20,paddingTop:10,borderBottomWidth:1,borderBottomColor:'lightgray',paddingBottom:20}}>
            <Text style={{fontSize:16,fontWeight:'500',color:'gray',letterSpacing:0.5}}>This fee goes towards pay your Delivery Partner fairly</Text>
         </View>

      </View>

      <View style={{flexDirection:'row',paddingTop:5,paddingLeft:20,backgroundColor:'white'}}>
            <View style={{width:"100%"}}>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Delivery Details</Text> 
      </View>
         
            
         </View>
         
      <View style={{flexDirection:'row',paddingTop:5,paddingLeft:20,backgroundColor:'white'}}>
            <View style={{width:"60%"}}>
      <Text style={{fontSize:15,fontWeight:'bold',color:'#74a1e0'}}>Taxes And Charges</Text> 
      </View>
         
            <View style={{width:"40%"}}>
                 <Text style={{fontSize:15,fontWeight:'bold',marginLeft:30}}>Rs.62.00</Text>
            </View>
         </View>

         <View style={{flexDirection:'row',paddingLeft:20,paddingBottom:20,backgroundColor:'white',borderBottomWidth:1,borderBottomColor:'lightgray'}} >
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
                <Text style={{width:"2%",borderBottomWidth:2,borderColor:'#74a1e0',paddingRight:10,fontSize:15,marginRight:5,marginLeft:3}}></Text>
            </View>
            
      <View style={{flexDirection:'row',paddingTop:5,paddingLeft:20,backgroundColor:'white'}}>
            <View style={{width:"100%"}}>
       
      </View>
         
            
         </View>
         
      <View style={{flexDirection:'row',paddingTop:5,paddingLeft:20,backgroundColor:'white',paddingBottom:20}}>
            <View style={{width:"60%"}}>
      <Text style={{fontSize:18,fontWeight:'bold',color:'black'}}>To Pay</Text> 
      </View>
         
            <View style={{width:"40%"}}>
                 <Text style={{fontSize:15,fontWeight:'bold',marginLeft:30}}>Rs.780.00</Text>
            </View>
         </View>
         <View style={{backgroundColor:'white'}}>
<View style={{flex:1,backgroundColor:'#e5ecf6',height:50,marginLeft:10,marginRight:10}}>

</View>
   </View>

            </View>


    {/* Almost Details */}
    <View style={{flexDirection:'column',paddingLeft:30,paddingTop:10,backgroundColor:'white'}}>
       <View>
          <Text style={{fontSize:18,fontWeight:'bold'}} >
            Almost There
          </Text>
       </View>
       <View>
          <Text style={{fontSize:12,fontWeight:'bold',color:'gray',backgroundColor:'white',paddingBottom:20}} >
           Login or signup to place your order
          </Text>
       </View>
    </View>
    <View style={{paddingLeft:20,paddingRight:20,backgroundColor:'white'}}>
          <TouchableOpacity>
                        <Text style={[styles.buttonBGcon,styles.ButtonTextcon]}>CONTINUE
                        
                            </Text>     
                            </TouchableOpacity>

          </View>

  
</ScrollView>
<Footer forPage="cart" navigation={this.props.navigation} />
</SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cart:{
    paddingLeft:10,
    paddingTop:20,
    flexDirection:"row",
    backgroundColor:'white',
    borderBottomWidth:1,borderColor:'lightgray',height:70
  },
  iconborder:{
    borderRadius:60,
    width: 30,
    height: 30,
    backgroundColor:'#e46c47',
    alignItems:'center',
    justifyContent:'center',
   
  },
  iconText:{
 fontSize:18,
 fontWeight:'bold',
 letterSpacing:0.5,paddingLeft:10

},
buttonBG: {
  backgroundColor:"#e46c47",
  fontWeight:'700',
  marginTop:0,
  padding:8,marginRight:10,width:120,height:35


},
ButtonText: {
color:'white',
  borderRadius:2,
  fontSize: 12,
  fontWeight:"700",textAlign:'center',
  letterSpacing:1
},  
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

export default Placeorder;