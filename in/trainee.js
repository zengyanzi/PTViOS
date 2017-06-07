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
  Alert,
  ListView
} from 'react-native';

import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import ScrollableTabView , { ScrollableTabBar, }from'react-native-scrollable-tab-view';
import { SearchBar } from 'react-native-elements'
import Swiper from 'react-native-swiper';
import AddtraineeView from './addtrainee';
import TrainneelistView from './traineelist';
import URLnetowrk from '../pub/network';

var width = Dimensions.get('window').width;
var _navigator ;
var TraineeView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator; 
    this.state = { 
    };
    return {
    };
  },   
_search:function(text){
    var query=this.state.keyword;
    var url = URLnetowrk+''; // get the Trainee 
    url+= '?query='+query;
    console.log(url);
    fetch(url).then(function(response) {  
       return response.json();
    }).then(function(res) {
      console.log(res);
      if (res["data"].length!=0) {
        console.log(res);
        _navigator.push({
          title:'DetailGymView',
          id:'detailgym',
          params:{data:res["data"][0]}
        })
      }else{
        Alert.alert (
          'Sorry',
          'User not found'
        )
      }
    });
  },
  render: function(){
    return(
      <ScrollView 
          contentContainerStyle={{flex:1}}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps="never">
        <View style={[styles.Top,styles.Bottomline]}>
        </View>
        <SearchBar
            round
            onSubmitEditing={() => this._search()}
            onChangeText={(text) => this.setState({keyword: text})}
            placeholder='Add your Trainee here' />                          
        <TrainneelistView {...this.props}/> 
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
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: '#38bda0',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height:400,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
module.exports = TraineeView;