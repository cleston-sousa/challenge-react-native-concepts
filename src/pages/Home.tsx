import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function taskAlreadyExists(title: string){
    const sameTitle = (element : Task) => element.title == title;

    if(tasks.some(sameTitle)){
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome")
      return true;
    }

    return false;
  }

  function handleAddTask(newTaskTitle: string) {
    if(taskAlreadyExists(newTaskTitle)){
      return;
    }

    setTasks(old => [...old, {
      id: new Date().getTime(), title : newTaskTitle, done : false
    }]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task=>{
      if(task.id === id){
        task.done = !task.done;
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item","Tem certeza que você deseja remover esse item?",[
      {text:"Não",onPress:()=>{}},
      {text:"Sim",onPress:()=>{setTasks(old => old.filter(task => task.id!==id));}}
    ]);
  }

  function handleEditTask(id: number, newTitle: string): boolean{
    if(taskAlreadyExists(newTitle)){
      return false;
    }
    const updatedTasks = tasks.map(task=>{
      if(task.id === id){
        task.title = newTitle;
      }
      return task;
    })
    setTasks(updatedTasks);
    return true;
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})