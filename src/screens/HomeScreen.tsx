import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Note, getAllNotes, getNote} from '../services/noteStoreServices';
type Props = {
  toggleNewNote: (toggle: boolean) => void;
};

export const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [noteText, setNoteText] = useState<Note[]>([]);

  useFocusEffect(() => {
    getAllNotes().then(result => setNoteText(result.notes));
    // getNote().then(result => setNoteText(result ?? "") );
  });
  useEffect(() => {}, []);

  return (
    <>
      <View>
        {noteText.map((note) => (
          <Text style={{fontSize: 20,color:'black'}} key={note.id}>
            {/* {console.log(" data ",data.text)} */}
            {note.text}
          </Text>
        ))}
      </View>
      <Button
        onPress={() => navigation.navigate('EditNote')}
        title="New Note"
      />
    </>
  );
};
