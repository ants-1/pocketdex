import { TouchableOpacity, Text } from "react-native";

export default function QuestionButton({ option, handleAnswer }: any) {
  return (
    <TouchableOpacity
      onPress={() => handleAnswer(option)}
      className="bg-red-500 border-black border-2 w-full py-4 rounded-full">
      <Text className="text-white text-center font-semibold capitalize">{option}</Text>
    </TouchableOpacity>
  )
}