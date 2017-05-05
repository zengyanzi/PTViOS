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
  Modal,
  ListView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import { List, ListItem } from 'react-native-elements';
import URLnetowrk from './network';
var screenW = Dimensions.get('window').width;
var _navigator ;
var ProfileView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
       email:'jenny@gmail.com',
       bmi:'16'
    };
    return {      
      email:this.state.email,
      bmi:this.state.bmi
    };
  },
  _logout: function(){
    _navigator.push({
    title:'main',
    id:'main'
    });  
    AsyncStorage.removeItem('type',(err,result)=>{
      console.log(result);
    });
    AsyncStorage.removeItem('email',(err,result)=>{
      console.log(result);
    });
    AsyncStorage.removeItem('password',(err,result)=>{
      console.log(result);   
    });
  },
  componentWillMount() {
    let _that=this;
    AsyncStorage.getItem('email',(err,result)=>{
       email=result;
       _that.setState({
          email:email
       })
    })
    AsyncStorage.getItem('bmi',(err,result)=>{
       bmi=parseFloat(result).toFixed(2);
       console.log(bmi);
       _that.setState({
          bmi:bmi
       })
    })
  },
  render: function(){
    return(
     <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps="never">
        <View style={styles.maincontain}>
          <View style={[styles.Top,styles.Bottomline]}>
            <View style={styles.Topbar}>
            </View>        
            <View style={styles.right}>
            </View>
          </View>
          <View >
            <TouchableOpacity onPress={() => _navigator.push({title:'ProfileModifyView',id:'profilemodify',params:{email:this.state.email}})}>
              <List>
                <ListItem
                  roundAvatar
                  title='Zeng Jenny'
                  subtitle={
                    <View style={styles.subtitleView}>
                      <Text style={styles.ratingText}>{this.state.email}</Text>
                    </View>
                  }
                  avatar={require('../img/profile_normal.png')}
                />
              </List>
            </TouchableOpacity>
            <List>
              <TouchableOpacity onPress={() => _navigator.push({title:'GenderModifyView',id:'gendermodify',params:{email:this.state.email}})}>
                <ListItem
                  roundAvatar
                  title='Gender'
                  avatar={require('../img/gender.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _navigator.push({title:'BirthModifyView',id:'birthmodify',params:{email:this.state.email}})}>
                <ListItem
                  roundAvatar
                  title='Birthday'
                  avatar={require('../img/plan_normal.png')}
                /> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _navigator.push({title:'HModifyView',id:'hmodify',params:{email:this.state.email}})}>
                <ListItem
                    roundAvatar
                    title='Height'
                    avatar={require('../img/height.png')}
                  />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _navigator.push({title:'IwModifyView',id:'iwmodify',params:{email:this.state.email}})}>
                <ListItem
                    roundAvatar
                    title='Initial Weight'
                    avatar={require('../img/weight.png')}
                  />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _navigator.push({title:'TwModifyView',id:'twmodify',params:{email:this.state.email}})}>
                <ListItem
                    roundAvatar
                    title='Target Weight'
                    avatar={require('../img/target.png')}
                  />
              </TouchableOpacity>
              <ListItem
                    roundAvatar
                    title='BMI'
                    subtitle={
                    <View style={styles.subtitleView}>
                      <Text style={styles.ratingText}>{this.state.bmi}</Text>
                    </View>
                  }
                    avatar={require('../img/Heart.png')}
                  />
              </List>         
            <View>
              <TouchableOpacity style={styles.btn}
              onPress={this._logout}>
                <Text style={styles.text}>Logout</Text>
              </TouchableOpacity>
            </View>       
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
   subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
    btn:{
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 50,
     borderRadius: 5,
   }
});
module.exports = ProfileView;