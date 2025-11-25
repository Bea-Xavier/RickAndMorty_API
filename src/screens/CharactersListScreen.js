import api from "../services/api";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Image, Text, TouchableOpacity } from "react-native";

export function CharactersListScreen() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCharacters() {
            try {
                const response = await api.get("/character");
                setCharacters(response.data.results);
            } catch (error) {
                console.error("Erro no carregamento dos personagens", error);
                // O finally vai executar independente se der erro ou não
            } finally {
                setLoading(false);
            }
        }

        fetchCharacters();
    }, []);


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <TouchableOpacity>
                    <View>
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 100, height: 100, borderRadius: 8 }} >
                        </Image>
                        <Text>{item.name}</Text>
                        <Text>{item.status}</Text>
                        <Text>{item.species}</Text>
                    </View>
                </TouchableOpacity>
            }
        />
    );
}