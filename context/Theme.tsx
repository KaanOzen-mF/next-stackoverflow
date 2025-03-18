"use client";
import { ThemeProviderProps } from "next-theme/dist/provider/index.props";
import { ThemeProvider as NextThemeProvider } from "next-theme";
import React from "react";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};

export default ThemeProvider;
