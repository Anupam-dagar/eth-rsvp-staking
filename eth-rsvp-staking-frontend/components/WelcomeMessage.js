import { Header, Icon, Segment } from "semantic-ui-react";

const WelcomeMessage = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="ethereum" />
        Explore Events
        <Header.Subheader>
          Stake your eth to register and get them refunded once the event gets
          over
        </Header.Subheader>
      </Header>
    </Segment>
  );
};

export default WelcomeMessage;
