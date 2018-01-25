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
  // delete:function(rowData){
  //   let _that=this;
  //   var trainee_id=this.props.trainee_id;
  //   var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
  //   var plan_id =rowData.id;
  //   var url = URLnetowrk+'delplan.action';
  //   // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
  //   url += '?trainee_id='+trainee_id+'&plan_id='+plan_id;
  //   console.log(url);
  //   fetch(url).then(function(response) {  
  //       return response.json();
  //   }).then(function(res) {
  //     console.log(res);        
  //     if (res["data"]==true) {
  //       var day=_that.props.date;
  //       console.log(day);
  //       var url = URLnetowrk+'detailplan.action';
  //       // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
  //       url += '?trainee_id='+trainee_id+'&day='+day;
  //       console.log(url);
  //       fetch(url).then(function(response) {  
  //         return response.json();
  //       }).then(function(res) {
  //         console.log(res);
  //         if (res["data"]!=null) {                 
  //           _that.setState({
  //             dataSource: ds.cloneWithRows(res["data"]),
  //             detailrows:res["data"]
  //           })
  //         }else{
  //           Alert.alert('Fail to display','Please check your data'); 
  //         }
  //        });   
  //       }else{
  //         Alert.alert('Fail to display','Please check your data'); 
  //       }
  //     });
  //   },

  renderRow(rowData: string, sectionID: number, rowID: number) {
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
        keyboardShouldPersistTaps="always">
         <View>
           <View style={[styles.Top,styles.Bottomline]}>
            <View style={[styles.Topbar,styles.Left]}>
                <TouchableOpacity >
                  <Icon   reverse  name='settings'   color='#38bda0' onPress={() => _navigator.push({title:'TCreateplanView',id:'Tcreateplan',params:{trainee_id:this.props.trainee_id}})} />
                 </TouchableOpacity> 
            </View>
            <View style={styles.Topbar}>
          </View>    
          <View style={[styles.Topbar,styles.Right]}>
            <TouchableOpacity 
                    onPress={() => _navigator.push({title:'TAdditemtodayView',id:'Tadditemtoday',params:{trainee_id:this.props.trainee_id}})}>
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