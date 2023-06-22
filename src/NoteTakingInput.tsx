import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';
import {getNote, saveNote} from './services/noteStoreServices';

type Props = {
  noteId: string | undefined;
};

export const NoteTakingInput: React.FC<Props> = ({noteId}) => {
  const [text, setText] = useState<String>('');
  // console.log(" calling note taking input ",text );
  useEffect(() => {
    if (noteId) {
      getNote(noteId).then(result => setText(result?.text ?? ''));
    }
    console.log(' test', text);
  }, []);

  const saveNoteHandler = () => {
    saveNote(text, noteId);
  };
  return (
    <>
      <TextInput
        multiline={true}
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        autoFocus={true}
      />
      <Button title="Save Note" onPress={saveNoteHandler} />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#ffb70342',
    margin: '5%',
    height: '50%',
    width: '80%',
    fontSize: 17,
    paddingHorizontal: 20,
  },
});
