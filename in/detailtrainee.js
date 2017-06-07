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
import URLnetowrk from '../pub/network';
var screenW = Dimensions.get('window').width;
var _navigator ;
var DetailTrainee = React.createClass({
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
    var url = URLnetowrk+'modifygender.action'; // modify the gender
    url+= '?gender='+gender;
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

           <View >
            <Picker 
                prompt="Please choose sportname"
                style={{width:300}}
                itemStyle={{color:'#38bda0'}}
                selectedValue={this.state.gender}
                onValueChange={(value) => this.setState({gender: value})}>       
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />   
            </Picker>

            <TouchableOpacity style={styles.btn}
              onPress={this._save}>
              <Text style={styles.text}>Save</Text>
             </TouchableOpacity>
          </View> 


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
         justifyContent: 'center',

  },   
  btn:{
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     marginTop:10,
     height: 30,
     borderRadius: 5,
   },
     text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },
});
module.exports = DetailTrainee;