import DataBase from './src/service';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

new DataBase;

export default function App() {

  return (
    <View style={styles.container}>
      <Text>jujubsssssa</Text>
      <StatusBar style="auto" />
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
