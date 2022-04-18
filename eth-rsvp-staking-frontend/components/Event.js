import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { Card, Grid } from "semantic-ui-react";
import AuthContext from "../store/AuthContext";
import web3 from "../web3/web3";
import CreateEvent from "./CreateEvent";
import EventCard from "./EventCard";

const Event = ({ pageType }) => {
  const authContext = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  const eventStructToEvent = (eventStruct, balance) => {
    return {
      title: eventStruct[0],
      description: eventStruct[1],
      sold: eventStruct[2].toString(),
      totalTickets: eventStruct[3].toString(),
      price: eventStruct[4].toString(),
      ticketPurchased: eventStruct[5],
      rsvpCount: eventStruct[6],
      balance,
    };
  };

  const renderEvents = async () => {
    const isWalletConnected = authContext.account;
    if (!isWalletConnected) {
      return null;
    }

    let eventAddresses;
    if (pageType === "RSVP") {
      eventAddresses = await web3.getEventsByOwner();
    } else {
      eventAddresses = await web3.getEvents();
    }
    const retrievedEvents = await Promise.all(
      eventAddresses.map(async (eventAddress) => {
        const contract = web3.getEventContract(eventAddress);
        const eventData = await contract.getEventData();
        const balance = await contract.provider.getBalance(contract.address);
        const event = eventStructToEvent(eventData, balance);
        return { event, eventAddress };
      })
    );
    setEvents(retrievedEvents);
  };

  const heading = pageType === "RSVP" ? "Manage Events" : "Explore Events";

  useEffect(() => {
    renderEvents();
  }, [authContext]);
  return (
    <>
      <h2>{heading}</h2>
      <Grid>
        <Grid.Column width={pageType === "RSVP" ? 16 : 12}>
          <Card.Group>
            {events.map((event) => {
              return (
                <EventCard
                  pageType={pageType}
                  event={event.event}
                  eventAddress={event.eventAddress}
                />
              );
            })}
          </Card.Group>
        </Grid.Column>
        {pageType !== "RSVP" && (
          <Grid.Column floated="right" width={4}>
            <CreateEvent />
          </Grid.Column>
        )}
      </Grid>
    </>
  );
};

export default Event;
