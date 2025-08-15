import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, Text } from 'react-native';
import { LinkButton } from '@/components/LinkButton';

export default function QuizScoreScreen() {
  const { score, total } = useLocalSearchParams<{ score: string; total: string }>();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">Quiz Completed!</Text>
      <Text className="text-xl mb-8">
        Your score: {score}/{total}
      </Text>
      <LinkButton link='./' name='Return' />
    </SafeAreaView>
  );
}
