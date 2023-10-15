import { NextPage, GetStaticProps } from "next"
import { Card, Grid, Row, Text } from "@nextui-org/react"

import { pokeApi } from "../api"
import { Layout } from "../components/layouts"
import { PokemonCard } from "../components/pokemon"
import { PokemonListResponse, SmallPokemon } from "../interfaces"
import Image from "next/image"

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokémons">
      <Image src="/img/banner.png" width={200} height={150} alt="banner" />

      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151")

  const pokemons = data.results.map((pokemon, index) => ({
    ...pokemon,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
    id: index + 1,
  }))

  return {
    props: {
      pokemons,
    },
  }
}

export default HomePage
