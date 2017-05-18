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
  Alert,
  TouchableHighlight,
  ListView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import t from 'tcomb-form-native';
import URLnetowrk from '../pub/network';
var screenW = Dimensions.get('window').width;
var _navigator ;
var Form =t.form.Form;
var User = t.struct({
  oldpassword: t.String,              // a required string
  newpassword:t.String,
  newpasswordconfirm:t.String,
  //rememberMe: t.Boolean        // a boolean
});
var options = {
  fields: {
  oldpassword: {
    password: true,
    secureTextEntry: true,
    },
  newpassword: {
    password: true,
    secureTextEntry: true,
    },
  newpasswordconfirm: {
    password: true,
    secureTextEntry: true,
    },
  }
};
var IPasswordModifyView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {

    };
    return {
    };

  },
  componentWillMount() {
    let _that=this;
    AsyncStorage.getItem('password',(err,result)=>{
       var oldpassword=result;
       _that.setState({
          oldpassword:oldpassword
       })
    })
  },
  _save:function(){
    var value = this.refs.form.getValue();
    var oldpassword=value["oldpassword"];
    var newpassword=value["newpassword"];
    var newpasswordconfirm=value["newpasswordconfirm"]
    if (this.state.oldpassword==oldpassword) { 
      if (newpassword == newpasswordconfirm) {
        AsyncStorage.setItem("password",newpassword);
        var url = URLnetowrk+'/instructor/modifypassword.action'; // get the item data again 
          url+= '?oldpassword='+oldpassword+ '?newpassword='+newpassword;
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
              Alert.alert('Wrong Password','Please input again'); 
            }
        });
      }else{
        Alert.alert('different new passowrd','Please input the same new passowrd'); 
      }
      }else{
        Alert.alert('Wrong Password','Please input again'); 
      }

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
            <Form 
              ref="form"
              type={User}
              options={options}
            />
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
     height: 30,
     borderRadius: 5,
   },
     text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },
});
module.exports = IPasswordModifyView;