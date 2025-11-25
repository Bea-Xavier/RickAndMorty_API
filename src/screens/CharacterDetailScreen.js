import api from "../services/api";
import { useEffect, useState } from "react";

export function CharacterDetailScreen({ navigation }) {

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
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // return (

    // );

}
