"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "../css/PokemonCard.css";

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

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const router = useRouter();

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch("/api/pokemons/");
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
  }, []); /*내용 패치서 가저오기*/

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 100);
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
  }, [pokemons]); /*카드가 보였는지 안보였는지 체크하는거*/

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pokemons || pokemons.length === 0) {
    return <div>No Pokémon found.</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 justify-center w-full p-4">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          className="pokemon-card"
          style={{ backgroundColor: typeColors[pokemon.types[0].type.name] }}
          onClick={() => router.push(`/pokemon/${pokemon.id}`)}
        >
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-image"
          />
          <h2 className="pokemon-name">{pokemon.korean_name}</h2>
          <p className="pokemon-id">도감번호: {pokemon.id}</p>
        </div>
      ))}
    </div>
  );
}
