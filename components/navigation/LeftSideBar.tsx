import React from "react";
import NavLinks from "./navbar/NavLinks"; // Import navigation links component
import ROUTES from "@/constants/routes"; // Import route constants
import Link from "next/link"; // Next.js Link component for client-side routing
import { Button } from "../ui/button"; // Import custom Button component
import Image from "next/image"; // Next.js optimized image component

// LeftSidebar component: Renders the sidebar with navigation links and auth buttons.
const LeftSidebar = () => {
  return (
    // Main sidebar section with custom scrollbar, background and border utilities.
    // "sticky left-0 top-0 h-screen" ensures the sidebar stays fixed on the left side.
    // "max-sm:hidden" hides the sidebar on small screens.
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 h-screen flex flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      {/* Top part of the sidebar containing the navigation links */}
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks />
      </div>

      {/* Bottom part of the sidebar containing auth buttons */}
      <div className="flex flex-col gap-3">
        {/* Log In Button */}
        <Button
          className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
          asChild
        >
          {/* Using asChild prop to wrap the Link component so Button styles are applied */}
          <Link href={ROUTES.SIGN_IN}>
            {/* Icon for Log In */}
            <Image
              src="/icons/account.svg"
              alt="Account"
              width={20}
              height={20}
              className="invert-colors lg:hidden" // Hide icon on large screens
            />
            {/* Text label for Log In, hidden on screens smaller than lg */}
            <span className="primary-text-gradient max-lg:hidden">Log In</span>
          </Link>
        </Button>

        {/* Sign Up Button */}
        <Button
          className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
          asChild
        >
          <Link href={ROUTES.SIGN_UP}>
            {/* Icon for Sign Up */}
            <Image
              src="/icons/sign-up.svg"
              alt="Account"
              width={20}
              height={20}
              className="invert-colors lg:hidden" // Hide icon on large screens
            />
            {/* Text label for Sign Up, hidden on screens smaller than lg */}
            <span className="max-lg:hidden">Sign Up</span>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default LeftSidebar;
