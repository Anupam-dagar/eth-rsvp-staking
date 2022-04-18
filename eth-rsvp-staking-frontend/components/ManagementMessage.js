import { Header, Icon, Segment } from "semantic-ui-react";

const ManagementMessage = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="ethereum" />
        Manage Events
        <Header.Subheader>
          Manage events created by you and rsvp your participants
        </Header.Subheader>
      </Header>
    </Segment>
  );
};

export default ManagementMessage;
