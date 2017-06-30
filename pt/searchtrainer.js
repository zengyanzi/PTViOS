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
import { List, ListItem } from 'react-native-elements';
import URLnetowrk from '../pub/network';
import Modal from 'react-native-modalbox';

var screenW = Dimensions.get('window').width;
var _navigator ;

var SearchTrainer = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    var rows =this.props.data;
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
      <TouchableOpacity
              onPressIn={() => this.setState({id: rowData.id})}
              onPress={()=>this.refs.modal1.open()} >
        <View style={styles.li}>
          <View  style={styles.lidate}><Image  source={require('../img/gymicon.png') }/><Text> {rowData.name}</Text></View>
            <Text style={styles.liText}>Email:{rowData.email}</Text>
        </View>
      </TouchableOpacity>
    );
  },
  _request: function(){
    AsyncStorage.getItem('userid',(err, result) => {
      var trainee_id=result;
      var instructor_id=this.state.id;
      var url = URLnetowrk+'mapping.action'; // get the Trainee 
      url+='?trainee_id='+trainee_id+'&'+'instructor_id='+instructor_id+'&'+'status='+11;
      console.log(url);
      fetch(url).then(function(response) {  
         return response.json();
      }).then(function(res) {
        console.log(res);
        if (res["data"]==true) {
          console.log(res);
          _navigator.jumpBack();
       
        }else{
           Alert.alert (
            'Sorry',
            'Try Again'
          )
        }
      });
    });
  },
  render: function(){
    return(
     <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='never'>
      <View style={styles.maincontain}>
        <ListView style={styles.listview}
          scrollEnabled={this.state.scrollEnabled}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />                 
      </View> 
      <Modal style={[styles.modal, styles.modal3]} 
        position={"center"} ref={"modal1"} 
        isDisabled={this.state.isDisabled}>
        <View>
          <TouchableOpacity onPress={this._request} >
            <Text>Request</Text>
          </TouchableOpacity>
        </View>    
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
    modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal3: {
    height: 60,
    width: 260,
    borderRadius:25
  },
  btn:{
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 30,
     borderRadius: 5,
   },
});
module.exports = SearchTrainer;