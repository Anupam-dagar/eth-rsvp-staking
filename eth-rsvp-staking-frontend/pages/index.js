import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Rail,
  Segment,
} from "semantic-ui-react";
import CreateEvent from "../components/CreateEvent";
import Event from "../components/Event";
import EventCard from "../components/EventCard";
import WelcomeMessage from "../components/WelcomeMessage";
import CommonLayout from "../layouts/CommonLayout";
import AuthContext from "../store/AuthContext";
import web3 from "../web3/web3";

const Home = () => {
  return (
    <>
      <WelcomeMessage />
      <Event />
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

export default Home;
