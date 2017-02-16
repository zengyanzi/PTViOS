
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

var Slider = require('react-native-slider');
import Dimensions from 'Dimensions';
import DatePicker from './date.js';
import Topview from './top.js';
var screenW = Dimensions.get('window').width;


var _navigator ;


var AdditemtodayView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    function floor (d) {
            return Math.floor(d);
        }
    this.state = {
    value: 0.2,
    sportclass:1,
    date:''
    };
    return {
     value:this.state.value,
     sportclass:this.state.sportclass,
     date:this.state.date


    };

  },
  _submit:function(){
    var item_id=this.state.sportclass;
    console.log(item_id);
    var day=this.state.date;
    console.log(day);
    var sportsize=this.state.value;
    console.log(sportsize);
    AsyncStorage.getItem('planid',(err, result) => {
      console.log(result);
      var trainee_id=result;

      var url = 'http://www.zhimainz.com:8080/pt_server/additem2day.action';
      // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
      url += '?trainee_id='+trainee_id+'&item_id='+item_id+'&day='+day+'&sportsize='+sportsize;
      fetch(url).then(function(response) {  
            return response.json();
          }).then(function(res) {
          console.log(res);
        })
    })
  },

 render: function(){
      return(
        <ScrollView 
            contentContainerStyle={{flex:1}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps="never">
          <View style={styles.maincontain}>
            <View>
              <Topview {...this.props}/>
            </View>
            <View>
              <Text style={styles.text}>Please Choose the Date</Text>
              <DatePicker
                style={styles.datepicker}
                date={this.state.date}
                mode="date"
                placeholder="Date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({date: date});}}/>
            </View>
            <View>
                <Text style={styles.text}>Please Choose the sport item</Text>
                <Picker 
                  prompt="Please choose sportclass"
                  style={{width:200,color:'#fff',alignItems:'center'}}
                  selectedValue={this.state.sportclass}
                  onValueChange={(value) => this.setState({sportclass: value})}>
                  <Picker.Item label="CHEST" value="1"/>
                  <Picker.Item label="BACK" value="2" />
                  <Picker.Item label="lEGS" value="3" />
                  <Picker.Item label="SHOULDERS" value="4" />
                  <Picker.Item label="STOMACH" value="5" />
              </Picker>
            </View>
            <View style={styles.slider}>
              <Text style={styles.text}>Please Choose the sport size</Text>
              <Slider 
                value={this.state.value}
                maximumValue={1000}
                step={0.5}
                trackStyle={customStyles2.track}
                thumbStyle={customStyles2.thumb}
                thumbTouchSize={{width: 50, height: 40}}
                minimumTrackTintColor='#2cb395'
                onValueChange={(value) => Math.floor(this.setState({value}))} />
              <Text style={styles.text}>Value:{this.state.value} </Text>
            </View>
            <View>
              <TouchableOpacity style={styles.btn}
              onPress={this._submit}>
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
module.exports = AdditemtodayView;