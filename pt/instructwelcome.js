import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Navigator,
  AsyncStorage
} from 'react-native';
//navigation
import URLnetowrk from './network';
var _navigator;
var InstructwelcomeView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    AsyncStorage.setItem("type",'instructor');
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
        keyboardShouldPersistTaps="never"
      >      
       <View style={styles.container}>
       </View>
       <View style={styles.maincontain}>
         <Image source={require('../img/welcomeinstruct.png')} style={{width: 280, height: 140}}  />
            <View style={styles.choose}>
              <TouchableOpacity style={styles.btn}
              onPress={() => _navigator.push({title:'InstructregisterView',id:'instructregister'})}>
              <Text style={styles.text}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}
             onPress={() => _navigator.push({title:'InstructloginView',id:'instructlogin'})}>
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
  container:{
    flex: 1,
    backgroundColor: '#38bda0',
  },
  Top:{
    height:50,
    alignItems: 'center',
    backgroundColor:'#38bda0',
    justifyContent: 'center',
  },
  WelcomeText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: '#d7499a', 
  },
  maincontain:
  {
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#38bda0',
    justifyContent: 'center',
    alignItems: 'center',
  },
   logo:{
    width:160,
    height:160,
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
    fontSize: 16,
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

module.exports = InstructwelcomeView;