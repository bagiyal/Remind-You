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
import {HomeScreen} from './src/HomeScreen';

function App(): JSX.Element {
  const [shouldCreateNewNote, setShouldCreateNewNote] =
    useState<boolean>(false);
  const saveNote = async (text: string) => {
    try{
      // const jsonValue = typeof text === 'string' ? text: JSON.stringify(text);
      await AsyncStorage.setItem("note", JSON.stringify(text));
    }catch{

    }
    setShouldCreateNewNote(false);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {shouldCreateNewNote ? (
        <NoteTakingInput saveNote={saveNote} />
      ) : (
        <HomeScreen toggleNewNote={setShouldCreateNewNote} />
      )}
    </View>
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
