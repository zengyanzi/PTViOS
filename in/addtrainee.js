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
import URLnetowrk from '../pub/network';
import StarRating from 'react-native-star-rating';
import t from 'tcomb-form-native';
var screenW = Dimensions.get('window').width;
var Form =t.form.Form;
var Trainee = t.struct({
  name: t.String,              // a required string
  surname:t.String,
  password:t.String


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
var AddtraineeView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state = {
    };
    return {
    };
  },
   _save:function(){
    var value = this.refs.form.getValue();
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
  },
  render: function(){
    return(
        <View style={styles.maincontain}>
          <View>
          <Form 
              ref="form"
              type={Trainee}
          />
          </View> 
          <View>
            <TouchableOpacity style={styles.btn}
              onPress={this._save}>
              <Text style={styles.text}>Save</Text>
             </TouchableOpacity>
          </View> 
          <View>
            <TouchableOpacity style={styles.btn}
             onPress={() =>_navigator.jumpBack()}>
              <Text style={{color:"white",fontSize:18}}>Back</Text>
            </TouchableOpacity> 
          </View>     
        </View>

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
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#38bda0',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
    height:50,
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
module.exports = AddtraineeView;