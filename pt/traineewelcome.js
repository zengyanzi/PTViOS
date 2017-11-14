import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ViewPagerAndroid,
  BackAndroid,
  ScrollView,
  TouchableOpacity,
  Navigator,
  AsyncStorage
} from 'react-native';
//navigation
var _navigator;
import URLnetowrk from '../pub/network';
BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator == null){
    return false;
  }
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});
var TraineewelcomeView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    AsyncStorage.setItem("type",'trainee');
    var type = AsyncStorage.getItem('type',(err, result) => {
      console.log(result);
    });
    return {
    };
  },
  render: function(){
    return (
      <ScrollView
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps="always"
      >
       <View style={styles.maincontain}>
         <Image source={require('../img/welcometrainer.png')} style={{width: 280, height: 140}} />
            <View style={styles.choose}>
              <TouchableOpacity style={styles.btn}
              onPress={() => _navigator.push({title:'TraineeregisterView',id:'traineeregister'})}>
              <Text style={styles.text}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}
             onPress={() => _navigator.push({title:'TraineeloginView',id:'traineelogin'})}>
              <Text style={styles.text}> Login</Text>
              </TouchableOpacity>
            </View>
        </View>
          <TouchableOpacity style={styles.bottom}
           onPress={() => _navigator.push({title:'Main',id:'main'})}>
            <Text style={styles.text}>Back to Choose</Text>
          </TouchableOpacity>
      </ScrollView>
    );
  }
});
var styles = StyleSheet.create({
  maincontain:
  {
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#38bda0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  choose:{
    flexDirection:'row'
  },
  btn:{
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 50,
     borderRadius: 5,
     width:120,
     marginTop: 100,
     marginLeft:20,
  },
  text:{
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFF'
  },
  bottom:{
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 50,

  },
});

module.exports = TraineewelcomeView;
