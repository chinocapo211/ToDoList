import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const Tareas = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tareas, setTareas] = useState([]);

    const agregarTarea = () => {
    if (nombre.trim() === '' || descripcion.trim() === '') return;

    setTareas([
      ...tareas,
      { id: Date.now().toString(), nombre, descripcion }
    ]);

    setNombre('');
    setDescripcion('');
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la tarea"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción de la tarea"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Button title="Agregar" onPress={agregarTarea} />

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tareaContainer}>
            <Text style={styles.tareaNombre}>{item.nombre}</Text>
            <Text style={styles.tareaDescripcion}>{item.descripcion}</Text>
            <TouchableOpacity
              style={styles.botonEliminar}
              onPress={() => eliminarTarea(item.id)}
            >
              <Text style={styles.botonEliminarTexto}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  tareaContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3
  },
  tareaNombre: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  tareaDescripcion: {
    fontSize: 14,
    color: 'gray'
  },
  botonEliminar: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    alignItems: 'center'
  },
  botonEliminarTexto: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
export default Tareas;