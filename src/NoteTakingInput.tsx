import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  createRef,
  useRef,
} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  SafeAreaView,
} from 'react-native';
import {getNote, saveNote} from './services/noteStoreServices';
import {useNavigation, useRoute} from '@react-navigation/native';
import {EditScreenRouteProp, ScreenNavigationProp} from '../types';
import {RichToolbar, RichEditor, actions} from 'react-native-pell-rich-editor';
import {SafeAreaProvider} from 'react-native-safe-area-context';

type Props = {
  noteId: string | undefined;
};
const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;
export const NoteTakingInput: React.FC<Props> = ({noteId}) => {
  const [text, setText] = useState<String>('');
  const [headtext, setHeadText] = useState<String>('');
  // console.log(' calling note taking input ', noteId);
  const route = useRoute<EditScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationProp>();
  // const noteId = route.params.noteId;
  const htmlToPlain = (htmlString: string): string => {
    const plainString = htmlString.replace(/<div[^>]*>|<\/div>/g, '');
    return plainString;
  };
  const saveNoteHandler = async () => {
    const headx: string = htmlToPlain(headtext);
    const mainText: string = htmlToPlain(text);
    console.log(' headx ', headx, mainText);
    try {
      console.log(' function call ', headtext, text);
      await saveNote(mainText, headx, noteId);
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
  const richText = useRef<RichEditor>(null);
  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          {/* <Text>Description:</Text> */}
          <RichEditor
            ref={richText}
            onChange={descriptionText => {
              console.log('descriptionText:', descriptionText);
              setHeadText(descriptionText);
            }}
            initialContentHTML="Abhishek Bagiyal"
          />
          <RichEditor
            ref={richText}
            onChange={descriptionText => {
              console.log('descriptionText:', descriptionText);
              setText(descriptionText);
            }}
            initialContentHTML="Description Text"
            editorStyle={{
              backgroundColor: 'blue',
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
        ]}
        iconMap={{[actions.heading1]: handleHead}}
      />
    </SafeAreaView>
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
