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
} from 'react-native';

var MOCKED_TRANSIT_DATA = [
  {
    is_live: 'false',
    is_favourite: 'false',
    lineID: '144', 
    incoming: { 
      destination: 'Metrotown',
      closestStop: 'Burris/Canada Way',
      ETA: '2',
    },
    outgoing: { 
      destination: 'SFU',
      closestStop: 'Burris/Canada Way',
      ETA: '5',
    },
  },
];


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
    var bus = MOCKED_TRANSIT_DATA[0];

    return (
      <View
        style={styles.page}>
       <StatusBar
         backgroundColor="#008028"
         barStyle="light-content" />
        <ToolbarAndroid
          style={styles.toolbar}
          title="Transit App"
          titleColor="white" />
        <Image 
        source={{uri: 'http://maps.googleapis.com/maps/api/staticmap?center=' + this.state.Lat + ', ' + this.state.Lon + '&zoom=15&size=640x200'}}
        style={{width: 640, height: 200}} />
        <View style={styles.busList}>
          <Text style={styles.busText}>{bus.lineID}</Text>
          <Text style={styles.busText}>{bus.incoming.destination}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  busList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00619E',
  },

  toolbar: {
    height: 56,
    backgroundColor: '#009831',

  },

  title: {
    fontWeight: '500',
  },

  busText: {

    color: 'white',

  }
});


AppRegistry.registerComponent('SpareRidesTransit', () => SpareRidesTransit);
