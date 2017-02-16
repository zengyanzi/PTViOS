
import React, { Component } from 'react';


import {

    StyleSheet,
    View,
    ListView,
    Text,
    BackAndroid,
    TouchableOpacity,
    navigator,
    ScrollView,
    DatePickerAndroid
} from 'react-native';
var Dimensions = require('Dimensions');

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
class TimetableView extends Component {

    constructor(props) {
        super(props);

         _navigator = this.props.navigator;

        function format (d) {
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        }
        var today =new Date();
        var today_format = format(today);
        console.log(today_format);//今天
        var tomorrow = new Date(today.getTime() + 1000* 60 * 60 * 24);
        var tomorrow_format = format(tomorrow);
        console.log(tomorrow_format); 
        var afttomorrow=new Date(today.getTime() + 1000* 60 * 60 * 24+1000* 60 * 60 * 24);
        var afttomorrow_format=format(afttomorrow);
        console.log(afttomorrow_format); 
        var data = {
            Monday: ['BB BENCH PRESS:12.5','CABLE UPRIGHT ROW:60', 'OPP ARM LEG EXTENSION:4','FRONT RAISE:7'],
            Tuesday: ['CLOSE MACHINE ROW:6','INCLINE DB BENCH:12.5 ', 'DB FLYS:7','REVERSE ASSISTED CHIN UPS(not):green ', 'WIDE LATT PULLDOWN:80 '],
            Wednesday: ['LEGS PRESS:120','CLOSE MACHINE ROW:6' ,'PRONE HOLD/PLANK:30'],
            Thursday: [ 'MILITARY PRESS:30','KB STEP UPS:6','SB PRONE ROLL OUTS(not):BW'],
            Friday: ['PRONE HOLD/PLANK:30', 'INCLINE DB BENCH:12.5 ','OPP ARM LEG EXTENSION:4'],
        };
        // var sectionIDs=[];
        var sectionIDs = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
        // for (var i = 0; i <=2; i++) {
        //     today_format=new Date(today.getTime() + 1000* 60 * 60 * 24);
        //    sectionIDs.push(today_format);
        // };
        var rowIDs = [[0,1,2,3],[0,1,2,3,4],[0,1,2],[0,1,2],[0,1,2]]
        var ds = new ListView.DataSource({
            getRowData: this.getRowData,
            getSectionHeaderData: this.getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });



        this.state = {
            dataSource: ds.cloneWithRowsAndSections(data, sectionIDs, rowIDs)
        };
    }



    getRowData(dataBlob, sectionID, rowID){
            return dataBlob[sectionID][rowID];
    }

    getSectionData(dataBlob, sectionID ){
                return sectionID;
    }





    renderHeader() {
        return (

            <View style={styles.header}>
                    <Text>
                        HERR IS YOUR WORK PLAN
                    </Text>
            </View>

        );
    }


    renderFooter() {
        return (
            <View style={styles.footer}>
                <Text>
                    CONTINUE
                </Text>
            </View>
        );
    }

    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.section}>
                <Text>
                    {sectionData}
                </Text>
            </View>
        );
    }
    // if (navigator) {
    //     navigator.push({
    //         title:'MysessionView',
    //         id:'mysession',
            
    //     })
    // };
        // _pressRow: function(rowID: number) {
        //     this.props.navigator.push({
        //         title:'MysessionView',
        //          id:'mysession',
        //          passProps: {rowID: rowID}
        //     });
        // }
    renderRow(rowData, sectionID, rowID,sectionData) {
        return (
            <TouchableOpacity  onPress={() => _navigator.push({title:"MysessionView",id:"mysession",params:{rowData:rowData}})}>
                <View style={styles.row}>
                   
                   
                    <Text style={styles.text}>{rowData}</Text>
                 
                </View>
             </TouchableOpacity>

        );
    }


    render() {

        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    style={styles.listview}
                    onChangeVisibleRows={(visibleRows, changedRows) => console.log({visibleRows, changedRows})}
                    renderHeader={this.renderHeader}
                    renderFooter={this.renderFooter}
                    renderSectionHeader={this.renderSectionHeader}
                    renderRow={this.renderRow}

                    initialListSize={10}
                    pageSize={10}
                    scrollRenderAheadDistance={2000}
                />

            </View>
        );
    }
}
;
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 20,
    },
    buttonstyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#06c1ae',
        marginBottom: 5,
    },
    section:{
        borderColor: 'blue',
        borderWidth: 1,
        backgroundColor:'#cdcdcd',
        width:screenW,

    },

    header:{
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor:'#80b8e4',
        width:screenW,
        height:44,
        justifyContent: 'center',
        alignItems:'center',

    },
    footer:{
        borderColor: 'yellow',
        borderWidth: 1,
        backgroundColor:'#d7499a',
        width:screenW,
        height:44,
        justifyContent: 'center',
        alignItems:'center',
    },
    row:{
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor:'#f5f2f0',
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        width:screenW,
    },
    text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#091016'
  },
});


export default TimetableView;