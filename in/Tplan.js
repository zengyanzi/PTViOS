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
  }, {
    Pdate:"2017-02-09",
    Calories :"457",
    text: "Row:5min;Treadmill:6min;Xtrainer:5min",
    autoClose: true,
  }, {
    Pdate:"2017-02-10",
    Calories :"457",
    text: "Row:5min;Treadmill:6min;Xtrainer:5min",
    autoClose: true,
  }, {
    Pdate:"2017-02-11",
    Calories :"457",
    text: "Row:5min;Treadmill:6min;Xtrainer:5min",
  },
];
var TPlanView = React.createClass({
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
    var trainee_id=this.props.trainee_id;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    function format (d) {
      return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    }
    var today =new Date();
    var start = format(today);
    var day1=new Date(today.getTime() + (1000* 60 * 60 * 24)*6);
    var end=format(day1);
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
    var trainee_id=this.props.trainee_id;
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
                onPress={() => _navigator.push({title:'TDetailPlanView',id:'Tdetailplan',params:{date:rowData.day,trainee_name:this.props.trainee_name,trainee_id:this.props.trainee_id}})}>
          <View style={styles.li}>
                <Text style={styles.liText}>{rowData.item_name}Date: {rowData.day} </Text>    
                <Text style={styles.liText}>{rowData.item_name}Sportsize: {rowData.text} </Text>
                <Text style={styles.liText}>{rowData.item_name}Energy: {rowData.energy} </Text>        
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
        keyboardShouldPersistTaps="never">
         <View>
           <View style={[styles.Top,styles.Bottomline]}>
            <View style={[styles.Topbar,styles.Left]}>
                <TouchableOpacity >
                  <Icon   reverse  name='settings'   color='#38bda0' onPress={() => _navigator.push({title:'TCreateplanView',id:'Tcreateplan'})} />
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
        <View style={[styles.header,styles.Bottomline]}>
            <Image  source={require('../img/plan_normal.png') }/>
            <Text>{this.props.trainee_name} </Text>
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
module.exports = TPlanView;