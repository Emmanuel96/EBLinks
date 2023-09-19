import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

type InputScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Input">;
};

const InputScreen: React.FC<InputScreenProps> = ({ navigation }) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleUserInput = (text: string) => {
    setUserInput(text);
  };

  const handleSubmit = () => {
    if (userInput.trim() === "") return;

    navigation.navigate("Response", { userInput });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Story Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleUserInput}
        value={userInput}
        placeholder="Type your Story..."
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default InputScreen;
 