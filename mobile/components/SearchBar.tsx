import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-4 mx-4 mt-2 mb-8 shadow-sm border border-red-500">
      <Ionicons name="search" size={20} color="#888" />
      <TextInput
        className="flex-1 ml-2 text-base"
        placeholder="Search Pokémon..."
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
        placeholderTextColor="#999"
      />
    </View>
  );
};
