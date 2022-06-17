import React, { useEffect } from "react";
import "./Detail.css";
import { Tabs, Radio, Space, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SET_CHI_TIET_PHIM } from "../../redux/types/QuanLyRapType";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment"; //npm i moment
import { PlayCircleOutlined } from "@ant-design/icons";
import { Rate, Tag } from "antd";
import { NavLink } from "react-router-dom";
import ChiTietFilm from "./ChiTietFilm";
import { history } from "../../App";

const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);
  console.log({ filmDetail });
  // gọi API
  const dispatch = useDispatch();

  //B1: hook này có tác dụng khi trang vừa load lên liền lập tức đổ dữ liệu về liền
  useEffect(() => {
    let { id } = props.match.params;
    console.log("id", id);
    //B2: Tạo action để gọi APi
    dispatch(layThongTinChiTietPhim(id));
  }, []);

  return (
    <div
      className="detail container text-gray-700 body-font overflow-hidden bg-white"
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
      }}
    >
      <div className="box2">
        <div className="container px-5 py-24 flex flex-nowrap">
          <div
            className="lg:w-2/5 flex flex-wrap mt-20 mb-1"
            style={{ marginLeft: "20%" }}
          >
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border "
              src={filmDetail.hinhAnh}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6  lg:mt-0">
              <p className="text-sm title-font text-gray-700 tracking-widest text-white mb-5">
                Ngày Chiếu:{" "}
                {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
              </p>
              <h1
                className="text-white text-3xl title-font font-medium mb-1 "
                style={{ fontWeight: "bold" }}
              >
                {filmDetail.tenPhim}
              </h1>
              <p className="text-white font-normal m-0 text-lg text-green-500 mb-4">
                {filmDetail?.danhGia} IMDb - 2D/Digital
              </p>
              <Button
                type="primary"
                danger
                size="large"
                onClick={() => {
                  history.push(`/checkout/${filmDetail.maPhim}`);
                }}
              >
                Đặt Vé
              </Button>
            </div>
          </div>
          <div style={{ marginLeft: "10%", marginTop: "10%" }}>
            <p className="text-center text-yellow-400 mb-2">Đánh Giá</p>
            <h1 className="text-center text-green-800 mb-5">
              <Rate allowHalf value={filmDetail.danhGia / 2} />
            </h1>
            <div className={`c100 p${filmDetail.danhGia * 10}`}>
              <span>{filmDetail.danhGia * 10} %</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-white px-5 py-5"
          style={{ marginLeft: "20%", marginBottom: "5%" }}
        >
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Lịch Chiếu" key="1">
              <Tabs tabPosition={"left"}>
                {filmDetail.heThongRapChieu?.map((htr, index) => {
                  return (
                    <TabPane
                      tab={
                        <div>
                          <img
                            width={50}
                            height={50}
                            src={htr.logo}
                            alt={htr.logo}
                          />{" "}
                          {htr.tenHeThongRap}{" "}
                        </div>
                      }
                      key={index}
                    >
                      {htr.cumRapChieu?.map((cumRap, index) => {
                        return (
                          <div className="mt-5" key={index}>
                            <div className="flex flex-row">
                              <img
                                style={{ width: 50, height: 50 }}
                                src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg"
                              />
                            </div>
                            <div className="ml-2">
                              <p
                                style={{
                                  fontSize: 20,
                                  fontWeight: "bold",
                                  lineHeight: 1,
                                }}
                              >
                                {cumRap.tenCumRap}
                              </p>
                              <p
                                className="text-gray-400"
                                style={{ marginTop: 0 }}
                              >
                                {cumRap.diaChi}
                              </p>
                            </div>
                            <div className="thong-tin-lich-chieu grid grid-cols-4">
                              {cumRap.lichChieuPhim
                                ?.slice(0, 12)
                                .map((lichChieu, index) => {
                                  return (
                                    <NavLink
                                      to={`/checkout/${lichChieu.maLichChieu}`}
                                      key={index}
                                      className="col-span-1 text-green-800 font-bold"
                                    >
                                      {moment(
                                        lichChieu.ngayChieuGioChieu
                                      ).format("hh:mm A")}
                                    </NavLink>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            </TabPane>
            <TabPane tab="Thông Tin Phim" key="2">
              <div className="grid grid-cols-2">
                <div>
                  <table className="table-auto text-black text-lg">
                    <tbody key="tbody">
                      <tr>
                        <td className="font-bold p-2">Movie's name</td>
                        <td className="font-light p-2">
                          {filmDetail?.tenPhim}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold  p-2">Premiere date</td>
                        <td className="font-light p-2">
                          {moment(filmDetail?.ngayKhoiChieu).format(
                            "DD.MM.YYYY"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold  p-2">Director</td>
                        <td className="font-light p-2"></td>
                      </tr>
                      <tr>
                        <td className="font-bold  p-2">Performer</td>
                        <td className="font-light p-2"></td>
                      </tr>
                      <tr>
                        <td className="font-bold  p-2">Category</td>
                        <td className="font-light p-2"></td>
                      </tr>
                      <tr>
                        <td className="font-bold  p-2">Format</td>
                        <td className="font-light p-2">2D/Digitals</td>
                      </tr>
                      <tr>
                        <td className="font-bold  p-2">Nation</td>
                        <td className="font-light p-2"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <table className="table-auto text-black text-lg">
                    <tbody key="tbody">
                      <tr>
                        <td className="p-2 font-bold">Content</td>
                      </tr>
                      <tr>
                        <td className="p-2">{filmDetail?.moTa}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
