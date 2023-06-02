import { Card, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER } from "../redux/constants";
import { Link, Navigate } from "react-router-dom";

const HomePage = () => {
  const loginUserDetail = useSelector(
    (state) => state.usersReducer.loginUserData
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });
  };
  return loginUserDetail ? (
    <>
      <Container className="mt-5 d-flex justify-content-end ">
        <Link to="/signup">
          <Button variant="light" onClick={handleLogout}>
            Logout
          </Button>
        </Link>
      </Container>
      <Container className="mt-5 d-flex justify-content-center">
        <Card style={{ width: "18rem" }} className="shadow-lg">
          <Card.Img
            variant="top"
            src={loginUserDetail.profileImage}
            alt="profile-image"
          />
          <Card.Body>
            <Card.Title>{loginUserDetail.name}</Card.Title>
            <Card.Text>{loginUserDetail.email}</Card.Text>
            <Card.Text>{loginUserDetail.phone}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <Container className="rounded text-center mt-5 fs-6">
        “Hello <strong>{loginUserDetail.name}</strong>, you are registered with
        the
        <strong> email id -{loginUserDetail.email} </strong> and
        <strong> phone number - {loginUserDetail.phone} </strong>”
      </Container>
    </>
  ) : (
    <Navigate to="/signup" replace={true} />
  );
};

export default HomePage;
