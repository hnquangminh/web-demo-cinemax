import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { GROUPID } from "../../../../util/settings/config";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachLoaiNguoiDungAction,
  themNguoiDungAction,
} from "../../../../redux/actions/QuanLyNguoiDungAction";
const AddNewUser = (props) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      maLoaiNguoiDung: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      matKhau: Yup.string()
        .min(6, "Too Short!")
        .max(20, "Too Long!")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      soDt: Yup.number()
        .typeError("Must be number!")
        .min(10, "Too Short!")
        .required("Required"),
      hoTen: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      maLoaiNguoiDung: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      // alert(JSON.stringify(values, null, 2));
      dispatch(themNguoiDungAction(values));
    },
  });

  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction());
  }, []);


  const { danhSachLoaiNguoiDung } = useSelector( state => state.QuanLyNguoiDungReducer);

  const renderOption = () => {
    return danhSachLoaiNguoiDung.map((item, index) => {
      return (
        <Select.Option key={index} value={item.maLoaiNguoiDung}>
          {item.tenLoai}
        </Select.Option>
      );
    });
  };
  const handleChange = (value) => {
    console.log("thongTinNguoiDung", value);
    formik.setFieldValue("maLoaiNguoiDung", value);
  };
  return (
    <>
      <p className="font-bold text-xl">Th??m ng?????i d??ng</p>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        size="middle"
      >
        <Form.Item label="T??i kho???n">
          <Input name="taiKhoan" onChange={formik.handleChange} />
          <p className="text-red-700">{formik.errors.taiKhoan}</p>
        </Form.Item>
        <Form.Item label="M???t kh???u">
          <Input name="matKhau" onChange={formik.handleChange} />
          <p className="text-red-700">{formik.errors.matKhau}</p>
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={formik.handleChange} />
          <p className="text-red-700">{formik.errors.email}</p>
        </Form.Item>
        <Form.Item label="S??? ??i???n tho???i">
          <Input name="soDt" onChange={formik.handleChange} />
          <p className="text-red-700">{formik.errors.soDt}</p>
        </Form.Item>
        <Form.Item label="M?? lo???i ng?????i d??ng">
          <Select name="maLoaiNguoiDung" onChange={handleChange}>
            {renderOption()}
          </Select>
          <p className="text-red-700">{formik.errors.maLoaiNguoiDung}</p>
        </Form.Item>
        <Form.Item label="H??? t??n">
          <Input name="hoTen" onChange={formik.handleChange} />
          <p className="text-red-700">{formik.errors.hoTen}</p>
        </Form.Item>
        <Form.Item label="Th??m ng?????i d??ng">
          <button
            type="submit"
            className="border-2 border-pink-500 rounded-lg bg-pink-500 px-4 py-1 text-white"
          >
            Add User
          </button>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddNewUser;
