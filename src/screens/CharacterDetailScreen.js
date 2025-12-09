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
                <ActivityIndicator
                    marginTop={80}
                    size="large"
                    color="#97CE4C"
                    style={{ marginTop: 12, transform: [{ scale: 1.2 }] }}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={22} color="#fffafa" />
                    <Image
                        source={require('../images/back.png')}
                        style={{ position: 'absolute', width: 35, height: 45, marginLeft: 30 }}
                    />
                </TouchableOpacity>
                <Text style={styles.tittlePage}>Detalhes do Personagem</Text>
                <Text style={styles.title} numberOfLines={1}>{characterDetail.name}</Text>
            </View>

            <View style={styles.characterBack} />

            <Image
                source={{ uri: characterDetail.image }}
                style={styles.image}
            />

            <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Status ❤️</Text>
                <Text style={styles.infoValue}>{characterDetail.status}</Text>

                <Text style={styles.infoLabel}>Espécie 🧫</Text>
                <Text style={styles.infoValue}>{characterDetail.species}</Text>

                <Text style={styles.infoLabel}>Gênero ♀️♂️</Text>
                <Text style={styles.infoValue}>{characterDetail.gender}</Text>

                <Text style={styles.infoLabel}>Origem 🌎</Text>
                <Text style={styles.infoValue}>{characterDetail.origin?.name}</Text>

                <Text style={styles.infoLabel}>Localização 🧭</Text>
                <Text style={styles.infoValue}>{characterDetail.location?.name}</Text>

                <Text style={styles.infoLabel}>Episódios 🎥</Text>
                <Text style={styles.infoValue}>{numEpisodes(characterDetail)}</Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e2e2e',
        alignItems: 'center',
        padding: 16,
        paddingTop: 50
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginRight: 10,
        marginLeft: -10,
    },
    tittlePage: {
        position: 'absolute',
        textAlign: 'center',
        marginLeft: 57,
        marginTop: 100,
        fontSize: 21,
        color: '#e5e5e5',
        fontStyle: 'italic',
        fontWeight: '700',
        textShadowColor: '#9bcb5f',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    title: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginTop: 195,
        textAlign: 'center',
        fontSize: 20,
        color: '#9bcb5f',
        fontStyle: 'italic',
        fontWeight: '700',
        textShadowColor: '#000000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    characterBack: {
        position: 'absolute',
        top: 197,
        width: 230,
        height: 230,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: '#fffafa'
    },
    image: {
        width: 215,
        height: 215,
        borderRadius: 12,
        marginBottom: 30,
        marginTop: 120,
    },
    infoCard: {
        width: 320,
        backgroundColor: '#f4f4f4',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#d7d7d7',
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    infoLabel: {
        fontSize: 12,
        color: '#9bcb5f',
        marginTop: 8,
        fontWeight: '600',
    },
    infoValue: {
        fontSize: 16,
        paddingTop: 3,
        color: '#222',
        fontWeight: '400',
        fontStyle: 'italic',
    },
});
