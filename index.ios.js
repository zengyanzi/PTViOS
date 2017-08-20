import React, { Component } from 'react';
import {
  AppRegistry,ScrollView,View,Text,Image,Navigator,TouchableOpacity,BackAndroid,StyleSheet,AsyncStorage
} from 'react-native';

var _navigator;
import InstructwelcomeView from'./in/instructwelcome';
import InstructregisterView from'./in/instructregister';
import InstructloginView from'./in/instructlogin';
import TraineewelcomeView from './pt/traineewelcome';
import TraineeloginView from'./pt/traineelogin';
import TraineeregisterView from'./pt/traineeregister';
import ThomeView from './pt/Thome';
import IhomeView from './in/Ihome';
import DetailPlanView from './pt/detailplan';
import TDetailPlanView from './in/Tdetailplan';
import EditPlanView from './pt/editplan';
import TEditPlanView from './in/Teditplan';
import TPlanView from './in/Tplan';
import TRecordView from './in/Trecord';
import TCreateplanView from './in/Tcreateplan';
import CreateplanView from './pt/createplan';
import PlanInfoView from './pt/planinfo';
import EditRecordView from './pt/editrecord';
import TEditRecordView from './in/Teditrecord';
import DetailRecordView from './pt/detailrecord';
import TDetailRecordView from './in/Tdetailrecord';
import ChartView from './pt/chart';
import TChartView from './in/Tchart';
import AdditemtodayView from'./pt/additemtoday';
import TAdditemtodayView from'./in/Tadditemtoday';
import AddrecordtodayView from'./pt/addrecordtoday';
import TAddrecordtodayView from'./in/Taddrecordtoday';
import ProfileModifyView from './pt/profilemodify';
import IProfileModifyView from './in/iprofilemodify';
import EmailModifyView from './pt/emailmodify';
import URLnetowrk from './pub/network';
import PhoneModifyView from './pt/phonemodify';
import PasswordModifyView from './pt/passwordmodify';
import IPhoneModifyView from './in/iphonemodify';
import IPasswordModifyView from './in/ipasswordmodify';
import IGenderModifyView from './in/igendermodify';
import IBirthModifyView from './in/ibirthmodify';
import IwView from './in/iwmodify';
import NewitemView from './pt/newitem';
import Description from './in/description';
import DetailGymView from './pub/detailgym';
import Gymcreate from './pub/gymcreate';
import SearchTrainee from './in/searchtrainee';
import SearchTrainer from './pt/searchtrainer';
import GuideView from './Guide';
export default class ptvios extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};
      // var type =  AsyncStorage.getItem('type');
   AsyncStorage.getItem('isFirst',(error,result)=>{

      if (result == 'false') {
        console.log('not first');

             var type;
      AsyncStorage.getItem('type',(err, result) => {
        console.log(result);
        type=result;
        if (type!==null) {
          if (type=="instructor") {
            var email;
            AsyncStorage.getItem('email',(err,result)=>{
            // console.log(result);
              email=result;
              var password;
              AsyncStorage.getItem('password',(err,result)=>{
                  // console.log(result);
                password=result;
                // var url = 'http://192.168.20.17:8080/pt_server/instructorlogin.action';
                  // var url = 'http://192.168.1.15:8080/pt_server/instructorlogin.action';
                var url = URLnetowrk+'instructor/login.action';
                url += '?email='+email+'&password='+password;
                console.log(url);
                fetch(url).then(function(response) {  
                  return response.json();
                }).then(function(res) {
                  console.log(res);
                  if (res["data"]!=null) {
                    _navigator.push({
                    title:'IhomeView',
                    id:'Ihome'
                    });
                  }
                });
              });
            });
          }else{
            var email;
            AsyncStorage.getItem('email',(err,result)=>{
            // console.log(result);
              email=result;
              var password;
              AsyncStorage.getItem('password',(err,result)=>{
                // console.log(result);
                password=result;
                  // var url = 'http://192.168.20.17:8080/pt_server/traineelogin.action';
                var url = URLnetowrk+'traineelogin.action';
                url += '?email='+email+'&password='+password;
                console.log(url);
                fetch(url).then(function(response) {  
                  return response.json();
                }).then(function(res) {
                  console.log(res);
                  if (res["data"]!=null) {
                    _navigator.push({
                    title:'ThomeView',
                    id:'Thome'
                    });
                  }
                });
              });
            });
          }
        };
      }); 

      } else  {

          console.log('is first');

          // 存储
          AsyncStorage.setItem('isFirst','false',(error)=>{
              if (error) {
                  alert(error);
              }
          });

         _navigator.push({
        title:'GuideView',
        id:'Guide'
        });
      }
    });
  
    }
  configureScenceAndroid(){
    return Navigator.SceneConfigs.FadeAndroid;
  }

  renderSceneAndroid(route,navigator){
    _navigator = navigator;
    if(route.id === 'main'){
      return (
        <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='never'
        >  
          <View style={styles.container}>
          </View>
          <View style={styles.maincontain}>
            <Image source={require('./img/ptv.png')} style={{width: 280, height: 140}}/>
            <View style={styles.choose}>
              <TouchableOpacity style={styles.btn}
                onPress={() => _navigator.push({title:'InstructwelcomeView',id:'instructwelcome'})}>
                <Text style={styles.text}>I am Instructor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}
                  onPress={() => _navigator.push({title:'TraineewelcomeView',id:'traineewelcome'})}>
                <Text style={styles.text}> I am trainee</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
    }
    if(route.id === 'instructwelcome'){
      return (
        <InstructwelcomeView {...route.params} navigator={navigator} route={route} />
       );
    }
    if(route.id === 'instructlogin'){
      return (
        <InstructloginView {...route.params} navigator={navigator} route={route} />
       );
    }
    if(route.id === 'instructregister'){
      return (
        <InstructregisterView {...route.params} navigator={navigator} route={route} />
       );
    }
    if(route.id === 'traineewelcome'){
      return (
        <TraineewelcomeView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'traineeregister'){
      return (
        <TraineeregisterView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'traineelogin'){
      return (
        <TraineeloginView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'plan'){
      return (
        <PlanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Tplan'){
      return (
        <TPlanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Trecord'){
      return (
        <TRecordView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Thome'){
      return (
        <ThomeView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Ihome'){
      return (
        <IhomeView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'detailplan'){
      return (
        <DetailPlanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Tdetailplan'){
      return (
        <TDetailPlanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'editplan'){
      return (
        <EditPlanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Teditplan'){
      return (
        <TEditPlanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'createplan'){
      return (
        <CreateplanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Tcreateplan'){
      return (
        <TCreateplanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'planinfo'){
      return (
        <PlanInfoView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'editrecord'){
      return (
        <EditRecordView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Teditrecord'){
      return (
        <TEditRecordView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'detailrecord'){
      return (
        <DetailRecordView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Tdetailrecord'){
      return (
        <TDetailRecordView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'chart'){
      return (
        <ChartView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Tchart'){
      return (
        <TChartView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'additemtoday'){
      return (
        <AdditemtodayView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Tadditemtoday'){
      return (
        <TAdditemtodayView {...route.params} navigator={navigator} route={route}/>
      );
    }
   if(route.id === 'addrecordtoday'){
      return (
        <AddrecordtodayView {...route.params} navigator={navigator} route={route}/>
      );
    }
   if(route.id === 'Taddrecordtoday'){
      return (
        <TAddrecordtodayView {...route.params} navigator={navigator} route={route}/>
      );
    }
   if(route.id === 'profilemodify'){
      return (
        <ProfileModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
   if(route.id === 'iprofilemodify'){
      return (
        <IProfileModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'phonemodify'){
      return (
        <PhoneModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }  
    if(route.id === 'iphonedmodify'){
      return (
        <IPhoneModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'passwordmodify'){
      return (
        <PasswordModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'ipasswordmodify'){
      return (
        <IPasswordModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'ibirthmodify'){
      return (
        <IBirthModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'igendermodify'){
      return (
        <IGenderModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }

    if(route.id === 'bmimodify'){
      return (
        <BModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'newitem'){
      return (
        <NewitemView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'staticmap'){
      return (
        <StaticMap {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'description'){
      return (
        <Description {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'detailgym'){
      return (
        <DetailGymView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'gymcreate'){
      return (
        <Gymcreate {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'searchtrainee'){
      return (
        <SearchTrainee {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'searchtrainer'){
      return (
        <SearchTrainer {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Guide'){
      return (
        <GuideView {...route.params} navigator={navigator} route={route}/>
      );
    }
  }
 render(){
    var renderScene = this.renderSceneAndroid;
    var configureScence = this.configureScenceAndroid;
    return (
      <Navigator
        debugOverlay={false}
        initialRoute={{ title: 'Main', id:'main'}}
        configureScence={{ configureScence }}
      renderScene={renderScene}/>
   );
  }
 


}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#38bda0',
  },
  Top:{
    height:50,
    alignItems: 'center',
    backgroundColor:'#f5f2f0',
    justifyContent: 'center',
  },
  WelcomeText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: '#d7499a',
  },
  maincontain:
  {
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#38bda0',
    justifyContent: 'center',
    alignItems: 'center',
  },
   logo:{
    width:160,
    height:160,
  },
  choose:{
    flexDirection:'row'
  },
  btn:{
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 50,
     borderRadius: 5,
     width:140,
     marginTop: 100,
     marginLeft:20,
  },
  text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },
});

AppRegistry.registerComponent('ptvios', () => ptvios);