import { Link, Href } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

interface LinkButtonProps {
  link?: string;
  name: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ link, name }) => {
  return (
    <Link href={link as Href} asChild>
      <TouchableOpacity className="bg-red-500 border-black border-2 w-[225px] py-4 rounded-full">
        <Text className="text-white text-center font-semibold">{name}</Text>
      </TouchableOpacity>
    </Link>
  );
};
