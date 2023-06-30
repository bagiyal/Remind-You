import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {getNote, saveNote} from './services/noteStoreServices';
import {useNavigation, useRoute} from '@react-navigation/native';
import {EditScreenRouteProp, ScreenNavigationProp} from '../types';

type Props = {
  noteId: string | undefined;
};

export const NoteTakingInput: React.FC<Props> = ({noteId}) => {
  const [text, setText] = useState<String>('');
  const [headtext, setHeadText] = useState<String>('');
  // console.log(' calling note taking input ', noteId);
  const route = useRoute<EditScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationProp>();
  // const noteId = route.params.noteId;
  const saveNoteHandler = async () => {
    console.log(" function call ",text,headtext);
    saveNote(text, headtext, noteId);
    // navigation.navigate("Home");
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button title="Back" color="#ffb703" onPress={saveNoteHandler} />
      ),
    });
  }, [navigation, noteId, text]);

  useEffect(() => {
    if (noteId) {
      getNote(noteId).then((result) => {
        setText(result?.text ?? '');
        setHeadText(result?.headtext ?? '');
      });
    }
    console.log(' test', text);
  }, []);

  return (
    <>
      <View style={styles.header}>
        <TextInput
          value={headtext}
          style={styles.headingText}
          onChangeText={(text) => {
            setHeadText(text);
            console.log('headtext:', text);
          }}
          multiline={true}
          placeholder="Heading"
          autoFocus={true}
        />
      </View>
      <View style={styles.line}></View>
      <TextInput
        multiline={true}
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        // autoFocus={true}
      />
      {/* <Button title="Save Note" onPress={saveNoteHandler} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '20%',
    backgroundColor: '#ffb70342',
  },
  headingText: {
    width: '100%',
    fontSize: 22,
    marginLeft: '5%',
  },
  textInput: {
    backgroundColor: '#ffb70342',
    margin: '0%',
    height: '100%',
    width: '100%',
    fontSize: 19,
    paddingHorizontal: 20,
  },
  line: {
    backgroundColor: 'black',
    color: 'black',
    width: '100%',
    height: '.3%',
    marginLeft: '2%',
    marginRight: '2%',
  },
});
