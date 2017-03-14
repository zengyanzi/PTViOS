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
      data:[
      [{
        "v": 49,
        "name": "apple"
      }],
      [{
        "v": 69,
        "name": "banana"
      }],
      [{
        "v": 15,
        "name": "grape"
      }]
    ],
    sportselected:'',
      sportname:['BB BENCH PRESS', 'DB FLYS', 'INCLINE DB BENCH','Rower','Treadmill']
  };

}


  //set the item and data
componentWillMount() {
        let _that=this; 
        
        var urlitem = 'http://47.90.60.206:8080/pt_server/item.action';  
            fetch(urlitem).then(function(response) {  
                    return response.json();
                  }).then(function(res) { 
                   
                     if (res["data"]!=null) {
                     //get the sport item name from the database
                     var sportobj=res["data"];
                     var arr=[];
                     for(i in sportobj){
                      
                      arr.push(sportobj[i]["name"]);
                     }
                     console.log(arr);
                      _that.setState({
                        sportname:arr
                    })
                    }else{
                      Alert.alert('Fail to display','Please check your data'); 
                }
                
             
             });
        AsyncStorage.getItem('userid',(err, result) => {
          console.log(result); 
          function format (d) {
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        }
        var today =new Date();
        var end = format(today);
        var day1=new Date(today.getTime() - (1000* 60 * 60 * 24)*6);
        var startday=format(day1);
        var trainee_id=result;
        console.log(trainee_id);
        console.log(startday);
        console.log(end);
        var url = 'http://www.zhimainz.com:8080/pt_server/stat.action';
          // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
          url += '?trainee_id='+trainee_id+'&start='+startday+'&end='+end;
          console.log(url);
          fetch(url).then(function(response) { 
                return response.json();
              }).then(function(res) {
              console.log(res);
                if (res["data"]!=null) {
                  var arr=[]
                  for (var i = 0; i < res["data"].length; i++) {
                    var obj={}
                    obj.v =res["data"][i]["energy"];
                    obj.name=res["data"][i]["day"];
                    arr.push(obj)
                  };
                  console.log(arr);
                  
                  var chartdata=[];
                  for (var i = 0; i < arr.length; i++) {
                    var arrt=[];
                    arrt.push(arr[i]);
                    chartdata.push(arrt);
                    
                  };
                  _that.setState({
                    data:chartdata
                  })
                 
                console.log(chartdata);
                 
        
              }else{
                Alert.alert('Fail to display','Please check your data'); 
              }
        });
      });

  }  
  render() {
    
    let data=this.state.data;

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
          selectedValue={this.state.sportselected}
          onValueChange={(value) => this.setState({sportselected: value})}>
                    { this.state.sportname.map((s, i) => {
                        return <Picker.Item
                                 key={i}
                                 value={s}
                                 label={s} />
                     }) }
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