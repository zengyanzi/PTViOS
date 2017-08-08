import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Navigator,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Picker,
  ListView
} from 'react-native';
import Dimensions from 'Dimensions';
import Swipeout from 'react-native-swipeout';
import URLnetowrk from '../pub/network';
var screenW = Dimensions.get('window').width;
var _navigator ;
var TopView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state = {
    };
    return {
    };
  },
  _editplan:function(){
     _navigator.push({
      title:'TraineeloinView',
      id:'traineelogin'
    })
   },
  render: function(){
    return(
      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps="always">
        <View style={styles.maincontain}>
          <View style={[styles.Top,styles.Bottomline]}>
            <View style={[styles.Topbar,styles.Left]}>
              <TouchableOpacity 
                  onPress={() => _navigator.push({title:'CreateplanView',id:'createplan'})}>
                <Image source={require('../img/setting_normal.png') }/>
               </TouchableOpacity> 
            </View>
            <View style={styles.Topbar}>
              <Image source={require('../img/ptv_sized.png') }/>
            </View>
            <View style={[styles.Topbar,styles.Right]}>
              <TouchableOpacity 
                  onPress={() => _navigator.push({title:'Additemtoday',id:'additemtoday'})}>
                <Image source={require('../img/add_pressed.png') }/>
              </TouchableOpacity> 
            </View>
          </View> 
        </View>
      </ScrollView>
    );
  },

});

var styles = StyleSheet.create({
   container:{
    flex: 1,
    backgroundColor: '#38bda0',
    justifyContent: 'center',
  },
  Top:{
    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    backgroundColor:'#38bda0',
    justifyContent: 'center',
  },
  Bottomline:{
    borderBottomWidth:2,
    borderColor:'gray'
  },

  Topbar:{
    flex:1,
    alignItems: 'center',

  },
  Left:{
    position: 'absolute', 
    top: 5, 
    left: 5
  },
  Right:{
    position: 'absolute', 
    top: 5, 
    right: 5,
  },
  maincontain:
  {
    flex: 1,
    backgroundColor: '#38bda0',
    flexDirection:'column',

  },
  header:{

    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    backgroundColor:'#fff',
    justifyContent: 'center',

  },
});
module.exports = TopView;