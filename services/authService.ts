import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential, signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID,
  });

  const handleGoogleLogin = async () => {
    await promptAsync();
  };

  const handleAuthResponse = async () => {
    if (response?.type === "success") {
      const idToken = response.authentication?.idToken;

      if (!idToken) {
        throw new Error("Token não encontrado");
      }

      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
    }
  };

  return {
    request,
    response,
    handleGoogleLogin,
    handleAuthResponse,
  };
}

export async function logout() {
  await signOut(auth);
}