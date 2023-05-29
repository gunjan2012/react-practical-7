import { Container, Image, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Container>
      <Navbar fixed="top" expand="lg" variant="light" bg="light">
        <Container>
          <Image
            src="https://static.thenounproject.com/png/1108807-200.png"
            width={40}
          />
          <Link to="/" className="text-decoration-none">
            <Navbar.Brand>User Management App</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Header;
