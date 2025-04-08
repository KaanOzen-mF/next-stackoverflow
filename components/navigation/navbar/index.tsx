import Image from "next/image"; // Next.js optimized image component
import Link from "next/link"; // Next.js link component for client-side navigation
import React from "react";
import logo from "../../../public/images/site-logo.svg"; // Import site logo from public folder
import Theme from "./Theme"; // Import the Theme component for theme switching
import MobileNavigation from "./MobileNavigation";
import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";

// Navbar component: displays the site logo, a global search text, and the theme switcher
const Navbar = async () => {
  const session = await auth();
  return (
    // Navigation bar with various Tailwind CSS classes:
    // - "flex-between": Custom utility for space-between flex alignment
    // - "background-light900_dark200": Utility class for background color (light/dark modes)
    // - "fixed": Fixes the navbar to the top
    // - "z-50": High z-index to overlay on other elements
    // - "w-full": Full width
    // - "gap-5": Gap between child elements
    // - "p-6": Padding
    // - "shadow-light-300 dark:shadow-none": Shadow in light mode, none in dark mode
    // - "sm:px-12": Horizontal padding increases on small screens and up
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      {/* Logo and site name link */}
      <Link href="/" className="flex items-center gap-1">
        {/* Optimized logo image */}
        <Image src={logo} width={48} height={48} alt="DevFlow Logo" />

        {/* Site name styled with typography classes and custom fonts; hidden on very small screens */}
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Flow</span>
        </p>
      </Link>

      {/* Global search placeholder text */}
      <p className="dark:text-light-900">Global Search</p>

      {/* Theme switcher container */}
      <div className="flex-between gap-5">
        <Theme />
        {session?.user?.id && (
          <UserAvatar
            id={session.user.id}
            name={session.user.name!}
            imageUrl={session.user?.image}
          />
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
