"use client"; // Ensure this component is rendered on the client-side

import Image from "next/image"; // Next.js optimized image component
import { signIn } from "next-auth/react"; // NextAuth function for social sign-in
import React from "react";

// Import route constants for navigation after sign-in
import ROUTES from "@/constants/routes";
// Import a custom toast hook to display notifications
import { toast } from "@/hooks/use-toast";
// Import a custom Button component from your UI library
import { Button } from "../ui/button";

// SocialAuthForm component handles social authentication (GitHub and Google)
const SocialAuthForm = () => {
  // Define a reusable button style class string
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";

  // Function to handle sign-in for a given provider (either "github" or "google")
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      // Call the signIn function from next-auth/react with provider and callback URL
      await signIn(provider, {
        callbackUrl: ROUTES.HOME, // Redirect URL after successful sign-in
        redirect: false, // Do not perform automatic redirect
      });
    } catch (error) {
      // Log error to console for debugging
      console.log(error);
      // Show a toast notification if sign-in fails
      toast({
        title: "Sign-in Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign-in",
        variant: "destructive",
      });
    }
  };

  return (
    // Container for the social auth buttons with margin-top and flex layout
    <div className="mt-10 flex flex-wrap gap-2.5">
      {/* GitHub sign-in button */}
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        {/* GitHub logo image */}
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        {/* Button text */}
        <span>Log in with GitHub</span>
      </Button>

      {/* Google sign-in button */}
      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        {/* Google logo image */}
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        {/* Button text */}
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
