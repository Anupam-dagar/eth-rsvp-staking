import { useContext, useEffect, useState } from "react";
import { Container, Menu } from "semantic-ui-react";
import AuthContext from "../store/AuthContext";
import web3 from "../web3/web3";

const Navbar = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const authContext = useContext(AuthContext);

  const setWalletAccount = (account) => {
    console.log(`Account connected: ${account}`);
    setWalletConnected(true);
    authContext.setAccount(account);
  };

  const isWalletConnected = async () => {
    let accounts;
    try {
      accounts = await web3.getWalletAccounts();
    } catch (error) {
      console.log(`Error getting accounts from wallet. ${error.message}`);
      return;
    }

    if (accounts) {
      setWalletAccount(accounts[0]);
    }
  };

  const connectWallet = async () => {
    let accounts;
    try {
      accounts = await web3.requestAccounts();
    } catch (error) {
      return;
    }

    if (accounts) {
      setWalletAccount(accounts[0]);
    }
  };

  useEffect(() => {
    isWalletConnected();
  }, []);
  return (
    <Menu size="huge">
      <Container>
        <Menu.Item header>Event Management</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="allevents">All Events</Menu.Item>

          {walletConnected ? (
            <>
              <Menu.Item name="myevents">My Events</Menu.Item>

              <Menu.Item name="management" position="right">
                Management
              </Menu.Item>
            </>
          ) : (
            <Menu.Item
              name="management"
              position="right"
              onClick={connectWallet}
            >
              Connect Wallet
            </Menu.Item>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
