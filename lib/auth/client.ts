import { createAuthClient } from "better-auth/react";

// Use the browser's current origin. A NEXT_PUBLIC_* value is baked at build
// time, while this app's production URL is supplied at container runtime.
export const authClient = createAuthClient();
