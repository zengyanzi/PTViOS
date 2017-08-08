import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  navigator,
} from 'react-native';
var t = require('tcomb-form-native');
import DatePicker from './date.js';
import URLnetowrk from '../pub/network';
var Form =t.form.Form;
var _ = require('lodash');
var _navigator ;
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
t.form.Form.stylesheet.controlLabel.normal.color = '#ffffff';
t.form.Form.stylesheet.textbox.normal.color = '#2cb395';
t.form.Form.stylesheet.textbox.normal.backgroundColor = '#ecf0f1';
var Person = t.struct({
  Name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  phone:t.maybe(t.Number),  
  email:t.String,             // a required number
  password:t.String,            // a required number
  //rememberMe: t.Boolean        // a boolean
});
var options = {
   fields: {
    password: {
      password: true,
      secureTextEntry: true,
    },

  }
}; // optional rendering options (see documentation)
var TraineeregisterView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    return {
    };
  },
   _register: function () {
    var value = this.refs.form.getValue();
    var name = value["name"];
    var surname = value["surname"];
    var phone = value["phone"];
    var password = value["password"];
    var email = value["email"];
    var url = URLnetowrk+'traineeregister.action';
    url += '?name='+name+'&surname='+surname+'&email='+email+'&phone='+phone+'&password='+password;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(res){
      console.log(res);

    }).catch((error)=>{
      console.log(error);
    });
    _navigator.push({
      title:'TraineeloinView',
      id:'traineelogin'
    })
  },
  render: function(){
    return (
      <ScrollView 
            contentContainerStyle={{flex:1}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps="always"
      >
        <View style={styles.maincontain}>
          <View style={styles.formstyle}>
            <Form
              ref="form"
              type={Person}
              options={options}/>
            <TouchableHighlight style={styles.button} onPress={this._register} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>
          </View>
        </View>
        <TouchableOpacity style={styles.bottom}
             onPress={() => _navigator.push({title:'TraineewelcomeView',id:'traineewelcome'})}>
          <Text style={{color:"white",fontSize:18}}>Back</Text>
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
 },
  birthday:{
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
 },
   logo:{
    width:160,
    height:160,
  },
  text:{
    fontWeight: 'bold',
    fontSize: 14,
    color: '#241003',
  },
   buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#2cb395',
    borderColor: '#2cb395',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  formstyle:{

    borderRadius: 8,
    borderColor: '#2cb395',
  },  
  bottom:{
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 50,
  },
});

module.exports = TraineeregisterView;