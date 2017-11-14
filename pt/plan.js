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
  ListView,
  Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import URLnetowrk from '../pub/network';
import Swipeout from 'react-native-swipeout';
var screenW = Dimensions.get('window').width;
var rows = [
  {
    Pdate:"2017-02-08",
    Calories :"457",
    text: "Row:5min;Treadmill:6min;Xtrainer:5min",
    autoClose: true,
  }
];
var PlanView = React.createClass({
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
    let _that=this;
    AsyncStorage.getItem('userid',(err, result) => {
      console.log(result);
      function format (d) {
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
      }
      var today =new Date();
      var start = format(today);
      var day1=new Date(today.getTime() + (1000* 60 * 60 * 24)*6);
      var end=format(day1);
      var trainee_id=result;
      var day=this.props.date;
      var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
      var url = URLnetowrk+'myplan.action';
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
   });
  },
//  set scrolling to true/false
  allowScroll(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled });
  },
   // //  set active swipeout item
  // handleSwipeout(sectionID,rowID) {
  //   for (var i = 0; i < this.state.rows.length; i++) {
  //     if (i != rowID){
  //       this.state.rows[i].active = false;
  //     }
  //     else{
  //       this.state.rows[i].active = true;
  //     }
  //   }
  //   this.updateDataSource(this.state.rows);
  // },
  updateDataSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  },
  submitrecord:function(rowData){
    let _that=this;
    AsyncStorage.getItem('userid',(err, result) => {
      console.log(result);
      var trainee_id=result;
      var day =rowData.day;
      var item_id=rowData.item_id;
      var sportsize=rowData.sportsize;
      var url = URLnetowrk+'submitday.action';
      url += '?trainee_id='+trainee_id+'&day='+day;
      console.log(url);
      fetch(url).then(function(response) {
        return response.json();
      }).then(function(res) {
        console.log(res);
        if (res["data"]==true) {
          Alert.alert('Submit','Successfully!');
          function format (d) {
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
          }
          var today =new Date();
          var start = format(today);
          var day1=new Date(today.getTime() + (1000* 60 * 60 * 24)*6);
          var end=format(day1);
          var trainee_id=result;
          var day=_that.props.date;
          var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
          var urlrefresh = URLnetowrk+'myplan.action';
          // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
          urlrefresh += '?trainee_id='+trainee_id+'&start='+start+'&end='+end;
          console.log(urlrefresh);
          console.log(rowData.day);
          fetch(urlrefresh).then(function(response) {
            return response.json();
          }).then(function(res) {
            var key;
            if (res["data"]!=null) {
              for (var i = 0; i < res["data"].length; i++) {
                for (var j in res["data"][i]) {
                  if (rowData.day == res["data"][i]["day"]) {
                     key=i
                  };
                };
              };
             console.log(key);
             res["data"].splice(key,1);
             console.log(res["data"])
              _that.setState({
                dataSource: ds.cloneWithRows(res["data"]),
                rows:res["data"]
            });
            }else{
              Alert.alert('Fail to display','Please check your data');
            }
          })
        }
      });
    })
  },
  renderRow(rowData: string, sectionID: number, rowID: number) {
      var btnsTypes = [
        { text: 'Submit',onPress: () => { this.submitrecord(rowData) },type:'secondary'}
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
        <TouchableOpacity style={styles.btn}
                onPress={() => _navigator.push({title:'DetailPlanView',id:'detailplan',params:{date:rowData.day}})}>
          <View style={styles.li}>
            <View  style={styles.lidate}><Image  source={require('../img/plan_normal.png') }/><Text>{rowData.day}</Text></View>
              <Text style={styles.liText}>Sport:{rowData.text}</Text>
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
         <View>
           <View style={[styles.Top,styles.Bottomline]}>
            <View style={[styles.Topbar,styles.Left]}>
                <TouchableOpacity style={{marginBottom:0}} >
                  <Icon  size={22}reverse  name='settings'   color='#38bda0' onPress={() => _navigator.push({title:'CreateplanView',id:'createplan'})} />
                 </TouchableOpacity>
            </View>
            <View style={styles.Topbar}>
          </View>
          <View style={[styles.Topbar,styles.Right]}>
            <TouchableOpacity
                    onPress={() => _navigator.push({title:'AdditemtodayView',id:'additemtoday'})}>
              <Image source={require('../img/add_pressed.png') }/>
            </TouchableOpacity>
          </View>
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
    borderColor:'gray',
  },
  Topbar:{
    flex:2,
    flexDirection: 'row',
    marginBottom:10
  },
   Left:{
    flexDirection: 'row',
    marginBottom:0
  },
  Right:{
    position: 'absolute',
    top: 5,
    right: 5,
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
module.exports = PlanView;
