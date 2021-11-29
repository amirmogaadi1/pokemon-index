import { useEffect, useState, } from 'react';
import axios from 'axios';

import { Container, MainTitle, Loading } from './styles';
import PokemonLogo from '../../assets/pokemon.png';
import PokemonBall from '../../assets/pokeball.png';
import LoadingIcon from '../../assets/loading.png';

import { Grid } from '@mui/material';
import { PokeCard } from '../Pokecard';

interface IPokemon {
  name: string;
  url: string;
}

interface ApiResponse {
  count: number;
  results: IPokemon[];
}

export default function Home(): JSX.Element {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    axios.get<ApiResponse>(baseUrl + '&offset=0').then((response) => {
      setResponse(response.data);
      setLoading(false);
    });
  };

  
  return (
    <Container>
      <MainTitle>
        <img src={PokemonLogo} alt="Pokemon logo" />
       
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
             
                return (
                  <PokeCard
                    key={pokemon.url}
                    image={PokemonBall}
                    name={pokemon.name}
                  />
                );
             
            })}
          </Grid>
        </>
      )}
    </Container>
  );
}

const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=16';
