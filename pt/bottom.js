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
import TabNavigator from 'react-native-tab-navigator';
import Dimensions from 'Dimensions';
import PlanView from './plan.js';
import URLnetowrk from '../pub/network';
import SwipeoutExample from './SwipeoutExample.js';
import SwipeableExample from './swipeable-example.js'
var screenW = Dimensions.get('window').width;
var _navigator ;
var BottomView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state = {
      selectedTab: '',
    };
    return {
       selectedTab:this.state.selectedTab,
    };
  },
  render: function(){ 
    var TrainerView =(
      <View style={styles.container}>
        <Text>find your trainer here</Text>
      </View>    
    );
    var ProfileView =(
      <View style={styles.container}>
        <Text>here is the profile</Text>
      </View>    
    );
    return (
      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps="always">
        <View style={styles.maincontain}>
          <TabNavigator
            tabBarStyle={{ height: 60 }}
          >
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Plan'}
                title="Plan"
                renderIcon={() => <Image  source={require('../img/plan_normal.png') }/>}
                renderSelectedIcon={() => <Image  source={require('../img/plan_pressed.png') }/>}
              onPress={() => this.setState({ selectedTab: 'Plan' })}>
              <PlanView {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Record'}
                title="Record"
                renderIcon={() => <Image  source={require('../img/record_normal.png') }/>}
                renderSelectedIcon={() => <Image  source={require('../img/record_pressed.png') }/>}
                onPress={() => this.setState({ selectedTab: 'Record' })}       
                >
               <SwipeoutExample {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Gym'}
                title="Gym"
                renderIcon={() => <Image  source={require('../img/gym_normal.png') }/>}
                renderSelectedIcon={() => <Image  source={require('../img/gym_pressed.png') }/>}
                onPress={() => this.setState({ selectedTab: 'Gym' })}       
                >
                <SwipeableExample {...this.props}/>            
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Trainer'}
                title="Trainer"
                renderIcon={() => <Image  source={require('../img/trainer_normal.png') }/>}
                renderSelectedIcon={() => <Image  source={require('../img/trainer_pressed.png') }/>}
                onPress={() => this.setState({ selectedTab: 'Trainer' })}       
                >
                 {TrainerView}
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Profile'}
                title="Profile"
                renderIcon={() => <Image  source={require('../img/profile_normal.png') }/>}
                renderSelectedIcon={() => <Image source={require('../img/profile_pressed.png') }/>}
                onPress={() => this.setState({ selectedTab: 'Profile' })}       
                >
                 {ProfileView}
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

});

module.exports = BottomView;