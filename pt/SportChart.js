import React,{Component} from 'react';


import {
   Image,
  View,
  Text,
  StyleSheet,
  navigator,
  Animated,
  Picker,
  AsyncStorage
} from 'react-native';

import { Bar } from 'react-native-pathjs-charts'

const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

var _navigator ;

class SportChartView extends React.Component {

  constructor() {
    super();
      

    this.state = {
      sport:''
  };

}

componentDidMount() {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['OPTIONLIST']);
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }


  _sport(sport) {

    this.setState({
      ...this.state,
      sport: sport
    });
  }

  render() {
    let data = [
      [{
        "v": 49,
        "name": "apple"
      }, {
        "v": 42,
        "name": "apple"
      }],
      [{
        "v": 69,
        "name": "banana"
      }, {
        "v": 62,
        "name": "banana"
      }],
      [{
        "v": 29,
        "name": "grape"
      }, {
        "v": 15,
        "name": "grape"
      }]
    ]

    let options = {
      width: 200,
      height: 200,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: '#2980B9',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    return (
      <View>
      <Select
            width={250}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select a Sport ..."
            onSelect={this._sport.bind(this)}>
            <Option>CHEST</Option>
            <Option>BACK</Option>
            <Option>Manitoba</Option>
            <Option>lEGS</Option>
            <Option>SHOULDERS</Option>

          </Select>
          <Text>Selected sport of : {this.state.sport}</Text>
        <OptionList ref="OPTIONLIST"/>
        <Bar data={data} options={options} accessorKey='v'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
    sportact:{
    height:50,
    width:200,
  },
});
export default SportChartView;