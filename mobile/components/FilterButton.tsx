import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface FilterButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ isOpen, setIsOpen }) => {
  return (
    <TouchableOpacity
      className={`bg-red-500 border-black border-2 ${ isOpen ? "p-0" : "p-4"} rounded-full w-14 h-14 self-start flex items-center justify-center mt-2`}
      onPress={() => setIsOpen(!isOpen)}
    >
      <FontAwesome5 name={isOpen ? "chevron-up" : "chevron-down"} size={20} color={"#FFF"} />
    </TouchableOpacity>
  )
}