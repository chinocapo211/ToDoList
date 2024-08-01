import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      if (tasksJson !== null) {
        setTasks(JSON.parse(tasksJson));
      }
    } catch (error) {
      console.error('Error loading tasks from storage', error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to storage', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addTask = () => {
    if (name && description) {
      const newTasks = [...tasks, { id: tasks.length.toString(), name, description, completed: false }];
      setTasks(newTasks);
      saveTasks(newTasks);
      setName('');
      setDescription('');
      toggleModal();
    }
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const renderRightActions = (taskId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteTask(taskId)}
    >
      <Text style={styles.deleteButtonText}>Eliminar</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Lista de Tareas:</Text>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item.id)}>
              <View style={styles.taskItem}>
                <View style={styles.taskContent}>
                  <Text style={styles.taskName}>{item.name}</Text>
                  <Text style={styles.taskDescription}>{item.description}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.statusButton, { backgroundColor: item.completed ? 'green' : 'red' }]}
                  onPress={() => toggleCompletion(item.id)}
                />
              </View>
            </Swipeable>
          )}
        />
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <Text style={styles.addButtonText}>Agregar Tarea</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la tarea"
              onChangeText={text => setName(text)}
              value={name}
            />
            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              style={styles.input}
              placeholder="Descripción de la tarea"
              onChangeText={text => setDescription(text)}
              value={description}
            />
            <Button title="Agregar Tarea" onPress={addTask} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const modalWidth = width * 0.8; // Ajuste para un mejor tamaño

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  listContainer: {
    width: '80%',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
  },
  taskContent: {
    flex: 1,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
  },
  statusButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20, // Ajuste del padding para mayor tamaño
    borderRadius: 10,
    width: modalWidth, // Ancho ajustado
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 60, // Aumentar altura
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 20,
    width: '100%',
  },
});

export default App;
