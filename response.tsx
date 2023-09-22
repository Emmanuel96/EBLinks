import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { getOpenAIResponse } from "./OpenAlQuery";
import * as Speech from 'expo-speech';

type ResponseScreenProps = {
  route: RouteProp<RootStackParamList, "Response">;
  navigation: StackNavigationProp<RootStackParamList, "Response">;
};

const ResponseScreen: React.FC<ResponseScreenProps> = ({
  route,
  navigation,
}) => {
  const { userInput } = route.params;
  const [responsePages, setResponsePages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const pages = await getOpenAIResponse(userInput);
      setResponsePages(pages);
    };
    fetchData();
  }, [userInput]);

  const toggleSpeech = () => {
    const textToSpeak = responsePages.join('');

    if (isSpeaking) {
      Speech.pause();
      setIsSpeaking(false);
    } else {
      Speech.speak(textToSpeak, {
        onDone: () => {
          setIsSpeaking(false);
        },
        onStopped: () => {
          setIsSpeaking(false);
        },
      });
      setIsSpeaking(true);
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, responsePages.length - 1)
    );
    // toggleSpeech();
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    // toggleSpeech();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{userInput}</Text>
      <View style={styles.responseContainer}>
        <Text style={styles.response}>{responsePages[currentPage]}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Previous Point"
          onPress={goToPreviousPage}
          disabled={currentPage === 0}
        />
        <Button
          title="Next Point"
          onPress={goToNextPage}
          disabled={currentPage === responsePages.length - 1}
        />
      </View>
      <Button title={isSpeaking ? "Pause" : "Speak"} onPress={toggleSpeech} />
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
  responseContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  response: {
    fontSize: 26,
    textAlign: "justify",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
});

export default ResponseScreen;
