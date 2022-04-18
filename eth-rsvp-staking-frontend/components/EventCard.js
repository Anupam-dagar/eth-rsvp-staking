import { ethers } from "ethers";
import { Button, Card, Grid, Header } from "semantic-ui-react";
import web3 from "../web3/web3";
import RsvpParticipant from "./RsvpParticipant";

const EventCard = ({ event, eventAddress, pageType }) => {
  const buyTicket = async () => {
    const price = ethers.utils.formatEther(event.price);
    await web3.buyTicket(eventAddress, price);
  };

  const withdrawBalance = async () => {
    await web3.withdrawBalance(eventAddress);
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{event.title}</Card.Header>
        <Card.Meta>{ethers.utils.formatEther(event.price)}</Card.Meta>
        <Card.Description>
          {event.description}
          {pageType === "RSVP" && (
            <>
              <br />
              <Header size="small">
                Treasury: {ethers.utils.formatEther(event.balance.toString())}{" "}
                eth
              </Header>
            </>
          )}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid verticalAlign="middle">
          <Grid.Column floated="right" width={pageType === "RSVP" ? 10 : 13}>
            <Header textAlign="right" size="small">
              {pageType === "RSVP"
                ? `${event.rsvpCount} attended out of ${event.sold}/${event.totalTickets} tickets`
                : `${event.sold} sold of ${event.totalTickets} available tickets`}
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <div className="ui two buttons">
              {pageType === "RSVP" ? (
                <>
                  <RsvpParticipant address={eventAddress} />
                </>
              ) : (
                <Button
                  onClick={buyTicket}
                  color="green"
                  disabled={event.ticketPurchased}
                >
                  {event.ticketPurchased ? "Ticket Purchased" : "Buy Ticket"}
                </Button>
              )}
            </div>
          </Grid.Column>
          {pageType === "RSVP" && (
            <Grid.Column width={3}>
              <div className="ui two buttons">
                <Button onClick={withdrawBalance} color="green">
                  Withdraw Balance
                </Button>
              </div>
            </Grid.Column>
          )}
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
