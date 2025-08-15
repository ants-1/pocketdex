import { LinkButton } from "@/components/LinkButton";
import { SafeAreaView, Text } from "react-native";

export default function QuizScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-500 text-3xl font-bold mb-6">Pokemon Quiz</Text>
      <Text className="text-center mb-14 px-10">
        Test your knowledge about Pokémon. Click start to begin the quiz!
      </Text>
      <LinkButton link="./quiz/questions" name="Start Quiz" />
    </SafeAreaView>
  )
}