import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styled from 'styled-components/native';
import RootNavigation from './src/screens/navigation/RootNavigation';
import useCachedResources from './hooks/useCatchedResources';

const App = () => {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <Container>
      <StatusBar style='auto' />
      <RootNavigation />
    </Container>
  );
};

export default App;

const Container = styled(View)`
  flex: 1;
`;
