import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

export default function Home ({ navigation }) {
  return (
    <View style={styles.container}>
      <h1>ToDo List Levin, Blaunstein, Ferrara</h1>
      <img src="../"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
  },
});

