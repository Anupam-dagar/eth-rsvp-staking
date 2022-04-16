import { ethers } from "ethers";
import { Button, Card } from "semantic-ui-react";

const EventCard = ({ event }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{event.title}</Card.Header>
        <Card.Meta>{ethers.utils.formatEther(event.price)}</Card.Meta>
        <Card.Description>{event.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui one buttons">
          <Button basic color="green">
            Approve
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
