import { useEffect } from "react";
import { Button, Card, Container } from "semantic-ui-react";
import WelcomeMessage from "../components/WelcomeMessage";
import CommonLayout from "../layouts/CommonLayout";

const Home = () => {
  return (
    <>
      <WelcomeMessage />
      <Card.Group>
        <Card fluid>
          <Card.Content>
            <Card.Header>Title</Card.Header>
            <Card.Meta>Price</Card.Meta>
            <Card.Description>Description</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green">
                Approve
              </Button>
              <Button basic color="red">
                Decline
              </Button>
            </div>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header>Steve Sanders</Card.Header>
            <Card.Meta>Friends of Elliot</Card.Meta>
            <Card.Description>
              Steve wants to add you to the group <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green">
                Approve
              </Button>
              <Button basic color="red">
                Decline
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};

export default Home;
