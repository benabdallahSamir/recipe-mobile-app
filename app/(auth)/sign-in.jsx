import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import mainImg from "../../assets/images/i1.png";
export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={tw`h-full flex-1 p-4 bg-white rounded-xl`}>
      <Image source={mainImg} style={tw`w-full h-80 mb-4`} />
      <Text style={tw`text-lg font-semibold mb-2 text-center text-4xl`}>
        Welcome Back
      </Text>
      <TextInput
        autoCapitalize="none"
        style={tw`border border-gray-300 px-[10] py-[13] mb-4 rounded`}
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <View
        style={tw`mb-4 h-[10] flex-row w-full border border-gray-300 rounded`}
      >
        <TextInput
          value={password}
          style={tw`flex-1 p-[10] h-full mb-4 w-4/5 rounded`}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity
          style={tw`px-2 h-full items-center flex-rows justify-center`}
          onPress={() => {}}
        >
          <Ionicons name="eye-off" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onSignInPress}
        style={tw`bg-blue-500 p-3 rounded items-center justify-center`}
      >
        <Text style={tw`text-white text-2xl font-semibold`}>Sign In</Text>
      </TouchableOpacity>
      <View style={tw`flex-row justify-center mt-4 gap-2`}>
        <Text style={tw``}>you don't have an account</Text>
        <Link href="/sign-up" style={tw`text-blue-500`}>
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
