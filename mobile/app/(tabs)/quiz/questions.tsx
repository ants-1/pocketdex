import { useState, useEffect } from "react";
import { SafeAreaView, Text, ActivityIndicator, View } from "react-native";
import { useQuery } from "@apollo/client";
import QuestionButton from "@/components/QuestionButton";
import { useRouter } from "expo-router";
import { GET_POKEMON_QUIZ } from "@/graphql/queries/getPokemonQuiz";
import { POKEMON_TYPES } from "@/constants/pokemonTypes";

export default function QuizScreen() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const { loading, error, data } = useQuery(GET_POKEMON_QUIZ, {
    variables: { offset: 0, limit: 151 },
  });

  useEffect(() => {
    if (!loading && data) {
      const allPokemon = data.gen1_species
        .map((p: any) => p.pokemon_v2_pokemons[0])
        .filter(Boolean);

      const quizQuestions = [];

      // Pick 5 random Pokemon
      for (let q = 0; q < 5; q++) {
        const randomIndex = Math.floor(Math.random() * allPokemon.length);
        const p = allPokemon[randomIndex];
        const correctType = p.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name || "unknown";

        // Pick 3 random wrong types
        const otherTypes: string[] = [];
        while (otherTypes.length < 3) {
          const type = POKEMON_TYPES[Math.floor(Math.random() * POKEMON_TYPES.length)];
          if (type !== correctType && !otherTypes.includes(type)) {
            otherTypes.push(type);
          }
        }

        const options = [...otherTypes, correctType];

        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = options[i];
          options[i] = options[j];
          options[j] = temp;
        }

        quizQuestions.push({
          question: `What type of Pokemon is ${p.name.charAt(0).toUpperCase() + p.name.slice(1)}?`,
          answer: correctType,
          options,
        });
      }

      setQuestions(quizQuestions);
    }
  }, [loading, data]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option: string) => {
    const isCorrect = option === currentQuestion.answer;

    setScore(prev => prev + (isCorrect ? 1 : 0));

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push({
        pathname: "./score",
        params: {
          score: isCorrect ? score + 1 : score,
          total: questions.length
        },
      });
    }
  };

  if (loading) return <ActivityIndicator size="large" className="flex-1" />;
  if (error)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error: {error.message}</Text>
      </View>
    );
  if (!currentQuestion)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No questions available</Text>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-white justify-center">
      <View className="px-6">
        <Text className="text-xl font-bold mb-4">
          Question {currentIndex + 1}/{questions.length}
        </Text>
        <Text className="text-lg mb-6">{currentQuestion.question}</Text>
      </View>
      <View className="flex gap-4 px-6">
        {currentQuestion.options.map((option: string) => (
          <QuestionButton
            key={option}
            option={option}
            handleAnswer={handleAnswer}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
