import React from 'react'
import _ from "lodash";

export default function Include() {

    const arr = ['1','2','3'];
    console.log(_.includes(arr,'1'));
  return (
    <div>Include</div>
  )
}
