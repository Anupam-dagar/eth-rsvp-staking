import { Container, Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu size="huge">
      <Container>
        <Menu.Item header>Event Management</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="allevents">All Events</Menu.Item>

          <Menu.Item name="myevents">My Events</Menu.Item>

          <Menu.Item name="management" position="right">
            Management
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
