import { Slot } from "expo-router";
// If using Expo Router, import your CSS file in the app/_layout.tsx file
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY } from "@/constants/api.js";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import "./global.css";
export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Slot />
    </ClerkProvider>
  );
}
