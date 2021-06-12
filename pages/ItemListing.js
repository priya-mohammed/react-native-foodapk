import React, { Component, useState, createRef } from 'react';
import {
  StyleSheet, Button, Dimensions, ScrollView, Image, RefreshControl, Animated,
  View, Text, TouchableOpacity, AsyncStorage, SafeAreaView
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Api from "../service/api";
import Master from "../service/master";
import { IMAGE_URL } from "../service/config";
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import CLoader from '../components/CLoader';
const s = require('../assets/css/style');
const itemWidth = Dimensions.get('window').width;

class ItemList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      activeIndex: 0,
      productrate: '',
      listlength: 0,
      isModalVisible: false,
      isproductDetail: false,
      scrollY: new Animated.Value(0),
      contentLoader: true,
      isLoading: false,
      supplierid: 0,
      categoryid: 0,
      customerid: 0,
      suppliername: '',
      address: '',
      latitude: '',
      longitude: '',
      productname: '',
      modalmsg: '',
      imageurl: '',
      tinnumber: '',
      coupondisc: '',
      productcode: '',
      productdetails: [],
      carouselItems: [],
      Items: [],
      isFavourite: false,
      product_data: {
        "userid": '',
        "productid": '',
        "oprn": "",
        "supplierid": '',
        "batchid": ''
      },
      rating:'',
      reviews:''
    }
    this.loadMoreData = this.loadMoreData.bind(this);
    this.addSupplierFavourite = this.addSupplierFavourite.bind(this);
    this.getProductList = this.getProductList.bind(this);
    this.savecartitems = this.savecartitems.bind(this);
  }

  loadBanners = async () => {

    Api.get("getBannerList", {
    }).then((result) => {

      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);
      if (responseType == 'S') {
        this.setState({ carouselItems: responseValue["homebannerList"] })
        this.getProductList();
      }
    })
  }


  addSupplierFavourite = async (itemproduct) => {
    //console.log(itemproduct)
    if (itemproduct.isFavourite > 0) {

      Api.postwithtoken('addproductcart', {
        "userid": this.state.customerid,
        "productid": itemproduct.productid,
        "oprn": "DEL_WISHLIST",
        "supplierid": this.state.supplierid,
        "batchid": itemproduct.batchid
      }).then((result) => {
        let responseType = Master.getResponseType(result);
        let responseValue = Master.getResponseValue(result);
        if (responseType == "F") {
          this.state.modalmsg = responseValue;
          this.setState({ isModalVisible: true })
        }
        if (responseType == "S") {
          this.state.modalmsg = responseValue["msg"];
        }
        this.getProductList();

      })


    } else {

      Api.postwithtoken('addproductcart', {
        "userid": this.state.customerid,
        "productid": itemproduct.productid,
        "oprn": "ADD-WISHLIST",
        "supplierid": this.state.supplierid,
        "batchid": itemproduct.batchid
      }).then((result) => {

        let responseType = Master.getResponseType(result);
        let responseValue = Master.getResponseValue(result);
        if (responseType == "F") {
          this.state.modalmsg = responseValue;
          this.setState({ isModalVisible: true })
        }
        if (responseType == "S") {
          this.state.modalmsg = responseValue["msg"];
        }

        this.getProductList();

      })

    }
  }

  loadMoreData = () => {

    let mylist = this.state.productdetails;
    this.state.isLoading = true;
    // this.setState({ contentLoader: true });
    Api.get("getSupplierProductList/" + this.state.categoryid + "/" + this.state.supplierid
      + "/" + this.state.customerid + "/" + this.state.listlength, {
    }).then((result) => {

      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);

      let data = responseValue;
      let i = 0;

      this.setState({ suppliername: responseValue[0]["suppliername"] })
      this.setState({ address: responseValue[0]["address"] })
      this.setState({ latitude: responseValue[0]["latitude"] })
      this.setState({ longitude: responseValue[0]["longitude"] })
      this.setState({ tinnumber: responseValue[0]["tinnumber"] })
      this.setState({ listlength: this.state.listlength + responseValue.length })
      this.setState({rating:responseValue[0]["rating"]})
      this.setState({reviews:responseValue[0]["reviews"]})
      //console.log(this.state.listlength)

      if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
          mylist.push(data[i]);
        }
      }
      this.setState({ productdetails: mylist });
      this.setState({ isLoading: false });
      //this.setState({ contentLoader: false });
    });

  }


  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  delete() {
    this.setState({ isModalVisible: false })

    Api.postwithtoken('addproductcart', {
      "userid": this.state.customerid, "productid": 0, "oprn": "DEL_SUPPLIER_PRODUCT",
      "supplierid": this.state.supplierid, "batchid": 0
    }).then((result) => {
      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);
      if (responseType == "S") {
        this.state.modalmsg = responseValue["msg"];
      }
    });
  }

  cancel = () => {
    this.state.modalmsg = '';
    this.setState({ isModalVisible: false })
  };

  closemodal = () => {
    this.setState({ isModalVisible: false })
    this.setState({ isproductDetail: false })

  };

  openProductmodal = (itemproduct) => {
    this.setState({ isproductDetail: true })
    this.state.imageurl = itemproduct.productimage;
    this.state.productname = itemproduct.productname;
    this.state.productcode = itemproduct.productcode;
    this.state.productrate = itemproduct.specialprice;
  };

  getProductList = async () => {
    this.setState({ contentLoader: true });
    this.setState({ listlength: 0 });
    this.state.categoryid = await AsyncStorage.getItem('categoryid');
    this.state.supplierid = await AsyncStorage.getItem('supplierid');
    this.state.customerid = JSON.parse(await AsyncStorage.getItem('customerId'));

    this.state.coupondisc = await AsyncStorage.getItem('coupondisc');
   // alert( this.state.coupondisc)

    Api.get("getSupplierProductList/" + this.state.categoryid + "/" + this.state.supplierid
      + "/" + this.state.customerid + "/" + this.state.listlength, {
    }).then((result) => {

      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);
      console.log(responseValue)
      this.setState({ productdetails: responseValue })
      this.setState({ suppliername: responseValue[0]["suppliername"] })
      this.setState({ address: responseValue[0]["address"] })
      this.setState({ latitude: responseValue[0]["latitude"] })
      this.setState({ longitude: responseValue[0]["longitude"] })
      this.setState({ tinnumber: responseValue[0]["tinnumber"] })
      this.setState({rating:responseValue[0]["rating"]})
      this.setState({reviews:responseValue[0]["reviews"]})
      this.state.listlength = this.state.listlength + responseValue.length;
      this.setState({ listlength: this.state.listlength + responseValue.length })

      if (responseType == 'S') {
        this.setState({ contentLoader: false });
      }
    })


  }

  _renderHomeBanner({ item, index }) {
    return (
      <View style={{
        backgroundColor: 'white',
        width: itemWidth,
        height: 180,
      }}>

        <Image style={{ width: "100%", height: 200 }}
          source={{
            uri: IMAGE_URL + item.bannerimageurl
          }} />

      </View>

    )
  }


  componentDidMount() {

    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.loadBanners();
    });
  }


  savecartitems = async (categoryid, supplierid, productid, batchid) => {

    this.state.customerid = JSON.parse(await AsyncStorage.getItem('customerId'));

    Api.postwithtoken('addproductcart', {
      "userid": this.state.customerid,
      "productid": productid,
      "oprn": "INS",
      "supplierid": supplierid,
      "batchid": batchid
    }).then((result) => {

      let responseType = Master.getResponseType(result);
      let responseValue = Master.getResponseValue(result);
      if (responseType == "F") {
        this.state.modalmsg = responseValue;
        this.setState({ isModalVisible: true })
      }
      if (responseType == "S") {
        this.state.modalmsg = responseValue["msg"];
        const { navigate } = this.props.navigation;
        navigate('Cart')
      }


    })
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

            <View style={{ backgroundColor: "white" }} >
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Carousel
                  layout={'default'}
                  loop autoplay
                  ref={ref =>
                    this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={Dimensions.get('window').width}
                  renderItem={this._renderHomeBanner}
                  onSnapToItem={index => this.setState({ activeIndex: index })} />
              </View>
            </View>
            {/* //Supplier View start      */}
            <View style={{ backgroundColor: "white" }}>
              <View style={{ flexDirection: 'column', paddingTop: 10, backgroundColor: "white" }}>
                <View style={{ paddingLeft: 10, paddingRight: 20 }}>






                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingBottom: 5, width: '86%' }}>
                      <Text style={{ fontSize: 18, fontWeight: '700', fontFamily: "Cochin" }}>{this.state.suppliername} </Text>
                    </View>




                  </View>


                  <View style={{ paddingBottom: 5 }}>
                    <Text style={{ fontSize: 15, fontFamily: "Cochin", color: '#585758' }}>GST NO :  {this.state.tinnumber} </Text>
                  </View>
                  <View style={{ paddingBottom: 5 }}>
                    <Text style={{ fontSize: 13, fontFamily: "Cochin", color: '#585758' }}>{this.state.address} 3.5 km</Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingLeft: 10, paddingBottom: 5 }}>
                <Icon name="star" size={18} style={{ color: "#FCDE07", paddingRight: 10 }} />
                <Text style={{ fontSize: 15, fontWeight: '700', fontFamily: "Cochin", paddingRight: 10, color: '#585758' }}>{this.state.rating}</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', fontFamily: "Cochin", paddingLeft: 50, paddingRight: 10, color: '#585758' }}>37mins</Text>
                {/* <Text style={{fontSize: 15, fontWeight: '700',fontFamily: "Cochin",paddingRight:10,color:'#585758' }}>360</Text> */}
              </View>
              <View style={{ flexDirection: 'row', paddingLeft: 10, paddingBottom: 15, backgroundColor: "white" }}>
                <Text style={{ fontSize: 15, fontWeight: '700', fontFamily: "Cochin", paddingRight: 10, color: '#585758' }}> {this.state.reviews}rating</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', fontFamily: "Cochin", paddingLeft: 20, paddingRight: 10, color: '#585758' }}>Deliverytime</Text>
                {/* <Text style={{fontSize: 15, fontWeight: '700',fontFamily: "Cochin",paddingRight:10,color:'#585758' }}>costfor2</Text> */}
              </View>
              {/* //Category List   start   */}

              {
                this.state.productdetails.map && this.state.productdetails.map((item, key) => (

                  <View>

                    { item.productList != "" && item.productList.length > 0 ?


                      <View style={{ backgroundColor: "white",borderTopColor:"#eee", borderTopWidth: 1, paddingTop: 10 }}>
                        <Text style={{
                          fontSize: 18, fontWeight: '700', fontFamily: "Cochin",
                          paddingLeft: 10, paddingBottom: 10
                        }}>{item.categoryname} </Text>
                      </View> : null}


                    {
                      item.productList.map && item.productList.map((itemproduct, key) => (

                        <View style={{ flexDirection: 'row', paddingBottom: 10 }}>





                          <View style={{ width: '30%', paddingLeft: 10 }}>

                            <TouchableOpacity onPress={() => { this.openProductmodal(itemproduct) }}>
                              <View>
                                <Image style={{ width: "100%", height: 80, borderRadius: 5 }}
                                  source={{
                                    uri: IMAGE_URL + itemproduct.productimage
                                  }} />
                              </View>
                            </TouchableOpacity>

                          </View>
                          <View style={{ width: '50%' }}>
                            <View>
                              <Text style={{
                                fontSize: 15, fontWeight: '700', fontFamily: "Cochin",
                                paddingRight: 10, paddingLeft: 10
                              }}>{itemproduct.productname}</Text>
                            </View>
                          { this.state.coupondisc ?
                            <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                              <Text style={{ fontSize: 13, fontWeight: '600', fontFamily: "Cochin", paddingRight: 10 }}>Rs.{itemproduct.specialprice} /- only</Text>
                              <Text style={{ fontSize: 13, fontWeight: '600', color: "rgb(214, 27, 105)" }}>{this.state.coupondisc} % OFF</Text>
                            </View>:
                            
                            <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                            <Text style={{ fontSize: 13, fontWeight: '600', fontFamily: "Cochin", paddingRight: 10 }}>Rs.{itemproduct.specialprice} /- only</Text>
                            <Text style={{ fontSize: 13, fontWeight: '600',textDecorationLine:'line-through', color: "rgb(214, 27, 105)" }}>No Offer </Text>
                          </View>
                               }

                            <View>
                              <Text style={{ lineHeight: 20, fontSize: 13, fontWeight: 'bold', fontFamily: "Cochin", paddingLeft: 10, color: 'rgb(156, 156, 156)' }}>{itemproduct.description}</Text>
                            </View>
                          </View>
                          <View style={{ width: "20%", flexDirection: "column", alignItems:"center" }}>
                            <View >
                              <TouchableOpacity onPress={() => {
                                this.savecartitems(itemproduct.categoryid, itemproduct.supplierid,
                                  itemproduct.productid, itemproduct.batchid)
                              }}>
                                <Text style={[styles.buttonBGItem, styles.ButtonTextItem]}>Add&nbsp;
                        </Text>
                              </TouchableOpacity>
                            </View>


                            <View>
                              {itemproduct.isFavourite > 0 ?

                                <Animatable.View animation="swing" iterationCount={3}>
                                  <TouchableOpacity onPress={() => this.addSupplierFavourite(itemproduct)}>
                                    <Icon name='favorite' size={25} style={{ color: "#e46c47" }} />
                                  </TouchableOpacity>
                                </Animatable.View>
                                :
                                <TouchableOpacity onPress={() => this.addSupplierFavourite(itemproduct)}>
                                  <Icon name='favorite-border' size={25} style={{ color: "#333" }} />
                                </TouchableOpacity>

                              }

                            </View>
                          </View>
                        </View>
                      ))}

                  </View>
                ))}


            </View>


            <Modal isVisible={this.state.isproductDetail}
                     backdropColor="#111"
                     propagateSwipe={true}
                     onBackdropPress={() => this.setState({ isproductDetail: false })}
                     animationIn="slideInUp"
                     animationOut="slideOutDown"
                     style={{
                        position: "absolute", bottom: -30, left: -18, width: "100%"
                     }}>

                     <View style={{
                        width: "100%", backgroundColor: "white",
                        shadowColor: "#000", borderRadius: 29, shadowOffset: { width: 0, height: 2, },
                        shadowOpacity: 0.25, shadowRadius: 3.84
                     }}>



                        <View style={{ flexDirection: "column", width: "100%" }}>

                           <View style={[s.widthhundred]}>
                              <View style={{ padding: 15 }}>
                              <Image style={{ width: "100%", height: 200, borderRadius: 15 }}
                                source={{
                                  uri: IMAGE_URL + this.state.imageurl
                                }} />
                              </View>
                           </View>

                           <View style={{ width: "100%", flexDirection: "row" }}>
                              <View style={[s.widthsixty]}>
                                 <View style={[s.modalmogusec]}>
                                    <Text style={[s.chicken]}>{this.state.productname}  ({this.state.productcode})</Text>
                                    <Text style={[s.twonine]}>Rs.{this.state.productrate} /- 10% OFF</Text>
                                    <Text style={[s.fastmodal] }>Fast Food, Chinese, Spicy</Text>
                                 </View>
                              </View>
                              {/* <View style={{ width: "40%", marginTop: 15 }}>
                                 <TouchableOpacity onPress={() => this.goToCartFomNodal()} >
                                    <View style={[s.buttonBGItem2, s.ButtonTextItem2]}>
                                       <Text style={[s.addcart]}>Add Cart</Text>
                                    </View>
                                 </TouchableOpacity>
                              </View> */}
                           </View>
                        </View>






                     </View>

                  </Modal>



            <Modal backdropColor="#00000063" propagateSwipe={true}
              animationIn="slideInDown"
              animationOut="slideOutDown"
              onBackdropPress={() => this.setState({ isModalVisible: false })}
              isVisible={this.state.isModalVisible}>

              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{
                  backgroundColor: "white", padding: 15, shadowColor: "#000",
                  borderRadius: 10, shadowOffset: { width: 0, height: 2, },
                  shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                }}>
                  <View>
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
                        Notification :</Text>
                    </View>
                    <View style={{ paddingVertical: 5 }}>
                      <Text style={{ fontSize: 16, color: "grey", lineHeight: 30 }}>
                        {this.state.modalmsg}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", width: "100%", paddingVertical: 10 }}>
                      <TouchableOpacity onPress={() => this.cancel()}
                        style={{
                          width: "45%", backgroundColor: "#e5e6eb", paddingVertical: 8,
                          borderRadius: 10, marginRight: 20
                        }}>
                        <View>
                          <Text style={{
                            fontSize: 16, fontWeight: "bold",
                            textAlign: "center"
                          }}>No
                                                    </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={{
                        width: "45%", backgroundColor: "#e46c47", paddingVertical: 8,
                        borderRadius: 10
                      }} onPress={() => this.delete()}>
                        <View>
                          <Text style={{
                            fontSize: 16, fontWeight: "bold", color: "white",
                            textAlign: "center"
                          }}>Yes
                                                    </Text>
                        </View>
                      </TouchableOpacity>


                    </View>
                  </View>
                </View>
              </View>
            </Modal>

            {/* supplier View End */}

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
              {this.state.isLoading && <Image style={{ width: 100, height: 80 }}
                source={require('../assets/img/logo-gif.gif')} />}
            </View>

          </ScrollView>}
        <Footer navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttonBGItem: {
    color: 'white',
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "bold"
  },
  ButtonTextItem: {
    backgroundColor: "black",
    marginRight: 10,
    padding: 5,
    paddingLeft:10,
    paddingRight:10,
    marginBottom: 10,
    textAlign: 'center'
  }

});

export default ItemList;