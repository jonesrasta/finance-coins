import React from "react";
import { Text as RNText, TextProps } from "react-native";

type FontWeight = "Thin" | "Light" | "Regular" | "Medium" | "SemiBold" | "Bold" | "ExtraBold" | "Black";
type FontVariant = "SairaCondensed" | "Safiro";

interface CustomTextProps extends TextProps {
  weight?: FontWeight;
  variant?: FontVariant;
}

export function CustomText({
  style,
  weight = "Regular",
  variant = "SairaCondensed",
  ...props
}: CustomTextProps) {
  let fontFamily = "";

  if (variant === "Safiro") {
    fontFamily = "Safiro-Medium";
  } else {
    fontFamily = `Saira-Condensed-${weight}`;
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
