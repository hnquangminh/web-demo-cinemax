import React,{useEffect} from "react";
import { Carousel } from "antd";
import {useSelector, useDispatch} from "react-redux"
// thư viện gọi API
import axios from 'axios';
import { getCarouselAction } from "../../../../redux/actions/CarouselAction";
import './HomeCarousel.css'

const contentStyle = {
  height: "700px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundPosition:"center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};

export default function HonmeCarousel() {
  // B1. Dữ liệu sẽ lấy từ state về là 1 cái mảng có 1 dữ liệu
  const {arrImg} = useSelector(state => state.CarouselReducer)
  console.log('arrImg', arrImg)
  const dispatch = useDispatch();
  //Sẽ tự kích hoạt khi component load ra
  //B4: Sẽ chạy useEffect để gọi API lấy dữ liệu từ server về
  // dispatch có 2 cách
  //c1: dispatch là 1 object
  // useEffect( async () =>{
  //   try{
  //     const result = await axios({
  //       url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner',
  //       method:'GET'
  //     });
  //     // Đưa lên reducer
  //     console.log('result',result);
  //     //B5: Lấy dữ liệu xong đưa lên reducer
  //     // action có 2 thuộc tính: 1.type & 2.data
  //     dispatch({
  //       type:'SET_CAROUSEL',
  //       arrImg: result.data.content
  //     })
  //   } catch (errors) {
  //     console.log('errors',errors)
  //   }
  // },[])
    // c2: middleware hỗ trợ dispatch nếu chưa có 1 object như vầy có thể dispatch là 1 function để có thể xử lý và trả về object 
    useEffect(() =>{
      // tham số truyền đi thay vì là object có thuộc tính type thì tham số truyền đi là 1 function
      const action = getCarouselAction;
      // cài redux thunk có quyền gọi 1 function
      dispatch(action);
      // C1 action = {type:'',data}
      // C2 (phải cài middleware):
      //callBackFunction(dispatch)
      // const action = getCarouselAction(1);
      // dispatch(action);
    },[])


    //B3: Chạy hàm renderImg
  const renderImg = () => {
    return arrImg.map((item,index) =>{
      return  <div key={index}>
      <div style={{...contentStyle, backgroundImage: `url(${item.hinhAnh})`}}>
        {/* Có những thuộc tính này giúp google index được có lợi SEO và dùng opacity để ẩn nó đi */}
          <img className="w-full, opacity-0" src={item.hinhAnh} alt="doctor-strange"/>
      </div>
    </div>
    })
  }
  //B2: Load ra giao diện này
  return (
    <Carousel autoplay  >
      {renderImg()}
    </Carousel>
  );
}
