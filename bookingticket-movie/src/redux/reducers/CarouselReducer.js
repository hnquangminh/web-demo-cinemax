import { tupleNum } from "antd/lib/_util/type";
import { SET_CAROUSEL } from "../types/CarouselType";

const stateDefaults = {
  // B7: Gán lại vào state này
  arrImg: [
    {
      "maBanner": 1,
      "maPhim": 1282,
      "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png"
    }
  ],
};

export const CarouselReducer = (state = stateDefaults, action) => {
  switch (action.type) {
    //B6: bắt dữ liệu gọi lên từ case này thông qua phương thức SET_CAROUSEL
    case SET_CAROUSEL:{
      state.arrImg = action.arrImg;
      return {...state}
    }
    default: return {...state}
  }
  
}