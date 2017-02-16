import React from 'react';
import {Image} from 'react-native';



  var btnsDefault = [ { text: 'Button' } ];

  var btnsTypes = [
    { text: 'Primary',    type: 'primary',   },
    { text: 'Secondary',  type: 'secondary', },
    { text: 'Delete',     type: 'delete',    }
  ];
  var detailrows = [
    {

       Calories :"457",
       text:"Rower Moderate  5 min 30 sec fast:60 sec slow",
      right: [
        { text: 'Edit', onPress: function(){ this._editplan},type: 'primary',},
        { text: 'Submit',onPress: function(){ alert('confirm to submit?') },type:'secondary'},
        { text: 'Delete',onPress: function(){ alert('Confirm to delete?') },type: 'delete'},
      ],
      autoClose: true,
    }, {

      Calories :"457",
       text: "Walking Weighted Lunge  Controlled  Light 3 15  60Sec",
      right: [
        { text: 'Edit', type: 'primary',},
        { text: 'Submit',type:'secondary'},
        { text: 'Delete',onPress: function(){ alert('Confirm to delete?') },type: 'delete'},
      ],
      autoClose: true,
    }, {

        Calories :"457",
        text: "Upper Back 18,29 30-60 sec 1 1",
      right: [
        { text: 'Edit', type: 'primary',},
        { text: 'Submit',type:'secondary'},
        { text: 'Delete',onPress: function(){ alert('Confirm to delete?') },type: 'delete'},
      ],
      autoClose: true,
    }, {

      Calories :"457",
      text: "Bike Fast  3min  Moderate  15  60Sec",
      right: [
        { text: 'Edit', type: 'primary',},
        { text: 'Submit',type:'secondary'},
        { text: 'Delete',onPress: function(){ alert('Confirm to delete?') },type: 'delete'},
      ],
    },
    
  ];

export default detailrows;