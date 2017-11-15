
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
import URLnetowrk from './network';
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
  },
  {
    Name:"Jetts",
    text: "Enjoy you and your beauty",
  }
];
var GymlistView = React.createClass({
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
      var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
       var url = URLnetowrk+'gym.action';// load gym list
       console.log(url);
       fetch(url).then(function(response) {
         return response.json();
       }).then(function(res) {
         console.log(res);
         if (res["data"]!=null) {
           _that.setState({
             dataSource: ds.cloneWithRows(res["data"]),
             rows:res["data"][0]
           });
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
                onPress={() => _navigator.push({title:'DetailGymView',id:'detailgym',params:{data:rowData}})}>
          <View style={styles.li}>
            <View  style={styles.lidate}><Image  source={require('../img/gymicon.png') }/><Text>{rowData.name}</Text></View>
              <Text style={styles.liText}>Slogan:{rowData.description}</Text>
          </View>
        </TouchableOpacity>
    );
  },
  render: function(){
    return(
       <ScrollView
          contentContainerStyle={{flex:1}}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps="always">
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
module.exports = GymlistView;
