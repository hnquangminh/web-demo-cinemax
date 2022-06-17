// Chức năng của Action là Gọi API
import axios from "axios";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { DOMAIN } from "../../util/settings/config";
import { SET_CAROUSEL } from "../types/CarouselType";

export const getCarouselAction = async (dispatch) => {
  // xử lý gọi API trước khi nó đưa dữ liệu đi
  try {
    const result = await quanLyPhimService.layDanhSachBanner();
    dispatch({
      type: SET_CAROUSEL,
      arrImg: result.data.content,
    });
  } catch (errors) {
    console.log("errors", errors);
  }
};
// C2: Nếu API Có Tham Số
//   export const getCarouselAction = (thamSo) => {
//   return async (dispatch) => {
//     // xử lý gọi API trước khi nó đưa dữ liệu đi
//     try {
//       const result = await axios({
//         url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner',
//         method:'GET'
//       });
//   dispatch({
//     type:'SET_CAROUSEL',
//     arrImg: result.data.content
//   })

//     } catch (errors) {
//       console.log('errors',errors);
//     }
//   };
// }
