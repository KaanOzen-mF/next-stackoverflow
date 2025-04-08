import Image from "next/image"; // Next.js optimized image component
import Link from "next/link"; // Next.js Link component for client-side navigation
import { LogOut } from "lucide-react"; // Import LogOut icon from lucide-react
import { auth, signOut } from "@/auth"; // Authentication functions for user session management
// Import custom UI Button component
import { Button } from "@/components/ui/button";
// Import Sheet components for the mobile navigation modal
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// Import route constants for navigation
import ROUTES from "@/constants/routes";
// Import NavLinks component which contains the navigation links
import NavLinks from "./NavLinks";

// MobileNavigation component: displays a hamburger menu that opens a sheet (modal) for mobile navigation
const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <Sheet>
      {/* SheetTrigger: the element that opens the sheet when clicked */}
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden" // Visible only on small screens
        />
      </SheetTrigger>

      {/* SheetContent: the content of the modal, sliding from the left */}
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        {/* Hidden SheetTitle for accessibility */}
        <SheetTitle className="hidden">Navigation</SheetTitle>

        {/* Logo and site name */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="Logo"
          />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>

        {/* Navigation links container with vertical scroll if needed */}
        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          {userId ? (
            <SheetClose asChild>
              <form
                action={async () => {
                  "use server";

                  await signOut();
                }}
              >
                <Button
                  type="submit"
                  className="base-medium w-fit !bg-transparent px-4 py-3"
                >
                  <LogOut className="size-5 text-black dark:text-white" />
                  <span className="text-dark300_light900">Logout</span>
                </Button>
              </form>
            </SheetClose>
          ) : (
            <>
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_IN}>
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_UP}>
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </>
          )}

          {/* Bottom section with Log In and Sign Up buttons */}
          <div className="flex flex-col gap-3">
            {/* Log In button wrapped with SheetClose to close modal on click */}
            <SheetClose asChild>
              <Link href={ROUTES.SIGN_IN}>
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>

            {/* Sign Up button wrapped with SheetClose to close modal on click */}
            <SheetClose asChild>
              <Link href={ROUTES.SIGN_UP}>
                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                  Sign Up
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
