import { Link } from "expo-router";
import { SafeAreaView, TouchableOpacity, View, Text, Image } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 relative">
      <Image
        source={require("../assets/images/dragonite-image.png")}
        className="absolute top-[70vh] right-[30%] w-[150px] h-[150px] opacity-80"
      />

      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl mb-3">Welcome to</Text>
        <Text className="text-red-500 text-5xl font-bold mb-20">PocketDex</Text>

        <Link href="./home" asChild>
          <TouchableOpacity className="bg-red-500 border-black border-2 w-[225px] py-4 rounded-full">
            <Text className="text-white text-center font-semibold">Start</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  )
}