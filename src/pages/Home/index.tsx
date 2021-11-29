import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { Container, MainTitle, Loading, Search } from './styles';
import PokemonLogo from '../../assets/pokemon.png';
import PokemonBall from '../../assets/pokeball.png';
import LoadingIcon from '../../assets/loading.png';

import { Grid } from '@mui/material';
import { PokeCard } from '../Pokecard';
import React from 'react';

interface IPokemon {
  name: string;
  url: string;
}

interface ApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: IPokemon[];
}

export default function Home(): JSX.Element {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]: [
    string,
    (search: string) => void
  ] = React.useState('');

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    axios.get<ApiResponse>(baseUrl + '&offset=0').then((response) => {
      setResponse(response.data);
      setLoading(false);
    });
  };

  const changePage = useCallback(
    async (type: 'next' | 'previous') => {
      if (!response || !response[type]) {
        return;
      }

      setLoading(true);
      console.log(response[type]);
      const { data } = await axios.get<ApiResponse>(response[type] as string);

      setResponse(data);

      setLoading(false);
    },
    [response, setResponse, setLoading]
  );

  return (
    <Container>
      <MainTitle>
        <img src={PokemonLogo} alt="Pokemon logo" />
        <Search
          type="text"
          placeholder="Search for pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </MainTitle>
      {!response || loading ? (
        <Loading>
          <img src={LoadingIcon} alt="Loading Icon" />
        </Loading>
      ) : (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {response.results.map((pokemon) => {
              if (
                search == '' ||
                pokemon.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return (
                  <PokeCard
                    key={pokemon.url}
                    image={PokemonBall}
                    name={pokemon.name}
                  />
                );
              }
              return null;
            })}
          </Grid>
        
        </>
      )}
    </Container>
  );
}

const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=16';
