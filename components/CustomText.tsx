import React from "react";
import { Text as RNText, TextProps } from "react-native";

type FontWeight = "Thin" | "Light" | "Regular" | "Medium" | "Bold" | "Poster";
type FontVariant = "Sombra" | "Safiro";

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
  let fontFamily = "";

  if (variant === "Safiro") {
    fontFamily = "Safiro-Medium";
  } else {
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
