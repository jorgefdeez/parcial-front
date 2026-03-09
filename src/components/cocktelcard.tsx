'use client'
import { Cocktel} from "@/types"

type CoktelCardProps ={
    coktel: Cocktel
}

type IngredientKey = `strIngredient${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15}`;

const CocktailCard = ({coktel}: CoktelCardProps) => {
    const ingredientes: string[] = [];

    for (let i = 1; i <= 15; i++) {
        const ingredientKey = `strIngredient${i}` as IngredientKey;
        const ingrediente = coktel[ingredientKey];

        if (ingrediente?.trim()) {
            ingredientes.push(ingrediente.trim());
        }
    }

    return (
        <div className="cocktail-card-item">
            <h2 className="cocktail-card-name">{coktel.strDrink}</h2>

            {coktel.strDrinkThumb && (
                <img
                    src={coktel.strDrinkThumb}
                    alt={`Imagen de ${coktel.strDrink}`}
                    className="cocktail-card-image"
                />
            )}
                <div className="cocktail-card-info">
                    <p className="cocktail-card-text"><strong>Categrory:</strong> {coktel.strCategory}</p>
                    <p className="cocktail-card-text"><strong>Type:</strong> {coktel.strAlcoholic}</p>
                    <p className="cocktail-card-text"><strong>Glass:</strong> {coktel.strGlass}</p>
                    <p className="cocktail-card-text"><strong>Instructions:</strong> {coktel.strInstructions}</p>
                    <p className="cocktail-card-text"><strong>Ingredients:</strong></p>
                    <ul>
                        {ingredientes.map((ingrediente, index) => (
                            <li key={index} className="cocktail-card-text">{ingrediente}</li>
                        ))}
                    </ul>
                </div>
        </div>
    );
};

export default CocktailCard;