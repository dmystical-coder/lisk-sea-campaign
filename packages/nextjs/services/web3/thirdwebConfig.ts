import { createThirdwebClient } from "thirdweb";

// Use a placeholder client ID during build time if not provided
// This is only used for static generation and won't affect runtime behavior
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "placeholder-build-id";

export const thirdwebClient = createThirdwebClient({
  clientId,
});
