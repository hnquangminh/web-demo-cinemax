import React from "react";
import _ from "lodash";

export default function JoinDemo() {
  let arr = ["Khải", "Nam", " Minh"];
  let arrPerson = [{id:1,name:'Minh'},
  {id:2,name:'Khải'},
  {id:3,name:'Nam'}]
  //ES6
  const result = arr.join("-");
  //Lodash
  const resultLodash = _.join(arr, '*');
  const findName = _.find(arr, item => item === 'Nam');
  const person = _.find(arrPerson, item => item.id === 2);
  return <div>{result}
  <br/>{resultLodash}
  <br/>{findName}
  <br/>Name: {person.name} ID: {person.id}</div>;
}
