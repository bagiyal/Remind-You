import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';
// import FontAwesome from 'react-native-fontawesome'
import { ScreenNavigationProp } from '../../types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export const NewNoteButton: React.FC = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    return(
        <Pressable onPress={() => navigation.navigate("EditNote")}>
            <FontAwesome name='pencil-square-o' size={30} color="#ffb703" />
        </Pressable>
    );
}