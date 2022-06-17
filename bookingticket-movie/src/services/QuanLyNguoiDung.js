import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) =>{ // {taikhoan:'', matkhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap);
    }
    layThongTinNguoiDung = () =>{ 
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    }
    layDanhSachNguoiDung = (nguoiDung='') => {
        if(nguoiDung.trim()!=''){
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUPID}&tuKhoa=${nguoiDung}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUPID}`)

    }
    dangKyTaiKhoan = (thongTinDangKi) =>{
        return this.post(`/api/QuanLyNguoiDung/DangKy`,thongTinDangKi)
    }
    ThemNguoiDung = (thongTinNguoiDung) =>{
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`,thongTinNguoiDung)
    }
    xoaNguoiDung = (taiKhoan) =>{
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
    capNhatThongTinNguoiDung = (taiKhoan) =>{
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,taiKhoan)
    }
    layDanhSachLoaiNguoiDung = () =>{
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }
    capNhatThongTinProfile = (profile) =>{
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,profile)
    }

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();