import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import './search.css'; 
import poksearch from './poksearch.png';
 


interface Pokemon {
    name: string;
    types: Array<{ type: { name: string } }>;
    moves: Array<{ move: { name: string } }>;
    sprites: { front_default: string, front_shiny?: string };
    height: number;
    weight: number;
}

const PokemonSearch: React.FC = () => {
    const [pokemonId, setPokemonId] = useState<string>('');
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [error, setError] = useState<string>('');

    const fetchPokemon = async () => {
        if (!pokemonId) return;
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            if (!response.ok) throw new Error('Not found');
            const data = await response.json() as Pokemon;
            setPokemon(data);
            setError('');
        } catch (err) {
            setError('Pokémon ID must be from 1 to 1025');
            setPokemon(null);
        }
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <img src={poksearch} alt='pokemon search' />
            <TextField
                type="number"
                label="Enter Pokémon ID"
                variant="outlined"
                value={pokemonId}
                onChange={(e) => setPokemonId(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={fetchPokemon} style={{ marginTop: '10px' }}>Search</Button>
            {error && <Typography color="error">{error}</Typography>}
            {pokemon && (
                <div className="cardContainer">
                    <Typography variant="h5" className="cardHeader">{pokemon.name}</Typography>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className="cardImage" />
                    <Typography className="cardDetails">Type: {pokemon.types.map(type => type.type.name).join(', ')}</Typography>
                    <Typography className="cardDetails">Moves: {pokemon.moves.slice(0, 4).map(move => move.move.name).join(', ')}</Typography>
                    <Typography className="cardDetails">Height: {pokemon.height} decimetres</Typography>
                    <Typography className="cardDetails">Weight: {pokemon.weight} hectograms</Typography>
                </div>
            )}
        </div>
    );
};

export default PokemonSearch;
