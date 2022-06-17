import React, { Fragment, useEffect } from 'react'
import { Table, Input, Space, Button  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAcion';
import { NavLink } from 'react-router-dom';
import {CalendarOutlined, DeleteOutlined,EditOutlined } from '@ant-design/icons';
import { history } from '../../../App';


export default function Films(props) {

  const {arrFilmDefault} = useSelector(state => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  console.log('arrFilmDefault', arrFilmDefault);
  useEffect(() => {
    dispatch(layDanhSachPhimAction())
  },[])
  const columns = [
    {
      title: 'maPhim',
      dataIndex: 'maPhim',
      value: (text,object) => {
        return <span>{text}</span>
      },
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend','ascend'],
      width: '10%',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      render: (text,film) => {
          return <Fragment><img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={({ event }) => {
            event.onerror = null; 
            event.src="image_path_here";
          }}/></Fragment>
      },
      width: '20%',
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      sorter: (a,b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;

      },
      width: '25%',
      sortDirections: ['descend','ascend'],
    },
    {
      title: 'Mô Tả',
      dataIndex: 'moTa',
      sorter: (a,b) => {
        let moTaA = a.moTa.toLowerCase().trim();
        let moTaB = b.moTa.toLowerCase().trim();
        if (moTaA > moTaB) {
          return 1;
        }
        return -1;

      },
      render: (text,film) => { return <Fragment>
          {film.moTa.length>50 ? film.moTa.substr(0.50)+ '...' : film.moTa}
        </Fragment>
      },
      sortDirections: ['descend','ascend'],
    },
    {
      title: 'Hành động',
      dataIndex: 'maPhim',
      render: (text, film) => {
          return <Fragment>
              <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/films/edit/${film.maPhim}`}><EditOutlined style={{ color: 'blue' }} /> </NavLink>
              <span style={{ cursor: 'pointer' }} key={2} className="text-2xl" onClick={() => {
                  //Gọi action xoá
                  if (window.confirm('Bạn có chắc muốn xoá phim ' + film.tenPhim)) {
                      //Gọi action
                      dispatch(xoaPhimAction(film.maPhim))
                  }
              }}><DeleteOutlined style={{ color: 'red' }} /> </span>
              <NavLink key={1} className=" mr-2 text-2xl" to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={()=>{
                  localStorage.setItem('filmParams',JSON.stringify(film));
              }}><CalendarOutlined style={{ color: 'green' }} /> </NavLink>
          </Fragment>
      },
      sortDirections: ['descend', 'ascend'],
      width: '25%'
  },
  ];
  const data = arrFilmDefault;
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}

  const { Search } = Input;
  const onSearch = value => {
    console.log(value);
    // Gọi api layDanhSachPhim
    dispatch(layDanhSachPhimAction(value))
  } 
  return (
    <div className="container">
      <h3 className="text-4xl">Quản Lý Phim</h3>
      <Button onClick = {() => {
        history.push('/admin/films/addnew')
      }} type="primary" className="mb-5">Thêm Phim</Button>
      <Search className="mb-5" placeholder="Nhập Tên Phim Cần Tìm" onSearch={onSearch} enterButton />
      <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"}/>; 
      </div>
  )
}
