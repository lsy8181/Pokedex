"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types/Pokemon";
import { typeColors } from "@/types/typeColors";
import { motion, useScroll } from "framer-motion";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pokemons || pokemons.length === 0) {
    return <div>No Pokémon found.</div>;
  }

  const containerVariants = {
    out: {
      y: 300,
    },
    in: {
      y: 0,
      transition: {
        duration: 0.5,
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="grid grid-cols-9 gap-4 justify-center w-full p-4">
      {pokemons.map((pokemon) => (
        <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`} passHref>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              ease: "easeInOut",
              duration: 1,
              y: { duration: 1 },
            }}
          >
            <motion.button
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.5 }}
              whileHover={{ scale: 1.25 }}
            >
              <div
                className="flex flex-col items-center p-4 rounded-lg shadow-extra-dark"
                style={{
                  backgroundColor: typeColors[pokemon.types[0].type.name],
                }}
              >
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <h2 className="text-lg mb-1">{pokemon.korean_name}</h2>
                <p className="text-sm mb-2">도감번호: {pokemon.id}</p>
              </div>
            </motion.button>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
