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
import { SearchBar } from 'react-native-elements';
import Swiper from 'react-native-swiper';
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
  render: function(){
    return(
      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='never'>
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
        <SearchBar    
          placeholder='Find your Trainee here' />
        <Swiper style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide1}>
            <Text style={styles.text}>Find a trainee</Text>     
            <Image resizeMode='stretch' style={styles.image} source={require('../img/tra1.jpg')} /> 
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Happy</Text>
              <Image resizeMode='stretch' style={styles.image} source={require('../img/tra1.jpg')} />
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And Healthy</Text>
             <Image resizeMode='stretch' style={styles.image} source={require('../img/tra1.jpg')} />
          </View>
        </Swiper>     
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
    image: {
    width,
    flexGrow: 1
  },
     wrapper: {
  },
    slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#70f0d4',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#db84d4',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4368db',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
  
});
module.exports = TraineeView;