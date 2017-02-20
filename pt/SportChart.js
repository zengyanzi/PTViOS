import React,{Component} from 'react';


import {
   Image,
  View,
  Text,
  StyleSheet,
  navigator,
  Animated,
  Picker,
  ScrollView,
  AsyncStorage
} from 'react-native';

import { Bar } from 'react-native-pathjs-charts';


var _navigator ;

class SportChartView extends React.Component {

  constructor() {
    super();
      

    this.state = {
      sport:'',
  };

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
        <View style={styles.container}>

        <Bar data={data} options={options} accessorKey='v'/>
        <Picker
          prompt="Please choose sportclass"
          style={{width:300}}
          selectedValue={this.state.type}
          onValueChange={(value) => this.setState({type: value})}>
          <Picker.Item label="CHEST" value="CHEST"/>
          <Picker.Item label="BACK" value="BACK" />
          <Picker.Item label="lEGS" value="lEGS" />
          <Picker.Item label="SHOULDERS" value="SHOULDERS" />
          <Picker.Item label="STOMACH" value="STOMACH" />
        </Picker>
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
      flex:1,
    height:50,
    width:200,
  },
   
});
export default SportChartView;