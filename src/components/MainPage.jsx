import { Button, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <Container className="mt-5 d-flex flex-column flex-sm-row align-items-center">
        <Col lg={8} className="pt-5 ">
          <h1>Welcome To</h1>
          <h1>User Management App</h1>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/signup" className="ps-5">
            <Button>SignUp</Button>
          </Link>
        </Col>
        <Col className="mt-5">
          <Image
            src="https://github.com/gunjan2012/react-practical-7/blob/feat-web-12-create-user-management-react-app/src/assets/banner-img.png?raw=true"
            alt="Welcome"
            fluid
            width={350}
          />
        </Col>
      </Container>
    </>
  );
};

export default MainPage;
