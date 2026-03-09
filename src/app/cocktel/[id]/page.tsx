'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCoktelById } from '@/lib/api/axios';
import CocktailCard from '@/components/cocktelcard';
import { Cocktel } from '@/types';

const CoktelDetailPage = () => {
	const { id } = useParams();
    
	const [loading, setLoading] = useState(false);
	const [cocktail, setCocktail] = useState<Cocktel | null>(null);

	useEffect(() => {
		if (!id) return;

		setLoading(true);

		getCoktelById(id as string)
			.then((data: Cocktel | null) => setCocktail(data))
			.catch(() => setCocktail(null))
			.finally(() => setLoading(false));
	}, [id]);

	return (
		<div className="cocktail-detail-container">
			<div className="cocktail-detail-card">
				<h1 className="cocktail-detail-title">Detalle del Cocktail</h1>
				
				{loading && <p className="cocktail-detail-loading">Buscando...</p>}

				{cocktail && <CocktailCard coktel={cocktail} />}
			</div>
		</div>
	);
};

export default CoktelDetailPage;