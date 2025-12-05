import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CharactersListScreen } from "./src/screens/CharactersListScreen";
import { CharacterDetailScreen } from "./src/screens/CharacterDetailScreen";
import { CustomSplashScreen } from "./src/screens/CustomSplashScreen";

const Stack = createStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <CustomSplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CharactersList" screenOptions={{headerShown: false}}>
        <Stack.Screen name="CharactersList" component={CharactersListScreen} />
        <Stack.Screen name="CharactersDetail" component={CharacterDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}