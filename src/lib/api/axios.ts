import axios from "axios";
import type { Cocktel, CocktelApiresponse } from "@/types";

const api = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1/",
  timeout: 5000,
});

const getCoktelByName = async (name: string): Promise<Cocktel[]> => {
    const respuesta = await api.get<CocktelApiresponse>(`search.php?s=${name}`);
    return respuesta.data.drinks ?? [] ;
}

const getCoktelById = async (id: string): Promise<Cocktel | null> => {
    const respuesta = await api.get<CocktelApiresponse>(`lookup.php?i=${id}`);
    return respuesta.data.drinks ? respuesta.data.drinks[0] : null;
}

const getRandomCocktail = async (): Promise<Cocktel | null> => {
    const respuesta = await api.get<CocktelApiresponse>(`random.php`);
    return respuesta.data.drinks ? respuesta.data.drinks[0] : null;
}

export {getCoktelById, getCoktelByName, getRandomCocktail};