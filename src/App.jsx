/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormScreen from './pages/FormScreen';
import SectorScreen from './pages/SectorScreen';
import CameraScreen from './pages/CameraScreen';
import Header from './components/Header';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
    primary: 'rgb(0, 51, 102)',
    card: 'rgb(3, 169, 244)',
    disabled: 'rgb(170, 170, 170)'
  },
};

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="OS"
            component={FormScreen}
            options={{
              headerBackVisible: false,
              headerTitle: (props) =>  <Header />,
              headerStyle: {
                backgroundColor: '#757575',
                justifyContent: "center",
                alignItems: 'center'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            />
          <Stack.Screen
            name="Setor"
            component={SectorScreen}
            options={{
              headerTitle: (props) =>  <Header />,
              headerStyle: {
                backgroundColor: '#757575',
              },
              headerTintColor: '#fff',
              headerRight: () => <Text>              </Text>
            }}
            />
          <Stack.Screen
            name="Câmera"
            component={CameraScreen}
            options={{
              headerTitle: (props) =>  <Header />,
              headerStyle: {
                backgroundColor: '#757575',
                justifyContent: "center",
                alignItems: 'center'
              },
              headerTintColor: '#fff',
              headerRight: () => <Text>              </Text>
            }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}


export default App;
