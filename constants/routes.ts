// Define route constants for the application.
// These constants are used throughout the app to reference specific routes.
const ROUTES = {
  // The home page route.
  HOME: "/",
  // The sign-in page route.
  SIGN_IN: "/sign-in",
  // The sign-up page route.
  SIGN_UP: "/sign-up",
  ASK_QUESTION: "/ask-question",
  PROFILE: (id: string) => `/profile/${id}`,
  TAGS: (id: string) => `/tags/${id}`,
  QUESTION: (id: string) => `/question/${id}`,
  SIGN_IN_WITH_OAUTH: `signin-with-oauth`,
};

export default ROUTES;
