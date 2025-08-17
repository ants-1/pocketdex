import { LinkButton } from "@/components/LinkButton";
import { SafeAreaView, View, Text, ScrollView, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <ScrollView>
        <View className="flex flex-row items-center justify-center mb-6">
          <Text className="text-red-500 text-3xl font-bold mx-2">PocketDex</Text>
          <MaterialCommunityIcons name="pokeball" size={32} color={"#ef4444"} />
        </View>

        <View className="flex items-center justify-center p-4 mb-14">
          <View className="w-64 h-40 border absolute mb-40 rounded-lg z-10 bg-white"></View>
          <View className="w-72 h-48 border absolute mb-40 rounded-lg bg-red-500 z-0"></View>
          <Image
            source={require("../../assets/images/charizard-img.png")}
            className="w-72 h-48 mb-2 z-50"
            resizeMode="contain"
          />
          <Text className="text-xl font-semibold mb-2">Pokedex</Text>
          <Text className="text-center text-gray-600 mb-6">
            Check out the Pokedex and search for your favorite Pokemon.
          </Text>
          <LinkButton link="/pokedex" name="Go to Pokedex"></LinkButton>
        </View>

        <View className="flex items-center justify-center p-4 mb-16">
          <View className="w-64 h-40 border absolute mb-40 rounded-lg z-10 bg-white"></View>
          <View className="w-72 h-48 border absolute mb-40 rounded-lg bg-blue-500 z-0"></View>
          <Image
            source={require("../../assets/images/articuno-img.png")}
            className="w-72 h-48 mb-2 z-50"
            resizeMode="contain"
          />
          <Text className="text-xl font-semibold mb-2">MyDex</Text>
          <Text className="text-center text-gray-600 mb-6">
            Manage and view your own Pokedex.
          </Text>
          <LinkButton link="/mydex" name="Go to MyDex"></LinkButton>
        </View>

        <View className="flex items-center justify-center px-4 mb-10">
          <View className="w-64 h-40 border absolute mb-40 rounded-lg z-10 bg-white"></View>
          <View className="w-72 h-48 border absolute mb-40 rounded-lg bg-yellow-500 z-0"></View>
          <Image
            source={require("../../assets/images/ash-img.png")}
            className="w-72 h-48 mb-2 z-50"
            resizeMode="contain"
          />
          <Text className="text-xl font-semibold mb-2">Pokemon Quiz</Text>
          <Text className="text-center text-gray-600 mb-6">
            Test your knowledge and see if you're a Pokemon master.
          </Text>
          <LinkButton link="/quiz" name="Go to Quiz"></LinkButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
