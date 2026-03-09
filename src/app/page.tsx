'use client'

import {useState} from "react";
import { useRouter } from "next/navigation";
import { getRandomCocktail } from "@/lib/api/axios";

const Home = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = () => {
    const query = search.trim();
    if (!query) return;
    router.push(`/cocktel?name=${encodeURIComponent(query)}`);
  };

  const obtenerCoktelAleatorio = async () => {
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const coktel = await getRandomCocktail();

      if (!coktel) {
        setError('fallo al obtener el coktel aleatorio');
        return;
      }

      router.push(`/cocktel/${coktel.idDrink}`);
    } catch {
      setError('Ocurrio un error al buscar un coktel aleatorio.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="home-container">
      <div className="home-card">
     
        <h1 className="home-title">Cocktails</h1>
        
        <div className="home-search-box">
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="home-input"
          />
          
          <button className="home-button" onClick={onSearch}>Buscar</button>
        </div>

        <button className="home-button" onClick={obtenerCoktelAleatorio} disabled={loading}>
          {loading ? 'Buscando...' : 'Dime algo bonito'}
        </button>

        {error && <p className="home-error">{error}</p>}
      </div>
    </div>
  )
}

export default Home

