"use client"; // This directive ensures that the component is treated as a client component in Next.js

// Import the ThemeProviderProps type and NextThemeProvider component from next-theme.
import { ThemeProviderProps } from "next-theme/dist/provider/index.props";
import { ThemeProvider as NextThemeProvider } from "next-theme";
import React from "react";

// Custom ThemeProvider component wraps NextThemeProvider.
// It accepts all properties defined in ThemeProviderProps and passes them down to NextThemeProvider.
// This allows you to customize the theme settings for your application.
const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};

export default ThemeProvider;
