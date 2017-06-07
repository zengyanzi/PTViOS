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
  Linking,
  ListView,
  Alert
} from 'react-native';
import Dimensions from 'Dimensions';
import Swipeout from 'react-native-swipeout';
import Topview from './top.js';
import URLnetowrk from './network';
import StarRating from 'react-native-star-rating';
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
var btnsDefault = [ { text: 'Button' } ];
//delete choose item
// detailrows = [
//     {
//       Name :"Jetts",
//       slogan:"Enjoy your everyday with Jetts",  
//       Open:"7x24 membership",
//       Contact:"0800-0201-023",
//       Location:"24 shally rd,Tamaki drive"
//     }
//   ];

 class CustomButton extends React.Component {
  constructor(props){
    super(props);
  }
  propTypes: {
    url: React.PropTypes.string,
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={()=>Linking.canOpenURL(this.props.url).then(supported => {
           if (supported) {
               Linking.openURL(this.props.url);
           } else {
              console.log('could not open URI: ' + this.props.url);
           }
        })}>
        <Text style={{color:'#38bda0',fontSize:18}}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

var DetailGymView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state = {
      starCount: 3,
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
    return {
      starCount:this.state.starCount,
      isOpen: this.state.isOpen,
      isDisabled: this.state.isDisabled,
      swipeToClose: this.state.swipeToClose,
      sliderValue: this.state.sliderValue

    };
  },
  componentWillMount() {
    let _that=this;
    var gym_id=this.props.data.id;
    var url = URLnetowrk+'gym_score.action';
    // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
    url += '?gym_id='+gym_id;
    console.log(url);
    fetch(url).then(function(response) {  
      return response.json();
    }).then(function(res) {
      console.log(res); 
      if (res["data"]!=null) { 
      var star =res["data"];     
        _that.setState({
          starCount:star
        })
      }else{
        Alert.alert('Fail to display','Please check your data'); 
      }  
    });       
  },
    onClose() {
    console.log('Modal just closed');
  },

  onOpen() {
    console.log('Modal just openned');
  },

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  },
  _rating:function(){
    var type;
    var gym_id=this.props.data.id;
    var score= this.state.starCount;
    console.log(gym_id);
    AsyncStorage.getItem('type',(err, result) => {
      console.log(result);
      type=result;
      if (type!==null) {
        if (type=="instructor") {
        AsyncStorage.getItem('instructorid',(err, result) => {
        var instructor_id=result;
        var url=URLnetowrk+'instructor/rate_gym.action'; 
        url += '?gym_id='+gym_id+'&instructor_id='+instructor_id+'&score='+score;
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
          }) 
        })         
        }else{
          AsyncStorage.getItem('userid',(err, result) => {
            console.log(result);
            var trainee_id=result;
            var url=URLnetowrk+'rate_gym.action'; 
            url += '?gym_id='+gym_id+'&trainee_id='+trainee_id+'&score='+score;
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
            })    
          })  
        }
      }
    });
  },
   
 

  onStarRatingPress(rating) {
    this.refs.modal1.open()
  },
  onStarRatingsubmit(rating) {
    this.setState({
      starCount: rating,
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
              <Image source={require('../img/ptv_sized.png') }/>
            </View>
              <View style={[styles.Topbar,styles.Right]}>             
            </View>
          </View>
          <View style={styles.li}>
            <View style={{flexDirection:'row'}}>
              <Image source={require('../img/gymname.png') }/>
              <Text style={styles.liText}>  Name:{this.props.data.name}</Text> 
            </View>
            <View style={{flexDirection:'row'}}>  
              <Image source={require('../img/slogan.png') }/>   
              <Text style={styles.liText}>  Slogan: {this.props.data.description} </Text>
            </View>
            <View style={{flexDirection:'row'}}>  
              <Image source={require('../img/phone.png') }/>
              <TouchableOpacity 
                onPress={() =>this.refs.modal2.open()}>
              <Text style={styles.liText}>   Contact: {this.props.data.contact} </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>  
              <Image source={require('../img/open.png') }/>
              <Text style={styles.liText}>  open: {this.props.data.opendate} </Text>
            </View>
            <View style={{flexDirection:'row'}}>  
              <Image source={require('../img/location.png') }/>
              <Text style={styles.liText}>  Location: {this.props.data.location} </Text>
            </View> 
            <View style={{flexDirection:'column'}}> 
              <Text style={styles.liText}>Reviews</Text>
              <StarRating
              disabled={false}
              maxStars={5}
              starColor={'#38bda0'}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>            
          </View>
          <View>
            <TouchableOpacity style={styles.btn}
             onPress={() =>_navigator.jumpBack()}>
              <Text style={{color:"white",fontSize:18}}>Back</Text>
            </TouchableOpacity> 
          </View>
          <Modal style={[styles.modal, styles.modal3]} 
          position={"center"} ref={"modal1"} 
          isDisabled={this.state.isDisabled}>
              <StarRating
              disabled={false}
              maxStars={5}
              starColor={'#38bda0'}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingsubmit(rating)}
              />
               <TouchableOpacity style={{     
                 alignItems: 'center',
                 justifyContent: 'center',
                 backgroundColor: '#2cb395',
                 height: 30,
                 width:180,
                 borderRadius: 5,
                 marginTop:10
               }}
                onPress={this._rating}>
                <Text style={{color:"white",fontSize:18}}>Submit your rating</Text>
              </TouchableOpacity> 
          </Modal>
          <Modal style={[styles.modal, styles.modal3]} 
            position={"center"} ref={"modal2"} 
            isDisabled={this.state.isDisabled}>
            <View>
              <CustomButton  url={'tel:'+this.props.data.contact} text="Call the Gym right now"/>
            </View>
                
            </Modal>
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
  header:{
    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    backgroundColor:'#fff',
    justifyContent: 'center',
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
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
    height:50,
  },
  btn:{
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 30,
     borderRadius: 5,
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
    text: {
    color: "black",
    fontSize: 22
  }
});
module.exports = DetailGymView;