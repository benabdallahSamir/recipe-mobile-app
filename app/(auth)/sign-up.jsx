import "@/app/global.css";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import mainImg from "../../assets/images/i2.png"; // Adjust the path as necessary
import VerifyEmail from "../com/VerifyEmail";
export default function SignUpScreen() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [loadingState, setLoadingState] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);

  const handleSignUp = async () => {
    if (!emailAddress || !password)
      return Alert.alert("Error", "Please fill in all fields");
    if (password.length < 6)
      return Alert.alert("Error", "Password must be at least 6 characters");
    // if (!isLoaded) return;

    setLoadingState(true);

    try {
      if (signUp) await signUp.create({ emailAddress, password });
      else {
        Alert.alert("Error", "SignUp object not available");
        return;
      }

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "Failed to create account"
      );
      console.error(err);
    } finally {
      setLoadingState(false);
    }
  };

  if (pendingVerification) return <VerifyEmail email={emailAddress} />;

  return (
    <View style={tw`h-full p-4 bg-white rounded-xl`}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <Image
          source={mainImg}
          contentFit="contain"
          style={tw`w-full h-80 mb-4 pt-10`}
        />
        <Text style={tw`text-lg font-semibold mb-2 text-center text-4xl`}>
          Create account
        </Text>
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          style={tw`mb-4 border border-gray-300 p-2 rounded p-[10]`}
          onChangeText={(email) => setEmailAddress(email)}
        />
        <View style={tw`mb-4 flex-row border border-gray-300 w-full rounded`}>
          <TextInput
            value={password}
            placeholder="Enter password"
            style={tw`p-2 rounded p-[10] w-4/5 `}
            secureTextEntry={!showPassword}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity
            style={tw`p-2 w-1/5 justify-center items-center`}
            onPress={() => setShowPassword((curr) => !curr)}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleSignUp}
          disabled={loadingState}
          style={tw`bg-blue-500 p-3 rounded mb-4 ${
            loadingState && "opacity-70"
          }`}
        >
          <Text style={tw`text-white text-center text-2xl`}>
            {loadingState ? "loading ..." : " Sign up"}
          </Text>
        </TouchableOpacity>
        <View style={tw`flex-row justify-center items-center`}>
          <Text style={tw`text-gray-500 mr-[3]`}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Text style={tw`text-blue-500`}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
