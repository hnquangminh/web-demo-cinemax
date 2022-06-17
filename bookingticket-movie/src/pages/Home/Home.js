import React, { useEffect, useState } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
// Kết nối redux
import { useSelector, useDispatch } from "react-redux";
import Film from "../../components/Film/Film";
import MultipleRowSlick from "../../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAcion";
import { layDanhSacHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import HonmeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  console.log("arrFilm", arrFilm);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action); //dispatch function từ thunk

    dispatch(layDanhSacHeThongRapAction()); //dispatch function
  }, []);

  return (
    <div>
      <HonmeCarousel />
      <section className="text-gray-600 body-font">
        <div className="px-5 py-24 mx-auto " style={{ width: "95%" }}>
          <MultipleRowSlick arrFilm={arrFilm} />
        </div>
      </section>
      <div className="mx-36 mb-20">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
