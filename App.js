import { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AddMediaForm from './components/AddMediaForm';
import MediaCard from './components/MediaCard';

let nextId = 1;

export default function App() {
  const [mediaList, setMediaList] = useState([]);

  const addMedia = ({ title, rating, description, imageUrl }) => {
    setMediaList((prev) => [
      { id: nextId++, title, rating, description, imageUrl },
      ...prev,
    ]);
  };

  const removeMedia = (id) => {
    setMediaList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catálogo Personal</Text>
        <Text style={styles.headerSubtitle}>Películas, Libros y Series</Text>
      </View>
      <FlatList
        data={mediaList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MediaCard item={item} onDelete={removeMedia} />
        )}
        ListHeaderComponent={<AddMediaForm onAdd={addMedia} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No hay medios registrados aún.{'\n'}¡Agrega tu primer título!
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F5',
  },
  header: {
    backgroundColor: '#6C63FF',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 24,
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
});
