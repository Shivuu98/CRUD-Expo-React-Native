import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddToDoScreen from './src/screen/AddToDoScreen';
import ViewToDoScreen from './src/screen/ViewToDoScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName = 'ViewTodos'>
          <Stack.Screen
            name = 'AddTodo'
            component = {AddToDoScreen}
            option = {{ title: 'Tambah To-Do'}}
          >
          </Stack.Screen>
          <Stack.Screen
            name = 'ViewTodos'
            component = {ViewToDoScreen}
            option = {{ title: 'Daftar To-Do'}}
          >
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App;