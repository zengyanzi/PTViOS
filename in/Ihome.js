
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
import TabNavigator from 'react-native-tab-navigator';
import Dimensions from 'Dimensions';
import MytraineePlanView from './mytraineeplan.js';
import MyTraineeRecordView from './mytraineerecord.js';
import InstructProfileView from './instrutprofile.js';
import GymView from '../pub/gym.js';
import TraineeView from './trainee.js';
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
var IhomeView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state = {
      selectedTab: 'Plan',
    };
    return {
       selectedTab:this.state.selectedTab,
    };
  },
 render: function(){ 
    return (
      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='never'
      >
        <View style={styles.maincontain}>
          <TabNavigator tabBarStyle={{ height: 60 }} >
            <TabNavigator.Item
              selected={this.state.selectedTab === 'Plan'}
              title="Plan"
              renderIcon={() => <Image  source={require('../img/plan_normal.png') }/>}
              renderSelectedIcon={() => <Image  source={require('../img/plan_pressed.png') }/>}
              onPress={() => this.setState({ selectedTab: 'Plan' })}
            >
              <MytraineePlanView {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'Record'}
              title="Record"
              renderIcon={() => <Image  source={require('../img/record_normal.png') }/>}
              renderSelectedIcon={() => <Image  source={require('../img/record_pressed.png') }/>}
              onPress={() => this.setState({ selectedTab: 'Record' })}       
            >
              <MyTraineeRecordView {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'Gym'}
              title="Gym"
              renderIcon={() => <Image  source={require('../img/gym_normal.png') }/>}
              renderSelectedIcon={() => <Image  source={require('../img/gym_pressed.png') }/>}
              onPress={() => this.setState({ selectedTab: 'Gym' })}       
            >
              <GymView {...this.props}/>                       
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'Trainee'}
              title="Trainee"
              renderIcon={() => <Image  source={require('../img/trainer_normal.png') }/>}
              renderSelectedIcon={() => <Image  source={require('../img/trainer_pressed.png') }/>}
              onPress={() => this.setState({ selectedTab: 'Trainee' })}       
            >
              <TraineeView {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'Profile'}
              title="Profile"
              renderIcon={() => <Image  source={require('../img/profile_normal.png') }/>}
              renderSelectedIcon={() => <Image source={require('../img/profile_pressed.png') }/>}
              onPress={() => this.setState({ selectedTab: 'Profile' })}       
            >
              <InstructProfileView {...this.props}/>
            </TabNavigator.Item>
          </TabNavigator>
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
  WelcomeText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: '#d7499a', 
  },
  maincontain:
  {
    flex: 1,
    backgroundColor: '#38bda0',
    flexDirection:'column',
  },
  choose:{
    flexDirection:'row'
  },
});
module.exports = IhomeView;