
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


import Dimensions from 'Dimensions';
import Swipeout from 'react-native-swipeout';
import Topview from './top.js';
import BottomView from './bottom.js'
var screenW = Dimensions.get('window').width;

var _navigator ;
 var btnsDefault = [ { text: 'Button' } ];

  var btnsTypes = [
      { text: 'Edit', onPress: function(){ _navigator.push({
                title:'EditRecordView',
                id:'editrecord'
              })},type: 'primary',},
        { text: 'Delete',onPress: function(){ alert('Confirm to delete?') },type: 'delete'},
  ];
  var detailrows = [
    {
       Calories :"457",
       text:"Rower Moderate  5 min 30 sec fast:60 sec slow",
       right: btnsTypes,
      autoClose: true,
    }, {

      Calories :"457",
       text: "Walking Weighted Lunge  Controlled  Light 3 15  60Sec",
      right: btnsTypes,
      autoClose: true,
    }, {

        Calories :"457",
        text: "Upper Back 18,29 30-60 sec 1 1",
      right: btnsTypes,
      autoClose: true,
    }, {

      Calories :"457",
      text: "Bike Fast  3min  Moderate  15  60Sec",
      right:btnsTypes,
    },
    
  ];



var DetailRecordView = React.createClass({

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
    componentWillMount() {
    AsyncStorage.getItem('userid',(err, result) => {
                console.log(result);
              });   
  },
//  set scrolling to true/false
  allowScroll(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled });
  },

  //  set active swipeout item
  handleSwipeout(sectionID,rowID) {
    for (var i = 0; i < detailrows.length; i++) {

      if (i != rowID) detailrows[i].active = false;
      else detailrows[i].active = true;
    }
    this.updateDataSource(detailrows);
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
        right={rowData.right}
        rowID={rowID}
        sectionID={sectionID}
        autoClose={rowData.autoClose}
        backgroundColor={rowData.backgroundColor}
        close={!rowData.active}
        onOpen={(sectionID, rowID) => this.handleSwipeout(sectionID, rowID) }
        scroll={event => this.allowScroll(event)}>
        <View style={styles.li}>
              <Text style={styles.liText}>{rowData.text}Calories: {rowData.Calories}</Text>        
        </View>
      </Swipeout>
    );
  },


_editplan:function(){
     _navigator.push({
      title:'TraineeloinView',
      id:'traineelogin'
    })
   },

 render: function(){
      return(
         <ScrollView 
            contentContainerStyle={{flex:1}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps="never">
          <View style={styles.maincontain}>
            <View>
              <Topview {...this.props}/>
            </View>
            <View style={[styles.header,styles.Bottomline]}>
              <Image  source={require('../img/plan_normal.png') }/>
              <Text style={{fontSize:20}}>21-01-2017</Text>
              <Text>Total Calories: 2800</Text>
            </View>

            <ListView style={styles.listview}
              scrollEnabled={this.state.scrollEnabled}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              />
            <View>
            <BottomView {...this.props}/>
            </View>     

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
    flex: 1,
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
module.exports = DetailRecordView;