import React, {useState} from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';

type Props = {
  saveNote: (text: string) => void;
};

export const NoteTakingInput: React.FC<Props> = ({saveNote}) => {
  const [text, setText] = useState<String>('');

  return (
    <>
      <TextInput multiline={true} style={styles.textInput} onChange={setText} />
      <Button
        title="Save Note"
        onPress={() => {
          saveNote(text);
        }}
      />
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
