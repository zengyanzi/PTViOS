
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

import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import Swipeout from 'react-native-swipeout';

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

var rows = [
  {
     Pdate:"11-01-2017",
     Calories :"457",
     text: "Row:5min;Treadmill:6min;Xtrainer:5min",

    right:btnsTypes,
    autoClose: true,
  }, {
    Pdate:"14-01-2017",
    Calories :"457",
     text: "Row:5min;Treadmill:6min;Xtrainer:5min",
     right:btnsTypes,
    autoClose: true,
  }, {
      Pdate:"19-01-2017",
      Calories :"457",
      text: "Row:5min;Treadmill:6min;Xtrainer:5min",
     right:btnsTypes,
    autoClose: true,
  }, {
    Pdate:"21-01-2017",
    Calories :"457",
    text: "Row:5min;Treadmill:6min;Xtrainer:5min",
     right:btnsTypes,
  },
  
];

var RecordView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    var Pdate="Monday";
    var rowIDs = [];
    this.state = {
      dataSource: ds.cloneWithRows(rows),
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
    for (var i = 0; i < rows.length; i++) {

      if (i != rowID) rows[i].active = false;
      else rows[i].active = true;
    }
    this.updateDataSource(rows);
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
        <TouchableOpacity style={styles.btn}
                onPress={() => _navigator.push({title:'DetailRecordView',id:'detailrecord'})}>
          <View style={styles.li}>
            <View  style={styles.lidate}><Image  source={require('../img/plan_normal.png') }/><Text>{rowData.Pdate}</Text></View>
            
              <Text style={styles.liText}>Calories:{rowData.Calories} {rowData.text}</Text>
            
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  },


 render: function(){
      return(
         <ScrollView 
            contentContainerStyle={{flex:1}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps="always">
            <View style={[styles.Top,styles.Bottomline]}>
             <TouchableOpacity >
                      
              <View style={styles.left}>
                 
                    
                    <Icon   reverse  name='settings'   color='#38bda0' onPress={() => _navigator.push({title:'CreateplanView',id:'createplan'})} />
                  
                   
              </View>
            </TouchableOpacity> 
              <View style={styles.Topbar}>

              </View>
              
              <View style={styles.right}>
              <TouchableOpacity 
                      onPress={() => _navigator.push({title:'ChartView',id:'chart'})}>
                <Image source={require('../img/chart-pressed.png') }/>
              </TouchableOpacity> 
              </View>
              
            </View>

            <ListView style={styles.listview}
              scrollEnabled={this.state.scrollEnabled}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              />
                  

           
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
     justifyContent: 'space-between',
  },
  Bottomline:{
    borderBottomWidth:2,
    borderColor:'gray'
  },

  Topbar:{
    flex:2,
    flexDirection: 'row',

   

  },
   Left:{
    flex:1,
    flexDirection: 'row',
  },
  Right:{
  flex:1,
  flexDirection: 'row',

  },
  maincontain:
  {
    flex: 1,
    backgroundColor: '#38bda0',
    flexDirection:'column',

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
    height:120,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 18,
  },
  lidate:{
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
  },
});
module.exports = RecordView;