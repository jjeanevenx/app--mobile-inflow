import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { AppNavigator } from '../src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <AppNavigator />
    </>
  );
}

export default App;