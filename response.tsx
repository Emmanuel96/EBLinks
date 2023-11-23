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
  const [sections, setSections] = useState<string[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);

  console.log('Current page --->', currentPage)
  console.log('Sections --->', sections)

  useEffect(() => {
    const fetchData = async () => {
      const pages = await getOpenAIResponse(userInput);
      setResponsePages(pages);
      const sections = pages[currentPage].split(' ').reduce((acc, word, i) => {
        if (i % 20 === 0) acc.push('');
        acc[acc.length - 1] += ' ' + word;
        return acc;
      }, [] as string[]);
      setSections(sections);
    };
    fetchData();
  }, [userInput, currentPage]);

  let currenctSection = 0;

  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  }

  const startSpeaking = (text: string, index: number) => {
    Speech.speak(text, {
      onDone: () => {
        const maxSection = sections.length - 1
        if (index < maxSection) {
          toggleSpeech(false, false, true, false, index + 1)
        }
      },
      onStopped: () => {
        setIsSpeaking(false);
      },
      onStart: () => {
        setIsSpeaking(true);
      },
    });
  }

  const toggleSpeech = (shouldPlay: boolean, shouldPause: boolean, goFoward: boolean, goBack: boolean, index?: number) => {
    if (shouldPause) {
      stopSpeaking()
      return;
    }
  
    if (typeof index !== 'number') {
      return;
    }
  
    let textToSpeak = sections[index];
  
    if (shouldPlay) {
      startSpeaking(textToSpeak, index);
      return;
    }
  
    if (goFoward) {
      if (isSpeaking) {
        stopSpeaking()
      }
  
      textToSpeak = sections[index];
      setCurrentSectionIndex((prevState) => {
        const newState = Math.min(prevState + 1, sections.length - 1);
        startSpeaking(sections[newState], newState);
        return newState;
      });
    }
  
    if (goBack) {
      if (isSpeaking) {
        stopSpeaking()
      }
  
      setCurrentSectionIndex((prevState) => {
        const newState = Math.max(prevState - 1, 0);
        startSpeaking(sections[newState], newState);
        return newState;
      });
    }
  }

  const goToNextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = Math.min(prevPage + 1, responsePages.length - 1);
      setCurrentSectionIndex(0);
      return nextPage;
    });
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => {
      const newPage = Math.max(prevPage - 1, 0);
      setCurrentSectionIndex(0); // Reset the section index
      return newPage;
    });
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
      <View style={styles.buttonContainer}>
        <Button
          title="Rewind"
          onPress={() => {
            toggleSpeech(false, false, false, true, Math.max(currentSectionIndex + 1, 0));
          }}
        />
        <Button 
          title={isSpeaking ? "Pause" : "Speak"} 
          onPress={() => isSpeaking ? toggleSpeech(false, true, false, false) : toggleSpeech(true, false, false, false, currentSectionIndex)} />
        <Button
          title="Fast Forward"
          onPress={() => {
            toggleSpeech(false, false, true, false, Math.min(currentSectionIndex + 1, sections.length - 1));
          }}
        />
      </View>
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
