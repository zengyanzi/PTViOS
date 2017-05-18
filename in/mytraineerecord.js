
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
    day:"2017-02-08  ",
    name:"Vincent",
    Calories :"457",
    text: "Row:5min;Treadmill:6min;Xtrainer:5min",
    autoClose: true,
  }, {
    day:"2017-02-09",
    name:"Vincent",
    Calories :"457",
    text: "Row:5min;Treadmill:6min;Xtrainer:5min",
    autoClose: true,
  }, {
    day:"2017-02-10",
    name:"Jenny",
    Calories :"457",
    text: "Row:5min;Treadmill:6min;Xtrainer:5min",
    autoClose: true,
  }, {
    day:"2017-02-11",
    name:"Jenny",
    Calories :"457",
    text: "Row:5min;Treadmill:6min;Xtrainer:5min",
  },  
];
var MyTraineeRecordView = React.createClass({
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
  // componentWillMount() {
  //   let _that=this;
  //   AsyncStorage.getItem('userid',(err, result) => {
  //     console.log(result);
  //     function format (d) {
  //       return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
  //     }
  //     var today =new Date();
  //     var end = format(today);
  //     var day1=new Date(today.getTime() - (1000* 60 * 60 * 24)*6);
  //     var start=format(day1);
  //     var trainee_id=result;
  //     var day=this.props.date;
  //     var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
  //     var url = URLnetowrk+'myrecord.action';
  //     // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
  //     url += '?trainee_id='+trainee_id+'&start='+start+'&end='+end;
  //     console.log(url);
  //     fetch(url).then(function(response) {  
  //       return response.json();
  //     }).then(function(res) {
  //       console.log(res);        
  //       if (res["data"]!=null) { 
  //         _that.setState({
  //         dataSource: ds.cloneWithRows(res["data"]),
  //         rows:res["data"]
  //       })
  //       }else{
  //         Alert.alert('Fail to display','Please check your data'); 
  //       }
  //    });      
  //   });  
  // },
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
    var btnsTypes = [
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
        close={!rowData.active}
        onOpen={(sectionID, rowID) => this.handleSwipeout(sectionID, rowID) }
        scroll={event => this.allowScroll(event)}>
        <TouchableOpacity style={styles.btn}
                onPress={() => _navigator.push({title:'DetailRecordView',id:'detailrecord',params:{date:rowData.day}})}>
          <View style={styles.li}>
            <View  style={styles.lidate}>
              <Image  source={require('../img/profile_normal.png') }/>
              <Text>{rowData.day}   {rowData.name}</Text>
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
                  onPress={() => _navigator.push({title:'AddrecordtodayView',id:'addrecordtoday'})}>
                <Image source={require('../img/add_pressed.png') }/>
               </TouchableOpacity> 
          </View>
          <View style={styles.Topbar}>
            <Image source={require('../img/ptv_sized.png') }/>
          </View>
          <View style={[styles.Topbar,styles.Right]}>
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
          enableEmptySections={true}
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
module.exports = MyTraineeRecordView;