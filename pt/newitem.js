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
  Modal,
  TouchableHighlight,
  ListView
} from 'react-native';
var Slider = require('react-native-slider');
import { Icon } from 'react-native-elements';
import DatePicker from './date.js';
import Dimensions from 'Dimensions';
import URLnetowrk from '../pub/network';
import { FormLabel, FormInput } from 'react-native-elements';
var screenW = Dimensions.get('window').width;
var _navigator ;
var NewitemView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    function floor (d) {
      return Math.floor(d);
    }
    this.state = {
      value: 0.2,
      sportdate:'10-02-2017',
      userdefined:['userdefined']
    };
    return {
      value:this.state.value,
      sportdate:this.state.sportdate,
      userdefined:this.state.userdefined
    };
  },
  componentWillMount() {
    let _that=this;
    AsyncStorage.getItem('userid',(err, result) => {
      console.log(result);
      var url = URLnetowrk+'item.action';  
      fetch(url).then(function(response) {  
        return response.json();
      }).then(function(res) { 
        console.log(res["data"]);
        if (res["data"]!=null) {
           //get the sport item name from the database
          var sportobj=res["data"];
          var arr=new Array();
          for(i in sportobj){   
            arr.push(sportobj[i]["name"]);
          }
          console.log(arr);
          _that.setState({
              sportname:arr
          })
        }else{
          Alert.alert('Fail to display','Please check your data'); 
        }          
       });
    });  
  },
_submit:function(){
    console.log(this.state.sportselected);
    var item_id=0;
    var sportsize=this.state.value;
    var day=this.state.date;
    AsyncStorage.getItem('userid',(err, result) => {
      console.log(result);
      var trainee_id=result;
      var urlsave=URLnetowrk+'additem2day.action'; 
      urlsave += '?trainee_id='+trainee_id+'&day='+day+'&item_id='+item_id+'&sportsize='+sportsize;
      console.log(urlsave);
      fetch(urlsave).then(function(response) {  
        return response.json();
      }).then(function(res) {
        console.log(res);
        if (res["data"]!=null) {
        _navigator.push({
          title:'ThomeView',
          id:'Thome',
        })
        }else{
          Alert.alert('Fail to submit;','Please check your data'); 
        }
      });
    });
 },
  render: function(){
    return(
      <ScrollView 
          contentContainerStyle={{flex:1}}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps="never">
        <View style={styles.maincontain}>
          <View style={[styles.Top,styles.Bottomline]}>
            <View style={[styles.Topbar,styles.Left]}>
              <TouchableOpacity 
                  onPress={() => _navigator.jumpBack()}>
                <Image source={require('../img/back.png') }/>
              </TouchableOpacity> 
            </View>
            <View style={styles.Topbar}>
              <Image source={require('../img/ptv_sized.png') }/>
            </View>
            <View style={[styles.Topbar,styles.Right]}>             
            </View>
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
            <Text style={styles.text}>Can't find your item</Text>
            <Picker 
                prompt="Please choose user-defined item"
                style={{width:200,alignItems:'center'}}
                selectedValue={this.state.sportselected}
                onValueChange={(value) => this.setState({sportselected: value})}>       
                   { this.state.userdefined.map((v,i) => {
                      return <Picker.Item
                               key={i}
                               value={v}
                               label={v} />
                   }) }
             
            </Picker>
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
module.exports = NewitemView;