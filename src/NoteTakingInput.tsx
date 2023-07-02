import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  createRef,
  useRef,
} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {getNote, saveNote} from './services/noteStoreServices';
import {useNavigation, useRoute} from '@react-navigation/native';
import {EditScreenRouteProp, ScreenNavigationProp} from '../types';
import {RichToolbar, RichEditor, actions} from 'react-native-pell-rich-editor';

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
    try {
      console.log(' function call ', headtext, text);
      await saveNote(text, headtext, noteId);
      // navigation.navigate("Home");
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button title="Back" color="#ffb703" onPress={saveNoteHandler} />
      ),
    });
  }, [navigation, noteId, text, headtext]);

  useEffect(() => {
    if (noteId) {
      getNote(noteId)
        .then(result => {
          setText(result?.text ?? '');
          setHeadText(result?.headtext ?? '');
        })
        .catch(error => {
          console.error('Error retrieving note:', error);
        });
    }
  }, []);
  const richText = useRef<RichEditor>();

  return (
    <>
      <View style={styles.header}>
        <TextInput
          value={headtext}
          style={styles.headingText}
          onChangeText={value => {
            setHeadText(value);
            console.log(' live ', headtext);
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
      <View>
        {/* <RichEditor
        ref={richText}
        onChange={descriptionText => {
          console.log('descriptionText:', descriptionText);
        }}
      /> */}
        <RichEditor
          ref={richText} // from useRef()
          // onChange={richTextHandle}
          placeholder="Write your cool content here :)"
          androidHardwareAccelerationDisabled={true}
          // style={styles.richTextEditorStyle}
          initialHeight={250}
        />
        <RichToolbar
          ref={richText}
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.heading1,
          ]}
        />
      </View>

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
