import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "../../hooks/useTransactions";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { BalanceCard } from "../../components/BalanceCard";
import { TransactionItem } from "../../components/TransactionItem";
import NoTransactionsFound from "../../components/NoTransactionsFound";
import { useTheme } from "../../context/ThemeContext"; // 👈 import theme hook

const themeOrder = ["coffee", "forest", "purple", "ocean"];

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { theme, setTheme } = useTheme(); // 👈 get theme + setter
  const [themeIndex, setThemeIndex] = useState(3); // default ocean
  const [refreshing, setRefreshing] = useState(false);

  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions(user.id);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTransaction(id),
        },
      ]
    );
  };

  const switchTheme = () => {
    const nextIndex = (themeIndex + 1) % themeOrder.length;
    setThemeIndex(nextIndex);
    setTheme(themeOrder[nextIndex]);
  };

  if (isLoading && !refreshing) return <PageLoader />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* LEFT */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={[styles.welcomeText, { color: theme.text }]}>
                Welcome,
              </Text>
              <Text style={[styles.usernameText, { color: theme.primary }]}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>

          {/* RIGHT */}
          <View style={styles.headerRight}>
            {/* Theme Switcher Button */}
            <TouchableOpacity onPress={switchTheme} style={{ marginRight: 10 }}>
              <Ionicons name="color-palette" size={24} color={theme.primary} />
            </TouchableOpacity>

            {/* Add Transaction Button */}
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.primary }]}
              onPress={() => router.push("/create")}
            >
              <Ionicons name="add" size={20} color={theme.white} />
              <Text style={{ color: theme.white }}>Add</Text>
            </TouchableOpacity>

            {/* Sign Out */}
            <SignOutButton />
          </View>
        </View>

        {/* Balance Card */}
        <BalanceCard summary={summary} theme={theme} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recent Transactions
          </Text>
        </View>
      </View>

      {/* Transactions List */}
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} theme={theme} />
        )}
        ListEmptyComponent={<NoTransactionsFound theme={theme} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
