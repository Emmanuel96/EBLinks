import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { getOpenAIResponse } from "./OpenAlQuery";

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

  useEffect(() => {
    const fetchData = async () => {
      const pages = await getOpenAIResponse(userInput);
      setResponsePages(pages);
    };
    fetchData();
  }, [userInput]);

  const readText = () => {
    // Speak the current page text using Tts.speak(responsePages[currentPage]);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, responsePages.length - 1)
    );
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
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
      <Button title="Listen" onPress={readText} />
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
