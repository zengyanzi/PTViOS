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
      description: 'Choose your account',
      img:require('./img/1.png'),
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
      img: require('./img/2.png'),
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
      description: 'View your record',
      img: require('./img/3.png'),
      backgroundColor: '#338fff',
      imgStyle: {
         width: 150,
         height: 260,
      },
      fontColor: '#fff',
      level: 10,
    },
    {
      title: 'Step 4',
      description: 'Find the GYM nearby',
      img: require('./img/4.png'),
      backgroundColor: '#6ebe1f',
      imgStyle: {
         width: 150,
         height: 260,
      },
      fontColor: '#fff',
      level: 10,
    },
    {
      title: 'Step 5',
      description: 'Find your Private trainer',
      img: require('./img/5.png'),
      backgroundColor: '#d7499a',
      imgStyle: {
         width: 150,
         height: 260,
      },
      fontColor: '#fff',
      level: 10,
    },
    {
      title: 'Step 6',
      description: 'Keep fit ',
      img: require('./img/6.png'),
      backgroundColor: '#338fff',
      imgStyle: {
         width: 150,
         height: 260,
      },
      fontColor: '#fff',
      level: 10,
    }
    ];
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