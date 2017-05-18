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
  TouchableHighlight,
  ListView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import { FormLabel, FormInput } from 'react-native-elements';
import URLnetowrk from '../pub/network';
var screenW = Dimensions.get('window').width;
var _navigator ;
var HModifyView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
      height:''
    };
    return {
      height:this.state.height
    };

  },
  _save:function(){    
    var height=this.state.height;
    console.log(this.state.height);
    AsyncStorage.setItem("height",height.toString());
    var url = URLnetowrk+'modifyheight.action'; // modify the height
    url+= '?height='+height;
    console.log(url);
    fetch(url).then(function(response) {  
      return response.json();
    }).then(function(res) {
      if (res["data"]!=null) {
          console.log(res);
          _navigator.push({
            title:'ThomeView',
            id:'Thome',
          })
      }else{
        Alert.alert('Fail to display','Please check your data'); 
      }
  
    });
  },
  render: function(){
    return(
       <ScrollView 
          contentContainerStyle={{flex:1}}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='never'>
          <View style={styles.maincontain}>
            <View style={[styles.Top,styles.Bottomline]}>      
              <View style={styles.Topbar}>
              </View>
              <View style={styles.right}>
              </View>
            </View>
           <View style={styles.input}>
              <TextInput
                style={{height: 40, borderColor: '#2cb395', borderWidth: 2,width:180,color:'#FFF',fontWeight: 'bold',fontSize: 16,}}
                onChangeText={(text) => this.setState({height:text})}
                keyboardType={'numeric'}
                 placeholder="Enter Height"
                value={this.state.text}
              />
              <Text style={styles.text}> meter</Text> 
          </View> 
          <View style={{flex:1}}>
            <TouchableOpacity style={styles.btn}
              onPress={this._save}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
          </View>   
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
    flex:1,
    flexDirection: 'row',
  },
  Right:{
  flex:1,
  flexDirection: 'row',

  },
  maincontain:
  {
    flex: 1,
    backgroundColor: '#38bda0',
    flexDirection:'column',

  },   
  btn:{
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     marginTop:50,
     height: 30,
     borderRadius: 5,
   },
   text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },
  input:{

  flexDirection: 'row',

  },
});
module.exports = HModifyView;