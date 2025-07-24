import "@/app/global.css";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import mainImg from "../../assets/images/i2.png"; // Adjust the path as necessary
export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View style={tw`h-full p-4 bg-white rounded-xl`}>
      <>
        <Image
          source={mainImg}
          contentFit="contain"
          style={tw`w-full h-80 mb-4 pt-10`}
        />
        <Text style={tw`text-lg font-semibold mb-2 text-center text-4xl`}>
          Create account
        </Text>
        <TextInput
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
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity style={tw`p-2 w-1/5 justify-center items-center`}>
            <Ionicons name="eye-off" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onSignUpPress}
          style={tw`bg-blue-500 p-3 rounded mb-4`}
        >
          <Text style={tw`text-white text-center text-2xl`}>Sign up</Text>
        </TouchableOpacity>
        <View style={tw`flex-row justify-center items-center`}>
          <Text style={tw`text-gray-500 mr-[3]`}>Already have an account?</Text>
          <Link href="/sign-in">
            <Text style={tw`text-blue-500`}>Sign in</Text>
          </Link>
        </View>
      </>
    </View>
  );
}
