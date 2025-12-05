import api from "../services/api";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ActivityIndicator, Text, Image, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export function CharacterDetailScreen({ navigation, route }) {

     // Variável para guardar o estado mutável dos personagens que será visto os detalhes
    const { characterId } = route.params;
    const [characterDetail, setCharacterDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCharacterDetail() {
            try {
                const response = await api.get(`/character/${characterId}`);
                setCharacterDetail(response.data);
            } catch (error) {
                console.error("Erro no carregamento dos detalhes do personagem", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCharacterDetail();
    }, [characterId]);

    function numEpisodes(characterDetail) {
        if (!characterDetail || !characterDetail.episode) return 0;
        return characterDetail.episode.length;
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={22} color="#333" />
                    <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title} numberOfLines={1}>{characterDetail.name}</Text>
            </View>

            <Image
                source={{ uri: characterDetail.image }}
                style={styles.image}
            />

            <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Status</Text>
                <Text style={styles.infoValue}>{characterDetail.status}</Text>

                <Text style={styles.infoLabel}>Espécie</Text>
                <Text style={styles.infoValue}>{characterDetail.species}</Text>

                <Text style={styles.infoLabel}>Gênero</Text>
                <Text style={styles.infoValue}>{characterDetail.gender}</Text>

                <Text style={styles.infoLabel}>Origem</Text>
                <Text style={styles.infoValue}>{characterDetail.origin?.name}</Text>

                <Text style={styles.infoLabel}>Localização</Text>
                <Text style={styles.infoValue}>{characterDetail.location?.name}</Text>

                <Text style={styles.infoLabel}>Episódios</Text>
                <Text style={styles.infoValue}>{numEpisodes(characterDetail)}</Text>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 45,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 8,
        marginRight: 10,
    },
    backText: {
        marginLeft: 6,
        color: '#333',
        fontSize: 16,
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: '700',
        color: '#222',
        marginLeft: 25,
    },
    image: {
        width: 220,
        height: 220,
        borderRadius: 12,
        marginBottom: 30,
    },
    infoCard: {
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    infoLabel: {
        fontSize: 12,
        color: '#777',
        marginTop: 8,
    },
    infoValue: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
});
