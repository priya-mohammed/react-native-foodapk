import React, { Component } from 'react';
import {StyleSheet, Button, Dimensions, Image,View,} from "react-native";
import ContentLoader, { FacebookLoader } from 'react-native-easy-content-loader';

const s = require('../assets/css/style');
const itemWidth = Dimensions.get('window').width;

class CLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homepageLoader: false,
      itemLoader: false,
    }
  }

  componentDidMount() {
    if (this.props.forLoad == "main") {
      this.setState({ homepageLoader: true })
      this.setState({ itemLoader: false })
    } else if (this.props.forLoad == "item") {
      this.setState({ itemLoader: true })
      this.setState({ homepageLoader: false })
    }
  }



  render() {
    return (
      <View >
       
       
        <View id="main" style={{backgroundColor: "white"}}>
        

                 <Image style={{ width: 370, height: 550 }}
                source={require('../assets/img/scooter.gif')} />


          {/* <View>
          <ContentLoader
            active
            title={false}
            loading={this.state.homepageLoader}
            aShape={'square'}
            
            pRows={1}
            pHeight={[200]}
            pWidth={[itemWidth-20]}
          />
          </View>
          <View style={{ padding:10}}>
          <ContentLoader
          loading={this.state.homepageLoader}
            active
            title={false}
            aShape={'square'}
            active
            pRows={5}
            pHeight={[100, 20, 20]}
            pWidth={[220, 250, 250]}
          />
          </View>

          <View style={{ padding:10}}>
          <ContentLoader
            loading={this.state.homepageLoader}
            active
            title={false}
            aShape={'square'}
            active
            pRows={5}
            pHeight={[100, 20, 20]}
            pWidth={[220, 250, 250]}
          />
          </View> */}


        </View>



        <View id="item" style={{backgroundColor: "white"}}>
         
          {/* <FacebookLoader
            loading={this.state.itemLoader}
            active />
          <FacebookLoader
            loading={this.state.itemLoader}
            active />
          <FacebookLoader
            loading={this.state.itemLoader}
            active />
          <FacebookLoader
            loading={this.state.itemLoader}
            active /> */}

         <Image style={{ width: 370, height: 550 }}
                source={require('../assets/img/scooter.gif')} />

        </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default CLoader;