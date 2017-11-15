import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ViewPagerAndroid,
  BackAndroid,
  ScrollView,
  Navigator,
  Linking,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Picker,
  ListView,
  Alert
} from 'react-native';
import Dimensions from 'Dimensions';
import Swipeout from 'react-native-swipeout';
import URLnetowrk from './network';
import StarRating from 'react-native-star-rating';
import t from 'tcomb-form-native';
var screenW = Dimensions.get('window').width;
var Form =t.form.Form;
var Gym = t.struct({
  name: t.String,              // a required string
  slogan:t.String,
  open:t.String,
  contact:t.Number,
  location:t.String,
  description:t.String
  //rememberMe: t.Boolean        // a boolean
});
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
var _navigator ;
var Gymcreate = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state = {
    };
    return {
    };
  },
   _save:function(){
    var value = this.refs.form.getValue();
    if (value!=null) {
      var name = value["name"];
      var opendate=value["open"];
      var slogan = value["slogan"];
      var location = value["location"];
      var contact =value["contact"];
      var description=value["description"];
      var url=URLnetowrk+'create_gym.action';
      url += '?name='+name+'&location='+location+'&opendate='+opendate+'&description='+description+'&contact='+contact+'&slogan='+slogan;
      console.log(url);
      fetch(url).then(function(response) {
        return response.json();
      }).then(function(res) {
        if (res["data"]!=null) {
          console.log(res);
            _navigator.push({
            title:'ThomeView',
            id:'Thome',
          })
        }
        else{
           Alert.alert('Fail to display','Please check your data');
        }
      })
    }else{
        Alert.alert('Sorry','Please input your information ');
    }

  },
  render: function(){
    return(
       <ScrollView
          contentContainerStyle={{flex:1}}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='never'>
        <View style={styles.maincontain}>
          <View style={[styles.Top,styles.Bottomline]}>
            <View style={[styles.Topbar,styles.Left]}>
                <TouchableOpacity
                    onPress={() => _navigator.jumpBack()}>
                  <Image source={require('../img/back.png') }/>
                 </TouchableOpacity>
            </View>
            <View style={styles.Topbar}>
              <Text style={{color:'#ffffff',fontSize:18,position:'absolute',left:-60}}>Create A New Gym</Text>
            </View>
              <View style={[styles.Topbar,styles.Right]}>
            </View>
          </View>
          <View>

          <Form
              ref="form"
              type={Gym}
          />
          </View>
          <View>
            <TouchableOpacity style={styles.btn}
              onPress={this._save}>
              <Text style={{color:'#ffffff',fontSize:18}}>Save</Text>
             </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  Top:{
   flexDirection: 'row',
   height:50,
   alignItems: 'center',
   backgroundColor:'#38bda0',
   justifyContent: 'space-between',
   marginTop:20,
   marginBottom:0
 },
 Bottomline:{
   borderBottomWidth:2,
   borderColor:'gray',
 },
 Topbar:{
   flex:2,
   flexDirection: 'row',
   marginBottom:10,
 },
  Left:{
   flexDirection: 'row',
   marginBottom:0
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
  button: {
    margin:5,
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cdcdcd',
  },
  btn:{
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 30,
     borderRadius: 5,
   },
});
module.exports = Gymcreate;
