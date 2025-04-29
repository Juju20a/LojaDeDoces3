import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function DetalhesDoceScreen({ route, navigation }) {
  const { doce } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: doce.imagem }} style={styles.image} />
      <Text style={styles.nome}>{doce.nome}</Text>
      <Text style={styles.descricao}>{doce.descricao}</Text>
      <Text style={styles.preco}>Preço: R$ {doce.preco.toFixed(2)}</Text>
      <Text style={styles.estoque}>Estoque: {doce.estoque}</Text>

      <TouchableOpacity
        style={styles.botaoCarrinho}
        onPress={() => alert(`"${doce.nome}" adicionado ao carrinho!`)}
      >
        <Text style={styles.textoBotao}>Adicionar ao carrinho 🛒</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  preco: {
    fontSize: 18,
    color: 'green',
    marginBottom: 5,
  },
  estoque: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  botaoCarrinho: {
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

