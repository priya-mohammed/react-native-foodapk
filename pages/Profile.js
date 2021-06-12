import React, { Component } from 'react';
import {
  StyleSheet, Button, Dimensions, ScrollView, Image, AsyncStorage,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView, TextInput
} from "react-native";
import Carousel from 'react-native-snap-carousel';    
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import { Right } from 'native-base';
import Modal from 'react-native-modal';
import Api from "../service/api";
import Master from "../service/master";
import { IMAGE_URL } from "../service/config";
import CLoader from '../components/CLoader';

const s = require('../assets/css/style');
const itemWidth = Dimensions.get('window').width;
const SECTIONS = [
  {
    title: 'My Account',
    titledesc: "Addresses,Favourites & Offers",
    content: [
      {
      icon: "home", content: "Manage Address", link: "Address"
    },
    {
      icon: "gratipay", content: "Favourites", link: "Favourites"
    },
    {
      icon: "tags", content: "Offers", link: "Offers"
    },
    {
      icon: "gratipay", content: "My Orders", link: "Orders"
    }
  ]
  },
  {
    title: 'Payments & Refunds',
    titledesc: "Refund status & Payment modes",
    content: [
      {
        icon: "credit-card", content: "Payment Modes", link: "PaymentType"
      }]
  },
  {
    title: 'Help',
    titledesc: "FAQs & Links",
    content: [{
      icon: "phone", content: "+91 0234567891", link: "no"
    },
    {
      icon: "envelope", content: "spicyinfo@gmail.com", link: "no"
    }]
  },

];

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show:false,
      contentLoader:true,
      islogout:false,
      showpay:false,
      activeSections: [],
      userdetails:[],
      username:'',
      usermail:'',
      usermobile:'',
      suppliername:'',
      address:'',
      status:'',
      netamount:'',
      productname:'',
      ordertdate:'',
      categoryid:'',
      productid:""
    }
    this.getCustomerdetails  =  this.getCustomerdetails.bind(this);
    this.getCustomerdetails();
    this.goToPage = this.goToPage.bind(this);
    this.goToOffers  =  this.goToOffers.bind(this);
  }

  goToPage() {
    
    const { navigate } = this.props.navigation;
    navigate('Home')
  }


  goToOffers(page){

    const { navigate } = this.props.navigation;
    navigate(page)
  }

  getCustomerdetails=async ()=> {  
    this.state.customerid = JSON.parse(await AsyncStorage.getItem('customerId'));

    AsyncStorage.getItem('tokenkey', (err, value) => {
      if (err) {

      }else {
        let tokenkey = (JSON.parse(value))
        console.log("getCustomerDetails/"+this.state.customerid )
        Api.get("getCustomerDetails/"+this.state.customerid , {
        }).then((result) => {
         let responseType =  Master.getResponseType(result);
         let responseValue = Master.getResponseValue(result); 
         console.log(responseValue["overViewList"])
         if(responseValue["overViewList"].length > 0){
          this.setState({ userdetails: responseValue["overViewList"][0]}) 
          this.setState({ username: responseValue["overViewList"][0]["customername"]})          
          this.setState({ usermail: responseValue["overViewList"][0]["email"]}) 
          this.setState({ usermobile: responseValue["overViewList"][0]["mobileno"]}) 

          this.setState({ suppliername: responseValue["overViewList"][0]["suppliername"]})          
          this.setState({ address: responseValue["overViewList"][0]["address"]}) 
          this.setState({ status: responseValue["overViewList"][0]["status"]}) 
          this.setState({ netamount: responseValue["overViewList"][0]["netamount"]})

          this.setState({ productname: responseValue["overViewList"][0]["productname"]}) 
          this.setState({ orderdate: responseValue["overViewList"][0]["orderdate"]})

          this.setState({ categoryid: responseValue["overViewList"][0]["categoryid"]}) 
          this.setState({ productid: responseValue["overViewList"][0]["productid"]}) 
         }         
         this.setState({ contentLoader:false})  
         //this.setState({ searchterm: ""}) 
      });
   }
})

  }
 


  logout = async () => {
    this.setState({ islogout: false })
    AsyncStorage.clear();
    const { navigate } = this.props.navigation;
    navigate('MobileLogin');
    }

  openProductmodal = () => {

    this.setState({ isproductDetail: true })
  };

  openLogoutmodal = () => {

    this.setState({ islogout: true })
  };

  closemodal = () => {
    this.setState({ isproductDetail: false })
    this.setState({ islogout: false })
  };


  goToRatings() {
    AsyncStorage.setItem('rateproductid',JSON.stringify(this.state.productid))
    AsyncStorage.setItem('ratecategoryid',JSON.stringify(this.state.categoryid))
    AsyncStorage.setItem('torate',"app")

    const { navigate } = this.props.navigation;
    navigate('Ratings')
  }


  gotoOrders() {
    const { navigate } = this.props.navigation;
    navigate('Orders');
  }
  componentDidMount() {

  }
  showdiv() {
    if (this.state.show) {
      this.setState({ show: false })
    } else {
      this.setState({ show: true })
    }

  }
  showdivpay() {
    if (this.state.showpay) {
      this.setState({ showpay: false })
    } else {
      this.setState({ showpay: true })
    }

  }


  _renderHeader(section, index, isActive, sections) {
    return (

      <View style={{ backgroundColor: "white", flexDirection: "row", paddingTop: 15, paddingBottom: 10, paddingLeft: 20, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}>
        <View style={{ width: "80%" }}>
          <View>

            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{section.title}</Text>
            <Text style={{ fontSize: 14, paddingBottom: 10, color: '#676767 ' }}>{section.titledesc}</Text>
          </View>
        </View>
        <View style={{ width: "20%", alignItems: "center", justifyContent: 'center' }}>
          <View>

            {isActive ?
              <Icon name="chevron-up" size={12} style={{ color: "#676767 " }} />
              :
              <Icon name="chevron-down" size={12} style={{ color: "#676767 " }} />
            }
          </View>

        </View>
      </View>


    );
  }
  goToPage(whichPage) {
    if (whichPage != "no") {
      const { navigate } = this.props.navigation;
      navigate(whichPage)
    }
  }

  _renderContent = (section) => {
    return (


      <View style={{ flexDirection: "column", backgroundColor: 'white', paddingLeft: 20 }}>
        {/* first row start */}

        {
          section.content.map && section.content.map((itemproduct, key) => (

            <View style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 1, }}>
              <View style={{ width: '100%' }}>
                 <TouchableOpacity onPress={() => this.goToOffers(itemproduct.link)} >
                  <View style={{ flexDirection: "row", backgroundColor: 'white' }}>

                    <View>

                      <Icon name={itemproduct.icon} size={15} style={{ color: "black", marginTop: 2, padding: 10 }} />

                    </View>
                    <View style={{ padding: 10 }}>
                      <Text style={{ color: 'black', fontWeight: '500' }}>{itemproduct.content}</Text>
                    </View>

                  </View>
                </TouchableOpacity>
              </View>
            </View>


          ))}
      </View>


    );
  }

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };




  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>

{  this.state.contentLoader ?
          <View >
            <CLoader forLoad="main" ></CLoader>
          </View>

          :
       

        <ScrollView>
           
           
        <View style={{flexDirection: 'row', paddingTop: 15, paddingLeft: 20, backgroundColor: 'white', paddingRight: 10, borderBottomWidth: 2, borderBottomColor: 'black'}}>   
         <View style={{ width: "80%" }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0 }}>{this.state.username}</Text>
              <Text style={{ fontSize: 14, paddingBottom: 20, fontWeight: '800', color: '#676767  ' }}>+91-{this.state.usermobile} {this.state.usermail}</Text>
            </View>
            
          <View style={{ width: "20%" }}>
          <TouchableOpacity onPress={() => { this.openLogoutmodal() }}>
              <Icon name="power-off" size={25} style={{ color: "black", marginTop: 2,textAlign:'center' }} />
              </TouchableOpacity>
            </View>
            </View> 


          <View>
            <Accordion
              sections={SECTIONS}
              activeSections={this.state.activeSections}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
            />
          </View>

          
          { this.state.suppliername ?
            <View>

          <View style={{ backgroundColor: 'white' }}>
            <Text style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 20, fontWeight: 'bold', fontSize: 18 }}>MY ACCOUNT</Text>
          </View>


          <View style={{ backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#F0F1F1', height: 50, alignItems: 'flex-start' }}>
              <Text style={{ paddingLeft: 10, paddingTop: 15, fontSize: 12, fontWeight: '700' }}>PAST ORDER</Text>
            </View>
          </View>
          <View >
            <View style={{ width: "100%", backgroundColor: 'white', paddingLeft: 20, paddingTop: 20 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{this.state.suppliername}</Text>
            </View>


            <View style={{ flexDirection: "row", backgroundColor: 'white' }}>
              <View style={{ width: "60%" }}>
                <View style={styles.textinputCtrleft}>
                  <Text style={{ fontSize: 15, color: '#909192', paddingLeft: 10, textAlign:"justify" }}>{this.state.address}</Text>
                  <Text style={{ fontSize: 15, color: '#909192', paddingTop: 10,
                   paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: "lightgray", paddingLeft: 10 }}>RS.{this.state.netamount} 
                   <Icon name="chevron-right" size={12} style={{ color: "lightgray", marginTop: 2 }} />  </Text>

                </View>
              </View>
              <View style={{ width: "37%", borderBottomWidth: 1, borderBottomColor: "lightgray", marginRight: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.textaddr}>{this.state.status} </Text>
                  {
                    this.state.status == "Payment Pending" ?
                    <Icon name="exclamation-triangle" size={15} style={{ color: "orange", marginTop: 2 }} />
                    :
                    <Icon name="check-circle" size={15} style={{ color: "green", marginTop: 2 }} />
                    }
                  
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "column", backgroundColor: 'white', paddingLeft: 20, paddingTop: 20 }}>
            <Text>{this.state.productname} </Text>
            <Text style={{ fontSize: 12, color: '#909192', paddingBottom: 20 }}>{this.state.orderdate}</Text>
            <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
            
            
              <View style={{ width: '45%', borderWidth: 1, borderColor: '#e46c47', padding: 10, marginRight: 5, marginLeft: 5 }}>
                <TouchableOpacity onPress={() => this.goToRatings()}>
                  <Text style={{ textAlign: 'center', color: '#e46c47', fontWeight: 'bold' }}>Rate App </Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '45%', borderWidth: 1, borderColor: '#e46c47', padding: 10, marginRight: 5, marginLeft: 5 }}>
                <TouchableOpacity onPress={() => this.gotoOrders()}>
                  <Text style={{ textAlign: 'center', color: '#e46c47', fontWeight: 'bold' }}>Rate Order </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
          <View style={{ flexDirection: "column", backgroundColor: 'white', paddingTop: 20 }}>
            <View style={{ padding: 12 }}>

              <Image style={{ width: "100%", height: 200, }}
                source={require('../assets/img/profile-img.jpg')} />
              {/* <View style={{ width: "100%", borderTopWidth: 2, borderColor: 'black', marginTop: 30, paddingLeft: 20 }}>
              <TouchableOpacity onPress={() => this.gotoOrders()}>
                <View style={{ paddingTop: 25, paddingBottom: 30, }}><Text style={{ color: '#e46c47', fontWeight: 'bold', fontSize: 18 }}>VIEW MORE ORDERS</Text></View>
              </TouchableOpacity>
              </View> */}
            </View>

          </View>

          </View>
          :null
          }


          <View style={{ backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#F0F1F1', height: 5 }}>
              <Text style={{ padding: 5 }}></Text>
            </View>
          </View>

          {/* <TouchableOpacity onPress={() => { this.openLogoutmodal() }}>
            <View style={{ flexDirection: "row", paddingLeft: 20, backgroundColor: 'white' }}>
              <View style={{ width: "50%", paddingTop: 10, paddingBottom: 10 }}><Text style={{ fontWeight: 'bold' }}>LOGOUT</Text></View>

              <View style={{ width: "50%", alignItems: 'flex-end', padding: 10 }}><Icon name="power-off" size={20} style={{ color: "black", marginTop: 2 }} /></View>

            </View>
          </TouchableOpacity> */}

          <View style={{ backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#F0F1F1', height: 5 }}>
              <Text style={{ padding: 5 }}></Text>
            </View>
          </View>

          <Modal isVisible={this.state.isproductDetail}
            backdropColor="#111"
            propagateSwipe={true}
            onBackdropPress={() => this.setState({ isproductDetail: false })}
            animationIn="slideInUp"
            animationOut="slideOutDown"

          >
            <View style={{ flexDirection: 'column', backgroundColor: 'white', padding: 20 }}>
              <Text style={s.pmodalText}>Edit Account</Text>
              <Text style={s.pmodalTextSub}>Mobile Number</Text>
              <View style={s.pmodalInput}>
                <TextInput
                  style={s.pmodalTextinput}
                  placeholder="0123456789"
                  keyboardType="numeric"
                />
              </View>
              
              <Text style={s.pmodalTextSub}>Email ID</Text>
              <View style={s.pmodalInput}>
                <TextInput
                  style={s.pmodalTextinput}
                  placeholder="abc@yahoo.com"                 
                />
              </View>
              <View style={s.pmodalInput}>
              <TouchableOpacity onPress={() => this.closemodal()}>
                        <Text style={[s.fullbuttonBGcon,s.fullButtonTextcon]}>CONTINUE
                        
                            </Text>     
                            </TouchableOpacity>
              </View>
            </View>
          </Modal>


  <Modal backdropColor="#00000063" propagateSwipe={true}
         animationIn="slideInDown"  animationOut="slideOutDown"
         onBackdropPress={() => this.setState({ islogout: false })}
         isVisible={this.state.islogout}>
            
      <View style={{ flex: 1 ,alignItems:"center",justifyContent:"center"}}>
        <View style={{backgroundColor: "white", padding: 15, shadowColor: "#000",
                        borderRadius:10,shadowOffset: { width: 0, height: 2, },
                        hadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,}}>
          <View>
            <View>
              <Text style={{fontSize:16,fontWeight:"bold",textAlign:"center"}}>
               LOGOUT :</Text>
            </View>
                                              
          <View style={{paddingVertical:5}}>
            <Text style={{fontSize:16,color:"grey",lineHeight:30}}>
               ARE YOU SURE YOU WANT TO LOGOUT ?
             </Text>
          </View>
                                             
          <View style={{flexDirection:"row",width:"100%",paddingVertical:10}}>
            <TouchableOpacity  onPress={() => this.closemodal()}
              style={{width:"45%",backgroundColor:"#e5e6eb",paddingVertical:8,
               borderRadius:10,marginRight:20}}>                 
                 <View>
                  <Text style={{fontSize:16,fontWeight:"bold",textAlign:"center"}}>No</Text>
                 </View>
            </TouchableOpacity>

            <TouchableOpacity style={{width:"45%",backgroundColor:"#1878f3",paddingVertical:8,
                 borderRadius:10}} onPress={() => this.logout()}>
                  
                  <View>
                  <Text style={{fontSize:16,fontWeight:"bold",color:"white",
                  textAlign:"center"}}>Yes</Text>
                   </View>
            </TouchableOpacity>


            </View>
            </View>
           </View>
           </View>
  </Modal>


        </ScrollView>
       
  }
        <Footer forPage="profile" navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textinputCtr: {
    borderBottomWidth: 2,
    borderBottomColor: "#e2e2e2",
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    paddingTop: 15,
  },
  textinputStyle: {
    paddingBottom: 25,
    paddingLeft: 0,
    fontSize: 16, width: 250
  },
  buttonBG: {

    marginTop: 0,
    padding: 10
  },
  ButtonText: {
    color: '#e46c47',
    borderRadius: 8,
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0,
  },
  textaddr: {

  },
  textinputCtrleft: {
    paddingLeft: 10,
    paddingRight:15,
    textAlign: 'justify'
  }

});

export default Profile;