import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Note, getAllNotes} from '../services/noteStoreServices';
import { ScreenNavigationProp } from '../../types';

export const SavedNotesList: React.FC = () => {
  const [noteText, setNoteText] = useState<Note[]>([]);
  const navigation = useNavigation<ScreenNavigationProp>();
  
  useFocusEffect(() => {
    getAllNotes().then(result => setNoteText(result.notes));
    // getNote().then(result => setNoteText(result ?? "") );
  });

  return (
    <ScrollView style={styles.scrollDesgin} >
      <View style={styles.container}>
        {noteText.map(note => (
          <Pressable
          key={note.id} 
          onPress={() => navigation.navigate('EditNote',{noteId: note.id})}
          style={styles.noteDesgin}
          >
          <View style={styles.row}>
            <Text style={styles.note}>
              {note.headtext.length == 0 ? 'Blank Note' : note.headtext}
            </Text>
          </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollDesgin: {
    marginBottom:62,
    paddingBottom:0,
    backgroundColor:'blue'
  },
  container: {
    width: '100%',
    flex: 1,
    backgroundColor:"white",
  },
  row: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth:1,
    borderBottomColor: '#e6e6e6',
    alignSelf: 'center',
    height:120,
    backgroundColor:'blue',
    margin:'5%',
    color:'white',
    borderRadius:8,
    borderBottomEndRadius:8,
  },
  note: {
    fontSize: 17,
    // margin:'0%',
    paddingVertical: 0,
    color:'white',
    top:'-30%',
  },
  noteDesgin: {
    // width:'40%',
    // height:'40%',
    // backgroundColor:'blue',
    // margin:'5%',
    // color:'white',
    // borderRadius:8,
    // borderBottomEndRadius:8,

  }
});
