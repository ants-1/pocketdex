import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function FilterButton({ isOpen, setIsOpen }: any) {
  return (
    <TouchableOpacity
      className="bg-red-500 border-black border-2 p-4 rounded-full w-14 h-14 self-start flex items-center justify-center mt-2"
      onPress={() => setIsOpen(!isOpen)}
    >
      <FontAwesome5 name={isOpen ? "chevron-up" : "chevron-down"} size={20} color={"#FFF"} />
    </TouchableOpacity>
  )
}