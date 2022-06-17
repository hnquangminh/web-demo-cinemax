import {history} from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { DANG_NHAP_ACTION, LAY_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType"


export const dangNhapAction = (thongTinDangNhap) =>{
    return async (dispatch) =>{
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if(result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                // chuyển hướng đăng nhập vào trang trước đó
                history.goBack();
            } 
            console.log('result',result)     
        } catch (error) {
            alert("Mật khẩu và tài khoản không đúng, bạn vui lòng thử lại")
            console.log('error',error.response.data);
        }
    }
}

export const layDanhSachNguoiDungAction = (nguoiDung = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(nguoiDung);
            dispatch({
                type: SET_DANH_SACH_NGUOI_DUNG,
                danhSachNguoiDung: result.data.content
            })
            console.log("danhSachNguoiDung", result.data.content);     
        } catch (error) {
            console.log('error',error.response.data);
        }
    }
}
export const thongTinTaiKhoanAction = () =>{
    return async dispatch =>{
        try {
         
            const result = await quanLyNguoiDungService.thongTinTaiKhoan()
             if(result.data.statusCode === 200) {
                 dispatch({
                     type : SET_THONG_TIN_NGUOI_DUNG,
                     thongTinNguoiDungDatVe : result.data.content
                 })
             }
        } catch (error) {
            console.log("error",error)
        }
    }
}

export const dangKiTaiKhoanAction = (thongTinDangKi) =>{
    return async dispatch =>{
        try {
            const result = await quanLyNguoiDungService.dangKyTaiKhoan(thongTinDangKi)
            if(result.data.statusCode === 200){
                alert("Đăng kí tài khoản thành công!!!")
                history.push('/home')
             
            }
        } catch (errors) {
            alert("Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại")
            console.log("errors" , errors.response?.data)
        }
    }
}
export const themNguoiDungAction = (thongTinNguoiDung) =>{
    return async dispatch =>{
        try {
            const result = await quanLyNguoiDungService.ThemNguoiDung(thongTinNguoiDung)
            if(result.data.statusCode === 200) {
                alert("Thêm người dùng thành công!")
                history.push('/admin/users')
            }
        } catch (errors) {
            console.log("errors",errors.response?.data)
            alert("Thêm người dùng ko thành công!!")
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) =>{
    return async (dispatch) =>{
      try {
        const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan)
        if(result.data.statusCode === 200){
            alert("Xoá tài khoản thành công")
            dispatch(layDanhSachNguoiDungAction())
        }
      } catch (errors) {
         console.log("errors",errors.response?.data) 
      }
    }
}

export const capNhatThongTinNguoiDungAction = (taiKhoan) =>{
    return async (dispatch) =>{
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(taiKhoan)
            if(result.data.statusCode === 200){
                alert("Cập nhật tài khoản thành công!")
                history.push('/admin/users')
            }
        } catch (error) {
            console.log("error",error)
        }
    }
}

export const layDanhSachLoaiNguoiDungAction = () =>{
    return async dispatch =>{
        try {
            const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung()
            if(result.data.statusCode === 200){
                dispatch({
                    type :LAY_DANH_SACH_LOAI_NGUOI_DUNG,
                    danhSachLoaiNguoiDung : result.data.content
                })
            }
        } catch (error) {
            console.log("error",error)
        }
    }
}
export const capNhatThongTinProfileAction = (profile) =>{
    return async dispatch =>{
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinProfile(profile)
            if(result.data.statusCode === 200){
                alert("Cập nhật thành công!")
                dispatch(thongTinTaiKhoanAction())
            }
        } catch (error) {
            console.log("error",error)
        }
    }
}