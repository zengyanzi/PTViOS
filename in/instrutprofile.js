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
import Modal from 'react-native-modalbox';
import { List, ListItem } from 'react-native-elements';
import Description from './description';
import IGenderModifyView from './igendermodify';
import IBirthModifyView from './ibirthmodify';
var screenW = Dimensions.get('window').width;
var _navigator ;
var InstructProfileView = React.createClass({

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
    AsyncStorage.getItem('description',(err,result)=>{
       description=result;
       _that.setState({
          description:description
       })
    })
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
            <TouchableOpacity onPress={() => _navigator.push({title:'IProfileModifyView',id:'iprofilemodify',params:{email:this.state.email}})}>
              <List>
                <ListItem
                  roundAvatar
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
              <TouchableOpacity onPress={() =>this.refs.modal2.open()}>
                <ListItem
                  roundAvatar
                  title='Gender'
                  avatar={require('../img/gender.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>this.refs.modal1.open()}>
                <ListItem
                  roundAvatar
                  title='Description'
                  subtitle={
                    <View style={styles.subtitleView}>
                      <Text style={styles.ratingText}>{this.state.description}</Text>
                    </View>
                  }
                  avatar={require('../img/Heart.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>this.refs.modal3.open()}>
                <ListItem
                  roundAvatar
                  title='Birthday'
                  avatar={require('../img/plan_normal.png')}
                /> 
              </TouchableOpacity>
              </List>         
            <View>
              <TouchableOpacity style={styles.btn}
              onPress={this._logout}>
                <Text style={styles.text}>Logout</Text>
              </TouchableOpacity>
            </View>       
          </View> 
        </View>   
         <Modal style={[styles.modal, styles.modal4]} 
            position={"center"} ref={"modal1"} 
            isDisabled={this.state.isDisabled}>
            <Description {...this.props}/>
          </Modal>
          <Modal style={[styles.modal, styles.modal5]} 
            position={"center"} ref={"modal2"} 
            isDisabled={this.state.isDisabled}>
            <IGenderModifyView {...this.props}/>
          </Modal>   
          <Modal style={[styles.modal, styles.modal4]} 
            position={"center"} ref={"modal3"} 
            isDisabled={this.state.isDisabled}>
            <IBirthModifyView {...this.props}/>
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
   },
   modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal3: {
    height: 160,
    borderRadius:25
  },
    modal4: {
    height: 220,
    backgroundColor:'#38bda0',
    borderRadius:25
  },
    modal5: {
    height: 220,
    borderRadius:25
  },
    text: {
    color: "black",
    fontSize: 22
  }
});
module.exports = InstructProfileView;