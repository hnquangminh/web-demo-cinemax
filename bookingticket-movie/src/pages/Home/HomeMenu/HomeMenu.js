import React, { Fragment } from "react";
import { Radio, Space, Tabs } from "antd";
import { useState } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import DanhSachPhimTheoCumRap from "./DanhSachPhimTheoCumRap";

const { TabPane } = Tabs;

export default function HomeMenu(props) {
  console.log(props, "props123");
  const [tabPosition, setTabPosition] = useState("left");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const renderHeThongRap = () => {
    return props.heThongRapChieu.map((heThongRap, index) => {
      return (
         <TabPane
          tab={
            <img src={heThongRap.logo} className="rounded-full" width="50" />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div
                      style={{ cursor: "pointer" }}
                      key={index}
                      className=" text-left w-64 flex space-x-2"
                    >
                      <img
                        src={cumRap.hinhAnh}
                        style={{ width: "70px", height: "70px" }}
                        alt={index}
                        className="rounded"
                      />
                      <div className="flex flex-col  whitespace-normal">
                        <div>
                          <h6 className="font-semibold mb-0">
                            {cumRap.tenCumRap}
                          </h6>
                          <p className="text-sm text-coolGray-600">
                            {cumRap.diaChi.length + cumRap.tenCumRap.length >
                            60 ? (
                              <span>{cumRap.diaChi.slice(0, 25)}...</span>
                            ) : (
                              <span>{cumRap.diaChi}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  <DanhSachPhimTheoCumRap danhSachPhimTheoCumRap = {cumRap.danhSachPhim}/>
                  {/*Load phim tương ứng */}             
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>;
}
