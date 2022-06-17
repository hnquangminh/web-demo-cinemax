import React from 'react'
import _ from 'lodash'
export default function FlttenLodash() {
    const arrObj1 = [{id:1, name:'khải'},{id:2, name:'minh'}];
    const arrObj2 = [{id:1, name:'ktuấni'},{id:2, name:'minh'}];

    const result1 = _.differenceWith(arrObj1,arrObj2,_.isEqual);
    console.log(result1);
  return (
    <div>FlttenLodash</div>
  )
}
