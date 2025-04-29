import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet,
  TouchableOpacity, Modal, ScrollView, Alert
} from 'react-native';

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([
    { id: '1', nome: 'João Silva', email: 'joao@email.com' },
    { id: '2', nome: 'Maria Oliveira', email: 'maria@email.com' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const abrirModal = (cliente = null) => {
    setClienteSelecionado(cliente || { nome: '', email: '' });
    setModalVisible(true);
  };

  const salvarCliente = () => {
    if (!clienteSelecionado.nome || !clienteSelecionado.email) return;

    if (clienteSelecionado.id) {
      setClientes(clientes.map(c => c.id === clienteSelecionado.id ? clienteSelecionado : c));
    } else {
      setClientes([...clientes, { ...clienteSelecionado, id: Date.now().toString() }]);
    }

    setModalVisible(false);
    setClienteSelecionado(null);
  };

  const deletarCliente = () => {
    Alert.alert("Confirmar", "Deseja excluir este cliente?", [
      { text: "Cancelar" },
      {
        text: "Excluir", style: "destructive",
        onPress: () => {
          setClientes(clientes.filter(c => c.id !== clienteSelecionado.id));
          setModalVisible(false);
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => abrirModal(item)}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.titulo}>👤 Lista de Clientes</Text>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.botaoAdd} onPress={() => abrirModal()}>
        <Text style={{ color: '#fff', fontSize: 16 }}>+ Novo Cliente</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={{ padding: 20 }}>
          <Text style={styles.tituloModal}>
            {clienteSelecionado?.id ? 'Editar Cliente' : 'Novo Cliente'}
          </Text>

          <TextInput
            placeholder="Nome"
            style={styles.input}
            value={clienteSelecionado?.nome}
            onChangeText={t => setClienteSelecionado({ ...clienteSelecionado, nome: t })}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            value={clienteSelecionado?.email}
            onChangeText={t => setClienteSelecionado({ ...clienteSelecionado, email: t })}
          />

          <TouchableOpacity style={styles.btnSalvar} onPress={salvarCliente}>
            <Text style={{ color: '#fff' }}>Salvar</Text>
          </TouchableOpacity>

          {clienteSelecionado?.id && (
            <TouchableOpacity style={styles.btnExcluir} onPress={deletarCliente}>
              <Text style={{ color: '#fff' }}>Excluir</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnCancelar}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8,
    marginBottom: 10, borderColor: '#ccc', borderWidth: 1
  },
  nome: { fontSize: 16, fontWeight: 'bold' },
  email: { fontSize: 14, color: '#555' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    padding: 10, marginBottom: 10
  },
  botaoAdd: {
    position: 'absolute', right: 20, bottom: 20,
    backgroundColor: '#2196f3', padding: 15, borderRadius: 30
  },
  tituloModal: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 20
  },
  btnSalvar: {
    backgroundColor: 'green', padding: 15, alignItems: 'center',
    borderRadius: 5, marginBottom: 10
  },
  btnExcluir: {
    backgroundColor: 'red', padding: 15, alignItems: 'center',
    borderRadius: 5, marginBottom: 10
  },
  btnCancelar: { alignItems: 'center' }
});
