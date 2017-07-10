import React, { Component } from 'react';
import { AppRegistry, Navigator,Alert,BackAndroid } from 'react-native';
import AppIntro from 'react-native-app-intro';
var _navigator;
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
class GuideView extends Component {
  constructor(props) {
   super(props);
     _navigator = this.props.navigator;
  this.state = {};
  }
  onSkipBtnHandle(){
    _navigator.push({
      title:'Main',
        id:'main'
    });
  } 
  doneBtnHandle(){
    _navigator.push({
      title:'Main',
        id:'main'
    });
  } 

  render() {
    const pageArray = [{
      title: 'Step 1',
      description: 'Create your plan',
      img:require('./img/wel1.png'),
      imgStyle: {
         width: 150,
         height: 260,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Step 2',
      description: 'Modify your plan',
      img: require('./img/wel2.png'),
      imgStyle: {
         width: 150,
         height: 260,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    },
    {
      title: 'Step 3',
      description: 'Submit your plan',
      img: require('./img/wel3.png'),
      backgroundColor: '#a4b602',
      imgStyle: {
         width: 150,
         height: 260,
      },
      fontColor: '#fff',
      level: 10,
    }];
    return (
      <AppIntro
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        pageArray={pageArray}
      />
    );
  }
}


module.exports = GuideView;