import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, FlatList, Dimensions} from 'react-native';
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
<View style={{ flex: 1 }}>
  <View style={{ width: '100%', alignItems: 'center' }}>
    <FlatList
      data={noteText}
      numColumns={2}
      renderItem={({ item, index }) => {
        return (
          <Pressable
          key={item.id}
          onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
          // style={{justifyContent:'center',marginTop:40,left:10,}}
        >
          <View style={{
            width: Dimensions.get('window').width / 2 - 30,
            height: 200,
            backgroundColor: '#ffb70342',
            margin: 10,
            // marginTop:20,
            borderRadius:18,
          }}>
              <View>
                <Text style={[styles.note,{fontSize:20,fontStyle:'normal',fontWeight:'600',marginTop:'5%'}]}>
                  {item.headtext.length === 0 ? 'Blank Note' : item.headtext}
                  {'\n'}
                </Text>
                <Text style={styles.note}>
                  { item.text.substring(0,60)  }
                </Text>
              </View>
            
          </View>
          </Pressable>
        )
      }}
    />
  </View>
</View>

    // <ScrollView style={styles.scrollDesgin} >
    //   <View style={styles.container}>
    //     {noteText.map(note => (
    //       <Pressable
    //       key={note.id} 
    //       onPress={() => navigation.navigate('EditNote',{noteId: note.id})}
    //       style={styles.noteDesgin}
    //       >
    //       <View style={styles.row}>
    //         <Text style={styles.note}>
    //           {note.headtext.length == 0 ? 'Blank Note' : note.headtext}
    //           {'\n'}
    //         </Text>
    //         <Text style={styles.note}>
    //           {note.text.length == 0 ? ' ' : note.text}
    //         </Text>
    //       </View>
    //       </Pressable>
    //     ))}
    //   </View>
    // </ScrollView>
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
    backgroundColor:"red",
  },
  row: {
    width: '40%',
    borderBottomWidth:1,
    borderBottomColor: '#e6e6e6',
    height:120,
    backgroundColor:'blue',
    margin:'5%',
    color:'white',
    borderRadius:8,
    borderBottomEndRadius:8,
    left:0,
    flex: 1,
    flexDirection:'row',
    flexWrap:'wrap',
  },
  note: {
    fontSize: 17,
    marginLeft:'10%',
    paddingVertical: 0,
    color:'black',
    // flex:1,
    // flexDirection:'row'
  },
  noteDesgin: {
    // width:'40%',
    // height:'40%',
    // backgroundColor:'blue',
    // margin:'5%',
    // color:'white',
    // borderRadius:8,
    // borderBottomEndRadius:8,
    // flex:1,
    // flexDirection:'row-reverse',
    // width:'40%',
    // flexWrap:'wrap'
  }
});
 

// checking data 