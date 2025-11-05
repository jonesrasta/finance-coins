// /constants/Fonts.ts
import { Platform } from "react-native";

/**
 * Map de famílias/pesos tal como usados no app.
 *
 * Ajuste os valores (strings) para o NOME INTERNO da sua fonte se necessário.
 * Exemplos de nomes internos possíveis:
 * - "Sombra Thin"
 * - "Sombra Regular"
 * - "Sombra Poster"
 *
 * Mantenha aqui os nomes exatos que você registrou em Font.loadAsync.
 */

export const Fonts = {
  Sombra: {
    Thin: Platform.select({ default: "Sombra-Thin" }),
    Light: Platform.select({ default: "Sombra-Light" }),
    Regular: Platform.select({ default: "Sombra-Regular" }),
    Medium: Platform.select({ default: "Sombra-Medium" }),
    Bold: Platform.select({ default: "Sombra-Bold" }),
    Poster: Platform.select({ default: "Sombra-Poster" }),
  },
  Safiro: {
    Medium: Platform.select({ default: "Safiro-Medium" }),
  },
};

// export default for convenience
export default Fonts;
