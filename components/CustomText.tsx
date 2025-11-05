import React from "react";
import { Text as RNText, TextProps } from "react-native";

// 🔤 As variantes de família: apenas Sombra (padrão) e Safiro (especial)
type FontVariant = "Sombra" | "Safiro";

// 🔠 Pesos reais da pasta Sombra
type FontWeight =
  | "Thin"
  | "Light"
  | "Regular"
  | "Medium"
  | "Bold"
  | "Poster";

interface CustomTextProps extends TextProps {
  weight?: FontWeight;
  variant?: FontVariant;
}

export function CustomText({
  style,
  weight = "Regular",
  variant = "Sombra",
  ...props
}: CustomTextProps) {
  let fontFamily: string;

  if (variant === "Safiro") {
    // 👇 Usa a fonte especial Safiro
    fontFamily = "Safiro-Medium";
  } else {
    // 👇 Usa as fontes Sombra conforme sua pasta
    fontFamily = `Sombra-${weight}`;
  }

  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily,
        },
        style,
      ]}
    />
  );
}
