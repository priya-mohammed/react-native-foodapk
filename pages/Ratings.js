import React, { Component } from 'react';
import {StyleSheet, Button, Dimensions, ScrollView, Image,TextInput,
  View,Text,TouchableOpacity,SafeAreaView,AsyncStorage} from "react-native";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Api from "../service/api";
import Master from "../service/master";
import CLoader from '../components/CLoader';
import Modal from 'react-native-modal';

const s = require('../assets/css/style');
const itemWidth = Dimensions.get('window').width;


class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.load()
    this.state = {
      stars:0,
      desc:'',
      show:true,
      contentLoader:true,
      successpopup: false,
      suppliername:'',
      starmsg:'',
      torate:'',
      smileyname:'',
      url:''
    }
    this.updatestar = this.updatestar.bind(this)
  }

  load=async()=>{

    let productid = JSON.parse(await AsyncStorage.getItem('rateproductid'))
    let customerId= JSON.parse(await AsyncStorage.getItem('customerId'));  
    this.setState({suppliername:await AsyncStorage.getItem('ratesuppliername')})

    let torate= await AsyncStorage.getItem('torate'); 
    this.setState({torate:torate})

    if(torate == "app"){
      this.setState({url:"getproductrating/"+customerId+"/"+0})
    }else{
      this.setState({url:"getproductrating/"+customerId+"/"+productid})
    }
    Api.get(this.state.url,{
    }).then((result) => {
      console.log(result)
      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);
       
      if (responseType == 'S') {
       if(responseValue["wishList"].length > 0){
   //f  alert(responseValue["wishList"][0]["desc"])
         this.setState({stars:parseFloat(responseValue["wishList"][0]["startcount"])})
         this.setState({desc:responseValue["wishList"][0]["desc"]})
         this.setState({smileyname:responseValue["wishList"][0]["desc"]})
      //  this.setState({show:false})
        if(this.state.stars < 1){
          this.setState({starmsg:'Very poor'})
        }else if(this.state.stars > 1 && this.state.stars <=2){
          this.setState({starmsg:'Poor'})
        }else if(this.state.stars > 2 && this.state.stars <= 3){
          this.setState({starmsg:'Average'})
        } else if(this.state.stars > 3 && this.state.stars <=4){
          this.setState({starmsg:'Good'})
        } else if(this.state.stars > 4 && this.state.stars <= 5){
          this.setState({starmsg:'Very Good'})
        } 
       }else{
        this.setState({show:true})
       }
      }
      this.setState({ contentLoader:false})  
    })
  }
  componentDidMount() {

  }


  goToTaste = () => {
    this.setState({ smileyname:"Taste"})  
    this.setState({ desc:"Taste"})  
  }

  goToPackage = () => {
    this.setState({ smileyname:"Packaging"})  
    this.setState({ desc:"Packaging"})  
  }

  goToTime = () => {
    this.setState({ smileyname:"Time"})  
    this.setState({ desc:"Time"})  
  }

  closemodal(){
    this.setState({ successpopup:false})
    const { navigate } = this.props.navigation;
    navigate('Profile')

 }

  submitRatings=async()=>{
    
    let productid = JSON.parse(await AsyncStorage.getItem('rateproductid'))
    let customerId= JSON.parse(await AsyncStorage.getItem('customerId'));   
    // let categoryId= JSON.parse(await AsyncStorage.getItem('ratecategoryid')); 
    let orderid= JSON.parse(await AsyncStorage.getItem('orderid')); 
 

    if(this.state.torate == "app"){

     
      let data = {"userid":customerId,"productid":productid,"oprn":"INS",
      "description":this.state.desc,"rating":this.state.stars,"categoryid":0}
       Api.postwithtoken("saveproductratings", data,{
       }).then((result) => {
        // this.load();     
        this.setState({ successpopup:true})
          })        
    }else{    
      let data = {"userid":customerId,"productid":productid,"oprn":"ORD",
      "description":this.state.desc,"rating":this.state.stars,"categoryid":orderid}
       Api.postwithtoken("saveproductratings", data,{
       }).then((result) => {
         // this.load()      
        this.setState({ successpopup:true})         
       })
       }
  
  }

  updatestar=async(val)=>{

 
    this.setState({stars: val}) 

  if(val <= 1){
     this.setState({starmsg:'Very poor'})
   }else if(val > 1 && val <= 2){
     this.setState({starmsg:'Poor'})
   }else if(val > 2 && val <= 3){
     this.setState({starmsg:'Average'})
   } else if(val > 3 && val <= 4){
     this.setState({starmsg:'Good'})
   } else if(val > 4 && val <= 5){
     this.setState({starmsg:'Very Good'})
   } 

  }

  goToProfile =async()=> {
    const { navigate } = this.props.navigation;
    navigate('Profile')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
 <Header navigation={this.props.navigation} />
{  this.state.contentLoader ?
          <View >
            <CLoader forLoad="main" ></CLoader>
          </View>

          :
       
        <ScrollView keyboardShouldPersistTaps={true}>
        <View style={{backgroundColor:'white',borderTopWidth:1,borderColor:'#eee'}}>
        <View style={{flexDirection:'row',paddingTop:15,paddingLeft:10,backgroundColor:'white',paddingRight:10,borderBottomWidth:1,borderBottomColor:'lightgray'}}>
         <View style={{width:"10%"}}>
         <TouchableOpacity onPress={() => this.goToProfile()}>
             <Icon name="arrow-back" size={20} style={{ paddingTop:3,fontWeight:'bold' }}/>
             </TouchableOpacity>
         </View>
         <View style={{width:"70%"}}>
            <Text style={{fontSize:18,fontWeight:'bold',letterSpacing:0}}>{this.state.suppliername}</Text>
            <View style={{flexDirection:'row',paddingBottom:15,backgroundColor:'white'}}>
               <Text style={{fontSize:14,fontWeight:'800',color:'#676767'}}>You have rated   </Text>
             
             
               <Stars
         default={this.state.stars}
         count={5}
         half={true}
         starSize={50} 
         fullStar={<Icon name={'star'} style={[styles.myStarStyledefault]}/>}
         emptyStar={<Icon name={'star-border'} style={[styles.myStarStyledefault, styles.myEmptyStarStyledefault]}/>}
         halfStar={<Icon name={'star-half'} style={[styles.myStarStyledefault]}/>}
         disabled = {true}
       />
            </View>
         </View>
      </View>
      <View style={{alignItems:'center',paddingTop:40,paddingBottom:10}}>
         <Text style={{fontSize:25,fontWeight:'bold',color:'#656565'}}>{this.state.starmsg}</Text>
      </View>

{/* 
        <View style={{alignItems:'center'}}>
          {this.state.show ?
           <Stars
           default={this.state.stars}
           count={5}
           half={true}
           starSize={50} 
           fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
           emptyStar={<Icon name={'star-border'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
           halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
           update={(val)=>{
            this.updatestar(val)
            }}
         />
         :
         <Stars
         default={this.state.stars}
         count={5}
         half={true}
         starSize={50} 
         fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
         emptyStar={<Icon name={'star-border'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
         halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
         disabled = {true}
       />
          }
         
        </View> */}



        
<View style={{alignItems:'center'}}>
        
           <Stars
           default={this.state.stars}
           count={5}
           half={true}
           starSize={50} 
           fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
           emptyStar={<Icon name={'star-border'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
           halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
           update={(val)=>{
            this.updatestar(val)
            }}
         />
     
        
         
        </View>


{this.state.torate == "order" ?
   
   <View style={{flexDirection:'row',paddingLeft:10,paddingBottom:30}}>

   <View style={{width:"30%"}}>
       {this.state.smileyname == "Taste" ?
      <TouchableOpacity>
        <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
          <Icon name={'mood'} style={{ color: "#e46c47" }} size={60} />
          <Text style={{ color: "#e46c47", fontSize: 9 }}>Taste</Text>
        </View>
      </TouchableOpacity>

      :
      <TouchableOpacity onPress={() => this.goToTaste()} >
        <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
          <Icon name={'mood'} style={{ color: "#848484" }} size={60} />
          <Text style={{ color: "#848484", fontSize: 9 }}>Taste</Text>
        </View>
      </TouchableOpacity>
    }
   </View>

   <View style={{width:"30%"}}>
       {this.state.smileyname == "Packaging" ?
      <TouchableOpacity>
        <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
          <Icon name={'local-mall'} style={{ color: "#e46c47" }} size={60} />
          <Text style={{ color: "#e46c47", fontSize: 9 }}>Packaging</Text>
        </View>
      </TouchableOpacity>

      :
      <TouchableOpacity onPress={() => this.goToPackage()} >
        <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
          <Icon name={'local-mall'} style={{ color: "#848484" }} size={60} />
          <Text style={{ color: "#848484", fontSize: 9 }}>Packaging</Text>
        </View>
      </TouchableOpacity>
    }
   </View>


   <View style={{width:"30%"}}>
       {this.state.smileyname == "Time" ?
      <TouchableOpacity>
        <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
          <Icon name={'av-timer'} style={{ color: "#e46c47" }} size={60} />
          <Text style={{ color: "#e46c47", fontSize: 9 }}>Time</Text>
        </View>
      </TouchableOpacity>

      :
      <TouchableOpacity onPress={() => this.goToTime()} >
        <View style={{ marginTop: 6, alignItems: "center", justifyContent: "center" }} >
          <Icon name={'av-timer'} style={{ color: "#848484" }} size={60} />
          <Text style={{ color: "#848484", fontSize: 9 }}>Time</Text>
        </View>
      </TouchableOpacity>
    }
   </View>

  </View>

        : null
         }
      
      
     

{this.state.torate == "order" ?
<View style={{backgroundColor:'white'}}>
       
         <TextInput style={{height:50,marginLeft:10,marginRight:10,fontSize:14,fontWeight:'800',color:'#676767',
         borderBottomWidth:1,borderColor:'lightgray'}} placeholder="Tell us what you liked most"
         onChange={(event) => this.setState({ desc: event.nativeEvent.text })}
         value={this.state.desc} ></TextInput>
       
        
      </View>:null}



   
      {/* {this.state.show ?
      <View>
         <TouchableOpacity onPress={() => this.submitRatings()}>
            <Text style={[styles.buttonBGcon,styles.ButtonTextcon]}>SUBMIT YOUR FEEDBACK
            </Text>
         </TouchableOpacity>
      </View>
      :null
      } */}

 
      <View>
         <TouchableOpacity onPress={() => this.submitRatings()}>
            <Text style={[styles.buttonBGcon,styles.ButtonTextcon]}> SUBMIT FEEDBACK
            </Text>
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
      
   
          <Text style={[s.sucessmsg]}>Thanks for your ratings</Text>
     

          <TouchableOpacity onPress={() => this.closemodal()}>
          <Text style={[s.fullbuttonBGcon,s.fullButtonTextcon]}>close
                        
                        </Text> 
</TouchableOpacity>
</View>
         </View>
      </Modal>

      
        </ScrollView>
  }
        <Footer forPage="none" navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  myStarStyle: {
    color: '#fdc913',
    backgroundColor: 'white',
    textShadowColor: 'rgba(253,201,19,0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    fontSize :50,
    padding:5
  },
  myStarStyledefault: {
    color: '#fdc913',
    backgroundColor: 'white',
    textShadowColor: 'rgba(253,201,19,0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    fontSize :15,
   
  },
  myEmptyStarStyledefault: {
    color: '#eee',
    fontSize :15,
   
  },
  myEmptyStarStyle: {
    color: '#eee',
    fontSize :50,
    padding:5
  },
  buttonBGcon:{
    backgroundColor:"#e46c47",
    margin:15,
    padding:10,
    marginBottom:50,
    marginTop:25
  },
  ButtonTextcon:{
    color:'white',
      borderRadius:8,
      fontSize: 16,
      fontWeight:"700",
      textAlign:'center',
      letterSpacing:0.5,
  },

});

export default Ratings;  
