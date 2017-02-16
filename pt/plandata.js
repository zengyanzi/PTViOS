import React from 'react';
import {Image} from 'react-native';

var btnsDefault = [ { text: 'Button' } ];

var btnsTypes = [
  { text: 'Primary',    type: 'primary',   },
  { text: 'Secondary',  type: 'secondary', },
  { text: 'Delete',     type: 'delete',    }
];

var rows = [
  {
     Pdate:"Monday",
     Calories :"457",
     text: "Row:5min;Treadmill:6min;Xtrainer:5min",

    right: [
      { text: 'Edit', type: 'primary',},
      { text: 'Delete',onPress: function(){ alert('Confirm to delete?') },type: 'delete',},
    ],
    autoClose: true,
  }, {
    Pdate:"Sunday",
    Calories :"457",
     text: "Row:5min;Treadmill:6min;Xtrainer:5min",
    right: [
      { text: 'Edit', type: 'primary',},
      { text: 'Delete',onPress: function(){ alert('Confirm to delete?') },type: 'delete',},
    ],
    autoClose: true,
  }, {
      Pdate:"Friday",
      Calories :"457",
      text: "Row:5min;Treadmill:6min;Xtrainer:5min",
    right: [
      { text: 'Edit', type: 'primary',},
      { text: 'Delete',type: 'secondary',},
    ],
    autoClose: true,
  }, {
    Pdate:"Tuesday",
    Calories :"457",
    text: "Row:5min;Treadmill:6min;Xtrainer:5min",
    right: [
      { text: 'Edit', type: 'primary',},
      { text: 'Delete',type: 'secondary',},
    ],
  },
  
];

export default rows;