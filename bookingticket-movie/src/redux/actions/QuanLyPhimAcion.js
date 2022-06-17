import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import {
  SET_DANH_SACH_PHIM,
  SET_THONG_TIN_PHIM,
} from "../types/QuanLyPhimType";

export const layDanhSachPhimAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      // sau khi lấy dữ liệu từ API về => redux ( reducer)
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
export const themPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.themPhimUploadHinh(formData);
      alert("Thêm phim thành công!!");
      console.log("result", result.data.content);
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
export const capNhapPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.capNhatPhimUpload(formData);
      if (result.data.statusCode === 200) {
        alert(" Sửa thông tin phim thành công!!");
        dispatch(layDanhSachPhimAction());
        history.push("/admin/films");
      }   
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);
      if ( result.data.statusCode === 200) {
        alert(" Xóa phim thành công!!");
        dispatch(layDanhSachPhimAction());
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhim(maPhim);
      // sau khi lấy dữ liệu từ API về => redux ( reducer)
      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
