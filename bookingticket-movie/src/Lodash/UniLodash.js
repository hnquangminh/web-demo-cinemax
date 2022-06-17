import React from 'react'
import _ from "lodash";

export default function UniLodash() {
    let arr= [1,2,2,2,3,4,5,6];
    const arr2= [
        {id:1,name:'Iphone 13', price:105000},
        {id:2,name:'Iphone 13', price:10400},
        {id:3,name:'Iphone 113', price:105000},
        {id:4,name:'Iphone 13', price:1051000},
        {id:5,name:'Iphone 12', price:150000},
        {id:6,name:'Iphone 143', price:1001500},

        {id:7,name:'Iphone 123', price:505000},

        {id:8,name:'Iphone 113', price:10000},
    ];
    console.log('result', _.uniqBy(arr2,'id'));
      
  return (
    <div>UniLodash</div>
  )
}
