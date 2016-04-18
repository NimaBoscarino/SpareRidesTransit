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
        style={styles.container}>
       <StatusBar
         backgroundColor="#008028"
         barStyle="light-content" />
        <ToolbarAndroid
          style={styles.toolbar}
          title="Transit App"
          titleColor="white" />
        <Image 
        source={{uri: 'http://maps.googleapis.com/maps/api/staticmap?center=' + this.state.Lat + ', ' + this.state.Lon + '&zoom=15&size=640x400'}}
        style={{width: 640, height: 400}} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

  },
  toolbar: {
    height: 56,
    backgroundColor: '#009831',

  },
  title: {
    fontWeight: '500',
  },
});


AppRegistry.registerComponent('SpareRidesTransit', () => SpareRidesTransit);
