import React, { useEffect, useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps, TextInput } from 'react-native';
import editIcon from '../assets/icons/edit/edit.png'

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

export interface TaskItemProps {
    item : Task;
    index : number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTitle: string) => boolean;
}

export function TaskItem({item, index, toggleTaskDone, removeTask, editTask} : TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [itemTitle, setItemTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])

    function handleStartEditing(){
        setIsEditing(true);
    }

    function handleCancelEditing(){
        setItemTitle(item.title);
        setIsEditing(false);
    }

    function handleSubmitEditing(){
        if(!editTask(item.id, itemTitle)){
            setItemTitle(item.title);
        }
        setIsEditing(false);
    }

  return (
    <>
        <View>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={()=>{ toggleTaskDone(item.id) }}
            >
                <View 
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone: styles.taskMarker}
                >
                  {item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput
                    value={itemTitle}
                    onChangeText={setItemTitle}
                    editable={isEditing}
                    onSubmitEditing={handleSubmitEditing}
                    style={item.done ? styles.taskTextDone : styles.taskText}
                    ref={textInputRef}
                />
            </TouchableOpacity>
        </View>

        <View style={ styles.iconsContainer } >
            { isEditing ? (
                <TouchableOpacity
                onPress={handleCancelEditing}
                >
                <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                onPress={handleStartEditing}
                >
                <Image source={editIcon} />
                </TouchableOpacity>
            ) }

            <View 
                style={ styles.iconsDivider }
            />

            <TouchableOpacity
                disabled={isEditing}
                onPress={() => removeTask(item.id)}
            >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
            </TouchableOpacity>
        </View>

    </>
  )
}


const styles = StyleSheet.create({
    iconsContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:12,
        paddingRight:24
    },
    iconsDivider:{
        width:1,
        height:24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)'
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })