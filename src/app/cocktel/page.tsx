'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCoktelByName } from '@/lib/api/axios';
import { Cocktel } from '@/types';

const CocktailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get('name')?.trim() ?? '';

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Cocktel[]>([]);

    useEffect(() => {
        const cleanName = name.trim();

        if (!cleanName) {
            setResults([]);
            return;
        }

        setLoading(true);

        getCoktelByName(cleanName)
            .then((data) => setResults(data))
            .catch(() => setResults([]))
            .finally(() => setLoading(false));
    }, [name]);


    return (
        <div className="cocktail-page-container">
            <div className="cocktail-page-card">
                <h1 className="cocktail-page-title">Detalles</h1>
                {loading && <p className="cocktail-page-info">Buscando...</p>}
                {!loading && !name && (
                    <p className="cocktail-page-info">Busca un cocktail desde la pantalla principal.</p>
                )}
                {!loading && name && results.length === 0 && (
                    <p className="cocktail-page-info">No se encontraron cocktails para "{name}".</p>
                )}

                <div className="cocktail-page-results-list">
                    {results.map((cocktail) => (
                        <div key={cocktail.idDrink} className="cocktail-page-result-item">
                            <h2 className="cocktail-page-result-name">{cocktail.strDrink}</h2>

                            {cocktail.strDrinkThumb && (
                                <img
                                    src={cocktail.strDrinkThumb}
                                    alt={`Imagen de ${cocktail.strDrink}`}
                                    className="cocktail-page-result-image"
                                />
                            )}

                            <button
                                className="cocktail-page-result-button"
                                onClick={() => router.push(`/cocktel/${cocktail.idDrink}`)}
                            >
                                Ver detalle
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CocktailPage;

    