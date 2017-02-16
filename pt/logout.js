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
  ListView,
  PixelRatio,
  AsyncStorage
} from 'react-native';

import Topview from './top.js';


var _navigator ;

var LogoutView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state={
      
    };
    return {

    };
  },
  _logout: function(){
            _navigator.push({
            title:'main',
            id:'main'
           });  
      AsyncStorage.removeItem('type',(err,result)=>{
        console.log(result);
      });

      AsyncStorage.removeItem('email',(err,result)=>{
        console.log(result);
      });
      AsyncStorage.removeItem('password',(err,result)=>{
        console.log(result);
      
      });
  },
  
 render: function(){
   return (
      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps="never">
        
       <View style={styles.maincontain}>
          <Topview {...this.props}/>
          <View>
            <TouchableOpacity onPress={this._logout}>
              <View style={styles.btn}>  
                <Text style={styles.BtnText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
       </View>


      </ScrollView>
       );
  }

});

var styles = StyleSheet.create({
    maincontain:
  {
    flex: 1,
    backgroundColor: '#38bda0',
    flexDirection:'column',

  },

  btn:{
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 50,
     borderRadius: 5,
     width:240,
     marginBottom: 50,
     marginLeft:80,
  },
});

module.exports =  LogoutView;