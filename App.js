import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigation } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import addToDoScreen from './src/screen/addToDoScreen';
import viewToDoScreen from './src/screen/viewToDoScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName = 'ViewTodos'>
          <Stack.Screen>
            name = 'AddTodo'
            component = {addToDoScreen}
            option = {{ title: 'Tambah To-Do'}}
          </Stack.Screen>
          <Stack.Screen>
            name = 'ViewTodos'
            component = {viewToDoScreen}
            option = {{ title: 'Daftar To-Do'}}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}