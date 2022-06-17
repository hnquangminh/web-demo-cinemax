import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { history } from "../../../../App";
import { Select } from "antd";
import { UserOutlined } from '@ant-design/icons';

// Sử dụng cái hook để dịch đa ngôn ngữ
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../../../util/settings/config";

const { Option } = Select;

export default function Header(props) {
  const { t, i18n } = useTranslation();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            {t("Sign in")}
          </button>
          <button
            onClick={() => {
              history.push("/register");
            }}
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          >
            {t("Register")}
          </button>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <button
          onClick={() => {
            history.push("/profile");
          }}
          className="self-center px-8 py-3 rounded"
        >
          <UserOutlined text-2xl />  {userLogin.taiKhoan}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push("/home");
            window.location.reload();
          }}
          className="text-yellow-500 mr-5"
        >
          {t("Sign out")}
        </button>
      </Fragment>
    );
  };

  return (
    <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <a className="navbar-brand" href="/home">
          <img
            src="https://theme.hstatic.net/1000296517/1000449871/14/logo.png?v=4728"
            alt
            width={180}
            height={80}
          />
        </a>

        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              rel="noopener noreferrer"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white
              "
              acticeClassName="border-b-1"
            >
              {t("Home")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contact"
              rel="noopener noreferrer"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white"
              acticeClassName="border-b-1"
            >
              {t("Contact")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/admin"
              rel="noopener noreferrer"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white"
              acticeClassName="border-b-1"
            >
              {t("Administrator")}
            </NavLink>
          </li>
          {/* text thử 1 ngôn ngữ hiện 2 cái khác nhau */}
          {/* <li className="flex items-center px-4 -mb-1  dark:border-transparent text-white">{t('hello.2')}</li> */}
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}
          <Select
            defaultValue="en"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="en">English</Option>
            <Option value="vi">VietNam</Option>
            <Option value="chi">Chinese</Option>
          </Select>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
