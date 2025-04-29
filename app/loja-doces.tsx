import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function LojaDocesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍬 Loja de Doces</Text>
      <Image
        source={{ uri: 'https://plus.unsplash.com/premium_photo-1667031518595-9cb4b0d504ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9jZXN8ZW58MHx8MHx8fDA%3D' }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Bem-vindo à nossa doce loja! Aqui você encontra balas, chocolates, pirulitos,
        chicletes e muito mais.
      </Text>
      <Text style={styles.subtitle}>🍭 Destaques:</Text>
      <Text style={styles.item}>• Balas de Gelatina</Text>
      <Text style={styles.item}>• Pirulitos Sortidos</Text>
      <Text style={styles.item}>• Chocolates Artesanais</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  item: {
    fontSize: 16,
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});
