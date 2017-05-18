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
  TouchableHighlight,
  ListView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import { FormLabel, FormInput } from 'react-native-elements';
import URLnetowrk from '../pub/network';
var screenW = Dimensions.get('window').width;
var _navigator ;
var EmailModifyView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
      newEmail:''
    };
    return {
      newEmail:this.state.newEmail
    };

  },
  _save:function(){    
    var newEmail=this.state.newEmail
    AsyncStorage.getItem('userid',(err, result) => {
      console.log(result);
      var trainee_id=result;
      var url = URLnetowrk+' '; // get the item data again 
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
           <View >
            <FormLabel 
              labelStyle={{color: '#fff',fontSize:18}} 
            > Origin:{this.props.email}</FormLabel>
            <FormInput 
              containerStyle={{borderBottomColor: '#fff',borderBottomWidth:2}}
            onChangeText={(text) => this.setState({newEmail: text})}/>
          </View>   
          <View>
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
});
module.exports = EmailModifyView;