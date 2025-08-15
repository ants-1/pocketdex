import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface TabIconProps {
  type: string;
  name: string;
  color: string;
}

export const TabIcon: React.FC<TabIconProps> = ({ type, name, color }) => {
  const IconComponent =
    type === "MaterialIcons" ? MaterialIcons : MaterialCommunityIcons;

  return (
    <View
      className="flex items-center justify-center w-14">
      <IconComponent name={name} size={28} color={color} />
    </View>
  );
};