import api from "../services/api";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Image, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

export function CharactersListScreen({ navigation }) {

    const [characters, setCharacters] = useState([]);
    // Estado para guardar o ID do personagem selecionado, para a navegação da tela de detalhes
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    // Função para buscar personagens (com ou sem filtro)
    async function fetchCharacters(name = "") {
        try {
            setLoading(true);
            // Se houver texto de busca, adiciona o parâmetro name
            const endpoint = name ? `/character/?name=${name}` : "/character";
            const response = await api.get(endpoint);
            setCharacters(response.data.results);
        } catch (error) {
            console.error("Erro no carregamento dos personagens", error);
            // Se não encontrar nenhum personagem, limpa a lista
            setCharacters([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCharacters();
    }, []);

    // Busca quando o texto muda (com debounce simples)
    useEffect(() => {
        // Aguarda 500ms após o usuário parar de digitar
        const delaySearch = setTimeout(() => {
            fetchCharacters(searchText);
        }, 500);

        // Limpa o timeout anterior se o usuário continuar digitando
        return () => clearTimeout(delaySearch);
    }, [searchText]);

    return (
        <View style={styles.container}>
            {/* Barra de pesquisa */}
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar personagem..."
                value={searchText}
                onChangeText={setSearchText}
                autoCapitalize="none"
                autoCorrect={false}
            />
             {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={characters}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            Nenhum personagem encontrado
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("CharactersDetail", { 
                                    characterId: item.id 
                                });
                            }}
                        >
                            <View style={styles.characterCard}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.characterImage}
                                />
                                <View style={styles.characterInfo}>
                                    <Text style={styles.characterName}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.characterDetail}>
                                        {item.status} - {item.species}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    searchInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        margin: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    characterCard: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        alignItems: 'center',
    },
    characterImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    characterInfo: {
        marginLeft: 15,
        flex: 1,
    },
    characterName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    characterDetail: {
        fontSize: 14,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#999',
    },
});
