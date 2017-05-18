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
  ListView
} from 'react-native';
import Dimensions from 'Dimensions';
import Swipeout from 'react-native-swipeout';
import ScrollableTabView , { ScrollableTabBar, }from'react-native-scrollable-tab-view';
import SportChartView from './SportChart';
import TimeChartView from './TimeChart';
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
var ChartView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state = {
    };
    return {
    };
  },
  componentWillMount() {
    AsyncStorage.getItem('userid',(err, result) => {
      console.log(result);
    });   
  },
  _editplan:function(){
       _navigator.push({
        title:'TraineeloinView',
        id:'traineelogin'
      })
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
                    onPress={() => _navigator.push({title:'CreateplanView',id:'createplan'})}>
                  <Image source={require('../../img/setting_normal.png') }/>
                </TouchableOpacity> 
            </View>
            <View style={styles.Topbar}>
              <Image source={require('../../img/ptv_sized.png') }/>
            </View>
            <View style={[styles.Topbar,styles.Right]}>
            <TouchableOpacity 
               onPress={() => _navigator.push({title:'AddrecordtodayView',id:'addrecordtoday'})}>
              <Image source={require('../../img/add_pressed.png') }/>
              </TouchableOpacity> 
            </View>
          </View>
          <ScrollableTabView           
            initialPage={1}
            renderTabBar={() => <ScrollableTabBar  />}
          >
            <ScrollView tabLabel="ChartBySport" style={styles.tabView}>
              <View style={styles.card}>
                <SportChartView {...this.props}/>
              </View>
            </ScrollView>
            <ScrollView tabLabel="ChartByTime" style={styles.tabView}>
              <View style={styles.card}>
                <TimeChartView {...this.props}/>
              </View>
            </ScrollView>
          </ScrollableTabView>       
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
    height:500,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
module.exports = ChartView;