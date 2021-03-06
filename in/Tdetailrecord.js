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
var btnsDefault = [ { text: 'Button' } ];

  var detailrows = [
    {
      Calories :"457",
      text:"Rower Moderate  5 min 30 sec fast:60 sec slow",
      autoClose: true,
    },
  ];
var TDetailRecordView = React.createClass({
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
    let _that=this;
    var trainee_id=this.props.trainee_id;
    var day=this.props.date;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    var url = URLnetowrk+'detailrecord.action';
            // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
    url += '?trainee_id='+trainee_id+'&day='+day;
    console.log(url);
    fetch(url).then(function(response) {  
      return response.json();
    }).then(function(res) {
      console.log(res);
      if (res["data"]!=null) {      
        _that.setState({
         dataSource: ds.cloneWithRows(res["data"]),
         detailrows:res["data"]
        })
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
      if (i != rowID) {
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
      var btnsTypes = [
        { text: 'Edit', onPress: function(){ _navigator.push({
                  title:'TEditrecordView',
                  id:'Teditrecord',
                  params:{date:rowData.day,
                    itemname:rowData.itemname,
                    trainee_id:rowData.trainee_id
                  }
                })},type: 'primary',},
          { text: 'Delete',onPress: () => { this.delete(rowData) },type: 'delete'},
     ];
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
              <Text style={styles.liText}>{rowData.itemname}Sportsize: {rowData.sportsize} </Text>        
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
          keyboardShouldPersistTaps='never'>
        <View style={styles.maincontain}>
          <View style={[styles.Top,styles.Bottomline]}>
            <TouchableOpacity 
              onPress={() => _navigator.push({title:'TAddrecordtoday',id:'Taddrecordtoday',params:{trainee_id:this.props.trainee_id,trainee_name:this.props.trainee_name}})}>
              <Image source={require('../img/add_pressed.png') }/>
            </TouchableOpacity> 
            <View style={styles.Topbar}>
              <Image source={require('../img/ptv_sized.png') }/>
            </View>          
            <View style={[styles.Topbar,styles.Right]}>
              <TouchableOpacity 
                      onPress={() => _navigator.push({title:'TChartView',id:'Tchart',params:{trainee_id:this.props.trainee_id,trainee_name:this.props.trainee_name}})}>
                <Image source={require('../img/chart-pressed.png') }/>
              </TouchableOpacity> 
            </View>         
          </View>
          <View style={[styles.header,styles.Bottomline]}>
              <Image  source={require('../img/plan_normal.png') }/>
              <Text style={{fontSize:20}}>{this.props.date}{this.props.trainee_name}</Text>
          </View>

          <ListView style={styles.listview}
            scrollEnabled={this.state.scrollEnabled}
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={this.renderRow}
          />
        <TouchableOpacity style={styles.bottom}
             onPress={() => _navigator.jumpBack()}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>  
        </View>
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
   Top:{
    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    backgroundColor:'#38bda0',
    justifyContent: 'space-between',
    marginTop:20,
    marginBottom:0
  },
  Bottomline:{
    borderBottomWidth:2,
    borderColor:'gray'
  },

  Topbar:{
    flex:1,
    marginTop:5,
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
   text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },
    bottom:{
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 50,
  },
});
module.exports = TDetailRecordView;