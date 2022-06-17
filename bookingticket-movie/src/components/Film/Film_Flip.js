import React from 'react'
import './Film_Flip.css'
import { NavLink } from 'react-router-dom';
import { history } from "../../App";
import { PlayCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { Button } from 'antd';


export default function Film_Flip(props) {
    const { item } = props;
  return (
    <div className="flip-card mt-2">
    <div className="flip-card-inner">
        <div className="flip-card-front">
            <img src={item.hinhAnh} alt={item.hinhAnh} style={{ width: 300, height: 300 }} onError={e => {e.target.onerror=null;e.target.src='https://picsum.photos/300/300';}} />
        </div>
        <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0 }} >
                <img src={item.hinhAnh} alt={item.hinhAnh} style={{ width: 300, height: 300 }} onError={e => {e.target.onerror=null;e.target.src='https://picsum.photos/300/300';}} />
            </div>
            <div className="w-full h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <div className="rounded-full cursor-pointer"><PlayCircleOutlined style={{ fontSize: '50px' }} /></div>
                    <div className="text-2xl mt-2 font-bold"> {item.tenPhim} </div>
                </div>
            </div>

        </div>
    </div>
    {/* <div className="bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold">
    <NavLink to={`/detail/${item.maPhim}`} >ĐẶT VÉ</NavLink></div> */}
    <div className="d-flex justify-content-center">
    <Button type="primary" danger onClick={() =>{
        history.push(`/detail/${item.maPhim}`);
    }}className="text-center cursor-pointer w-60 h-80 mt-2 text-success-50 font-bold">ĐẶT VÉ</Button>
    </div>   
</div>
  )
}
