import React from 'react'
import _ from "lodash";

export default function SortLodash() {
    const user = [
        {id:5, name:'Tuấn Anh', age:19},
        {id:3, name:'Quốc Dũng', age:28},
        {id:4, name:'Quang Minh', age:15},
        {id:72, name:'My My', age:20},
        {id:25, name:'My My', age:20},
        {id:22, name:'My My', age:20},

    ]

    const resultSortByUser = _.sortBy(user, [item => item.name]);
    console.log('resultSortByUser',resultSortByUser);
    const result = _.sortBy(user,['name','age']);
    console.log('result',result);

  return (
    <div>SortLodash</div>
  )
}
