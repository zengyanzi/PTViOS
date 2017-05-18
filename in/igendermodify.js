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
import t from 'tcomb-form-native';
import URLnetowrk from '../pub/network';
var screenW = Dimensions.get('window').width;
var _navigator ;
var IGenderModifyView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = { 
      gender:'Male'
    };
    return {   
      gender:this.state.gender
    };

  },
  _save:function(){    
    var gender=this.state.gender;
    console.log(this.state.gender);
    var url = URLnetowrk+'instructor/modifygender.action'; // modify the gender
    url+= '?gender='+gender;
    console.log(url);
    fetch(url).then(function(response) {  
      return response.json();
    }).then(function(res) {
      if (res["data"]!=null) {
          console.log(res);
          _navigator.push({
            title:'IhomeView',
            id:'Ihome',
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
           <View >
            <Picker 
                prompt="Please choose sportname"
                style={{width:200,color:'#fff',alignItems:'center'}}
                selectedValue={this.state.gender}
                onValueChange={(value) => this.setState({gender: value})}>       
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />   
            </Picker>
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
module.exports = IGenderModifyView;