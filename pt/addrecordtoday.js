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
import URLnetowrk from '../pub/network';
import { Icon } from 'react-native-elements';
var screenW = Dimensions.get('window').width;
var _navigator ;
var AddrecordtodayView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    function floor (d) {
        return Math.floor(d);
    }
    this.state = {
      value: 0.2,
      sportname:[],
      sportselected:'Rower',
    };
    return {
      value:this.state.value,
      sportname:this.state.sportname,
      sportselected:this.state.sportselected,
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
        if (res["data"]!=null) {
       //get the sport item name from the database
          var sportobj=res["data"];
          var arr=[];
          for(i in sportobj){
            arr.push(sportobj[i]["name"]);
          }
          _that.setState({
            sportname:arr,
          })
        }else{
          Alert.alert('Fail to display','Please check your data');
        }
     });
    });
  },
_submit:function(){
  console.log(this.state.sportselected);
  var itemname=this.state.sportselected;
  var item_id;
  var sportsize=this.state.value;
  var day=this.state.date;
  AsyncStorage.getItem('userid',(err, result) => {
    console.log(result);
    var trainee_id=result;
    var url = URLnetowrk+'item.action'; // get the item data again
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(res) {
      if (res["data"]!=null) {
      //find the id of selected item
        console.log(res["data"]);
        for(i in res["data"]){
          if(itemname==res["data"][i]["name"]){
           item_id=res["data"][i]["id"];
          }
        }
        console.log(item_id);
        var urlsave=URLnetowrk+'addrecord2day.action';
        urlsave += '?trainee_id='+trainee_id+'&day='+day+'&item_id='+item_id+'&sportsize='+sportsize;
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
        keyboardShouldPersistTaps="always">
      <View style={styles.maincontain}>
       <View style={[styles.Top,styles.Bottomline]}>
          <View style={[styles.Topbar,styles.Left]}>
              <TouchableOpacity
                  onPress={() => _navigator.jumpBack()}>
                <Image source={require('../img/back.png') }/>
               </TouchableOpacity>
          </View>
          <View style={styles.Topbar}>
          </View>
          <View style={[styles.Topbar,styles.Right]}>
              <TouchableOpacity>
                      <Icon     name='save'   color='#fff' onPress={this._submit} />
              </TouchableOpacity>
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
            <Text style={styles.text}>Please Choose the sport item</Text>
            <Picker
              prompt="Please choose sportclass"
              style={{width:300}}
              itemStyle={{color:'white'}}
              selectedValue={this.state.sportselected}
              onValueChange={(value) => this.setState({sportselected: value})}>
                { this.state.sportname.map((s, i) => {
                    return <Picker.Item
                             key={i}
                             value={s}
                             label={s} />
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
  Top:{
    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    backgroundColor:'#38bda0',
    justifyContent: 'center',
    marginTop:20,
    marginBottom:0
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
    marginTop:5,
    top: 12,
    right: 5,
  },
  maincontain:
  {
    flex: 1,
    backgroundColor: '#38bda0',
    flexDirection:'column',
  },
  text:{
    fontSize:18,
    color:'#fff',
  },
  datepicker:{
    width:200,
  },

});
module.exports = AddrecordtodayView;
