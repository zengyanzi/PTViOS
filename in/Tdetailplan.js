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
  ListView,
  Alert
} from 'react-native';
import Dimensions from 'Dimensions';
import { Icon } from 'react-native-elements';
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
//delete choose item
detailrows = [
    {
      Calories :"457",
      text:"Rower Moderate  5 min 30 sec fast:60 sec slow",  
    }, {
      Calories :"457",
      text: "Walking Weighted Lunge  Controlled  Light 3 15  60Sec",  
    }, {
      Calories :"457",
      text: "Upper Back 18,29 30-60 sec 1 1",
    }, {
      Calories :"457",
      text: "Bike Fast  3min  Moderate  15  60Sec",      
    },   
  ];
var TDetailPlanView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
     var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
      day:this.props.date,
      dataSource: ds.cloneWithRows(detailrows),
      scrollEnabled: true,
    };
    return {
      day:this.state.day,
      dataSource: this.state.dataSource,
      scrollEnabled: true,   
    };
  },
  componentWillMount() {
    let _that=this;
    var trainee_id=this.props.trainee_id;
    var day=this.props.date;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    var url = URLnetowrk+'detailplan.action';
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
  // handleSwipeout(sectionID,rowID) {
  //   for (var i = 0; i < this.state.detailrows.length; i++) {
      
  //     if (i != rowID){
  //       this.state.detailrows[i].active = false;
  //     } 
  //     else{
  //       this.state.detailrows[i].active = true;
  //     } 
  //   }
  //   this.updateDataSource(this.state.detailrows);
  // },
  updateDataSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  },
  delete:function(rowData){
    let _that=this;
    var trainee_id=this.props.trainee_id;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    var plan_id =rowData.id;
    var url = URLnetowrk+'delplan.action';
    // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
    url += '?trainee_id='+trainee_id+'&plan_id='+plan_id;
    console.log(url);
    fetch(url).then(function(response) {  
        return response.json();
    }).then(function(res) {
      console.log(res);        
      if (res["data"]==true) {
        var day=_that.props.date;
        console.log(day);
        var url = URLnetowrk+'detailplan.action';
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
        }else{
          Alert.alert('Fail to display','Please check your data'); 
        }
      });
    },
  submitrecord:function(rowData){
    let _that=this;
    var trainee_id=this.props.trainee_id;
    var day =rowData.day;
    var item_id=rowData.item_id;
    var sportsize=rowData.sportsize;
    var url = URLnetowrk+'addrecord2day.action';
    // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
    url += '?trainee_id='+trainee_id+'&day='+day+'&item_id='+item_id+'&sportsize='+sportsize;
    console.log(url);
      fetch(url).then(function(response) {  
        return response.json();
      }).then(function(res) {
        console.log(res);
        if (res["data"]==true) {
          Alert.alert('Submit','Successfully!'); 
        }
     });
  },
  renderRow(rowData: string, sectionID: number, rowID: number) {
    var btnsTypes = [
      { text: 'Edit', onPress: function(){ _navigator.push({
                title:'TEditplanView',
                id:'Teditplan',
                params:{date:rowData.day,
                  itemname:rowData.item_name,
                  dayplan_id:rowData.id
                }
              })},type: 'primary',},
        { text: 'Submit',onPress:  () => { this.submitrecord(rowData) },type:'secondary'},
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
              <Text style={styles.liText}>{rowData.item_name}Sportsize: {rowData.sportsize} </Text>        
        </View>
      </Swipeout>
    );
  },
  render: function(){
    return(
       <ScrollView 
          contentContainerStyle={{flex:1}}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps="always">
        <View style={styles.maincontain}>
            <View style={[styles.Top,styles.Bottomline]}>
              <View style={[styles.Topbar,styles.Left]}>
                <TouchableOpacity >
                  <Icon   reverse  name='settings'   color='#38bda0' onPress={() => _navigator.push({title:'TCreateplanView',id:'Tcreateplan',params:{trainee_id:this.props.trainee_id}})} />
                </TouchableOpacity> 
              </View>
              <View style={styles.Topbar}>
                <Image source={require('../img/ptv_sized.png') }/>
              </View>
              <View style={[styles.Topbar,styles.Right]}>
                <TouchableOpacity 
                    onPress={() => _navigator.push({title:'TAdditemtoday',id:'Tadditemtoday',params:{trainee_id:this.props.trainee_id}})}>
                  <Image source={require('../img/add_pressed.png') }/>
                </TouchableOpacity> 
              </View>
            </View>  
          <View style={[styles.header,styles.Bottomline]}>
            <Image  source={require('../img/plan_normal.png') }/>
            <Text>{this.props.trainee_name}   {this.state.day} </Text>
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
    flexDirection: 'row',
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
    header:{
    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    backgroundColor:'#fff',
    justifyContent: 'center',
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
module.exports = TDetailPlanView;