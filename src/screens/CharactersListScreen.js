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
            // Mostra a tela de carregamento quando decta que um usuário está buscando
            setLoading(true);
            // Se houver texto de busca, adiciona o parâmetro name, se não retorna todos os personagens
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

    // Carrega todos os personagens na primeira vez, primeira renderização
    useEffect(() => {
        fetchCharacters();
    }, []);

    // Busca quando o texto muda (com debounce simples, ou seja com um tempo de inatividade)
    useEffect(() => {
        // Aguarda 500ms após o usuário parar de digitar para executar a função de busca de personagem
        const delaySearch = setTimeout(() => {
            fetchCharacters(searchText);
        }, 500);

        // Limpa o timeout anterior se o usuário continuar digitando
        return () => clearTimeout(delaySearch);
    }, [searchText]);

    return (
        <View style={styles.container}>
            {/* Barra de pesquisa */}
                <TextInput style={styles.searchInput}
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
                    numColumns={2} // Grid com 2 colunas
                    columnWrapperStyle={styles.row} // Espaçamento entre colunas
                    contentContainerStyle={styles.listContent} // Estilo do conteúdo da lista
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            Nenhum personagem encontrado
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => {
                                navigation.navigate("CharactersDetail", {
                                    characterId: item.id
                                });
                            }}
                        >
                            <View style={styles.cardContent}>
                                {/* Barra colorida no topo */}
                                <View style={[
                                    styles.topBar,
                                    { backgroundColor: getStatusColor(item.status) }
                                ]} />
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.characterImage}
                                />
                                <Text style={styles.characterName} numberOfLines={1}>
                                    {item.name}
                                </Text>
                                <Text style={styles.characterStatus} numberOfLines={1}>
                                    {item.status}
                                </Text>
                                <Text style={styles.characterSpecies} numberOfLines={1}>
                                    {item.species}
                                </Text>

                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

// Função para definir cor baseada no status
function getStatusColor(status) {
    switch (status.toLowerCase()) {
        case 'alive':
            return '#4CAF50'; // Verde
        case 'dead':
            return '#F44336'; // Vermelho
        default:
            return '#9E9E9E'; // Cinza
    }
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
    listContent: {
        paddingHorizontal: 5,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    card: {
        flex: 1,
        margin: 5,
        maxWidth: '48%',
    },
    cardContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    characterImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
    },
    characterName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
    },
    characterStatus: {
        fontSize: 13,
        color: '#666',
        marginBottom: 2,
    },
    characterSpecies: {
        fontSize: 12,
        color: '#999',
        marginBottom: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#999',
    },
});
