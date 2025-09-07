import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../assets/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { theme } = useTheme();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError("Password is incorrect. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.log(err);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Image
          source={require("../../assets/images/revenue-i4.png")}
          style={styles.illustration}
        />
        <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>

        {error ? (
          <View
            style={[
              styles.errorBox,
              { backgroundColor: theme.cardBackground, borderColor: theme.expense },
            ]}
          >
            <Ionicons name="alert-circle" size={20} color={theme.expense} />
            <Text style={[styles.errorText, { color: theme.expense }]}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[
            styles.input,
            { color: theme.text, borderColor: error ? theme.expense : theme.border },
          ]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor={theme.textSecondary}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />

        <TextInput
          style={[
            styles.input,
            { color: theme.text, borderColor: error ? theme.expense : theme.border },
          ]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor={theme.textSecondary}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={onSignInPress}
        >
          <Text style={[styles.buttonText, { color: theme.white }]}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Don&apos;t have an account?
          </Text>

          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={[styles.linkText, { color: theme.primary }]}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
