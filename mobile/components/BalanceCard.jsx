import { View, Text } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { useTheme } from "../context/ThemeContext"; // 👈 import theme hook

export const BalanceCard = ({ summary }) => {
  const { theme } = useTheme(); // 👈 get current theme

  return (
    <View
      style={[
        styles.balanceCard,
        { backgroundColor: theme.card, shadowColor: theme.shadow },
      ]}
    >
      <Text style={[styles.balanceTitle, { color: theme.text }]}>
        Total Balance
      </Text>
      <Text style={[styles.balanceAmount, { color: theme.primary }]}>
        ₹{parseFloat(summary.balance).toFixed(2)}
      </Text>

      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={[styles.balanceStatLabel, { color: theme.textLight }]}>
            Income
          </Text>
          <Text
            style={[styles.balanceStatAmount, { color: theme.income }]}
          >
            +₹{parseFloat(summary.income).toFixed(2)}
          </Text>
        </View>

        <View style={[styles.balanceStatItem, styles.statDivider]} />

        <View style={styles.balanceStatItem}>
          <Text style={[styles.balanceStatLabel, { color: theme.textLight }]}>
            Expenses
          </Text>
          <Text
            style={[styles.balanceStatAmount, { color: theme.expense }]}
          >
            -₹{Math.abs(parseFloat(summary.expenses)).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
