import { TouchableOpacity, Text } from "react-native";

interface QuestionButtonProps {
  option: string;
  handleAnswer: (option: string) => void;
}

export const QuestionButton: React.FC<QuestionButtonProps> = ({ option, handleAnswer }) => {
  return (
    <TouchableOpacity
      onPress={() => handleAnswer(option)}
      className="bg-red-500 border-black border-2 w-full py-4 rounded-full">
      <Text className="text-white text-center font-semibold capitalize">{option}</Text>
    </TouchableOpacity>
  )
}