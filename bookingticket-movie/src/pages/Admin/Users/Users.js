import React,{useEffect, Fragment} from 'react'
import { Button, Space, Table, Tag, Input } from 'antd';
import { history } from '../../../App';
import { useDispatch, useSelector } from 'react-redux'
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { NavLink } from 'react-router-dom';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
export default function Users(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(layDanhSachNguoiDungAction())
    }, []);
    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
      const columns = [
        {
          title: 'Họ Tên',
          dataIndex: 'hoTen',
          sorter: (a, b) => a.taiKhoan.length - b.taiKhoan.length,
        sortDirections: ['descend'],
        width: "20%"
        },
        {
          title: 'Tài Khoản',
          dataIndex: 'taiKhoan',
          sorter: (a, b) => a.taiKhoan.length - b.taiKhoan.length,
        sortDirections: ['descend'],
        width: "20%"
        },
        {
          title: 'Email',
          dataIndex: 'email',
          sorter: (a, b) => a.taiKhoan.length - b.taiKhoan.length,
        sortDirections: ['descend'],
        width: "20%"
        },
        {
          title: 'Loại Người Dùng',
          dataIndex: 'maLoaiNguoiDung',
          sorter: (a, b) => a.taiKhoan.length - b.taiKhoan.length,
        sortDirections: ['descend'],
        width: "20%"
        },
        // {
        //   title: 'Tags',
        //   key: 'tags',
        //   dataIndex: 'tags',
        //   render: (_, { tags }) => (
        //     <>
        //       {tags.map(tag => {
        //         let color = tag.length > 5 ? 'geekblue' : 'green';
        //         if (tag === 'loser') {
        //           color = 'volcano';
        //         }
        //         return (
        //           <Tag color={color} key={tag}>
        //             {tag.toUpperCase()}
        //           </Tag>
        //         );
        //       })}
        //     </>
        //   ),
        // },
        {
          title: 'Hành Động',
          dataIndex: 'taiKhoan',
          render: (text, user, index) => {
              return <Fragment>
                  <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/users/edit/${user.taiKhoan}`}><EditOutlined style={{ color: 'blue' }} /> </NavLink>
                  <span style={{ cursor: 'pointer' }} key={2} className="text-2xl"><DeleteOutlined style={{ color: 'red' }} onClick={() => {
                    //gọi action xóa 
                    if(window.confirm('Bạn có muốn xóa tài khoản:' + user.taiKhoan +  'này không ?')){
                      dispatch(xoaNguoiDungAction(user.taiKhoan))
                    }
                  }} /> </span>
              </Fragment>
          },
          sortDirections: ['descend', 'ascend'],
          width: '25%'
      },
      ];
  const { Search } = Input; 
  const onSearch = value => {
    console.log(value);
    // Gọi api layDanhSachPhim
    dispatch(layDanhSachNguoiDungAction(value))
  }   
  return (
    <div>
        <h3 className="text-4xl">Quản Lý Users</h3>
      <Button onClick = {() => {
        history.push('/admin/users/addnewuser')
      }} type="primary" className="mb-5">Thêm User</Button>
      <Search placeholder="Tìm kiếm phim " enterButton onSearch={onSearch} className="mb-5" style={{ width: "100%" }} />
        <Table columns={columns} dataSource={danhSachNguoiDung} rowKey={"taiKhoan"}/>
        </div>
  )
}
