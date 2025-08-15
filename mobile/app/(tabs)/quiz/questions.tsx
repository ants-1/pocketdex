import { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useRouter } from "expo-router";
import QuestionButton from "@/components/QuestionButton";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const sampleQuestions: Question[] = [
  {
    question: "What type is Pikachu?",
    options: ["Electric", "Fire", "Water", "Grass"],
    answer: "Electric",
  },
  {
    question: "Which Pokémon evolves into Charizard?",
    options: ["Charmander", "Squirtle", "Bulbasaur", "Pidgey"],
    answer: "Charmander",
  },
];

export default function QuizQuestions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const currentQuestion = sampleQuestions[currentIndex];

  const handleAnswer = (option: string) => {
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < sampleQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push({
        pathname: "./score",
        params: { score: score + (option === currentQuestion.answer ? 1 : 0), total: sampleQuestions.length },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center">
      <View className="px-10">
        <Text className="text-xl font-bold mb-4">
          Question {currentIndex + 1}/{sampleQuestions.length}
        </Text>
        <Text className="text-lg mb-6">{currentQuestion.question}</Text>
      </View>

      <View className="px-10 flex gap-4">
        {currentQuestion.options.map((option) => (
          <QuestionButton key={option} option={option} handleAnswer={handleAnswer} />
        ))}
      </View>
    </SafeAreaView>
  );
}
