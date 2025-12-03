import { View, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CharactersListScreen } from "./src/screens/CharactersListScreen"
import { CharacterDetailScreen } from "./src/screens/CharacterDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="CharactersList" screenOptions={{headerShown: false}}>
      <Stack.Screen name="CharactersList" component={CharactersListScreen} options={{headerShow: false}}/>
      <Stack.Screen name="CharactersDetail" component={CharacterDetailScreen} options={{headerShow: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
