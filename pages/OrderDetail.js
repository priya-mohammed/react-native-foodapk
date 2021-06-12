import React, { Component } from 'react';
import {StyleSheet, Button, Dimensions, ScrollView, Image,Animated,
  View,  Text,  TouchableOpacity, AsyncStorage, SafeAreaView} from "react-native";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Api from "../service/api";
import Master from "../service/master";
import { IMAGE_URL } from "../service/config";
import CLoader from '../components/CLoader';
import { Item } from 'native-base';

const s = require('../assets/css/style');
class OrderDetail extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = {
      orderDetailList:[],
      orderamountList:[],
      orderCustomerList:[],
      scrollY: new Animated.Value(0),
      contentLoader: true,
      isLoading: false,    
      activeIndex: 0,
      length: 0,
      customerid: 0,
      orderid: 0,
      ordercode:"",
      orderstatus:"",
      orderdate:"",
      suppliername:"",
      supplieraddress:"",
      custaddress:"",
      taxamount:0,
      deliveryfee:0,
      netamount:0,
      subtotal:0,
      customername:"",
      discount:0,
    }
    this.getorderdetailsList  =  this.getorderdetailsList.bind(this);
    this.setState({length : 0});   
    this.getorderdetailsList();
  }

  goToRatings = async(productid,categoryid)=> {

    AsyncStorage.setItem('rateproductid',JSON.stringify(productid))
    AsyncStorage.setItem('ratecategoryid',JSON.stringify(categoryid))
    AsyncStorage.setItem('orderid',JSON.stringify(this.state.orderid))
    AsyncStorage.setItem('torate',"order")
    const { navigate } = this.props.navigation;
    navigate('Ratings')

  }

  getorderdetailsList =async() =>{
    this.state.orderid= await AsyncStorage.getItem('orderid');
         
    AsyncStorage.getItem('tokenkey', (err, value) => {
      if (err) {
      } else {
        let tokenkey = (JSON.parse(value))
        Api.get("getMyorderdtailsList/"+this.state.orderid, tokenkey, {
     }).then((result) => {
    
      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);
      
      this.setState({ orderamountList: responseValue["orderamountList"][0]}) 
      this.setState({ orderDetailList: responseValue["orderdetailsList"]}) 
      
      this.setState({ orderid:this.state.orderamountList["orderid"]})
      this.setState({ ordercode:this.state.orderamountList["ordercode"]})
      this.setState({ orderstatus:this.state.orderamountList["posstatus"]})  
      this.setState({ orderdate:this.state.orderamountList["orderdate"]})
      this.setState({ suppliername:this.state.orderamountList["suppliername"]})
      this.setState({ deliveryfee:this.state.orderamountList["deliveryfee"]})
      this.setState({ taxamount:this.state.orderamountList["taxamount"]})  
      this.setState({ netamount:this.state.orderamountList["netamount"]})
      this.setState({ subtotal:this.state.orderamountList["subtotal"]})
      this.setState({ supplieraddress:this.state.orderamountList["supplieraddress"]})
      this.setState({ custaddress:this.state.orderamountList["custaddress"]})

      this.setState({ length:this.state.orderDetailList.length})
      this.setState({ contentLoader: false})
      this.setState({ customername:this.state.orderamountList["customername"]})
      this.setState({ discount:this.state.orderamountList["discount"]})
     })
   }  
   }); 

  }

  componentDidMount() {

  }

  reload(){
    const { navigate } = this.props.navigation;
    navigate('Orders')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
     
     
        { this.state.contentLoader ?
          <View >
            <CLoader forLoad="item" ></CLoader>
          </View>

          :

      <ScrollView>

        <View style={{backgroundColor:'white'}}>
          <View>
          <TouchableOpacity onPress={() => { this.reload() }}>
          <View style={{flexDirection:'row',paddingTop:15,paddingLeft:5,backgroundColor:'white',paddingRight:10,borderBottomWidth:2,borderBottomColor:'black'}}>
        
          <View style={{width:"10%",paddingLeft:10,paddingTop:3}}>
          <Icon name="chevron-left" size={20} style={{ paddingTop:3,
            fontWeight:'bold', color:"#545454" }}/>
         </View>

    <View style={{width:"70%"}}>
      <Text style={{fontSize:18,fontWeight:'bold',textTransform: 'uppercase',
                letterSpacing:0}}>#{this.state.ordercode}</Text> 
      <Text style={{fontSize:14,paddingBottom:20,fontWeight:'800',color:'#676767' }}>
                Delivered | {this.state.length} Item For Rs. {this.state.netamount}</Text> 
    </View>           
          
    </View>
    </TouchableOpacity>

          </View>


          <View>
          <View style={{flexDirection:'row',paddingLeft:18,paddingBottom:25,paddingTop:20}}>
            <View style={{width:'15%'}}>
            <Icon name='map-marker' size={20} style={styles.btnIcon} />
            </View>
            <View style={{width:'85%',alignItems:'flex-start',justifyContent:'flex-start'}}>
                <Text style={{fontWeight:'bold',fontSize:18,}}>{this.state.suppliername}</Text>
                <Text style={styles.txtaddrs}>{this.state.supplieraddress}</Text>
           
            </View>
          </View>
          <View style={{flexDirection:'row',paddingLeft:18}}>
            <View style={{width:'15%'}}>
            <Icon  name='home' size={20} style={styles.btnIcon} />
            </View>
            <View style={{width:'85%',alignItems:'flex-start',justifyContent:'flex-start',borderBottomWidth:1,borderColor:'lightgray'}}>
                <Text style={{fontWeight:'bold',fontSize:18,}}>Home</Text>
                <Text style={styles.txtaddrs1}>{this.state.custaddress}</Text>
           
            </View>
          </View>
          <View style={{flexDirection:'row',paddingLeft:18,paddingTop:15}}>
            <View style={{width:'15%'}}>
            <Icon name='check' size={20} style={styles.btnIcon1} />
            </View>
            <View style={{width:'85%',alignItems:'flex-start',justifyContent:'flex-start'}}>
                <Text style={{  fontWeight:'500', fontSize:14,  color:'#676767',paddingBottom:20}}>
                  {this.state.orderstatus}  by {this.state.customername}</Text>
                </View>
                </View>
             
           
        
       
          </View>
          <View style={{backgroundColor:'white'}}>
          <View style={{backgroundColor:'#F0F1F1',height:30,alignItems:'flex-start'}}>
       <Text style={{paddingLeft:15,paddingTop:8,fontSize:12,fontWeight:'700'}}>BILL DETAILS</Text>
     </View>  
          </View>


          <View>
          {
         this.state.orderDetailList.map && this.state.orderDetailList.map((item, key) => (         
          
  <View style={{flexDirection:'row',paddingBottom:15,paddingTop:15,
    paddingLeft:15,backgroundColor:'white'}}>
      <View style={{width:"60%"}}>   
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:15,color:'#676767'}}>
                {item.productname} </Text> 

               <Text style={{fontSize:15,color:'#676767'}}>
               [ Rs {item.productrate} * {item.qty} ]</Text> 
      </View>
      </View>   

      <View style={{width:"40%", flexDirection: "column"}}>
                 <Text style={{fontSize:15,marginLeft:30, textAlign:'right', 
                 paddingRight:15,color:'#676767'}}>-  Rs. {item.subtotal}</Text>
              <View>

              {/* {this.state.orderstatus != "Payment Pending" ? 
              <TouchableOpacity onPress={() => this.goToRatings(item.product_id,item.categoryid)}>
                        <Text style={[s.exdel1]}>Rate Food</Text>
                    </TouchableOpacity>:null} */}

<TouchableOpacity onPress={() => this.goToRatings(item.product_id,item.categoryid)}>
                        <Text style={[s.exdel1]}>Rate Food</Text>
                    </TouchableOpacity>
                </View>
      </View>
  </View>
         ))}



      <View style={{flexDirection:'row',paddingTop:10,paddingLeft:15,backgroundColor:'white',borderTopWidth:1,borderColor:'lightgray'}}>
            <View style={{width:"60%"}}>
      <Text style={{fontSize:15,color:'#676767'}}>Item Total</Text> 
      </View>
         
            <View style={{width:"40%"}}>
                 <Text style={{fontSize:15,marginLeft:30, textAlign:'right', paddingRight:15,color:'#676767'}}>Rs.{this.state.subtotal}</Text>
            </View>
         </View>
       
         {this.state.discount > 0 ?
         <View style={{flexDirection:'row',paddingTop:10,paddingLeft:15,backgroundColor:'white',borderTopWidth:1,borderColor:'lightgray'}}>
								<View style={{width:"60%"}}>
						  <Text style={{fontSize:15,color:'#676767'}}>Discount</Text> 
						  </View>
							 
								<View style={{width:"40%"}}>
									 <Text style={{fontSize:15,marginLeft:30, textAlign:'right', paddingRight:15,color:'#676767'}}>Rs.{this.state.discount}</Text>
								</View>
							 </View>:null}

         <View style={{flexDirection:'row',paddingTop:5,paddingLeft:15,margin:0}}>
            <View style={{width:"60%"}}>
      <Text style={{fontSize:15,color:'#676767'}}>Order Packing charges</Text>
     
      </View>
         
            <View style={{width:"40%"}}>
                 <Text style={{fontSize:15,marginLeft:30, textAlign:'right', paddingRight:15,color:'#676767'}}>Rs.0</Text>
            </View>
         </View>
         <View style={{flexDirection:'row',paddingTop:5,paddingLeft:15,margin:0}}>
            <View style={{width:"60%"}}>
      <Text style={{fontSize:15,color:'#676767'}}>
        Delivery  fee</Text>
     
      </View>
         
            <View style={{width:"40%"}}>
                 <Text style={{fontSize:15,marginLeft:30, textAlign:'right', paddingRight:15,color:'#676767'}}>Rs.{this.state.deliveryfee}</Text>
            </View>
         </View>
         <View style={{flexDirection:'row',paddingTop:5,paddingLeft:15,margin:0,paddingBottom:12}}>
            <View style={{width:"60%"}}>
      <Text style={{fontSize:15,color:'#676767'}}>Tax (18%)</Text>
     
      </View>
         
            <View style={{width:"40%"}}>
                 <Text style={{fontSize:15,marginLeft:10, textAlign:'right', paddingRight:15,color:'#676767'}}>Rs.{this.state.taxamount}</Text>
            </View>
         </View>
      <View style={{flexDirection:'row',paddingLeft:15,paddingTop:10, paddingBottom:50,borderTopWidth:1,borderColor:'lightgray'}}> 
      <View style={{width:"30%"}}>
      <Text style={{fontSize:15,color:'#676767',fontWeight:'bold'}}>Paid Via Cash</Text>
      </View>
      <View style={{width:"70%"}}>
            <Text style={{fontSize:15,fontWeight:'bold',marginLeft:10, textAlign:'right', paddingRight:15,color:'#676767'}}>Bill Total     Rs.{this.state.netamount}</Text>
    </View>
      </View>
            </View>
            
            </View >
     

        

   
        </ScrollView> }
        <Footer forPage="none" navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttonBG: {
    marginTop:0,
    padding:10
},
ButtonText: {
color:'#e46c47',
    borderRadius:8,
    fontSize: 17,
    fontWeight:"bold",
    letterSpacing:0,
},  
btnIcon:{
  alignItems:'flex-end',
  justifyContent:'flex-end',paddingTop:5
},
btnIcon1:{
  alignItems:'flex-end',
  justifyContent:'flex-end',paddingTop:5,color:'green'
},
txtaddrs:{
  fontWeight:'500',
  fontSize:14,
  color:'#676767',

},
txtaddrs1:{
  fontWeight:'500',
  fontSize:14,
  color:'#676767',
paddingBottom:15
},
});

export default OrderDetail;