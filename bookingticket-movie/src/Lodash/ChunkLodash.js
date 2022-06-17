import React from 'react'
import _ from 'lodash'

export default function ChunkLodash() {

    const arr= ['id',1,'name','khải','info','cybersoft'];

    const result = _.chunk(arr,2);
    console.log('result',result);
  return (
    <div>ChunkLodash</div>
  )
}
