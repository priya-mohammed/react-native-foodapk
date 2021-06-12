import React, { Component } from 'react';
import {
  StyleSheet, Button, Dimensions, ScrollView, Image,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,AsyncStorage
} from "react-native";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Modal from 'react-native-modal';
import Api from "../service/api";
import Master from "../service/master";
const s = require('../assets/css/style');

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.load()
    this.state = {
      isConfirmDel : false,
      addresslist:[],
      addressid:'',
      name:''
    }
  }

  goToaddLocation=async()=> {
    AsyncStorage.setItem('addoprn',  'INS');
    const { navigate } = this.props.navigation;
    navigate('Changelocation')
  }


  goToeditLocation=async(addressid,latitude,longitude,head)=> {
    AsyncStorage.setItem('addoprn',  'UPD');
    AsyncStorage.setItem('editAddId',  addressid);
    AsyncStorage.setItem('editlatitude',  latitude);
    AsyncStorage.setItem('editlongitude',  longitude);
    AsyncStorage.setItem('addhead',  head);
  
    
    const { navigate } = this.props.navigation;
    navigate('Changelocation')
  }

  componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
this.load();
    });
  }
  load=async()=>{
    let customerId= JSON.parse(await AsyncStorage.getItem('customerId'));
    let customername = await AsyncStorage.getItem('customerName');
    this.setState({name:customername})
    AsyncStorage.getItem('tokenkey', (err, value) => {
      if (err) {
      } else {
        let tokenkey = (JSON.parse(value))
       
     
        Api.get("getportalcustomeraddresslist/"+customerId, {
        }).then((result) => {

          let responseType = Master.getResponseType(result);
          let responseValue = Master.getResponseValue(result);

          if (responseType == 'S') {
            console.log(responseValue["customeraddressList"])
            this.setState({addresslist:responseValue["customeraddressList"]})
          }

        })
      }
    })
  }
  ConfirmDel = (addressid) => {
    this.setState({addressid:addressid})
    this.setState({ isConfirmDel: true })
  };
  closemodal = () => {
    this.setState({ isConfirmDel: false })
 };


 deleteAddress= async() => {
  let data={"caid":this.state.addressid,"oprn":"DEL",
  "customerid":JSON.parse(await AsyncStorage.getItem('customerId')) }

  console.log(data)
  Api.postwithtoken("saveportalcustomeraddress",data , {
  }).then((result) => {

    let responseType = Master.getResponseType(result);
    let responseValue = Master.getResponseValue(result);

    if (responseType == 'S') {
      this.setState({ isConfirmDel: false })
      this.load()
    }else{
      this.setState({ isConfirmDel: false })
      alert("Address cannot be deleted")
    }

  })
 
};
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
                     name='street-view'
                     size={15}
                     color='white'
                    />
               </View>
            </View>
            <View>
               <View>
                  <Text style={s.headingIconText} >MANAGE ADDRESS</Text>
               </View>
            </View>
         </View>
      </View>
      </View>
         
          <View  style={{flexDirection:'row',backgroundColor:'white'}}>
          <View style={{backgroundColor:'#F0F1F1',height:35,marginBottom:10,width:'100%',paddingTop:5,paddingBottom:8}}>
       <Text style={{color:'#676767',paddingLeft:10,paddingTop:5,fontWeight:'bold',fontSize:12,letterSpacing:0.5}}>SAVED ADDRESS</Text>
     </View>
     </View>
     <View style={{padding:10,backgroundColor:'white'}}>
          {/* <View style={{flexDirection:'row',paddingLeft:18,borderBottomWidth:1,borderColor:'lightgray'}}>
            <View style={{width:'15%'}}>
            <Icon
                     name='map-marker'
                     size={20}
                     style={styles.btnIcon}
                     />
            </View>
            <View style={{width:'85%',alignItems:'flex-start',justifyContent:'flex-start'}}>
                <Text style={{fontWeight:'bold',fontSize:18,}}>Other</Text>
                <Text style={styles.txtaddrs}>Vadasery,vadasery,putheri,TamilNadu,629001,India</Text>
                <View style={{flexDirection:'row',marginTop:10,marginBottom:20}}>
    <View style={{marginRight:20}}>
    <TouchableOpacity onPress={() => this.goToCurrentLocation()} >
            <Text style={{textAlign:'center',color:'#e46c47',fontWeight:'bold'}}>EDIT </Text>
         </TouchableOpacity>
    </View>
    <View style={{padding:0}}>
          <TouchableOpacity onPress={() => { this.ConfirmDel() }}>
            <Text style={{textAlign:'center',color:'#e46c47',fontWeight:'bold'}} >DELETE</Text>
         </TouchableOpacity>
    </View>
      </View>
            </View>
          </View> */}
          {
              this.state.addresslist.map && this.state.addresslist.map((item, key) => (
          <View style={{flexDirection:'row',paddingTop:20,paddingLeft:18, borderBottomWidth:1, borderBottomColor:"#eee"}}>
            <View style={{width:'15%'}}>
            <Icon
                     name='home'
                     size={20}
                     style={styles.btnIcon}
                     />
            </View>
            <View style={{width:'85%',alignItems:'flex-start',justifyContent:'flex-start'}}>
                <Text style={{fontWeight:'bold',fontSize:18,paddingTop:5}}>{item.firstname}</Text>
                <View style={{flexDirection:'row',width:'70%'}}> 
                
                <Text style={styles.txtaddrs}>{item.address1}</Text>
               
                
                </View>
                <View style={{flexDirection:'row',marginTop:10, marginBottom:10}}>
    <View style={{marginRight:20}}>
    <TouchableOpacity onPress={() => this.goToeditLocation(item.addressid,item.latitude,
      item.longitude,item.firstname)} >
            <Text style={{textAlign:'center',color:'#e46c47',fontWeight:'bold'}}>EDIT </Text>
         </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={() => { this.ConfirmDel(item.addressid) }}>
    <View style={{padding:0}}>
            <Text style={{textAlign:'center',color:'#e46c47',fontWeight:'bold'}} >DELETE</Text>
    </View>
    </TouchableOpacity>
      </View>
            </View>
          </View>
              ))}

          <View>
          <View>
          <TouchableOpacity onPress={() => this.goToaddLocation()} >
                   <Text style={[styles.buttonBGcon,styles.ButtonTextcon]}>ADD NEW ADDRESS
                   
                       </Text>     
                       </TouchableOpacity>
               </View>
         </View>
        </View>
        </ScrollView>
        <Footer forPage="none" navigation={this.props.navigation} />

        <Modal backdropColor="#00000063" propagateSwipe={true}
           animationIn="slideInDown"
           animationOut="slideOutDown"
         onBackdropPress={() => this.setState({ isConfirmDel: false })}
          isVisible={this.state.isConfirmDel}>
            
                                        <View style={{ flex: 1 ,alignItems:"center",justifyContent:"center"}}>
                                          <View style={{backgroundColor: "white", padding: 15, shadowColor: "#000",
                                          borderRadius:10,shadowOffset: { width: 0, height: 2, },
                                           shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,}}>
                                            <View>
                                              <View>
                                                <Text style={{fontSize:16,fontWeight:"bold",textAlign:"center"}}>
                                                NOTIFICATION :</Text>
                                              </View>
                                              <View style={{paddingVertical:5}}>
                                                <Text style={{fontSize:16,color:"grey",lineHeight:30}}>
                                                    Are You Relly want to remove the address ?
                                                </Text>
                                              </View>
                                              <View style={{flexDirection:"row",width:"100%",paddingVertical:10}}>
                                              <TouchableOpacity onPress={() => this.closemodal()}
                                              style={{width:"45%",backgroundColor:"#e5e6eb",paddingVertical:8,
                                              borderRadius:10,marginRight:20}}> 
                                                <View>
                                                    <Text style={{fontSize:16,fontWeight:"bold",
                                                  textAlign:"center"}}>No
                                                    </Text>
                                                </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => this.deleteAddress()}
                                                 style={{width:"45%",backgroundColor:"#e46c47",paddingVertical:8,
                                              borderRadius:10}}>
                                                <View>
                                                    <Text style={{fontSize:16,fontWeight:"bold",color:"white",
                                                  textAlign:"center"}}>Yes
                                                    </Text>
                                                </View>
                                                </TouchableOpacity>


                                              </View>
                                            </View>
                                          </View>
                                        </View>
                                      </Modal>


      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  txtaddrs:{
    fontWeight:'500',
    fontSize:14,
  letterSpacing:0.3,
    paddingTop:5,color:'#676767'

  },
  btnIcon:{
    alignItems:'flex-end',
    justifyContent:'flex-end',paddingTop:5
  },
  buttonBGcon:{
    backgroundColor:"white",
marginTop:35,
    padding:10,
   marginBottom:20,
    borderWidth:1.5,borderColor:'green',

  },
  ButtonTextcon:{
    color:'green',
     
      borderColor:'green',
      fontSize: 16,
      fontWeight:"bold",
      textAlign:'center',
    
  },
});

export default Address;