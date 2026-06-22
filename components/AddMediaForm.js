import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddMediaForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }
    const ratingNum = parseInt(rating, 10);
    if (!rating || isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      setError('La calificación debe ser un número entre 1 y 5');
      return;
    }
    setError('');
    onAdd({
      title: title.trim(),
      rating: ratingNum,
      description: description.trim(),
      imageUrl: imageUrl.trim(),
    });
    setTitle('');
    setRating('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Agregar nuevo medio</Text>
      <TextInput
        style={styles.input}
        placeholder="Título *"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Calificación (1-5) *"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
        maxLength={1}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen de portada"
        value={imageUrl}
        onChangeText={setImageUrl}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  error: {
    color: '#FF6B6B',
    fontSize: 13,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
