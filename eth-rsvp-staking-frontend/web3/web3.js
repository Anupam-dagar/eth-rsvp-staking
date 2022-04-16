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

export default {
  getWalletAccounts,
  requestAccounts,
};
