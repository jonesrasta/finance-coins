// /constants/Fonts.ts
import { Platform } from "react-native";

/**
 * Map de famílias/pesos tal como usados no app.
 *
 * Ajuste os valores (strings) para o NOME INTERNO da sua fonte se necessário.
 * Exemplos de nomes internos possíveis:
 * - "Saira-Condensed-Thin"
 * - "Saira-Condensed-Regular"
 */

export const Fonts = {
  SairaCondensed: {
    Thin: Platform.select({ default: "Saira-Condensed-Thin" }),
    Light: Platform.select({ default: "Saira-Condensed-Light" }),
    Regular: Platform.select({ default: "Saira-Condensed-Regular" }),
    Medium: Platform.select({ default: "Saira-Condensed-Medium" }),
    Bold: Platform.select({ default: "Saira-Condensed-Bold" }),
    ExtraBold: Platform.select({ default: "Saira-Condensed-ExtraBold" }),
  },
  Safiro: {
    Medium: Platform.select({ default: "Safiro-Medium" }),
  },
};

export default Fonts;
