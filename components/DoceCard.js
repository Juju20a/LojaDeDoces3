import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function DoceCard({ doce, onPressComprar }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: doce.imagem }} style={styles.image} />
      <Text style={styles.nome}>{doce.nome}</Text>
      <Text style={styles.preco}>R$ {doce.preco.toFixed(2)}</Text>
      <TouchableOpacity style={styles.btnComprar} onPress={onPressComprar}>
        <Text style={styles.btnText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  preco: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
  btnComprar: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

