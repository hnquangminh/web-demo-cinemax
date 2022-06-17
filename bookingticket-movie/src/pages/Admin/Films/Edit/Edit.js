// Lưu ý: Khi call API từ redux về thì nó chưa được xử lý nên khi setState. Giờ

import React, { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { capNhapPhimUploadAction } from "../../../../redux/actions/QuanLyPhimAcion";
import { layThongTinPhimAction } from "../../../../redux/actions/QuanLyPhimAcion";
import { GROUPID } from "../../../../util/settings/config";

const Edit = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinPhimAction(id));
  }, []);
  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);
  console.log("thông tin phim", thongTinPhim);
  const formik = useFormik({
    // chỉ nên dùng cho trang edit
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      tenPhim: thongTinPhim?.tenPhim,
      //test chỉ cần đưa value vào
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      maNhom: GROUPID,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      console.log("values", values);
      //Tạo đối tượng formdata đưa giá trị forrmik vào formdata
      values.maNhom = GROUPID;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          //append lấy ra cái tên
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      //Cập nhập phim upload action
     dispatch(capNhapPhimUploadAction(formData)) //
    },
  });
  const handleChangeDatePicker = (value) => {
    console.log("datepicker", moment(value).format("DD/MM/YYYY"));

    //format lại ngày khởi chiếu và set lại giá trị vào formik
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  //closure function javascript
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (event) => {
    //Lấy file ra từ e
    let file = event.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      //Đem dữ liệu file lưu vào formik
      await formik.setFieldValue("hinhAnh", file);
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        // console.log(e.target.result);
        setImgSrc(event.target.result); //Hình base 64
      };
    }
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3>Edit Phim</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên Phim">
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
        />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
      </Form.Item>
      <Form.Item label="Mô Tả">
        <Input
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
      </Form.Item>
      <Form.Item label="Sắp Chiếu">
        <Switch
          onChange={handleChangeSwitch("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>
      <Form.Item label="Đang Chiếu">
        <Switch
          onChange={handleChangeSwitch("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>
      <Form.Item label="HOT">
        <Switch
          onChange={handleChangeSwitch("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>
      {/* <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'Sắp Chiếu',
                label: 'Sắp Chiếu',
              },
              {
                value: 'Đang Chiếu',
                label: 'Đang Chiếu',
              },
              {
                value: 'Hot',
                label: 'Hot',
              },
            ]}
          />
        </Form.Item> */}
      <Form.Item label="Ngày Khởi Chiếu">
        <DatePicker
          format={"DD/MM/YYYY"}
          onChange={handleChangeDatePicker}
          value={moment(formik.values.ngayKhoiChieu)}
        />
      </Form.Item>
      <Form.Item label="Số Sao">
        <InputNumber
          onChange={handleChangeInputNumber("danhGia")}
          value={formik.values.danhGia}
          min={1}
          max={10}
        />
      </Form.Item>
      <Form.Item label="Switch">
        <input
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg, image/gif, image/jpg"
        />
        <br />
        <img
          style={{ width: 200, height: 200 }}
          src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc}
          alt=""
        />
      </Form.Item>
      <Form.Item label="Tác Vụ">
        <button type="submit" className="btn btn-primary bg-slate-500">
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  );
};

export default Edit;
