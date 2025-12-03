import api from "../services/api";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, Image, View } from "react-native";

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

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ padding: 20 }}>
            <Image 
                source={{ uri: characterDetail.image }} 
                style={{ width: 200, height: 200, borderRadius: 12 }} 
            />
            <Text style={{ fontSize: 24 }}>{characterDetail.name}</Text>
            <Text>Status: {characterDetail.status}</Text>
            <Text>Species: {characterDetail.species}</Text>
            <Text>Gender: {characterDetail.gender}</Text>
            <Text>Origin: {characterDetail.origin.name}</Text>
            <Text>Localization: {characterDetail.location.name}</Text>
        </View>
    );

}
