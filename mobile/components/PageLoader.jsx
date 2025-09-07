import { View, ActivityIndicator } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { useTheme } from "../context/ThemeContext"; // 👈 import theme hook

const PageLoader = () => {
  const { theme } = useTheme(); // 👈 get active theme

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );
};

export default PageLoader;
