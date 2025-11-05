// hooks/useLoadFonts.ts
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function useLoadFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        "Sombra-Thin": require("@/assets/fonts/Sombra-Thin.ttf"),
        "Sombra-Light": require("@/assets/fonts/Sombra-Light.ttf"),
        "Sombra-Regular": require("@/assets/fonts/Sombra-Regular.ttf"),
        "Sombra-Medium": require("@/assets/fonts/Sombra-Medium.ttf"),
        "Sombra-Bold": require("@/assets/fonts/Sombra-Bold.ttf"),
        "Sombra-Poster": require("@/assets/fonts/Sombra-Poster.ttf"),

        "Safiro-Medium": require("@/assets/fonts/Safiro-Medium.ttf"),
      });

      setLoaded(true);
    })();
  }, []);

  return loaded;
}
