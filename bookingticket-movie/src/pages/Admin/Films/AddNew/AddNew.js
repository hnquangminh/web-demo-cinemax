import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAction } from "../../../../redux/actions/QuanLyPhimAcion";
import { GROUPID } from "../../../../util/settings/config";
const AddNew = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      console.log("values", values);
      values.maNhom = GROUPID;
      //Tạo đối tượng formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          //append lấy ra cái tên
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      // formData.append('tenPhim',formik.values.tenPhim);
      // formData.append('tenPhim',formik.values.moTa);
      // formData.append('tenPhim',formik.values.hinhAnh);
      // formData.append('File',formik.values.tenPhim);
      // Đặc trưng của thành formik là thành bảo mật của trình duyệt nên phải dùng phương thức get
      console.log("formData", formData.get("tenPhim"));

      // Gọi API đưa các giá trị về backend xử lý
      dispatch(themPhimUploadHinhAction(formData));
    },
  });
  const handleChangeDatePicker = (value) => {
    console.log("datepicker", moment(value).format("DD/MM/YYYY"));
    //format lại ngày khởi chiếu và set lại giá trị vào formik
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue(ngayKhoiChieu);
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
  const handleChangeFile = (event) => {
    //lấy file từ event
    let file = event.target.files[0];
    if (file.type === "image/png" || "image/jpeg" || "image/gif") {
      // tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        console.log(event.target.result);
        // nó sẽ load lên base64 hình ảnh
        setImgSrc(event.target.result);
      };
      // Đem dữ liệu file lưu vào useFomik
      formik.setFieldValue("hinhAnh", file);
      //validate
      // formik.setErrors
    }

    console.log("file", file);
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
      <h3>Thêm Mới Phim</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên Phim">
        <Input name="tenPhim" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô Tả">
        <Input name="moTa" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Sắp Chiếu">
        <Switch onChange={handleChangeSwitch("sapChieu")} />
      </Form.Item>
      <Form.Item label="Đang Chiếu">
        <Switch onChange={handleChangeSwitch("dangChieu")} />
      </Form.Item>
      <Form.Item label="HOT">
        <Switch onChange={handleChangeSwitch("hot")} />
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
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          name="ngayKhoiChieu"
          format={"DD/MM/YYYY"}
          onChange={handleChangeDatePicker}
        />
      </Form.Item>
      <Form.Item label="Số Sao">
        <InputNumber
          onChange={handleChangeInputNumber("danhGia")}
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
        <img style={{ width: 200, height: 200 }} src={imgSrc} alt="" />
      </Form.Item>
      <Form.Item label="Tác Vụ">
        <button type="submit" className="btn btn-primary bg-slate-500">
          Thêm Phim
        </button>
      </Form.Item>
    </Form>
  );
};

export default AddNew;
