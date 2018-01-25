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
import Topview from './top.js';
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
var btnsTypes = [
    { text: 'Detail', onPress: function(){ 
      _navigator.push({
        title:'PlanInfoView',
        id:'planinfo'
     })},type: 'primary',},     
];
  var detailrows = [
    {
       Calories :"457",
       text:"Rower Moderate  5 min 30 sec fast:60 sec slow",
       autoClose: true,
    }, {

      Calories :"457",
       text: "Walking Weighted Lunge  Controlled  Light 3 15  60Sec",
      autoClose: true,
    }, {

        Calories :"457",
        text: "Upper Back 18,29 30-60 sec 1 1",
      autoClose: true,
    }, {

      Calories :"457",
      text: "Bike Fast  3min  Moderate  15  60Sec",
    },    
  ];
var PlanInfoView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
      dataSource: ds.cloneWithRows(detailrows),
      scrollEnabled: true,
    };
    return {
      dataSource: this.state.dataSource,
      scrollEnabled: true,
    };
  },
//get the option 
componentWillMount() {
  let _that=this;
  var url = URLnetowrk+'optionplan.action';  
  console.log(url);
  console.log(this.props.planid);
  var optionplanid=this.props.planid;
  var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});  
  fetch(url).then(function(response) {  
    return response.json();
  }).then(function(res) { 
    if (res["data"]!=null) {
      for (var i = 0; i < res["data"].length; i++) {
        if (res["data"][i]["id"]===optionplanid) {
          var optionItems=res["data"][i]["optionItems"];
        };
        console.log(optionItems);
        var urlitem = URLnetowrk+'item.action';
        console.log(urlitem);
        fetch(urlitem).then(function(response) {  
            return response.json();
        }).then(function(result) { 
          console.log(result["data"]);
          if (result["data"]!=null) {
            var planinfo=[]
            for (var i = 0; i < result["data"].length; i++) {
              for (var j = 0; j < optionItems.length; j++) {
                if (result["data"][i]["id"]===optionItems[j]["item_id"]) {
                  var iteminfo={};
                  iteminfo.itemname=result["data"][i]["name"];
                  iteminfo.sportsize=optionItems[j]["sportsize"];
                  planinfo.push(iteminfo);
                };
              };                      
            };
            console.log(planinfo);
             _that.setState({
               dataSource: ds.cloneWithRows(planinfo),
               detailrows:planinfo
            })
          }else{
                Alert.alert('Fail to display','Please check your data'); 
          }
          }); 
        };
           //get the sport item name from the database       
      }else{
        Alert.alert('Fail to display','Please check your data'); 
      }               
    });     
  },
//  set scrolling to true/false
  allowScroll(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled });
  },
  //  set active swipeout item
  handleSwipeout(sectionID,rowID) {
    for (var i = 0; i < this.state.detailrows.length; i++) {    
      if (i != rowID){
        this.state.detailrows[i].active = false;
      } 
      else {
        this.state.detailrows[i].active = true;
      }
    }
    this.updateDataSource(this.state.detailrows);
  },
  updateDataSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  },
  renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
      <Swipeout
        left={rowData.left}
        right={btnsTypes}
        rowID={rowID}
        sectionID={sectionID}
        autoClose={rowData.autoClose}
        backgroundColor={rowData.backgroundColor}
        onOpen={(sectionID, rowID) => {
          this.setState({
            sectionID,
            rowID,
          })
        }}
        onClose={() => console.log('===close') }
        scroll={event => this.allowScroll(event)}>
        <View style={styles.li}>
              <Text style={styles.liText}>{rowData.itemname} sportsize: {rowData.sportsize}</Text>        
        </View>
      </Swipeout>
    );
  },
  render: function(){
    return(
      <ScrollView 
          contentContainerStyle={{flex:1}}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='never'>
        <View style={styles.maincontain}>
          <View>
            <Topview {...this.props}/>
          </View>
          <View style={[styles.header,styles.Bottomline]}>
            <Text style={{fontSize:20}}>{this.props.plantitle}</Text>
          </View>
          <ListView style={styles.listview}
            scrollEnabled={this.state.scrollEnabled}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
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
  listview: {
    flex: 3,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#38bda0',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
    height:50,
  },
});
module.exports = PlanInfoView;