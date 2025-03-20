"use client"; // This directive ensures the component is rendered on the client side

import * as React from "react";

// Importing a custom Button component from our UI library
import { Button } from "@/components/ui/button";

// Importing DropdownMenu components for creating a dropdown menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import the useTheme hook from next-theme for theme switching functionality
import useTheme from "next-theme";

// Importing icons for the theme toggle (SunIcon for light mode, MoonIcon for dark mode)
import { MoonIcon, SunIcon } from "lucide-react";

// Theme component: a dropdown menu to toggle between light, dark, and system themes
const Theme = () => {
  // Destructure setTheme function from the useTheme hook to change the theme
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      {/* The trigger for the dropdown is a button displaying sun and moon icons */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* Sun icon for light theme.
              In dark mode, it rotates and scales down to 0 */}
          <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          {/* Moon icon for dark theme.
              It is absolutely positioned and transitions to visible state in dark mode */}
          <MoonIcon
            className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            color="#fff"
          />
          {/* Screen-reader only text for accessibility */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {/* The dropdown menu content with theme options */}
      <DropdownMenuContent
        align="end"
        className="dark:bg-light-900 dark:text-black bg-black text-white"
      >
        {/* Dropdown item for switching to Light theme */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        {/* Dropdown item for switching to Dark theme */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        {/* Dropdown item for switching to System theme (based on user's OS preference) */}
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Theme;
