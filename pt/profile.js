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
import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import { List, ListItem } from 'react-native-elements';
var screenW = Dimensions.get('window').width;
var _navigator ;
const list = [
  {
    title: 'gender',
    icon: 'person'
  },
  {
    title: 'birthday',
    icon: 'date-range'
  },
  {
    title: 'height',
    icon: 'tag-faces'
  },
    {
    title: 'initial weight',
    icon: 'bookmark'
  },
    {
    title: 'taget weight',
    icon: 'star'
  },
   {
    title: ' BMI',
    icon: 'fingerprint'
  },
]
var ProfileView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
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
    return(
      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps="always">
        <View style={styles.maincontain}>
          <View style={[styles.Top,styles.Bottomline]}>
            <TouchableOpacity 
              onPress={() => _navigator.push({title:'Additemtoday',id:'additemtoday'})}>
                <Image source={require('../img/add_pressed.png') }/>
            </TouchableOpacity> 
            <View style={styles.Topbar}>
            </View>     
            <View style={styles.right}>
              <TouchableOpacity 
                      onPress={() => _navigator.push({title:'ChartView',id:'chart'})}>
                <Image source={require('../img/chart-pressed.png') }/>
              </TouchableOpacity> 
            </View>
          </View>
          <View>
          </View>
          <View >
            <List>
              <ListItem
                roundAvatar
                title='Zeng Jenny'
                subtitle={
                  <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>zeng@gmail.com</Text>
                  </View>
                }
                avatar={require('../img/profile_normal.png')}
              />
            </List>
            <List>
              {
                list.map((item, i) => (
                  <ListItem
                    key={i}
                    title={item.title}
                    leftIcon={{name: item.icon}}
                  />
                ))
              }
            </List>
          </View>  
          <View >
            <TouchableOpacity style={styles.btn}
            onPress={this._logout}>
            <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
          </View>       
        </View>   
      </ScrollView>
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
     justifyContent: 'space-between',
  },
  Bottomline:{
    borderBottomWidth:2,
    borderColor:'gray'
  },

  Topbar:{
    flex:2,
    flexDirection: 'row',

  },
   Left:{
    flex:1,
    flexDirection: 'row',
  },
  Right:{
  flex:1,
  flexDirection: 'row',

  },
  maincontain:
  {
    flex: 1,
    backgroundColor: '#38bda0',
    flexDirection:'column',

  },
   subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
    btn:{
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 30,
     borderRadius: 5,
   }
});
module.exports = ProfileView;