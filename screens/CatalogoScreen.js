import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet,
  TouchableOpacity, Modal, Image, ScrollView, Alert
} from 'react-native';

const docesIniciais = [
  { id: '1', nome: 'Brigadeiro', preco: 1.5, categoria: 'Chocolate', imagem: 'https://images.unsplash.com/photo-1702982852429-e0d0b27eb990?w=500' },
  { id: '2', nome: 'Beijinho', preco: 1.5, categoria: 'Coco', imagem: 'https://media.istockphoto.com/id/183597239/pt/foto/brasileiro-beijinho-um-doce-com-ingredientes.webp?a=1&b=1&s=612x612&w=0&k=20&c=uvp3xpsH15fYmXlFoELF3dJ1qWvtPNG5tq1Gm7UlvMo=' },
];

export default function CatalogoScreen() {
  const [doces, setDoces] = useState(docesIniciais);
  const [busca, setBusca] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [doceSelecionado, setDoceSelecionado] = useState(null);

  const filtrarDoces = () => {
    return doces.filter(d =>
      d.nome.toLowerCase().includes(busca.toLowerCase()) ||
      d.categoria.toLowerCase().includes(busca.toLowerCase())
    );
  };

  const abrirModal = (doce = null) => {
    setDoceSelecionado(doce || { nome: '', preco: '', categoria: '', imagem: '' });
    setModalVisible(true);
  };

  const salvarDoce = () => {
    if (!doceSelecionado.nome || !doceSelecionado.preco) return;

    const precoConvertido = parseFloat(doceSelecionado.preco);
    if (isNaN(precoConvertido)) {
      Alert.alert("Erro", "Preço inválido.");
      return;
    }

    if (doceSelecionado.id) {
      setDoces(doces.map(d => d.id === doceSelecionado.id ? { ...doceSelecionado, preco: precoConvertido } : d));
      Alert.alert("Sucesso", "Doce atualizado com sucesso!");
    } else {
      setDoces([...doces, { ...doceSelecionado, id: Date.now().toString(), preco: precoConvertido }]);
      Alert.alert("Sucesso", "Doce salvo com sucesso!");
    }

    setModalVisible(false);
    setDoceSelecionado(null);
  };

  const deletarDoce = () => {
    Alert.alert("Confirmar", "Deseja realmente excluir?", [
      { text: "Cancelar" },
      {
        text: "Excluir", style: "destructive",
        onPress: () => {
          setDoces(doces.filter(d => d.id !== doceSelecionado.id));
          setModalVisible(false);
          Alert.alert("Sucesso", "Doce excluído com sucesso!");
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => abrirModal(item)}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>R$ {Number(item.preco).toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Buscar por nome ou categoria..."
        style={styles.input}
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={filtrarDoces()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.botaoAdd} onPress={() => abrirModal()}>
        <Text style={{ color: '#fff', fontSize: 16 }}>+ Adicionar Doce</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={{ padding: 20 }}>
          <Text style={styles.tituloModal}>{doceSelecionado?.id ? 'Editar Doce' : 'Novo Doce'}</Text>
          <TextInput placeholder="Nome" style={styles.input} value={doceSelecionado?.nome}
            onChangeText={t => setDoceSelecionado({ ...doceSelecionado, nome: t })} />
          <TextInput placeholder="Preço" style={styles.input} keyboardType="numeric" value={doceSelecionado?.preco.toString()}
            onChangeText={t => setDoceSelecionado({ ...doceSelecionado, preco: t })} />
          <TextInput placeholder="Categoria" style={styles.input} value={doceSelecionado?.categoria}
            onChangeText={t => setDoceSelecionado({ ...doceSelecionado, categoria: t })} />
          <TextInput placeholder="URL da Imagem" style={styles.input} value={doceSelecionado?.imagem}
            onChangeText={t => setDoceSelecionado({ ...doceSelecionado, imagem: t })} />

          <TouchableOpacity style={styles.btnSalvar} onPress={salvarDoce}>
            <Text style={{ color: '#fff' }}>Salvar</Text>
          </TouchableOpacity>

          {doceSelecionado?.id && (
            <TouchableOpacity style={styles.btnExcluir} onPress={deletarDoce}>
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
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  card: { backgroundColor: '#fff', padding: 10, borderRadius: 8, elevation: 2, marginBottom: 10 },
  image: { width: '100%', height: 120, borderRadius: 8 },
  nome: { fontWeight: 'bold', fontSize: 16, marginTop: 8 },
  preco: { color: 'green' },
  botaoAdd: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#6200ea', padding: 15, borderRadius: 30 },
  tituloModal: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  btnSalvar: { backgroundColor: 'green', padding: 15, alignItems: 'center', borderRadius: 5, marginBottom: 10 },
  btnExcluir: { backgroundColor: 'red', padding: 15, alignItems: 'center', borderRadius: 5, marginBottom: 10 },
  btnCancelar: { alignItems: 'center' }
});
