import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect } from "react";

export function useGoogleAuth(onSuccess?: () => void) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID!,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.authentication?.idToken;

      if (!idToken) return;

      const credential = GoogleAuthProvider.credential(idToken);

      signInWithCredential(auth, credential)
        .then(() => {
          onSuccess?.(); // 🔥 callback de sucesso
        })
        .catch((err) => console.error("Erro login Google:", err));
    }
  }, [response]);

  return {
    handleGoogleLogin: promptAsync,
  };
}