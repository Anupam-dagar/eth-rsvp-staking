import { Container } from "semantic-ui-react";
import Navbar from "../components/Navbar";
import WelcomeMessage from "../components/WelcomeMessage";
import CommonLayout from "../layouts/CommonLayout";

const Home = () => {
  return (
    <>
      <WelcomeMessage />
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

export default Home;
