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
import Swipeout from 'react-native-swipeout';
import URLnetowrk from '../pub/network';
import DetailTrainee from './detailtrainee';
import Modal from 'react-native-modalbox';

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
    Name:"YMCA",
    text: "Find a better you here",
  }
];

var TraineenewView = React.createClass({
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
     AsyncStorage.getItem('instructorid',(err,result)=>{
      var instructor_id=result;
      var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
      var urlmap =URLnetowrk+'instructor/find_mapping.action';//FIND TRAINEES MAPPING STATUS;
      urlmap+= '?instructor_id='+instructor_id;
      console.log(urlmap);
      fetch(urlmap).then(function(response) {  
         return response.json();
      }).then(function(res) {
        var arry=[];
        var mapresult=res.data;
        if (mapresult!=null) {
          console.log(mapresult);
          for (var i = 0; i < mapresult.length; i++) {
            if (mapresult[i].status==11) {
              arry.push(mapresult[i]);
            };
          };
          _that.setState({
            dataSource: ds.cloneWithRows(arry),
            rows:arry
          });
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
  //  set active swipeout item
  handleSwipeout(sectionID,rowID) {
    for (var i = 0; i < this.state.rows.length; i++) {
      if (i != rowID) {
        this.state.rows[i].active = false;
      }else{
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
    return (
        <TouchableOpacity style={styles.btn}  
              onPressIn={() => this.setState({trainee_id: rowData.trainee_id})}
              onPress={()=>this.refs.modal1.open()} >
          <View style={styles.li}>
            <View  style={styles.lidate}><Image  source={require('../img/gymicon.png') }/><Text>Name:{rowData.trainee_id} {rowData.name} </Text></View>
              <Text style={styles.liText}>phone:{rowData.phone};Gender: {rowData.gender}; </Text>
              <Text style={styles.liText}>Status: Request</Text>
          </View>
        </TouchableOpacity>

    );
  },
  _handlerequest:function(rowData){
  var trainee_id=this.state.trainee_id;
   AsyncStorage.getItem('instructorid',(err,result)=>{
      var instructor_id=result;
      var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
      var url =URLnetowrk+'mapping.action';//FIND TRAINEES MAPPING STATUS;
       url+='?trainee_id='+trainee_id+'&'+'instructor_id='+instructor_id+'&'+'status='+22;
      console.log(url);
      fetch(url).then(function(response) {  
         return response.json();
       }).then(function(res) {
         console.log(res);
         if (res["data"]!=null) {
           _navigator.push({
             title:'IhomeView',
             id:'Ihome',
        })
         }else{
           Alert.alert('Fail to display','Please check your data'); 
         }    
       }); 
      });
 },
  render: function(){
    return(
       <ScrollView 
          contentContainerStyle={{flex:1}}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps="never">
          <ListView style={styles.listview}
            scrollEnabled={this.state.scrollEnabled}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            enableEmptySections={true}
          />
          <Modal style={[styles.modal, styles.modal3]} 
            position={"center"} ref={"modal1"} 
            isDisabled={this.state.isDisabled}>
             <TouchableOpacity 
              onPress={this._handlerequest}>
              <Text style={{color:"#38bda0",fontSize:18}}>Confirm</Text>
            </TouchableOpacity> 
          </Modal>
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
  liText: {
    color: '#333',
    fontSize: 18,
  },
  lidate:{
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal3: {
    height: 160,
    width: 260,
    borderRadius:25
  },
});
module.exports = TraineenewView;