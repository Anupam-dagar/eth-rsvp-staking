import { ethers } from "ethers";
import { useState } from "react";
import { Button, Form, Icon, Input, Message, Modal } from "semantic-ui-react";
import web3 from "../web3/web3";

const CreateEvent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [maxTickets, setMaxTickets] = useState(null);
  const [price, setPrice] = useState(null);
  const [isError, setIsError] = useState(false);

  const validateForm = () => {
    return title && description && maxTickets && price;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      setIsError(true);
      return;
    }
    await web3.createEvent(title, description, maxTickets, price);
    clearForm();
    setModalIsOpen(false);
  };

  const clearForm = () => {
    setTitle(null);
    setDescription(null);
    setMaxTickets(null);
    setPrice(null);
    setIsError(false);
  };

  return (
    <>
      <Button positive size="huge" onClick={() => setModalIsOpen(true)}>
        <Icon name="bullhorn" />
        Create Event
      </Button>
      <Modal
        dimmer="blurring"
        open={modalIsOpen}
        onClose={() => {
          clearForm();
          setModalIsOpen(false);
        }}
      >
        <Modal.Header>Create New Event</Modal.Header>
        <Modal.Content>
          <Form size="large" onSubmit={onSubmit} error={isError}>
            <Form.Field required>
              <Form.Input
                fluid
                label="Title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Field>
            <Form.Field required>
              <Form.Input
                fluid
                label="Description"
                placeholder="What is the event about?"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Field>
            <Form.Group widths={2}>
              <Form.Input
                fluid
                label="Ticket Price"
                placeholder="Per ticket price"
              >
                <Input
                  label="eth"
                  placeholder="Per ticket price"
                  labelPosition="right"
                  onChange={(e) => {
                    setPrice(
                      ethers.utils.parseEther(e.target.value).toString()
                    );
                  }}
                />
              </Form.Input>
              <Form.Input
                fluid
                label="Max Tickets"
                placeholder="Total Available tickets"
                onChange={(e) => setMaxTickets(e.target.value)}
              />
            </Form.Group>
            <Message
              error
              header="Incomplete Fields"
              content="Please fill all required fields to continue."
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setModalIsOpen(false)}>
            Close
          </Button>
          <Button positive onClick={onSubmit}>
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default CreateEvent;
