import { useSignUp } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import mainImg from "../../assets/images/i3.png";
export function VerifyEmail({ email }) {
  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const [code, setCode] = React.useState("");
  const onVerifyPress = async ({}) => {
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={tw`m-[10] items-center`}>
      <Image
        source={mainImg}
        contentFit="contain"
        style={tw`w-full h-[80] mx-auto`}
      />
      <Text style={tw`text-center text-purple-400 mt-[10]`}>
        We've send a verification code to
      </Text>
      <Text style={tw`text-center text-purple-400`}>{email}</Text>
      <TextInput
        placeholder="Enter verification code"
        keyboardType="number-pad"
        onChangeText={(code) => setCode(code)}
        value={code}
        style={tw`border w-5/6 border-gray-300 rounded p-[10] my-[20]`}
      />
      <TouchableOpacity
        style={tw`w-4/6 py-[10] rounded bg-blue-500`}
        onPress={onVerifyPress}
      >
        <Text style={tw`capitalize text-white text-center text-xl`}>
          verify email
        </Text>
      </TouchableOpacity>

      <Link href={"/sign-up"} style={tw`mt-[10]`}>
        <Text
          style={tw`capitalize text-blue-700 font-semibold text-center text-xl`}
        >
          back to sign up
        </Text>
      </Link>
    </View>
  );
}

export default VerifyEmail;
