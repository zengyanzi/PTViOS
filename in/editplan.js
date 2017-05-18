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
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Picker,
  Alert,
  ListView
} from 'react-native';
var Slider = require('react-native-slider');
import Dimensions from 'Dimensions';
import Topview from './top.js';
import URLnetowrk from '../pub/network';
var screenW = Dimensions.get('window').width;
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
var EditPlanView = React.createClass({
//set the original data
  getInitialState: function(){
    _navigator = this.props.navigator;
    function floor (d) {
            return Math.floor(d);
        }
    this.state = {
    value: 0.2,
    sportdate:'10-02-2017',
       };
    return {
     value:this.state.value,
     sportdate:this.state.sportdate,
    };
  }, 
  //save the modify item to database
  _save:function(){
    console.log(this.state.sportselected);
    var itemname=this.state.sportselected;
    var item_id;
    var sportsize=this.state.value;
    var day=this.props.date;
    var dayplan_id=this.props.dayplan_id;
    AsyncStorage.getItem('userid',(err, result) => {
      console.log(result);
    var trainee_id=result;
    var url = URLnetowrk+'item.action'; // get the item data again 
    fetch(url).then(function(response) {  
      return response.json();
    }).then(function(res) {
      if (res["data"]!=null) {
       //find the id of selected item
        for(i in res["data"]){
          if(itemname==res["data"][i]["name"]){
             item_id=res["data"][i]["id"];
          }         
         }
        console.log(item_id);
        var urlsave=URLnetowrk+'adjustplan.action'; 
        urlsave += '?dayplan_id='+dayplan_id+'&sportsize='+sportsize;
        console.log(urlsave);
        fetch(urlsave).then(function(response) {  
          return response.json();
        }).then(function(res) {
          console.log(res);
          _navigator.push({
            title:'ThomeView',
            id:'Thome',       
          })
        });
      }else{
        Alert.alert('Fail to display','Please check your data'); 
      }         
    });
  });
 },
 render: function(){
  return(
    <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='never'>
      <View style={styles.maincontain}>
        <View>
          <Topview {...this.props}/>
        </View>
        <View>
          <Text style={styles.text}>Sport Date {this.props.date}</Text>
        </View>
        <View>
            <Text style={styles.text}>{this.props.itemname}</Text>
        </View>
        <View style={styles.slider}>
          <Text style={styles.text}>Please Choose the sport size</Text>
          <Slider 
            value={this.state.value}
            maximumValue={100}
            step={0.5}
            trackStyle={customStyles2.track}
            thumbStyle={customStyles2.thumb}
            thumbTouchSize={{width: 50, height: 40}}
            minimumTrackTintColor='#2cb395'
            onValueChange={(value) => Math.floor(this.setState({value}))} />
          <Text style={styles.text}>Sprotsize:{this.state.value} </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.btn}
          onPress={this._save}>
          <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    );
  },
});
var customStyles2 = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: '#30a935',
    borderWidth: 2,
  }
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
  },
  text:{
    fontSize:18,
    color:'#fff',
  },
  datepicker:{
    width:200,
  },
    btn:{
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 50,
     borderRadius: 5,
     width:240,
     marginTop: 50,
     marginLeft:80,
  },

});
module.exports = EditPlanView;