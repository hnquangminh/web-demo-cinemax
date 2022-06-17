import React from 'react'
import _ from "lodash";


export default function LastFirstLodash() {

    const arrStudent = [
        {id:1, name:'Peter'},
        {id:2, name:'Tuấn'},
        {id:3, name:'Pddddr'}
    ]
    const arr= [['001','Alice'],['002','Minh'],['003','Tuấn']]

    const [id,name] = _.first(arr);
    const [id1,name1] = _.last(arr);
  return (
    <div>
        <div>FirstItem: {_.first(arrStudent).name}</div>
        <div>LastItem: {_.last(arrStudent).name}</div>
        <div>FirstItem: {id} - {name}</div>
        <div>LastItem: {id1} - {name1}</div>
    </div>
  )
}
