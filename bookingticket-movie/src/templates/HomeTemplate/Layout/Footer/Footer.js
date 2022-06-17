import React from "react";
import {useSelector} from "react-redux"
import _ from 'lodash';
import {
  PhoneOutlined,
  UserOutlined,
  MailOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import backgroundFooter from "../../../../assets/images/backgroundFooter.jpg";
import { useTranslation } from "react-i18next";
import antd from "../../../../assets/icon/antd.png";
import axios from "../../../../assets/icon/axios.png";
import i18 from "../../../../assets/icon/i18.png";
import lodash from "../../../../assets/icon/lodash.png";
import moment from "../../../../assets/icon/moment.png";
import redux_saga from "../../../../assets/icon/redux_saga.png";
import redux from "../../../../assets/icon/redux.png";
import tailwind from "../../../../assets/icon/tailwind.png";
import style from './Footer.module.css'

export default function Footer(props) {
  const {heThongRapChieu} = useSelector(state => state.QuanLyRapReducer)
  // Dùng Lodas để lấy ra các thuộc tính cần dùng của mảng
  const arrHeThong = _.map(heThongRapChieu,(heThongRap) => _.pick(heThongRap,['maHeThongRap','tenHeThongRap','logo']))
  console.log('arr', arrHeThong)

  return (
    <footer className="h-auto w-screen bg-cover bg-cente py-24 px-52 p-4 bg-stone-400 sm:p-6 dark:bg-gray-800"   style={{ backgroundImage: `url(${backgroundFooter})`}}>
      <div className="mb-5 md:mb-10">
          <a href="https://theme.hstatic.net/1000296517/1000449871/14/logo.png?v=4728" className="flex items-center">
            <img
              src="https://theme.hstatic.net/1000296517/1000449871/14/logo.png?v=4728"
              className="mr-2 w-30 h-20"
              alt="CineMax"
            />
          </a>
        </div>  
      <div className="md:flex md:justify-between">  
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
        <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Thông tin liên hệ
            </h2>
            <table>
            <tbody key="tbody">
              <tr>
                <td className="p-2">
                  <UserOutlined style={{ color: "white", fontSize: "30px" }} />
                </td>
                <td className="text-lg p-2 text-white">Huỳnh Nguyễn Quang Minh</td>
              </tr>
              <tr>
                <td className="p-2">
                  <PhoneOutlined style={{ color: "white", fontSize: "30px" }} />
                </td>
                <td className="text-lg p-2 text-white">0935.612.365</td>
              </tr>
              <tr>
                <td className="p-2">
                  <MailOutlined style={{ color: "white", fontSize: "30px" }} />
                </td>
                <td className="text-lg p-2 text-white">quangminh.contact@yandex.com</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div className="grid grid-cols-2 ">
            {/* <ul className="text-gray-600 dark:text-gray-400"> */}
              {arrHeThong.map((htr,index)=>{
                  return   <div key={index}>
                  <img src={htr.logo} alt={htr.logo} style={{width: 50}}/>
                </div>
              })}
            {/* </ul> */}
          </div>
          <div className="congNghe ">
          <h1 className="text-white text-3xl">CÔNG NGHỆ SỬ DỤNG</h1>
          <div >
            <img className="w-10 m-3 inline-block" src={antd} alt="antd"></img>
            <img className="w-10 m-3 inline-block" src={tailwind} alt="tailwind"></img>
            <img className="w-10 m-3 inline-block" src={axios} alt="axios"></img>
            <img className="w-10 m-3 inline-block" src={i18} alt="i18"></img>
            <img className="w-10 m-3 inline-block" src={lodash} alt="lodash"></img>
            <img className="w-10 m-3 inline-block" src={moment} alt="moment"></img>
            <img className="w-10 m-3 inline-block" src={redux} alt="redux"></img>
            <img className="w-10  m-3 inline-block" src={redux_saga} alt="redux_saga"></img>
          </div>
        </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="https://flowbite.com" className="hover:underline">
            CINEMAX™
          </a>
          . QuangMinh.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a
            href="https://www.facebook.com/quangminh.contactme" target="_blank"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://github.com/hquangminh" target="_blank"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
