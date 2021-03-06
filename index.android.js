/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ToolbarAndroid,
  StatusBar,
  ListView,
  ScrollView,
  TextInput,
} from 'react-native';

var Swiper = require('react-native-swiper')

var transitData = require('./buses.json');

var buses = transitData.buses;

var BusList = React.createClass({

  propTypes: {

    busIndex: React.PropTypes.number,

  },

  //toDO: figure out how to make this iterate through all buses, but not with ListView if possible
  //toDo: make this click to drop down options
  //No I should definitely use a ListView instead of this. I'm thinking that's probably
  // why gaps show up between the items???
  // also I should have figured out how to test
  render: function() {

    bus = buses[this.props.busIndex];

    return (
      <Swiper 
        style={styles.swiper}
        height={103}
        loop={false}
        >
        <View style={styles.busListItem}>
          <View style={styles.leftList}>
            <Text style={styles.busTextBig}>{bus.lineID}</Text>
            <Text style={styles.busTextMed}>{bus.incoming.destination}</Text>
            <Text style={styles.busTextSmall}>{bus.incoming.closestStop}</Text>
          </View>
          <View style={styles.rightList}>
            <Text style={styles.busTextBig}>{bus.incoming.ETA}</Text>
            <Text style={styles.busTextSmall}>minutes</Text>          
          </View>
        </View>
        <View style={styles.busListItem}>
          <View style={styles.leftList}>
            <Text style={styles.busTextBig}>{bus.lineID}</Text>
            <Text style={styles.busTextMed}>{bus.outgoing.destination}</Text>
            <Text style={styles.busTextSmall}>{bus.outgoing.closestStop}</Text>
          </View>
          <View style={styles.rightList}>
            <Text style={styles.busTextBig}>{bus.outgoing.ETA}</Text>
            <Text style={styles.busTextSmall}>minutes</Text>          
          </View>
        </View>
      </Swiper>
    );
  },
});


var SpareRidesTransit = React.createClass({
  watchID: (null: ?number),

  getInitialState: function() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      Lat: 'unknown',
      Lon: 'unknown',
      imageHeight: 400,
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var Lat = position.coords.latitude;
        var Lon = position.coords.longitude;
        this.setState({Lat, Lon});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = position;
      this.setState({lastPosition});
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  render: function() {
    return (
      <View
        style={styles.page}>
       <StatusBar
         backgroundColor="#008028"
         barStyle="light-content" />
        <View //opting to not use the react native toolbar text input wasn't working
          style={styles.toolbar} >
          <Image
            resizeMode='contain'
            source={{uri: 'http://www.woo22.com/images/search.png'}}
            style={{flex: 0.2, width: 35, height: 35, marginTop: 15,}} />
          <TextInput
            style={styles.search}
            placeholder="Search or Address"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Image
            resizeMode='contain'
            source={{uri: 'http://i.imgur.com/JyNifci.png'}}
            style={{flex: 0.2, width: 35, height: 35, marginTop: 15,}} />
          <Image
            resizeMode='contain'
            source={{uri: 'http://ai-i3.infcdn.net/icons_siandroid/png/200/2416/2416616.png'}}
            style={{flex: 0.2, width: 35, height: 35, marginTop: 15,}} />

        </View>
        <ScrollView
          style={styles.scroller}
          onScroll={this.handleScroll} >

          <Image 
          source={{uri: 'http://maps.googleapis.com/maps/api/staticmap?markers=' + this.state.Lat + ', ' + this.state.Lon + '&zoom=15&size=640x400'}}
          style={{height:this.state.imageHeight, resizeMode: 'cover',}} />
          <BusList busIndex={0} />
          <BusList busIndex={1} />
          <BusList busIndex={2} />
          <BusList busIndex={3} />
          <BusList busIndex={4} />
          <View style={styles.busListItem}>
              <Text style={styles.busTextMed}>Show Inactive Lines</Text>
          </View>
        </ScrollView>
      </View>
    );
  },

  handleScroll: function(event: Object) {    
    var imageHeight = 400 - 5 * event.nativeEvent.contentOffset.y;

    if (imageHeight < 100 ) {
      imageHeight = 100
    }

    if (imageHeight > 400 ) {
      imageHeight = 400
    }

    this.setState({imageHeight});
  },

});

var styles = StyleSheet.create({

  page: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#004E85',
  },

  busListItem: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00619E',
    borderBottomWidth: 10, //sneaky way of not making gaps too visible
    borderBottomColor: '#004E85',
    elevation: 40,
  },

  leftList: {
    flex: 0.8,
    paddingLeft: 15,
  },

  rightList: {
    flex: 0.2,
    alignItems: 'center',
  },

  toolbar: {
    flexDirection: 'row',
    flex: 0.1,
    backgroundColor: '#009831',
    elevation: 30,
  },

  title: {
    fontWeight: '500',
  },

  busTextBig: {

    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',

  },

  busTextMed: {

    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',

  },

  busTextSmall: {

    fontSize: 12,
    color: 'white',

  },

  search: {
    flex: 0.8,
    color: 'white',
    fontSize: 25,
  },

  scroller: {

  },

});


AppRegistry.registerComponent('SpareRidesTransit', () => SpareRidesTransit);


