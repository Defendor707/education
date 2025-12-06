import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { API_URL } from '../utils/constants';

const CoursesScreen = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kurslar</Text>
      <FlatList
        data={courses}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.courseItem}>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.coursePrice}>{item.price} so'm</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  coursePrice: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default CoursesScreen;

