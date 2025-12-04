import api from "../services/api";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Image, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";

export function CharactersListScreen({ navigation }) {

    const [characters, setCharacters] = useState([]);
    // Estado para guardar o ID do personagem selecionado, para a navegação da tela de detalhes
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Função para buscar personagens (com ou sem filtro e paginação)
    async function fetchCharacters(name = "", page = 1) {
        try {
            // Mostra a tela de carregamento quando decta que um usuário está buscando
            setLoading(true);
            // Monta o endpoint com base nos parâmetros fornecidos, página e nome (com ou sem)
            let endpoint = `/character/?page=${page}`;
            if (name) {
                endpoint += `&name=${name}`;
            }

            const response = await api.get(endpoint);
            setCharacters(response.data.results);
            setTotalPages(response.data.info.pages);
        } catch (error) {
            console.error("Erro no carregamento dos personagens", error);
            // Se não encontrar nenhum personagem, limpa a lista
            setCharacters([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }

    // Carrega todos os personagens na primeira vez, primeira renderização
    useEffect(() => {
        fetchCharacters("", 1);
    }, []);

    // Busca quando o texto muda (com debounce simples, ou seja com um tempo de inatividade)
    useEffect(() => {
        // Aguarda 500ms após o usuário parar de digitar para executar a função de busca de personagem
        const delaySearch = setTimeout(() => {
            setCurrentPage(1); // Volta para a primeira página ao buscar
            fetchCharacters(searchText, 1);
        }, 500);

        // Limpa o timeout anterior se o usuário continuar digitando
        return () => clearTimeout(delaySearch);
    }, [searchText]);

    // Navegar para uma página específica
    function goToPage(page) {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            fetchCharacters(searchText, page);
        }
    }

    // Gerar números de páginas para exibir
    function getPageNumbers() {
        const pages = [];
        const maxVisible = 5; // Máximo de números visíveis

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        // Ajusta o início se estiver no final
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    }

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
                <>
                    <FlatList
                        data={characters}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.listContent}
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

                    {/* Componente de Paginação */}
                    <View style={styles.paginationContainer}>
                        {/* Botão Primeira Página */}
                        <TouchableOpacity
                            style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
                            onPress={() => goToPage(1)}
                            disabled={currentPage === 1}
                        >
                            <Text style={styles.pageButtonText}>{'<<'}</Text>
                        </TouchableOpacity>

                        {/* Botão Anterior */}
                        <TouchableOpacity
                            style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
                            onPress={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <Text style={styles.pageButtonText}>{'<'}</Text>
                        </TouchableOpacity>

                        {/* Números das páginas */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.pageNumbersContainer}
                        >
                            {getPageNumbers().map((page) => (
                                <TouchableOpacity
                                    key={page}
                                    style={[
                                        styles.pageNumber,
                                        currentPage === page && styles.pageNumberActive
                                    ]}
                                    onPress={() => goToPage(page)}
                                >
                                    <Text style={[
                                        styles.pageNumberText,
                                        currentPage === page && styles.pageNumberTextActive
                                    ]}>
                                        {page}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Botão Próximo */}
                        <TouchableOpacity
                            style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
                            onPress={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={styles.pageButtonText}>{'>'}</Text>
                        </TouchableOpacity>

                        {/* Botão Última Página */}
                        <TouchableOpacity
                            style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
                            onPress={() => goToPage(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={styles.pageButtonText}>{'>>'}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Info da página atual */}
                    <Text style={styles.pageInfo}>
                        Página {currentPage} de {totalPages}
                    </Text>
                </>
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
        paddingBottom: 10,
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
        width: '100%',
    },
    // Estilos de Paginação
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        backgroundColor: '#f9f9f9',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    pageButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 6,
        marginHorizontal: 3,
        minWidth: 33,
        alignItems: 'center',
    },
    pageButtonDisabled: {
        backgroundColor: '#ccc',
        opacity: 0.5,
    },
    pageButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pageNumbersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    pageNumber: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 6,
        marginHorizontal: 3,
        minWidth: 33,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    pageNumberActive: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    pageNumberText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '600',
    },
    pageNumberTextActive: {
        color: '#fff',
    },
    pageInfo: {
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 15,
        color: '#666',
        backgroundColor: '#f9f9f9',
    },
});