
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
import Topview from './top.js';
var screenW = Dimensions.get('window').width;


var _navigator ;


var EditPlanView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    function floor (d) {
            return Math.floor(d);
        }
    this.state = {
    value: 0.2,
    sportdate:'10-02-2017',
    sportclass:['BB BENCH PRESS', 'DB FLYS', 'INCLINE DB BENCH','Rower','Treadmill']
    };
    return {
     value:this.state.value,
     sportdate:this.state.sportdate,
     sportclass:this.state.sportclass

    };

  },
  componentWillMount() {
    AsyncStorage.getItem('userid',(err, result) => {
                console.log(result);
              });   
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
              <Text style={styles.text}>Sport Date {this.state.sportdate}</Text>
            </View>
            <View>
                <Text style={styles.text}>Please Choose the sport item</Text>
                <Picker 
                  prompt="Please choose sportclass"
                  style={{width:200,color:'#fff',alignItems:'center'}}
                  selectedValue={this.state.sportclass}
                  onValueChange={(value) => this.setState({sportclass: value})}>
                  <Picker.Item label={this.state.sportclass[0]} value="0"/>
                  <Picker.Item label={this.state.sportclass[1]}  value="1" />
                  <Picker.Item label={this.state.sportclass[2]} value="2" />
                  <Picker.Item label={this.state.sportclass[3]} value="3" />
                  <Picker.Item label={this.state.sportclass[4]}  value="4" />
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
              onPress={this._login}>
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