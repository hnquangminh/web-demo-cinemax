import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
} from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from 'formik';
import moment from "moment";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";

export default function ShowTime(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '', 
      maRap:'',
      giaVe:''
    },
    onSubmit: async (values) => {
      console.log('values',values);
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);
        alert(result.data.content);
      } catch (error) {
        console.log("error",error.response?.data);
      }
    }
  }) 
  // thay vì thường lên reducer tạo state nhưng dùng useState thay cho việc đó
  // TH1: nếu tạo 2 cái state riêng biệt cho heThongTapChieu và cumRapChieu sẽ khi setState cái kia chạy lại lần nữa return state cũ
  // const {heThongTapChieu}
  //   TH2:
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  console.log(state.heThongRapChieu);
  // dùng async await
  // dùng useEffect để gọi API khi giao diện vừa load lên
  useEffect(async () => {
    try {
      // gọi luôn service thay vì gọi dispatch
      let result = await quanLyRapService.layThongTinHeThongRap();
      // setState này nó sẽ khác react component tạo state mới lun nó gán lun object mới vào object cũ lun
      setState({
        //giữ lại state cũ
        ...state,
        heThongRapChieu: result.data.content,
      });
    } catch (error) {}
  }, []);
  const handleChangeHeThongRap = async (value) => {
    console.log("maHeThongRap", value);
    //từ hệ thống rạp call api lấy thông tin rạp
    try {
        let result = await quanLyRapService.layThongTinCumRapTheoHeThong(value);
        setState({
            ...state, 
            cumRapChieu: result.data.content
        })
    } catch (error) {
        console.log('error',error.response?.data)
    }
  };
  const handleChangeCumRap = (value) => {
    formik.setFieldValue('maRap',value)
  }
 
  const onChangeDate = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    console.log('values', moment(values).format('DD/MM/YYYY hh:mm:ss'))

  };
  const onOk = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    console.log('values', moment(values).format('DD/MM/YYYY hh:mm:ss'))
  };
  const onchangeInputNumber = (values) => {
    formik.setFieldValue('giaVe',values);
  };
  const converSelectHTR = () => {
    return state.heThongRapChieu?.map((htr,index) => {
        return {label: htr.tenHeThongRap, value: htr.tenHeThongRap}
    })
  };
  let film = {};
  if(localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'))
  }
  return (
    <div className="container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ renembers: true}}
        onSubmitCapture  = {formik.handleSubmit}

      >
        <h3 className="text-2xl">Tạo lịch chiếu - {props.match.params.tenphim} </h3>
        <img src={film.hinhAnh} alt="..." width={200} height={100} />
        <Form.Item label="Hệ thống rạp">
          <Select
            // options={state.heThongRapChieu?.map((htr,index) => {
            //     return {label: htr.tenHeThongRap, value: htr.tenHeThongRap}
            // })}
            options= {converSelectHTR()}
            onChange={handleChangeHeThongRap}
            placeholder="Chọn Hệ Thống Rạp"
          />
        </Form.Item>
        <Form.Item label="Cụm rạp">
          <Select options={state.cumRapChieu?.map((cumRap,index)=>({label:cumRap.tenCumRap,value:cumRap.maCumRap}) )} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
        </Form.Item>
        <Form.Item label="Ngày chiếu giờ chiếu">
          <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
        </Form.Item>
        <Form.Item label="Giá vé">
          <InputNumber
            min={75000}
            max={500000}
            onChange={onchangeInputNumber}
          />
        </Form.Item>
        <Form.Item label="Chức năng">
          <Button htmlType="submit">Tạo lịch chiếu</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
