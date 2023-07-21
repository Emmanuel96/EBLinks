import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import InputScreen from "./input";
import ResponseScreen from "./response";

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Input">
        <Stack.Screen name="Input" component={InputScreen} />
        <Stack.Screen name="Response" component={ResponseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
