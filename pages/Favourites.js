import React, { Component } from 'react';
import {StyleSheet, Button, Dimensions, ScrollView, Image,Animated,
  View,  Text,  TouchableOpacity, AsyncStorage, SafeAreaView} from "react-native";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Api from "../service/api";
import Master from "../service/master";
import { IMAGE_URL } from "../service/config";
import { Item } from 'native-base';
import CLoader from '../components/CLoader';
const s = require('../assets/css/style');
const itemWidth = Dimensions.get('window').width;

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       favouriteList:[],
       scrollY: new Animated.Value(0),
       contentLoader: false,
       isLoading: false,    
       activeIndex: 0,
       length: 0,
       customerid: 0
    }
    this.loadMoreData  =  this.loadMoreData.bind(this);
    this.getFavourites  =  this.getFavourites.bind(this);
    this.setState({length : 0});   
   // this.getFavourites();
  }


  componentDidMount() {
    this.getFavourites();
  }

  loadMoreData = async()=> {  
   this.state.customerid= JSON.parse(await AsyncStorage.getItem('customerId'));
   let mylist = this.state.favouriteList;
   this.state.isLoading = true;  

   AsyncStorage.getItem('tokenkey', (err, value) => {
     if (err) {
     } else {
       let tokenkey = (JSON.parse(value))
       Api.get("gethomewishlist/"+this.state.customerid+'/'+this.state.length, tokenkey, {
    }).then((result) => {
   
     let responseType = Master.getResponseType(result);
     let responseValue = Master.getResponseValue(result);  

     let data = responseValue;
     let i = 0;

    // this.setState({ favouriteList: responseValue}) 
     
     this.state.length= this.state.length + responseValue.length;
     this.setState({ length: this.state.length + responseValue.length})

     if(data.length > 0){
      for(i=0;i<data.length;i++){
        mylist.push(data[i]);
      }
    }
   this.setState({favouriteList : mylist});    
   this.setState({ isLoading: false });

    })
  }  
  });


  }

  getFavourites =async() =>{
   this.state.customerid= JSON.parse(await AsyncStorage.getItem('customerId'));
         
    AsyncStorage.getItem('tokenkey', (err, value) => {
      if (err) {
      } else {
        let tokenkey = (JSON.parse(value))
        Api.get("gethomewishlist/"+this.state.customerid+'/'+this.state.length, tokenkey, {
     }).then((result) => {
    
      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);  
      this.setState({ favouriteList: responseValue}) 
      
      this.state.length= this.state.length + responseValue.length;
      this.setState({ length: this.state.length + responseValue.length})

     })
   }  
   });


}

gotoItemListpage = (categoryid, supplierid) => {
   AsyncStorage.setItem("categoryid", categoryid + '');
   AsyncStorage.setItem("supplierid", supplierid + '');

   const { navigate } = this.props.navigation;
   navigate('ItemListing')
 }


isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
   const paddingToBottom = 20
   return layoutMeasurement.height + contentOffset.y >=
     contentSize.height - paddingToBottom
 }



  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={this.props.navigation} />

      { this.state.contentLoader ?
          <View >
            <CLoader forLoad="main" ></CLoader>
          </View>

          :

      <ScrollView

scrollEventThrottle={16}
onScroll={Animated.event(
  [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } },

  ],
  {
    listener: event => {
      if (this.isCloseToBottom(event.nativeEvent)) {
        this.loadMoreData();
      }
    }
  },
  { useNativeDriver: true }
)}

>
        <View style = {s.heading}>
        <View style={{width:"60%"}}>
         <View style={{flexDirection:"row",backgroundColor:'white'}}>
            <View>
               <View style={s.headingIconborder}>
                  <Icon name='heart' size={14}  color='white' />
               </View>
            </View>
            <View>
               <View>
                  <Text style={s.headingIconText} >YOUR FAVOURITES</Text>
               </View>
            </View>
         </View>
      </View>
      </View>


 <View style={{backgroundColor:'white'}}>
           
    <View>
         {
         this.state.favouriteList.map && this.state.favouriteList.map((item, key) => (
         
      <View >       
       
       { item.productList != "" && item.productList.length > 0 ? 
        
        <View >
           <Text style={{fontSize: 18, fontWeight: '700', fontFamily: "Cochin",
           paddingLeft:10,paddingBottom:10,color:'#e46c47'}}>{item.suppliername}</Text>
        </View>:null }


   <View >
              {
              item.productList.map && item.productList.map((itemproduct, key) => (
   <TouchableOpacity onPress={() => { this.gotoItemListpage(itemproduct.categoryid,itemproduct.supplierid) }}>
         <View style={{flexDirection:'row',paddingBottom:20,paddingTop:10}}>
               <View style={{width:'30%',paddingLeft:10}}>           
                  <View>
                     <Image style={{ width: "100%", height: 80, borderRadius: 5, }}
                    source={{
                     uri: IMAGE_URL + itemproduct.image
                   }} />
                  </View>
             
               </View>

            <View style={{width:'70%'}}>
              
                  <View style={{flexDirection:'column',paddingLeft:10}}>
                    <View>
                     <Text style={{fontSize: 13, fontWeight: '700',fontFamily: "Cochin",paddingRight:10}}>{itemproduct.productname}</Text>
                     </View>
                     <View>
                     <Text style={{fontSize: 13,fontWeight: '600',color:'#676767'}}>{itemproduct.usage}</Text>
                    </View> 
                  </View>
                  <View>
                     <Text style={{lineHeight:20,fontSize: 13, fontWeight: 'bold',fontFamily: "Cochin",paddingLeft:10,color: 'rgb(156, 156, 156)'}}>{itemproduct.emailid}</Text>
                  </View>
            </View>
           
            </View>

            </TouchableOpacity>
             ))}
    </View>
    </View>
            ))}



          



            </View>

        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
        {this.state.isLoading &&   <Image style={{ width: 100, height: 80 }}
                source={require('../assets/img/logo-gif.gif')} /> }
      </View>

        </ScrollView>}
        <Footer forPage="none" navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default Favourites;