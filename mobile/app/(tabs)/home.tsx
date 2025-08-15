import { LinkButton } from "@/components/LinkButton";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
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
          {/* Image placeholder */}
          <View className="w-64 h-40 bg-gray-200 mb-2 rounded-lg" />
          <Text className="text-xl font-semibold mb-2">Pokedex</Text>
          <Text className="text-center text-gray-600 mb-6">
            Check out the Pokedex and search for your favorite Pokemon.
          </Text>
          <LinkButton link="/pokedex" name="Go to Pokedex"></LinkButton>
        </View>

        <View className="flex items-center justify-center p-4 mb-14">
          {/* Image placeholder */}
          <View className="w-64 h-40 bg-gray-200 mb-2 rounded-lg" />
          <Text className="text-xl font-semibold mb-2">MyDex</Text>
          <Text className="text-center text-gray-600 mb-6">
            Manage and view your own pokedex.
          </Text>
          <LinkButton link="/mydex" name="Go to MyDex"></LinkButton>
        </View>

        <View className="flex items-center justify-center px-4 mb-10">
          {/* Image placeholder */}
          <View className="w-64 h-40 bg-gray-200 mb-2 rounded-lg" />
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
