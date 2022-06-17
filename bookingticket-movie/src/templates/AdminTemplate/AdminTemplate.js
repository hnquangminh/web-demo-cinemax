import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { Layout, Menu, Breadcrumb } from 'antd';
import { FileAddOutlined , HeartOutlined, FileOutlined, UsergroupAddOutlined, UserOutlined, GiftOutlined} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const AdminTemplate = (props) => { //path, exact, Component
    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        // console.log(collapsed);
        setCollapsed(collapsed);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }
    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment> <button onClick={() => {
            history.push('/profile')
        }}> <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=" text-2xl ml-5 rounded-full bg-red-200 mr-2">{userLogin.taiKhoan.substr(0, 1)}</div></button> <button onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/home');
            window.location.reload();
        }} className="text-white ml-5 text-bold">Đăng xuất</button> </Fragment> : ''}
    </Fragment>
    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div onClick = {() => { history.push('/home')}} className="logo p-5" style={{cursor:'pointer'}}>
                        <img src="https://theme.hstatic.net/1000296517/1000449871/14/logo.png?v=4728" alt="..." />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/admin/">DashBoard</NavLink>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<GiftOutlined />} title="Films">
                            <Menu.Item key="10" icon={<HeartOutlined />}>
                                <NavLink to="/admin/films">Films</NavLink>                        
                            </Menu.Item>
                            <Menu.Item key="11" icon={<HeartOutlined />}>
                            <NavLink  icon={<FileAddOutlined />} to="/admin/films/addnew">Add new</NavLink>
                                    </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<UsergroupAddOutlined />} title="Users">
                            <Menu.Item key="12" icon={<HeartOutlined />}>
                                <NavLink to="/admin/users">Users</NavLink>
                            </Menu.Item>
                            <Menu.Item key="13" icon={<HeartOutlined />}>
                            <NavLink  to="/admin/users/addnewuser">Add new user</NavLink> 
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="text-right pr-10 pt-1">{operations}</div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Design by ©2022 Created by QuangMinh</Footer>
                </Layout>
            </Layout>
        </Fragment>
    }} />
}
export default AdminTemplate;