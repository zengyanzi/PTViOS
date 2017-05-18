import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ViewPagerAndroid,
  BackAndroid,
  navigator,
  Animated,
  AsyncStorage,
  Alert
} from 'react-native';
import {BarChart} from 'react-native-mp-android-chart';
import URLnetowrk from './pub/network';
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
class TimeChartView extends React.Component {
  constructor() {
    super();
    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data: {
        datasets: [{
          yValues: [100, 105, 102, 110, 114, 109, 105, 99, 95],
          label: 'Time Barchart',
          config: {
            color: '#2cb395',
            barSpacePercent: 40,
            barShadowColor: '#38bda0',
            highlightAlpha: 90,
            highlightColor: 'red'
          }
        }],
        xValues: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    };
  }
componentWillMount() {
        let _that=this; 
        function format (d) {
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        }
        var today =new Date();
        var end = format(today);
        var day1=new Date(today.getTime() - (1000* 60 * 60 * 24)*6);
        var startday=format(day1);

       AsyncStorage.getItem('userid',(err, result) => {
          console.log(result); 
        var trainee_id=result;
        console.log(trainee_id);
        console.log(end);
        var url = URLnetowrk+'stat.action';
          // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
          url += '?trainee_id='+trainee_id+'&start='+startday+'&end='+end;
          console.log(url);
          fetch(url).then(function(response) { 
                return response.json();
              }).then(function(res) {
              console.log(res);
                if (res["data"]!=null) {
                  var energy=[];
                  var date=[];
                  for (var i = 0; i < res["data"].length; i++) {
                    energy.push(res["data"][i]["energy"]);
                    date.push(res["data"][i]["day"]);
                  };
                  console.log(energy);
                   console.log(date);
                 _that.setState(
                  {
                    data: {
                      datasets: [{
                        yValues: energy,
                        label: 'Time Barchart',
                        config: {
                          color: '#2cb395',
                          barSpacePercent: 40,
                          barShadowColor: 'lightgrey',
                          highlightAlpha: 90,
                          highlightColor: 'red'
                        }
                      }],
                      xValues: date
                    }
                  }
                );
                

              }else{
                Alert.alert('Fail to display','Please check your data'); 
              }
        });
      });

  }
  render() {
    return (
      <View style={styles.container}>
        <BarChart
          style={styles.chart}
          data={this.state.data}
          animation={{durationX: 2000}}
          legend={this.state.legend}
          gridBackgroundColor={'#ffffff'}

          drawBarShadow={false}
          drawValueAboveBar={true}
          drawHighlightArrow={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});


export default TimeChartView;