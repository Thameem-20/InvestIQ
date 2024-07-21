import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import RootNavigation from './src/screens/navigation/RootNavigation';
import useCachedResources from './hooks/useCatchedResources';
import { useUserStore } from './store/useUserStore';

const App = () => {
  const isLoadingComplete = useCachedResources();

  const { session, user } = useUserStore();

  useEffect(() => {
    console.log(user, session);
  }, [user, session]);

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
