"use client";

import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "../css/PokemonCard.css";

// Pokemon 타입 정의
export type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name?: string } }[];
  abilities: { ability: { name: string; korean_name?: string } }[];
  moves: { move: { name: string; korean_name?: string } }[];
};

// typeColors 객체의 타입 정의
interface TypeColors {
  [key: string]: string;
}

const typeColors: TypeColors = {
  normal: "#dad9cf",
  fire: "#f36358",
  water: "#a3bef7",
  electric: "#fce97d",
  grass: "#8feb9c",
  ice: "#96D9D6",
  fighting: "#97312d",
  poison: "#c08ebf",
  ground: "#d69c5a",
  flying: "#8fa6f3",
  psychic: "#e986c0",
  bug: "#bcc76a",
  rock: "#B6A136",
  ghost: "#786b8a",
  dragon: "#a08ad8",
  dark: "#644670",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// 스타일 컴포넌트 정의
const PokemonListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  justify-content: center;
  width: 100%;
  padding: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 1300px) {
    grid-template-columns: repeat(9, 1fr);
  }
`;

interface PokemonCardProps {
  pokemon: Pokemon;
  index: number;
}

const PokemonCard = styled.div<PokemonCardProps>`
  background-color: ${({ pokemon }) => typeColors[pokemon.types[0].type.name]};
`;

const PokemonImage = styled.img.attrs({
  className: "pokemon-image",
})``;

const PokemonName = styled.h2.attrs({
  className: "pokemon-name",
})``;

const PokemonId = styled.p.attrs({
  className: "pokemon-id",
})``;

// PokemonList 컴포넌트 정의
export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch("/api/pokemons");
        const data = await response.json();
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setPokemons(data);
        } else {
          console.error("Invalid response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 100); // 100ms 지연 추가
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".pokemon-card");
    cards.forEach((card) => observer.current?.observe(card));

    return () => {
      cards.forEach((card) => observer.current?.unobserve(card));
    };
  }, [pokemons]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pokemons || pokemons.length === 0) {
    return <div>No Pokémon found.</div>;
  }

  return (
    <PokemonListContainer>
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          index={index}
          className="pokemon-card"
        >
          <PokemonImage
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <PokemonName>{pokemon.korean_name}</PokemonName>
          <PokemonId>도감번호: {pokemon.id}</PokemonId>
        </PokemonCard>
      ))}
    </PokemonListContainer>
  );
}
