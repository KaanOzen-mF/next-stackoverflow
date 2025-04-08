"use client"; // Ensure the component is rendered on the client side

import React from "react";

// Import zodResolver to integrate Zod schema validation with react-hook-form.
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
// Import necessary hooks and types from react-hook-form for form handling.
import {
  useForm,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
} from "react-hook-form";

// Import Zod for schema validation.
import { z, ZodType } from "zod";

// Import UI components for building the form.
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";

// Import route constants to navigate between auth pages.
import ROUTES from "@/constants/routes";
import { ActionResponse } from "@/types/global";

// Define the props interface for the AuthForm component. It is generic over T which extends FieldValues.
// - schema: Zod schema used for validating form data.
// - defaultValues: initial default values for the form fields.
// - onSubmit: asynchronous function to be called on form submission.
// - formType: determines whether the form is for SIGN_IN or SIGN_UP.
interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

// AuthForm component definition using a generic type T that extends FieldValues.
const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  // Check if the form type is valid. If not, redirect to the sign-in page.
  const router = useRouter();
  // Initialize the form using react-hook-form.
  // zodResolver is used to integrate Zod schema validation.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // Define a submit handler. Currently, it is an empty async function.
  // Replace this with actual logic or use the onSubmit prop as needed.
  const handleSubmit: SubmitHandler<T> = async (data) => {
    // Call the onSubmit function passed in props.
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast({
        title: "Success",
        description:
          formType === "SIGN_IN"
            ? "Signed in successfully"
            : "Signed up successfully",
      });

      router.push(ROUTES.HOME);
    } else {
      toast({
        title: `Error ${result?.status}`,
        description: result?.error?.message,
        variant: "destructive",
      });
    }
  };

  // Determine the button text based on the form type.
  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    // Wrap the form with a custom Form component which provides context and styling.
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {/* Dynamically generate form fields based on defaultValues keys */}
        {Object.keys(defaultValues).map((field) => (
          // For each field, render a FormField component.
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            // Render function receives field props for binding.
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                {/* Label for the input field */}
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {/* If the field is "email", display "Email Address", otherwise capitalize the field name */}
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                {/* Wrap input element with FormControl for consistent styling */}
                <FormControl>
                  <Input
                    required
                    // Set input type: "password" if field name is password, otherwise "text"
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  />
                </FormControl>
                {/* Display validation error messages */}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Submit button */}
        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>

        {/* Conditional rendering of the alternative auth navigation link */}
        {formType === "SIGN_IN" ? (
          <p className="paragraph-regular text-dark400_light700">
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p className="paragraph-regular text-dark400_light700">
            Already have an account?{" "}
            <Link
              href={ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign in
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
