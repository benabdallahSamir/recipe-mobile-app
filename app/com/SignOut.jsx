import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
export default function SignOut() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSignOut}
      style={tw`bg-red-500 rounded w-[20] h-[10] items-center justify-center `}
    >
      <Text>Sign out</Text>
    </TouchableOpacity>
  );
}
