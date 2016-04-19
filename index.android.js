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

var transitData = require('./buses.json');

var bus = transitData.buses[0];

var BusList = React.createClass({

  //toDO: make this randomly pick from buses in Bus List json
  //toDo: make this click to drop down options
  render: function() {
    return (
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
        <View
          style={styles.toolbar} >
          <Image
            resizeMode='contain'
            source={{uri: 'http://www.woo22.com/images/search.png'}}
            style={{flex: 0.2, width: 35, height: 35, marginTop: 10,}} />
          <TextInput
            style={styles.search}
            placeholder="Search or Address"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
        <ScrollView>

          <Image 
          source={{uri: 'http://maps.googleapis.com/maps/api/staticmap?center=' + this.state.Lat + ', ' + this.state.Lon + '&zoom=15&size=640x400'}}
          style={{width: 640, height: 400}} />
          <BusList />
          <BusList />
          <BusList />
          <BusList />
          <BusList />
          <View style={styles.busListItem}>
              <Text style={styles.busTextMed}>Show Inactive Lines</Text>
          </View>
        </ScrollView>
      </View>
    );
  },
});

var styles = StyleSheet.create({

  page: {
    flex: 1,
  },

  busListItem: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00619E',
    borderBottomWidth: 2,
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
    height: 56,
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
});


AppRegistry.registerComponent('SpareRidesTransit', () => SpareRidesTransit);
