import "@walletconnect/react-native-compat";
import EthereumProvider from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";

let providerInstance: any = null;

export async function connectWallet() {
  try {
    const provider = await EthereumProvider.init({
      projectId: "e8f7772f8d2959da41ef5b971c380f97", // WalletConnect Cloud
      chains: [11155111], // Sepolia
      showQrModal: true,
    });

    await provider.enable();

    const ethersProvider = new ethers.BrowserProvider(provider as any);
    const signer = await ethersProvider.getSigner();
    const address = await signer.getAddress();

    providerInstance = provider;

    return { provider, signer, address };
  } catch (error) {
    console.error("Erro ao conectar wallet:", error);
    throw error;
  }
}

export async function signLoginMessage(signer: ethers.Signer) {
  const message = `Login seguro - ${Date.now()}`;
  const signature = await signer.signMessage(message);

  return { message, signature };
}

export async function disconnectWallet() {
  if (providerInstance) {
    await providerInstance.disconnect();
    providerInstance = null;
  }
}