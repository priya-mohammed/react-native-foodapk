'use strict';
import { StyleSheet,Dimensions } from 'react-native';

const itemHeight = Dimensions.get('window').height;


module.exports = StyleSheet.create({
    alwaysred: {
        backgroundColor: 'red',
        height: 100,
        width: 100,  
    },
    mlcontainer:{
        flexDirection:'row',paddingLeft:10,marginRight:10
    },
    mlmaincontainer:{flexDirection:'column',backgroundColor:'#e46c47', paddingTop:30, height: itemHeight - 300},
    heading:{
        paddingLeft:10,
        paddingTop:10,
        flexDirection:"row",
        backgroundColor:'white',
        borderBottomWidth:1,borderColor:'lightgray',height:50
      },
      headingIconborder:{
        borderRadius:60,
        width: 30,
        height: 30,
        backgroundColor:'#e46c47',
        alignItems:'center',
        justifyContent:'center',
          
      },
      headingIconText:{
        fontSize:15,
        fontWeight:'bold',
        paddingLeft:10,
        color:"#555",
        paddingTop:5
       },
       pmodalTextinput: {
        height: 40,
        color:'black',
        borderBottomWidth: 2,
        fontSize:15,
        textAlign:'left',
        backgroundColor:'white',
        borderBottomColor:'#FCDABD'
      },
      pmodalText:{
        fontSize:18,
        fontWeight:'bold',
      },
      pmodalTextSub:{
        fontSize:12,
        paddingTop:7,
        color:'#909192'
      },
      pmodalInput:{
        paddingBottom:10
      },
      fullbuttonBGcon:{
        backgroundColor:"#e46c47",
        padding:10,
        marginTop:20,
      },
      fullButtonTextcon:{
          color:'white',
          fontSize: 16,
          fontWeight:"bold",
          textAlign:'center',
          letterSpacing:1,
      },
      homesec:{
        flexDirection:'row',backgroundColor:'white'
      },
      txtcolor:{
        color: "rgb(226, 55, 68)",
      },
  
   
   keema:{
       fontSize: 15,
        fontWeight: '700',
         fontFamily: "Cochin",
          paddingRight: 10,
           paddingLeft: 10, 
   },
   txtctritem:{
      fontSize: 15,
       fontWeight: '700', 
       fontFamily: "Cochin", 
       color: '#585758' 
   },
   keemasub:{
      flexDirection: 'row',
       paddingLeft: 10,},
rs:{
   fontSize: 13, 
   fontWeight: '600', 
   fontFamily: "Cochin", 
   paddingRight: 10 
},
discount:{
   fontSize: 13, 
   fontWeight: '600', 
   color: "rgb(214, 27, 105)" 
},
imgsec:{
   width: "100%", 
   height: 80,
   borderRadius: 5 
},
cartimg:{
  flexDirection:'row',
  paddingBottom:10,
  paddingLeft:10,
  paddingTop:5,
  backgroundColor:"white",
  borderBottomWidth:1,
  borderBottomColor:'lightgray',
  margin:10,
},
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
three:{
  fontSize: 13,
  fontWeight: '600',
  color:"gray"
},
two:{
  fontSize: 12,
   fontWeight: '700',
   fontFamily: "Cochin"
},
trshicon:{
  flexDirection:"row",alignItems:'flex-end',justifyContent:'flex-end'
},
trstxt:{
  fontSize: 12, fontWeight: '600',fontFamily: "Cochin",color:'#e46c47',marginTop:10
},
billtxt:{
  fontSize:18,fontWeight:'bold',paddingLeft:20,paddingTop:10,
},
almosttxt:{
  fontSize:18,fontWeight:'bold'
},
almosttxt1:{
  fontSize:15,fontWeight:'bold'
},

delivery:{
  fontSize:15,fontWeight:'bold',color:'#74a1e0'
},
delsubtxt:{
  fontSize:15,fontWeight:'bold',marginLeft:30, textAlign:'right', paddingRight:15
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
},
moghead:{
  fontSize: 15, fontWeight: '700', fontFamily: "Cochin", paddingRight: 10, color: '#585758' 
},
buttonBG: {

  marginTop:0,
  paddingTop:10
},
ButtonText: {
color:'#e46c47',
  borderRadius:8,
  fontSize: 13,
  fontWeight:"bold",
  letterSpacing:0,
  textDecorationLine: 'underline'

},  
 
price:{
  fontSize:18,fontWeight:'bold',paddingBottom:10
},
bordrcommon:{
  flexDirection:'row',paddingTop:10,paddingLeft:10,backgroundColor:'white',borderTopWidth:1,borderColor:'lightgray'
},
topay:{
  fontSize:15,fontWeight:'bold',color:'#676767'},
topaysub:{
  fontSize:15,fontWeight:'700',marginLeft:30, textAlign:'right', paddingRight:15,color:'#676767'
  },
  container: {
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flex:1,
    flexDirection:'column', 
    position:'absolute',top:220, left:"20%"
  },
  logo: {
    width: 250,
    height: 250,
  },
  map: {
    width: 60,
    height: 60,
    opacity: 0.8,
    padding:20,
    backgroundColor:"#F2F2F2",
    borderRadius: 50
  },
 container2:{
  justifyContent: 'center', //Centered vertically
  alignItems: 'center', // Centered horizontally
  flex:1,
  flexDirection:'column', 
  position:'absolute',top:180, left:"20%"
 },
 container3:{
  justifyContent: 'center', //Centered vertically
  alignItems: 'center', // Centered horizontally
  flex:1,
  flexDirection:'column', 
  position:'absolute',top:0, left:0
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
exdel:{
textAlign:'center',color:'#e46c47',fontWeight:'bold'},

txtaddrs:{
  fontWeight:'500',
  fontSize:14,
  letterSpacing:0.6,
  paddingTop:3,color:'#676767'

},
favtxt:{
  backgroundColor:'white',paddingTop:10,borderTopWidth:1,borderColor:'lightgray'
},
favsub:
{flexDirection:'column',paddingLeft:10},
otphead:{
  color:'white',fontWeight:'bold',fontSize:20,textAlign:'center',letterSpacing:0.8
 
},
textinputsec:
  {
  width:"10%",
  borderBottomWidth:5,
  borderColor:'white',
  fontSize:28,
  marginRight:10,
  fontWeight:'bold',
  textAlign:'center',color:'white'
},
buttonBGItem1: {
  color: 'white',
  borderRadius: 5,
  fontSize: 12,
  fontWeight: "bold",marginRight:10
},
ButtonTextItem1: {
 backgroundColor: "black",
 textAlign: 'center',
 padding:5
},
buttonBGItem: {
  color:'white',
  borderRadius:6,
  fontSize: 20,
  fontWeight:"bold"


},
ButtonTextItem: {
backgroundColor:"black",
padding:15,
textAlign:'center',
letterSpacing:1,
},  
input: {
height: 40,
margin: 12,
borderWidth: 1,
borderRadius:6,
textAlign:'left',
backgroundColor:'white',
borderColor:'white',
fontSize:18,fontWeight:'600',paddingLeft:10
},
otpiconsec:{
  paddingBottom:"10%",
  marginLeft:10,
  marginRight:10,
  marginTop:80,
},
iconhead:{
  paddingTop:10,
  textAlign:'center',
  paddingBottom:'20%',
},
bordr:{
  flexDirection:"row",
  alignItems:'center',
  justifyContent:'center',
  paddingTop:10
},
angle:{
   textAlign:'center',
},
imgotp:
{ 
  width: "100%",
  height: 300
  },
  btnClickContain: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  padding:10,
    marginTop: 5,
    marginBottom: 5,
    marginRight:10
  },
  btnContainer: {
    flexDirection:"row",
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnIcon: {
    height: 25,
    paddingRight:8
  },
  btnText: {
    fontSize: 15,
    color: 'black',
    marginTop: 2,
    fontWeight:'bold'
  },
  common:{
    flexDirection:"row",backgroundColor:'white'
  },
  widthfourzero:{
    width:'40%',
  },
  widthsixty:
  {
    width:"60%"
  },
  widthhundred:
  {
    width:"100%"
  },
  widthfifty:{
    width:'50%'
  },
  commonrowpadten:{
  flexDirection:"row",paddingLeft:10,paddingTop:10
},
commonpaddfive:
{flexDirection:'row',paddingTop:5,paddingLeft:20,backgroundColor:'white'},
backashcolorcommon:
{
  flex:1,backgroundColor:'#F0F1F1',height:15,marginLeft:10,marginRight:10
},
mogsub:
{
fontSize: 18, color: 'black', paddingBottom: 10, fontWeight: 'bold' 
},
deliveryreview:{
fontSize: 11, letterSpacing: 1, paddingBottom: 5, color: 'rgb(156, 156, 156)' 
},
four0neitem:
{ 
  fontSize: 15, paddingRight: 5, paddingBottom: 5
},
teasec:
{ fontSize: 13, letterSpacing: 0.5, fontWeight: 'bold', color: 'rgb(79, 79, 79)' },
dot:{
   backgroundColor: 'rgb(79, 79, 79)', borderRadius: 50, width: 5, height: 5, textAlign: 'center', marginTop: 8, marginRight: 4 },

twentydeltxt:{
  fontSize: 15, color: 'rgb(79, 79, 79)', letterSpacing: 0.5
},
modalmogusec:
{ alignItems: "flex-start", justifyContent: "center", paddingLeft: 20, paddingRight: 20, paddingBottom: 50 },
chicken:
{ fontSize: 17, fontWeight: '600', color: "rgb(0, 0, 0)", letterSpacing: 0.5, fontWeight: "bold" },
twonine:
{ fontSize: 14, fontWeight: '600', paddingRight: 10, paddingTop: 5, fontWeight: "bold" },
fastmodal:{
fontSize: 12, paddingTop: 5, color: "#999" } ,
buttonBGItem2: {
  color: 'white',
  borderRadius: 5,
  fontSize: 12,
  fontWeight: "bold"
},
ButtonTextItem2: {
  backgroundColor: "black",
  marginRight: 10,
  padding: 5,
  marginBottom: 50,
  textAlign: 'center'
},
addcart:{
textAlign: "center", fontSize: 15, color: "white", fontWeight: '600', fontWeight: "bold" 
},
bryanisub:
{paddingLeft: 10, paddingRight: 20},
subhead:{
  paddingBottom: 5, width: '86%' 
},
buttonBGcon1:{
  backgroundColor:'white',
marginTop:35,
padding:5,
 marginBottom:20,
  borderWidth:1.5,borderColor:'green',marginRight:10

},
ButtonTextcon1:{
  color:'#e46c47',
  borderColor:'#e46c47',
  fontSize: 16,
  fontWeight:"bold",
  textAlign:'center',
  
},
buttonBGcon2:{
  backgroundColor:'#e46c47',
  marginTop:35,
  padding:5,
   marginBottom:20,
    borderWidth:1.5,borderColor:'green',marginRight:10

},
ButtonTextcon2:{
  color:'white',
   
    borderColor:'#e46c47',
    fontSize: 16,
    fontWeight:"bold",
    textAlign:'center',
  
},
homesec1:{
  paddingLeft:10,
 
  paddingRight:10,
  flexDirection:'row',
  backgroundColor:'white'
},
hmsec:{
  marginLeft:10,
  marginRight:10
},
hmsec1:{
paddingRight:10
},
btnIconaddr:{
  borderColor:'#676767',
  borderWidth:1,
  height: 65,
  paddingTop:15,
  textAlign:'center',
  alignItems:'center',justifyContent:'center'

},
txtaddrsconsec:{
  color:'#676767',
  fontWeight:'600',
  paddingLeft:8,
  paddingTop:5
},
widthtewn:{
  width:'60%'
},
mycoupons:{
  fontWeight:'700',
  fontSize:15,paddingBottom:15
},
mycouponsecGet:{
  color:'gray',
  fontWeight:'700',
  fontSize:15,paddingBottom:15
},
borderwithtxt:{
backgroundColor: '#F0F1F1', height: 50, alignItems: 'flex-start',
width:"100%",
},
mycouponssecsub:{
paddingLeft: 10, paddingTop: 15, fontSize: 12, fontWeight: '700' 
},
borderwithtxtcolor:{
backgroundColor:'#F9F9DB',
paddingTop:8,
marginLeft:10,
marginTop:10,width:"35%",
},
columnsec:{
  backgroundColor:'white',  paddingLeft:10,
  paddingTop:10,
},
borderligtgray:{
  borderBottomWidth:1,
  borderColor:'lightgray',
  marginTop:10
},
txtwidthsixty:{
  flexDirection:'row',
  width:'90%',lineHeight:20
},
couponsecsubhead:{
alignItems:'center',justifyContent:'center',paddingLeft:10,paddingTop:15
},
errorvalidatetxt:
{
  color:"white",fontSize:16,fontWeight:'bold',textAlign:'center'},
  orderhdr:{
  flexDirection:'row',paddingTop:15,paddingLeft:5,backgroundColor:'white',paddingRight:10,borderBottomWidth:2,borderBottomColor:'black'},
ordersub:{
  fontSize:18,fontWeight:'bold',textTransform: 'uppercase',letterSpacing:0
},
exdel1:{
  textAlign:'right',color:'#e46c47',fontWeight:'bold',fontSize:11,paddingRight:16, textDecorationLine: "underline",
  textDecorationStyle: "solid",
  textDecorationColor: "#e46c47",

},
sucessmsg:{
  fontSize:18,
  fontWeight:'900',textAlign:'center',paddingBottom:5
},
txtaddrsapp:{
color:'#676767',
fontWeight:'600',
textAlign:'center'
},

backashcolorcommon1:
{
  flex:1,backgroundColor:'#F0F1F1',height:50,padding:15
},

myStarStyle1: {
  color:"rgb(226, 55, 68)",
  backgroundColor: 'white',
  // textShadowColor: "rgb(226, 55, 68)",
  textShadowOffset: {width: 1, height: 1},
  textShadowRadius: 2,
  fontSize :15,
  padding:1
},

exdel2:{
  textAlign:'right',color:'#e46c47',fontWeight:'bold',fontSize:15, textDecorationLine: "underline",
  textDecorationStyle: "solid",
  textDecorationColor: "#e46c47",

},

badgeStyle: { 
   position: 'absolute',
   top: -200,
   right: -4 
  //  right:21
}
});