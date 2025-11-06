// hooks/useLoadFonts.ts
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function useLoadFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        "Saira-Condensed-Thin": require("@/assets/fonts/SairaCondensed-Thin.ttf"),
        "Saira-Condensed-Light": require("@/assets/fonts/SairaCondensed-Light.ttf"),
        "Saira-Condensed-Regular": require("@/assets/fonts/SairaCondensed-Regular.ttf"),
        "Saira-Condensed-Medium": require("@/assets/fonts/SairaCondensed-Medium.ttf"),
        "Saira-Condensed-Bold": require("@/assets/fonts/SairaCondensed-Bold.ttf"),
        "Saira-Condensed-ExtraBold": require("@/assets/fonts/SairaCondensed-ExtraBold.ttf"),
        "Saira-Condensed-Black": require("@/assets/fonts/SairaCondensed-Black.ttf"),

        "Safiro-Medium": require("@/assets/fonts/Safiro-Medium.otf"),
      });

      setLoaded(true);
    })();
  }, []);

  return loaded;
}
