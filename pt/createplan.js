
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
import DatePicker from './date.js';
import CheckBox from 'react-native-check-box';
import keys from './keys.json';
import PlanCreateView from './plancreate';


var screenW = Dimensions.get('window').width;


var _navigator ;

var radio_props = [
  {label: 'FUllbody', value: 1 },
  {label: 'extention', value: 2 }
];
var CreateplanView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state = {
    selectedTab: '',
    dataArray: [],
    scrollEnabled: true,
    enddate:'',
    startdate:'',
    value: 1,
    };
    return {
    selectedTab:this.state.selectedTab,
    scrollEnabled: true,
    enddate:this.state.enddate,
    startdate:this.state.startdate,
    value:this.state.value,

    };
  },





//  set for the attendance

    loadData() {
        this.setState({
            dataArray: keys
        })
    },
//  set for the attendance

    onClick(data) {
        data.checked = !data.checked;
    },
    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0)return;
        var len = this.state.dataArray.length;
        var views = [];
        for (var i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
            </View>
        )
        return views;
    },
//  set for the attendance

    renderCheckBox(data) {
        var rightText = data.name;
        var value=data.value;
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClick(data)}
                rightTextStyle={{color:"#fff",fontSize:18}}
                isChecked={data.checked}
                rightText={rightText}/>
        );
    },

    //set the submit function

  _submit:function(){
    var start=this.state.startdate;
    var end=this.state.enddate; 
    let _that=this;     
      AsyncStorage.getItem('userid',(err, result) => {
      var traineeid=result;
        AsyncStorage.getItem('planid',(err, result) => {
        console.log(result);//check the planid
        var optionplanid=result;
        console.log(start);
        console.log(traineeid);
        console.log(end);
        _that.loadData();
        var dataArray=this.state.dataArray;
        var len = this.state.dataArray.length;
        var attendance=[];
        for (var i = 0; i < len; i += 1) {
          if(dataArray[i]["checked"]){
          attendance.push(dataArray[i]["value"]);
        }

      }
        var attendanceday=attendance.join();// join the addendance number

        var url = 'http://www.zhimainz.com:8080/pt_server/createplan.action';
      // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
      url += '?traineeid='+traineeid+'&start='+start+'&end='+end+'&attendance='+attendance+'&optionplanid='+optionplanid;
      fetch(url).then(function(response) {  
            return response.json();
          }).then(function(res) {
          console.log(res);
          _navigator.push({
                  title:'ThomeView',
                  id:'Thome',
      
                   })
        })

     });
     
 
  });
},

  render: function(){

       return (

                <ScrollView 
                    contentContainerStyle={{flex:1}}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps="never">
                  <View style={styles.maincontain}>
                    
                    <View style={[styles.Top,styles.Bottomline]}>
                      <View style={[styles.Topbar,styles.Left]}>
                          <TouchableOpacity 
                              onPress={() => _navigator.jumpBack()}>
                            <Image source={require('../img/back.png') }/>
                           </TouchableOpacity> 
                      </View>
                      <View style={styles.Topbar}>
                        <Image source={require('../img/ptv_sized.png') }/>
                      </View>
                      <View style={[styles.Topbar,styles.Right]}>
                        
                      </View>
                    </View>
                  
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View>
                        <Text style={styles.text}>Start Date</Text>
                        <DatePicker
                          style={styles.datepicker}
                          date={this.state.startdate}
                          mode="date"
                          placeholder="Date"
                          format="YYYY-MM-DD"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          onDateChange={(date) => {this.setState({startdate: date});}}/>
                      </View>
                      <View>
                        <Text style={styles.text}>End Date</Text>
                        <DatePicker
                          style={styles.datepicker}
                          date={this.state.enddate}
                          mode="date"
                          placeholder="Date"
                          format="YYYY-MM-DD"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          onDateChange={(date) => {this.setState({enddate: date});}}/>
                      </View>
                    </View>
                    <View style={{flex:2}}>
                      <Text style={styles.text}>Please Choose attendance</Text>
                      {this.renderView()}
                    </View>
                    <View style={{flexGrow:1,height:180}}>
                      <Text style={styles.text}>Please Choose Your Plan</Text>
                        <PlanCreateView {...this.props}/>

                    </View>

                    <View>
                      <TouchableOpacity style={styles.btn}
                      onPress={this._submit}>
                      <Text style={styles.text}>Submit</Text>
                      </TouchableOpacity>
                    </View>


                    
                  </View>
                </ScrollView>


       );
  },

      componentDidMount() {
        this.loadData();

    },

});

var styles = StyleSheet.create({
   
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
    flexDirection: 'row',

  },
   Left:{
    flexDirection: 'row',
  },
  Right:{
    flexDirection: 'row',

  },
  maincontain:
  {
    flex: 1,
    backgroundColor: '#38bda0',
    flexDirection:'column',

  },
   text:{
    fontSize:18,
    color:'#fff',
  },
  datepicker:{
    width:200,
  },
    btn:{
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 50,
     borderRadius: 5,


  },
  item: {
        flexDirection: 'row',
    },
  line: {
        flexDirection: 'row',
        height: 0.3,
        backgroundColor: '#fff',
    },
});
module.exports = CreateplanView;