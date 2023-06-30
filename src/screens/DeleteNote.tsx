import React from "react";
import { Pressable } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {deleteNotes } from '../services/noteStoreServices'
import { types } from "@babel/core";
import { useNavigation } from "@react-navigation/native";
import {EditScreenRouteProp, ScreenNavigationProp} from '../../types';

type props = {
    noteId : string,
}

export const DeleteNote = ({noteId}) =>{
    const navigation = useNavigation<ScreenNavigationProp>();
    const handleDelete = async () =>{
       await deleteNotes(noteId);
       navigation.navigate('Home');
    }
   return (
    <Pressable onPress={handleDelete}>
        <FontAwesome name="trash-o" size={30} color="#ffb703" />
    </Pressable>
   );
}