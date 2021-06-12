import React, { Component } from 'react';
import {
  StyleSheet, Button, Dimensions, ScrollView, Image,
  View,AsyncStorage,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Api from "../service/api";
import Master from "../service/master";
import { IMAGE_URL } from "../service/config";
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';
import CLoader from '../components/CLoader';
import * as Animatable from 'react-native-animatable';
const s = require('../assets/css/style');
const itemWidth = Dimensions.get('window').width;

class Cart extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       ...this.state,
       tinnumber: '',
       check: false,
       checked: false,      
       deliveryfee: 50,
       taxfee: 0,
       netamount: 0,
       subtotal: 0,
       customerid:0,
       localqty: 0,
       addressid: 0,
       taxpercent: 18,
       contentLoader:true,
       couponpercent: 0,
       couponamount: 0,
       productid: 0,
       defaultcoupon:"",
       couponcode:"",
       fulladdress:"",
       islogout:false,
       modalmsg:"",
       localproductsubprice: 0,   
       cartproductlist: [] ,
       addressList: [] ,
       couponList: [] , 
       isSelectAddress: false,
       show: true,
       successpopup: false,
       openremovemodal: false,
       placeorder_data: {
         "customerid":  0, "grandtotal": 0,
         "totaltaxamount": 0, "discount": 0, "netamount": 0, 
         "paidamount": 0, "currencysymbol": "0", "oprn": "", 
         "storeid": 2, 
         "deliveryaddressid": 0,
          "shippingcost": 0,"shippingtype": 1, 
          "cgst": "1", "sgst": "1", "orderlist": ""
         }
     }
     this.loadcart = this.loadcart.bind(this);
     this.setChecked = this.setChecked.bind(this);
     this.increaseQty = this.increaseQty.bind(this);
     this.reduceQty = this.reduceQty.bind(this);
     this.removecustomerProducts = this.removecustomerProducts.bind(this);
     AsyncStorage.setItem("fromCart",0);
 //   this.loadcart();
   }


   
   getportalcustomeraddresslist = async () =>  {
      this.state.customerid = JSON.parse(await AsyncStorage.getItem('customerId'));    

      Api.get("getportalcustomeraddresslist/"+this.state.customerid, {
      }).then((result) => {
       let responseType =  Master.getResponseType(result);  
       let responseValue = Master.getResponseValue(result); 

       this.setState({ addressList: responseValue["customeraddressList"]})  
       this.setState({ fulladdress: responseValue["customeraddressList"][0]["fulladdress"]}) 
       this.setState({ addressid: responseValue["customeraddressList"][0]["addressid"]})

   

       if(responseValue["couponList"].length > 0){
         this.setState({ couponList: responseValue["couponList"]}) 
         this.setState({ couponpercent: responseValue["discpercent"]}) 
         this.setState({ couponcode: responseValue["couponcode"]}) 
       
       }else{ }  
     
        });

        this.loadcart(); 
       } 

 

       openAddressmodal() {
         this.setState({ isSelectAddress: true })
      }
       
   loadcart= async() => {
      this.setState({ subtotal: 0}) 
      this.setState({ netamount:0}) 
      
      this.state.customerid = JSON.parse(await AsyncStorage.getItem('customerId'));
      this.state.defaultcoupon = await AsyncStorage.getItem('defaultcoupon');
      this.state.couponpercent = await AsyncStorage.getItem('coupondisc');

         Api.get("getaddcartprocutlist/"+this.state.customerid, {
         }).then((result) => {
          let responseType =  Master.getResponseType(result);  
          let responseValue = Master.getResponseValue(result);
          this.setState({ cartproductlist: responseValue["cartproductlist"]}) 
         
          for(let i =0;i<this.state.cartproductlist.length;i++){
           
            this.setState({ subtotal: this.state.subtotal+this.state.cartproductlist[i]["productsubprice"]}) 
          }

          this.state.taxfee =  this.state.taxpercent *  this.state.subtotal /100;
          this.setState({ taxfee: this.state.taxfee})
          
           if(this.state.couponpercent > 0){
           this.state.couponamount =  this.state.couponpercent *  this.state.subtotal /100;
           this.setState({ couponamount: this.state.couponamount})
          
           this.setState({ netamount:this.state.netamount + this.state.taxfee + 
            this.state.deliveryfee + this.state.subtotal -  this.state.couponamount }) 

          }else{
            this.setState({ netamount:this.state.netamount + this.state.taxfee + 
               this.state.deliveryfee + this.state.subtotal }) 
          }

             
          
          if(this.state.cartproductlist.length == 0){
              
               this.setState({ check:true})   
               this.setState({ show:false})   
               this.setState({ contentLoader:false})          
          }else{
             
               this.setState({ check:false})   
               this.setState({ show:true})  
               this.setState({ contentLoader:false})                 
              }
       });

    

   
   //  this.getportalcustomeraddresslist();
      }


      openremovemodal(list){
         this.state.productid =  list.productid;
         this.setState({ openremovemodal:true})
      }

      close = () => {
         this.setState({ openremovemodal: false })   
          
       };

      removeFromCart(){ 
         this.setState({ openremovemodal: false }) 
          Api.postwithtoken('addproductcart', {            
             "userid":this.state.customerid,
             "productid": this.state.productid,
             "oprn": "DEL" 
           }).then((result) => {
        
         let responseType = Master.getResponseType(result);
         let responseValue = Master.getResponseValue(result);  
        // console.log(responseValue)
             if(responseType == "S"){
                this.loadcart();
             }         
       })
}


removecustomerProducts(){ 

   Api.postwithtoken('addproductcart', {            
      "userid":this.state.customerid,    
      "productid": 0,"supplierid": 0,"batchid":0,
      "oprn": "DEL_CUSTOMER_PRODUCT" 
    }).then((result) => {
  
  let responseType = Master.getResponseType(result);
  let responseValue = Master.getResponseValue(result);   

     
   })
   }  


  

      increaseQty = (item,key) => {  

         this.setState({ netamount:0})
         this.setState({ taxfee:0})      
         this.setState({ localproductsubprice:0})   

         this.state.localqty = parseInt(this.state.cartproductlist[key].qty) + 1;   
         this.state.cartproductlist[key].qty = parseInt(this.state.localqty);

         this.setState({ localproductsubprice:this.state.localqty * this.state.cartproductlist[key].pricewithcoupon }) 
         this.state.cartproductlist[key].productsubprice = this.state.localqty * this.state.cartproductlist[key].pricewithcoupon;
     
        if(this.state.couponpercent > 0){ 

         this.setState({ subtotal:parseFloat(this.state.subtotal) +  parseFloat(item.pricewithcoupon) });
        
           this.state.couponamount =  this.state.couponpercent *  (parseFloat(this.state.subtotal) +  parseFloat(item.pricewithcoupon)) /100;
           this.setState({ couponamount: this.state.couponamount})

         this.state.taxfee =  (this.state.taxpercent/100) * (parseFloat(this.state.subtotal) +  parseFloat(item.pricewithcoupon));
         this.setState({ taxfee: this.state.taxfee})

         this.setState({ netamount :parseFloat(this.state.subtotal)+ 
             parseFloat(item.pricewithcoupon) - 
             this.state.couponamount + parseFloat(this.state.taxfee) +
             parseFloat(this.state.deliveryfee)}) ; 

        }else{
         this.setState({ subtotal:parseFloat(this.state.subtotal) +  parseFloat(item.pricewithcoupon) });

         this.state.taxfee =  (this.state.taxpercent/100) * (parseFloat(this.state.subtotal) +  parseFloat(item.pricewithcoupon));
         this.setState({ taxfee: this.state.taxfee})

         this.setState({ netamount :parseFloat(this.state.subtotal)  +  parseFloat(item.pricewithcoupon) +
         parseFloat(this.state.taxfee) + parseFloat(this.state.deliveryfee)
            }) ; 
        }
            
      

          this.setState({ cartproductlist: this.state.cartproductlist});
      }    
      
      setChecked = (addressid,key) => {
      
        this.setState({ fulladdress: this.state.addressList[key]["fulladdress"]}) 

         this.setState({ addressid:addressid})
         if(this.state.checked == true){
            this.setState({ checked:false}) 
            this.setState({ isSelectAddress:false})
         }else{
            this.setState({ checked:true}) 
            this.setState({ isSelectAddress:false})
         }
           
      }
      
      openmodal() {
         AsyncStorage.setItem('addoprn',  'INS');
         const { navigate } = this.props.navigation;
         navigate('Changelocation')
      }
		
		
	  goToaddLocation= async()=> {
         this.setState({ isSelectAddress:false})
         AsyncStorage.setItem('addoprn',  'INS');
         const { navigate } = this.props.navigation;
         navigate('Changelocation')
       }


       gotoItemListpage = () => {
     
         const { navigate } = this.props.navigation;
         navigate('ItemListing')
       }

      reduceQty = (item,key) => {
         this.setState({ taxfee:0})    
         this.setState({ netamount:0})   
         this.setState({ localproductsubprice:0})   

         this.state.localqty = parseInt(this.state.cartproductlist[key].qty) - 1;   
         this.state.cartproductlist[key].qty = parseInt(this.state.localqty);
       
         if (this.state.localqty < 1) {
             
            this.state.cartproductlist[key].qty = 1;

            if(this.state.couponpercent > 0){ 

               this.state.couponamount =  this.state.couponpercent *  this.state.subtotal /100;
               this.setState({ couponamount: this.state.couponamount})
               this.setState({ subtotal: parseFloat(this.state.subtotal)});             
              
              this.state.taxfee =  (this.state.taxpercent/100) * (parseFloat(this.state.subtotal));
              this.setState({ taxfee: this.state.taxfee})
            
               this.setState({ netamount : parseFloat(this.state.subtotal) + parseFloat(this.state.taxfee) 
                  - parseFloat(this.state.couponamount)    + 
                  parseFloat(this.state.deliveryfee) }) ; 
            }else{
              
               this.setState({ subtotal: parseFloat(this.state.subtotal) });             
             
               this.state.taxfee =  (this.state.taxpercent/100) * (parseFloat(this.state.subtotal));
               this.setState({ taxfee: this.state.taxfee})

               this.setState({ netamount : parseFloat(this.state.subtotal) + parseFloat(this.state.taxfee) 
                    + parseFloat(this.state.deliveryfee)
                   }) ; 
            }
         
          
                      
           
   } else {
       this.setState({ localproductsubprice:  this.state.localqty * this.state.cartproductlist[key].pricewithcoupon })        
       this.state.cartproductlist[key].productsubprice = this.state.localqty * this.state.cartproductlist[key].pricewithcoupon;
            
       if(this.state.couponpercent > 0){
         this.state.couponamount =  this.state.couponpercent *  this.state.subtotal /100;
         this.setState({ couponamount: this.state.couponamount})

         this.setState({ subtotal: parseFloat(this.state.subtotal)- parseFloat(item.pricewithcoupon)});             
        
         this.state.taxfee = this.state.taxpercent *  ( parseFloat(this.state.subtotal) - parseFloat(item.pricewithcoupon))/100;
         this.setState({ taxfee: this.state.taxfee})

         this.setState({ netamount : parseFloat(this.state.subtotal) + parseFloat(this.state.taxfee) 
            - parseFloat(this.state.couponamount)  - parseFloat(item.pricewithcoupon)  + parseFloat(this.state.deliveryfee) }) ; 
               
         }else{
           
          this.setState({ subtotal: parseFloat(this.state.subtotal) - parseFloat(item.pricewithcoupon)});             
         
          this.state.taxfee =  this.state.taxpercent * ( parseFloat(this.state.subtotal) - parseFloat(item.pricewithcoupon))/100;
          this.setState({ taxfee: this.state.taxfee})

          this.setState({ netamount : parseFloat(this.state.subtotal) + parseFloat(this.state.taxfee) 
            - parseFloat(item.pricewithcoupon)  + parseFloat(this.state.deliveryfee)
                   
              }) ; 
               }

            }

            this.setState({ cartproductlist: this.state.cartproductlist});
      }

      closemodal(){
         this.setState({ successpopup:false})
         const { navigate } = this.props.navigation;
         navigate('Orders')

      }

      
  logout = async () => {
   this.setState({ islogout: false })
   this.removecustomerProducts();

 }

 saveplaceorderproducts = () => {
   
    Api.postwithtoken('saveplaceorderproducts', {            
    "customerid":  this.state.customerid, "grandtotal": this.state.subtotal,
    "totaltaxamount": this.state.taxfee, "discount": this.state.couponamount,
     "netamount": this.state.netamount, 
    "paidamount": 0, "currencysymbol": "0", "oprn": "INS", 
    "storeid": 2, "deliveryaddressid": this.state.addressid,
    "shippingcost": this.state.deliveryfee,"shippingtype": 1, 
    "cgst": "1", "sgst": "1", "orderlist": JSON.stringify(this.state.cartproductlist)
    }).then((result) => {
 
      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);  
           
      if(responseType == "S"){
         this.removecustomerProducts();
         AsyncStorage.removeItem("defaultcoupon");  
         AsyncStorage.removeItem("coupondisc");
         this.setState({ successpopup:true})  
         this.setState({ modalmsg:responseValue["msg"]})
         let token = responseValue["token"];

         Api.postwithNotifytoken('notification/token', {  
            "title": "Puzzi",
           "message": "You have 1 new order.Please check it",
           "token": token,
           "sendto": "supplier",
          }
          ).then((result) => {  
           
            let responseType = Master.getResponseType(result);
            let responseValue = Master.getResponseValue(result); 
            this.setState({ islogout: true })     
              })

           
         }
      })              
      }  



componentDidMount() {
   this.getportalcustomeraddresslist();
   
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
<ScrollView>
<View style={{backgroundColor:'white'}}>
<View style={s.cart}>
      <View style={{width:"10%"}}>
     
 
               <View style={s.iconborder}>
                  <Icon
                     name='cart-plus'
                     size={20}
                     color='white'
                     style={styles.btnIcon1}/>
      </View>
            </View>
         
            <View style={{width:'25%'}}>
               <View>
                  <Text style={s.iconText}>My Cart</Text>
               </View>
               </View>
               <View style={{width:"55%",paddingTop:3,textAlign:'center'}}>
    <TouchableOpacity onPress={() => { this.gotoItemListpage() }}>
            <Text style={[s.exdel2]}> + Add More products </Text>
         </TouchableOpacity>
    </View>
      </View>

{/*       
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

   </View> */}



   <View style={{backgroundColor:'white'}}>
   {
       this.state.cartproductlist.map && this.state.cartproductlist.map((item, key) => (

      <View style={{flexDirection:'row',paddingBottom:10,paddingLeft:10,borderBottomWidth:1,borderBottomColor:'lightgray',margin:10}}>
         <View style={{width:'40%'}}>
            <Image style={{ width: "80%", height: 80, borderRadius: 5 }}
           source={{
            uri: IMAGE_URL + item.image
          }} />  
         </View>  
         <View style={{width:'60%'}}>
            <View>
               <Text style={{fontSize: 15, fontWeight: '700',fontFamily: "Cochin",paddingRight:10,paddingLeft:10}}>{item.productname}</Text>
            </View>
            <View style={{flexDirection:'row',paddingLeft:10}}>
               <Text style={{fontSize: 13, fontWeight: '600',fontFamily: "Cochin",paddingRight:10}}>Rs {item.price}</Text>
               {/* <Text style={{fontSize: 13,fontWeight: '600',color:"gray"}}> Rs {item.pricewithcoupon}</Text> */}
            </View>
            <View style={{flexDirection:"row",paddingLeft:10,paddingTop:10}}>
               <View style={{width:'50%'}}>
                  <View style={{flexDirection:"row"}}>
  
                  
                  
                  
                  
                  <TouchableOpacity onPress={() => { this.reduceQty(item,key) }}>
                    <View>
                        <Icon  style={{paddingTop:5}} name='minus' size={20} color='#e46c47'/>
                     </View></TouchableOpacity>



                     <View>
                        <Text style={{paddingLeft:15}}>{item.qty}</Text>
                     </View>                   
                   
                   
                     <TouchableOpacity onPress={() => { this.increaseQty(item,key)}}>
                     <View style={{paddingLeft:15,paddingTop:5,color:"#e46c47"}}>
                        <Icon  name='plus' size={20} color='#e46c47'/>
                     </View></TouchableOpacity>


  


                  </View>
               </View>
               <View style={{width:'50%'}}>
                  <Text style={{fontSize: 12, fontWeight: '700',fontFamily: "Cochin"}}>Rs {item.productsubprice}</Text>
               </View>
            </View>

           
           
          
            <View style={{flexDirection:"row",alignItems:'flex-end',justifyContent:'flex-end'}}>
               <View style={{width:35,paddingLeft:22}}>
                  <Icon  name='trash' size={15} color='#e46c47'/>
               </View>
               <TouchableOpacity onPress={() => { this.openremovemodal(item) }}>
               <View style={{width:65,paddingLeft:5}}>
                  <Text style={{fontSize: 12, fontWeight: '600',fontFamily: "Cochin",
                  color:'#e46c47',marginTop:10}}>
                  Remove
                  </Text>
               </View>
               </TouchableOpacity>
            </View>




         </View>
      </View>
      ))}
   
   </View>


   <View style={{backgroundColor:'white'}}>
 <View style={{flex:1,backgroundColor:'#F0F1F1',height:15,marginLeft:10,marginRight:10}}>

</View> 
   </View>


   <View style={{ backgroundColor: 'white' }}>
   <View style={{flex:1,backgroundColor:'#F0F1F1',height:15,marginLeft:10,marginRight:10}}>
   </View>
   </View>


   {this.state.show ?  
   <View>
      
   <View style={[s.homesec]}>
      <View style={{flexDirection:'row',paddingLeft:18,paddingTop:10}}>
         <View style={{width:'15%'}}>
            <Icon
               name='map-marker'
               size={20}
               style={styles.btnIcon}
               />
         </View>
         <View style={{width:'85%',alignItems:'flex-start',justifyContent:'flex-start'}}>
            <Text style={{fontWeight:'700',fontSize:15,}}>Restaurant with servicable to multiple..</Text>
            <Text style={[s.txtaddrs]}>other</Text>
            <View style={{paddingTop:10}}>
            <Text style={{fontWeight:'bold',fontSize:15}}>Home</Text>
            <Text style={[s.txtaddrs]}>{this.state.fulladdress}</Text>
         </View>
         </View>

         
      </View>  
   </View>


   <View style={[s.homesec1]}>
      <View style={{width:'50%'}}>
      <TouchableOpacity  onPress={() =>
            { this.openmodal() }}>
            <Text style={[s.buttonBGcon1,s.ButtonTextcon1]}>ADD NEW ADDRESS
            </Text>
         </TouchableOpacity>
      </View>

      <View style={{width:"50%"}}>
         <TouchableOpacity onPress={() =>
            { this.openAddressmodal() }}>
            <Text style={[s.buttonBGcon2,s.ButtonTextcon2]}>CHANGE ADDRESS
            </Text>
         </TouchableOpacity>
      </View>
   </View>

   <View style={[s.backashcolorcommon]}>
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
                 <Text style={{fontSize:15,fontWeight:'bold',marginLeft:30}}>Rs.{this.state.subtotal}</Text>
            </View>
         </View>

         {this.state.couponpercent?
         <View style={{flexDirection:'row',paddingTop:5,paddingLeft:20}}>
            <View style={{width:"60%"}}>
                <Text style={{fontSize:15,fontWeight:'bold'}}>Discount from Coupon ({this.state.couponpercent}%)</Text>
            </View>
            <View style={{width:"40%"}}>
                 <Text style={{fontSize:15,fontWeight:'bold',marginLeft:30}}>Rs.{this.state.couponamount}</Text>
            </View>
         </View>:null}


         <View style={{flexDirection:'row',paddingTop:5,paddingLeft:20,margin:0}}>
            <View style={{width:"60%"}}>
      <Text style={{fontSize:15,fontWeight:'bold',color:'#74a1e0'}}>Delivery  Fee</Text>
      <Text ellipsizeMode="clip" numberOfLines={1} style={{color:'#74a1e0'}}>- - - - - - - - - - - - - - - - - - -</Text>
      </View>
         
            <View style={{width:"40%"}}>
                 <Text style={{fontSize:15,fontWeight:'bold',marginLeft:30}}>Rs.{this.state.deliveryfee}</Text>
            </View>
         </View>
         
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
      <Text style={{fontSize:15,fontWeight:'bold',color:'#74a1e0'}}>Tax amount(18%)</Text> 
      <Text ellipsizeMode="clip" numberOfLines={1} style={{color:'#74a1e0'}}>- - - - - - - - - - - - - - - - - - -</Text>
      </View>
         
            <View style={{width:"40%"}}>
                 <Text style={{fontSize:15,fontWeight:'bold',marginLeft:30}}>Rs.{this.state.taxfee}</Text>
            </View>
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
                 <Text style={{fontSize:15,fontWeight:'bold',marginLeft:30}}>Rs.{this.state.netamount}</Text>
            </View>
         </View>
         <View style={{backgroundColor:'white'}}>
<View style={{flex:1,backgroundColor:'#F0F1F1',height:15,marginLeft:10,marginRight:10}}>

</View>
   </View>

            </View>

<View style={{flexDirection:'column',paddingLeft:30,paddingTop:10,backgroundColor:'white'}}>
       <View>
          <Text style={{fontSize:18,fontWeight:'bold'}} >
            Almost There
          </Text>
       </View>
       <View>
          <Text style={{fontSize:12,fontWeight:'bold',color:'gray',backgroundColor:'white',paddingBottom:20}} >
          Click continue to place your order
          </Text>
       </View>
    </View>


    <View style={{paddingLeft:20,paddingRight:20,backgroundColor:'white'}}>
    <TouchableOpacity onPress={() => { this.saveplaceorderproducts() }}>
         <Text style={[styles.buttonBGcon,styles.ButtonTextcon]}>CONTINUE</Text>     
         </TouchableOpacity>
   </View>

   
   
   
   </View>
   :
   <View>
   <View style={{width:'100%',paddingTop:50,backgroundColor:'white'}}>           
          <View>
             <Image style={{ width: "100%", height: 250, borderRadius: 5, }}
            source={require('../assets/img/nocartimage.png')} />
          </View>

     
       </View>

       <View style={{ width: "100%", backgroundColor: 'white', paddingLeft: 80, paddingTop: 20,paddingBottom:55}}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>You have no products in cart.</Text>
      </View> 

  </View>
   }


<Modal backdropColor="#00000063" propagateSwipe={true}
         animationIn="slideInDown"  animationOut="slideOutDown"
         onBackdropPress={() => this.setState({ openremovemodal: false })}
         isVisible={this.state.openremovemodal}>
            
      <View style={{ flex: 1 ,alignItems:"center",justifyContent:"center"}}>
        <View style={{backgroundColor: "white", padding: 15, shadowColor: "#000",
                        borderRadius:10,shadowOffset: { width: 0, height: 2, },
                        hadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,}}>
          <View>
            <View>
              <Text style={{fontSize:16,fontWeight:"bold",textAlign:"center"}}>
               Delete :</Text>
            </View>
                                              
          <View style={{paddingVertical:5}}>
            <Text style={{fontSize:16,color:"grey",lineHeight:30}}>
               DO YOU WANT TO DELETE THIS PRODUCT ?
             </Text>
          </View>
                                             
          <View style={{flexDirection:"row",width:"100%",paddingVertical:10}}>
            <TouchableOpacity  onPress={() => this.close()}
              style={{width:"45%",backgroundColor:"#e5e6eb",paddingVertical:8,
               borderRadius:10,marginRight:20}}>                 
                 <View>
                  <Text style={{fontSize:16,fontWeight:"bold",textAlign:"center"}}>No</Text>
                 </View>
            </TouchableOpacity>

            <TouchableOpacity style={{width:"45%",backgroundColor:"#1878f3",paddingVertical:8,
                 borderRadius:10}} onPress={() => this.removeFromCart()}>
                  
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
               </Text>
            </View>
                                              
          <View style={{paddingVertical:5}}>
            <Text style={{fontSize:16,color:"grey",lineHeight:30}}>
              Notification sent sucessfully..
             </Text>
          </View>
                                             
          <View style={{flexDirection:"row",width:"100%",paddingVertical:10}}>
           

            <TouchableOpacity style={{width:"45%",backgroundColor:"#1878f3",paddingVertical:8,
                 borderRadius:10}} onPress={() => this.logout()}>
                  
                  <View>
                  <Text style={{fontSize:16,fontWeight:"bold",color:"white",
                  textAlign:"center"}}>close</Text>
                   </View>
            </TouchableOpacity>


            </View>
            </View>
           </View>
           </View>
  </Modal>

  
<Modal isVisible={this.state.isSelectAddress}
   backdropColor="black"
   propagateSwipe={true}
   onBackdropPress={() =>
   this.setState({ isSelectAddress: false })}
   animationIn="slideInUp"
   animationOut="slideOutDown"
   style={{
   position: "absolute", bottom: -30, left: -18, width: "100%"
   }}>
   <View style={{
   width: "100%", backgroundColor: "white",
   shadowColor: "#000", shadowOffset: { width: 0, height: 2, },
   shadowOpacity: 0.25, shadowRadius: 3.84
   }}>
       
   <View style={{ flexDirection: "column", width: "100%" }}>
   <View style={[s.backashcolorcommon1]}>
      <Text style={{fontWeight:'bold ',fontSize:14}}>Choose a delivery address</Text>
   </View>
   <View style={{ width: "100%" }}>
   <View style={{ padding: 15 }}>
   <View>
     
   {
    this.state.addressList.map && this.state.addressList.map((item, key) => (
      <View style={[s.homesec]}>
     
         <View style={{width:"15%",paddingBottom:10}}>
         <Animatable.View animation="bounceIn" iterationCount={3}>
            <RadioButton
            value={this.state.addressid}
            color = "blue"
            status={ item.addressid === this.state.addressid ? 'checked' : 'unchecked' }
            // status={ this.state.checked }
            onPress={() => this.setChecked(item.addressid,key)}
            />
            </Animatable.View>
         </View>
         <View style={{width:'75%',paddingBottom:10}}>
            {/* <Text style={{fontWeight:'600',fontSize:15,color:'#e46c47'}}>Other</Text> */}
            <Text style={[s.txtaddrs]}>{item.fulladdress}</Text>
         </View>
      </View>
    ))}



   </View>
   <View>
      <TouchableOpacity onPress={() => this.goToaddLocation()} >
         <Text style={[s.buttonBGcon1,s.ButtonTextcon1]}>ADD NEW ADDRESS
         </Text>
      </TouchableOpacity>
   </View>
   
   </View>
   </View>
   </View>

   </View>
</Modal>

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
      
   
          <Text style={[s.sucessmsg]}>{this.state.modalmsg}</Text>
     

          <TouchableOpacity onPress={() => this.closemodal()}>
          <Text style={[s.fullbuttonBGcon,s.fullButtonTextcon]}>close
                        
                        </Text> 
</TouchableOpacity>
</View>
         </View>
      </Modal>

      </View>
</ScrollView>}
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

export default Cart;