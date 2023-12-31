/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NoteTakingInput} from './src/NoteTakingInput';
import {HomeScreen} from './src/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {EditNoteScreens} from './src/screens/EditNoteScreens';
import {NewNoteButton} from './src/screens/NewNoteButton';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'All Notes',
            headerRight: () => <NewNoteButton />,
          }}
        />
        <Stack.Screen name="EditNote" component={EditNoteScreens} />
      </Stack.Navigator>
      {/* <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        {shouldCreateNewNote ? (
          <NoteTakingInput saveNote={saveNote} />
        ) : (
          <HomeScreen toggleNewNote={setShouldCreateNewNote} />
        )}
      </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#ffb70342',
    margin: '5%',
    height: '50%',
    width: '80%',
    fontSize: 17,
    paddingHorizontal: 20,
  },
});

export default App;
