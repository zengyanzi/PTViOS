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
var rows = [
  {
    day:"2017-03-03",
    Calories :"457",
    text: "Row:5min;Treadmill:6min;Xtrainer:5min",
    autoClose: true,
  }, 
];
var TRecordView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
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
    let _that=this;
    var trainee_id=this.props.trainee_id;
    function format (d) {
      return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    }
    var today =new Date();
    var end = format(today);
    var day1=new Date(today.getTime() - (1000* 60 * 60 * 24)*6);
    var start=format(day1);
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    var url = URLnetowrk+'myrecord.action';
    // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
    url += '?trainee_id='+trainee_id+'&start='+start+'&end='+end;
    console.log(url);
    fetch(url).then(function(response) {  
      return response.json();
    }).then(function(res) {
      console.log(res);        
      if (res["data"]!=null) { 
        _that.setState({
        dataSource: ds.cloneWithRows(res["data"]),
        rows:res["data"]
      })
      }else{
        Alert.alert('Fail to display','Please check your data'); 
      }
   });      
  },
/*  delete:function(rowData){
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
        var day=rowData.day;
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
    },*/
//  set scrolling to true/false
  allowScroll(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled });
  },
  //  set active swipeout item
  handleSwipeout(sectionID,rowID) {
    for (var i = 0; i < this.state.rows.length; i++) {
      if (i != rowID) {
        this.state.rows[i].active = false;
      }
      else{
        this.state.rows[i].active = true;
      } 
    }
    this.updateDataSource(this.state.rows);
  },
  updateDataSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  },
  renderRow(rowData: string, sectionID: number, rowID: number) {
 /*   var btnsTypes = [
        { text: 'Delete',onPress: () => { this.delete(rowData) },type: 'delete'},
      ];*/
    return (
      <Swipeout
        left={rowData.left}
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
        <TouchableOpacity style={styles.btn}
                onPress={() => _navigator.push({title:'TDetailRecordView',id:'Tdetailrecord',params:{date:rowData.day,trainee_id:this.props.trainee_id,trainee_name:this.props.trainee_name}})}>
          <View style={styles.li}>
            <View  style={styles.lidate}>
              <Image  source={require('../img/plan_normal.png') }/>
              <Text>{rowData.day}</Text>
            </View>            
            <Text style={styles.liText}>Sports: {rowData.text}</Text>           
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
        keyboardShouldPersistTaps='never'>
        <View style={[styles.Top,styles.Bottomline]}>
          <View style={[styles.Topbar,styles.Left]}>
              <TouchableOpacity 
                  onPress={() => _navigator.push({title:'TAddrecordtodayView',id:'Taddrecordtoday',params:{trainee_id:this.props.trainee_id}})}>
                <Image source={require('../img/add_pressed.png') }/>
               </TouchableOpacity> 
          </View>
          <View style={styles.Topbar}>
            <Image source={require('../img/ptv_sized.png') }/>
          </View>
         </View>
        <View style={[styles.header,styles.Bottomline]}>
          <Image  source={require('../img/plan_normal.png') }/>
          <Text>{this.props.trainee_name}   {this.state.day} </Text>
        </View>
        <ListView style={styles.listview}
          scrollEnabled={this.state.scrollEnabled}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />     
        <TouchableOpacity style={styles.bottom}
             onPress={() => _navigator.jumpBack()}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>  
    </ScrollView>
    );
  },
});
var styles = StyleSheet.create({
   Top:{
    flexDirection: 'row',
    height:60,
    alignItems: 'center',
    backgroundColor:'#38bda0',
    justifyContent: 'space-between',
    paddingTop:25,
  },
  Bottomline:{
    borderBottomWidth:2,
    borderColor:'gray'
  },
 Topbar:{
    flex:2,
    flexDirection: 'row',
    marginBottom:20
  },
   Left:{
    flexDirection: 'row',
  },
  Right:{
    position: 'absolute',
    top: 18,
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
    header:{
    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    backgroundColor:'#fff',
    justifyContent: 'center',
  },
});
module.exports = TRecordView;