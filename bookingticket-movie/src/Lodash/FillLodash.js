import _ from 'lodash';
import React from 'react'

export default function FillLodash() {
    var arr = [
        {id:1,name:'Tuấn'},
        {id:2,name:'Hoa'},
        {id:3,name:'Hùng'},
    ];
    _.fill(arr,'Tuyết',1,3);
    console.log(arr);
  return (
    <div>FillLodash</div>
  )
}
