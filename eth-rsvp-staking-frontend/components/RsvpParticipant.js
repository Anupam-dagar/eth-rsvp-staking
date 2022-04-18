import { ethers } from "ethers";
import { useState } from "react";
import { Button, Form, Icon, Input, Message, Modal } from "semantic-ui-react";
import web3 from "../web3/web3";

const RsvpParticipant = ({ address }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [participantAddress, setParticipantAddress] = useState(null);
  const [isError, setIsError] = useState(false);

  const validateForm = () => {
    return !!address;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      setIsError(true);
      return;
    }
    await web3.rsvpParticipant(address, participantAddress);
    clearForm();
    setModalIsOpen(false);
  };

  const clearForm = () => {
    setParticipantAddress(null);
  };

  return (
    <>
      <Button positive color="green" onClick={() => setModalIsOpen(true)}>
        Rsvp Participant
      </Button>
      <Modal
        dimmer="blurring"
        open={modalIsOpen}
        onClose={() => {
          clearForm();
          setModalIsOpen(false);
        }}
      >
        <Modal.Header>Rsvp Event Participant</Modal.Header>
        <Modal.Content>
          <Form size="large" onSubmit={onSubmit} error={isError}>
            <Form.Field required>
              <Form.Input
                fluid
                label="Participant Address"
                placeholder="Enter wallet address of participant"
                onChange={(e) => setParticipantAddress(e.target.value)}
              />
            </Form.Field>
            <Message
              error
              header="Incomplete Fields"
              content="Please fill participant address to continue."
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setModalIsOpen(false)}>
            Close
          </Button>
          <Button positive onClick={onSubmit}>
            RSVP
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default RsvpParticipant;
