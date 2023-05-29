import { Container, Image } from "react-bootstrap";

const PageNotFound = () => {
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Image
        src="https://geek.design/wp-content/uploads/2019/01/BlogGraphic_4_404.png"
        alt="page not found"
        fluid
      />
    </Container>
  );
};

export default PageNotFound;
