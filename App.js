import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Telas principais
import CatalogoScreen from './screens/CatalogoScreen';
import DetalhesDoceScreen from './screens/DetalhesDoceScreen';
import LojaDeDocesScreen from './screens/LojaDeDocesScreen';
import ClientesScreen from './screens/ClientesScreen';

// Telas novas (CRUD)
import NovoDoceScreen from './screens/NovoDoceScreen';
import EditarDoceScreen from './screens/EditarDoceScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tela inicial
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem-vindo à loja de doces JB!</Text>
    </View>
  );
}

// Tabs principais
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Doces') {
            iconName = 'storefront';
          } else if (route.name === 'Catálogo') {
            iconName = 'cafe';
          } else if (route.name === 'Clientes') {
            iconName = 'people';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Doces" component={LojaDeDocesScreen} />
      <Tab.Screen name="Catálogo" component={CatalogoScreen} />
      <Tab.Screen name="Clientes" component={ClientesScreen} />
    </Tab.Navigator>
  );
}

// App principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Abas principais */}
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />

        {/* Telas adicionais */}
        <Stack.Screen
          name="DetalhesDoce"
          component={DetalhesDoceScreen}
          options={{ title: 'Detalhes do Doce' }}
        />
        <Stack.Screen
          name="NovoDoce"
          component={NovoDoceScreen}
          options={{ title: 'Novo Doce' }}
        />
        <Stack.Screen
          name="EditarDoce"
          component={EditarDoceScreen}
          options={{ title: 'Editar Doce' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
