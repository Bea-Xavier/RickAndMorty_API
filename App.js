import { View, StyleSheet } from "react-native";
import { CharactersListScreen } from "./src/screens/CharactersListScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <CharactersListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});