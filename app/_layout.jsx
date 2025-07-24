import { Stack } from "expo-router";
// If using Expo Router, import your CSS file in the app/_layout.tsx file
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY } from "@/constants/api";
import { ClerkProvider, tokenCache } from "@clerk/clerk-expo";
import "./global.css";

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}
