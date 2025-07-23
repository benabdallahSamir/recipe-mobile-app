import { Stack } from "expo-router";
// If using Expo Router, import your CSS file in the app/_layout.tsx file
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY } from "@/constants/api";
import { ClerkProvider, tokenCache } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </ClerkProvider>
    </SafeAreaView>
  );
}
