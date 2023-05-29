import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Button, Image, Col } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_USER } from "../redux/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const usersData = useSelector((state) => state.usersReducer.usersData);
  const isLoggedIn = useSelector((state) => state.usersReducer.loginUserData);
  const dispatch = useDispatch();

  const onSubmit = (values, { resetForm }) => {
    values.password = bcrypt.hashSync(
      values.password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    let loggedInUser = usersData.find((user) => user.email === values.email);
    if (loggedInUser) {
      if (loggedInUser.password === values.password) {
        dispatch({
          type: LOGIN_USER,
          payload: loggedInUser,
        });
      } else {
        toast.error("Incorrect Password", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("User Not Found!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    resetForm();
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is Required!"),
    password: Yup.string().required("Password is Required!"),
  });

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/home" replace={true} />
      ) : (
        <Container className="bg-light p-4 w-auto rounded shadow-lg mt-5">
          <Container className="d-flex flex-column flex-md-row">
            <Col lg={5}>
              <h1>Welcome Back</h1>
              <p className="text-muted">Login to continue</p>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                <Form className="mt-5">
                  <div className="mb-3 d-flex flex-column ">
                    <label className="form-label">Email</label>
                    <Field
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="off"
                    />
                    <div className="text-danger">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div className="mb-3 d-flex flex-column ">
                    <label className="form-label">Password</label>
                    <Field
                      className="form-control"
                      type="password"
                      id="password"
                      name="password"
                      autoComplete="off"
                    />
                    <div className="text-danger">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Formik>
              <p className="pt-3">
                Don&apos;t have an account? <Link to="/signup">Signup</Link>
              </p>
            </Col>
            <Col className="d-flex justify-content-center">
              <Image
                src="https://www.amzarabia.com/wp-content/uploads/2020/12/e3721ddd6a2db50936b22410a0d344ac.png"
                alt="login-image"
                fluid
                width={450}
              />
            </Col>
          </Container>
        </Container>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default LoginPage;
