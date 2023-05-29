import { Formik, Field, ErrorMessage } from "formik";
import { Container, Form, Button, Image, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_USER, STORE_USER } from "../redux/constants";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SignupPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.usersReducer.loginUserData);
  const [previewImage, setPreviewImage] = useState(null);
  const phoneRegExp = /^[6-9]\d{9}$/;

  const initialValues = {
    profileImage: null,
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    id: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    values.password = bcrypt.hashSync(
      values.password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    values.confirmPassword = bcrypt.hashSync(
      values.confirmPassword,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    const formData = {
      ...values,
      profileImage: previewImage,
      id: uuidv4(),
    };
    dispatch({ type: STORE_USER, payload: formData });
    dispatch({ type: LOGIN_USER, payload: formData });
    resetForm();
  };

  const handleReset = (resetForm) => {
    resetForm();
  };

  const handleImageChange = (event, form) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    form.setFieldValue("profileImage", file);
  };

  const validationSchema = Yup.object({
    profileImage: Yup.mixed()
      .required("Image is required")
      .test("fileSize", "Image size should not exceed 2MB", (value) => {
        if (!value) return true; // If no image is provided, skip the validation
        const maxSize = 2 * 1024 * 1024; // 2MB maximum size
        return value.size <= maxSize;
      })
      .test(
        "fileFormat",
        "Only JPG or PNG file formats are allowed",
        (value) => {
          if (!value) {
            return true; // If no image is provided, skip the validation
          }
          return ["image/jpeg", "image/png"].includes(value.type);
        }
      ),
    name: Yup.string()
      .required("Name is required!")
      .min(15, "Name must be at least 15 characters"),
    email: Yup.string().email("Invalid email").required("Email is required!"),
    phone: Yup.string()
      .required("Phone number is required!")
      .matches(
        phoneRegExp,
        "Invalid phone number. Please enter valid phone number!"
      ),
    password: Yup.string().required("Password is required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm password is required!"),
  });

  return isLoggedIn ? (
    <Navigate to="/home" replace={true} />
  ) : (
    <Container className="bg-light p-4 w-auto rounded shadow-lg d-flex align-items-center justify-content-center mt-5">
      <Container className="d-flex flex-column flex-lg-row">
        <Col lg={5}>
          <h1 className="fw-bolder">SignUp</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Form.Group className="mb-3 align-items-center d-flex flex-column">
                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="Preview image"
                      style={{ width: 70 }}
                    />
                  )}
                  <Form.Label htmlFor="profileImage" className="cursor-pointer">
                    Photo +
                  </Form.Label>
                  <Field
                    name="profileImage"
                    id="profileImage"
                    type="file"
                    className="img-select"
                    value=""
                    autoComplete="off"
                    onChange={(event) => handleImageChange(event, props)}
                  />
                </Form.Group>
                <ErrorMessage
                  component="div"
                  className="text-danger"
                  name="profileImage"
                />
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Field
                    className="form-control"
                    type="text"
                    name="name"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Field
                    className="form-control"
                    name="email"
                    type="email"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>PhoneNo</Form.Label>
                  <Field
                    className="form-control"
                    type="number"
                    name="phone"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="phone"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Field
                    className="form-control"
                    type="password"
                    name="password"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="password"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Field
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-danger"
                    name="confirmPassword"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button
                  className="ms-3"
                  variant="danger"
                  onClick={() => handleReset(props.resetForm)}
                >
                  Reset
                </Button>
              </Form>
            )}
          </Formik>
          <p className="mt-3">
            Already Have an Account? <Link to="/login">Login</Link>
          </p>
        </Col>
        <Col className="d-flex align-items-center justify-content-center ms-lg-5 h-5">
          <Image
            src="https://github.com/gunjan2012/react-practical-7/blob/feat-web-12-create-user-management-react-app/src/assets/signup.png?raw=true"
            alt="signup-image"
            fluid
          />
        </Col>
      </Container>
    </Container>
  );
};

SignupPage.propTypes = {
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
};

export default SignupPage;
