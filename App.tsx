import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { getOpenAIResponse } from "./OpenAlQuery";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const handleUserInput = (text: string) => {
    setUserInput(text);
  };

  const handleSubmit = async () => {
    if (userInput.trim() === "") return;

    const response = await getOpenAIResponse(userInput);
    setResponse(response);
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
      {response !== "" && <Text style={styles.response}>{response}</Text>}
    </View>
  );
}

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
  response: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
});
