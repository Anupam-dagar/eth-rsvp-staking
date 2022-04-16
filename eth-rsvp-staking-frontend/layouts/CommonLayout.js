import { Container } from "semantic-ui-react";
import Navbar from "../components/Navbar";

const CommonLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};

export default CommonLayout;
