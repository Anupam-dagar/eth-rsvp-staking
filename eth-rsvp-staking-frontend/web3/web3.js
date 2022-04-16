import { ethers } from "ethers";
import eventFactory from "../contracts/EventFactory.json";
import event from "../contracts/Event.json";

const getWalletAccounts = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    console.log("Metamask not installed.");
    return null;
  }

  const accounts = await ethereum.request({ method: "eth_accounts" });
  if (accounts.length === 0) {
    return null;
  }

  return accounts;
};

const requestAccounts = async () => {
  try {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(`Connected account: ${accounts[0]}`);
    return accounts;
  } catch (error) {
    console.log(`Error requesting accounts from wallet: ${error.message}`);
    throw error;
  }
};

const getEvents = async () => {
  const contract = getEventFactoryContract();
  const events = await contract.getEvents();
  return events;
};

const createEvent = async (title, description, maxTickets, price) => {
  const contract = getEventFactoryContract();
  const transaction = await contract.createEvent(
    title,
    description,
    maxTickets,
    price
  );
  console.log(JSON.stringify(transaction));
  await transaction.wait();
};

const getEventFactoryContract = () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    eventFactory.abi,
    signer
  );
  return contract;
};

const getEventContract = (address) => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, event.abi, signer);
  return contract;
};

export default {
  getWalletAccounts,
  requestAccounts,
  getEvents,
  createEvent,
  getEventContract,
};
