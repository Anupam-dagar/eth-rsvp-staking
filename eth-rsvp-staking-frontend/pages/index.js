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
import EventCard from "../components/EventCard";
import WelcomeMessage from "../components/WelcomeMessage";
import CommonLayout from "../layouts/CommonLayout";
import AuthContext from "../store/AuthContext";
import web3 from "../web3/web3";

const Home = () => {
  const authContext = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  const eventStructToEvent = (eventStruct) => {
    return {
      title: eventStruct[0],
      description: eventStruct[1],
      sold: eventStruct[2].toString(),
      totalTickets: eventStruct[3].toString(),
      price: eventStruct[4].toString(),
    };
  };

  const renderEvents = async () => {
    const isWalletConnected = authContext.account;
    if (!isWalletConnected) {
      return null;
    }

    const eventAddresses = await web3.getEvents();
    const retrievedEvents = await Promise.all(
      eventAddresses.map(async (eventAddress) => {
        const contract = web3.getEventContract(eventAddress);
        const eventData = await contract.getEventData();
        const event = eventStructToEvent(eventData);
        return event;
      })
    );
    setEvents(retrievedEvents);
  };

  useEffect(() => {
    renderEvents();
  }, [authContext]);
  return (
    <>
      <WelcomeMessage />
      <h2>Explore Events</h2>
      <Grid>
        <Grid.Column width={12}>
          <Card.Group>
            {events.map((event) => {
              return <EventCard event={event} />;
            })}
          </Card.Group>
        </Grid.Column>
        <Grid.Column floated="right" width={4}>
          <CreateEvent />
        </Grid.Column>
      </Grid>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

export default Home;
