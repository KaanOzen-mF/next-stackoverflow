import LeftSidebar from "@/components/navigation/LeftSideBar"; // Import the left sidebar component
import Navbar from "@/components/navigation/navbar"; // Import the navigation bar component
import RightSidebar from "@/components/navigation/RightSideBar";
import React, { ReactNode } from "react"; // Import React and the ReactNode type

// RootLayout component: wraps the entire page with common layout elements (Navbar, Sidebar, etc.)
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    // Main container with a background utility class for light/dark themes and relative positioning.
    <main className="background-light850_dark100 relative">
      {/* Navbar component at the top of the page */}
      <Navbar />

      {/* Flex container that holds the LeftSidebar and main content section */}
      <div className="flex">
        {/* Left sidebar navigation */}
        <LeftSidebar />

        {/* Main content area with padding and responsive adjustments */}
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          {/* Centered container with a maximum width for content */}
          <div className="mx-auto w-full max-w-5xl">
            {children} {/* Render the page-specific content here */}
          </div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default RootLayout;
