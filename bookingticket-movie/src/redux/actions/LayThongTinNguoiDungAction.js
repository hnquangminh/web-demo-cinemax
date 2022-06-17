import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import {SET_THONG_TIN_NGUOI_DUNG} from "../types/QuanLyNguoiDungType"



export const layThongTinNguoiDungAction = () => {
    return async dispatch =>{
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();
            console.log('result', result);
            if(result.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                })
            }
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}