import { fetchPokemonData } from "@/apis/pokemon";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { typeColors } from "@/types/typeColors";

const PokemonDetailPage = async ({ params }: { params: { id: string } }) => {
  const pokemonData = await fetchPokemonData(params.id);

  return (
    <div className="flex flex-col items-center p-4 bg-[#f8f5f2] bg-no-repeat bg-top-right bg-[url('/img/pokeball.png')] bg-[length:25%] font-ramche">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{pokemonData.korean_name}</h1>
          <Link
            href="/"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700"
          >
            뒤로가기
          </Link>
        </div>
        <Image
          src={pokemonData.sprites.front_default}
          alt={pokemonData.korean_name}
          width={128}
          height={128}
          className="w-32 h-32 mx-auto mb-4"
        />
        <div className="flex flex-wrap gap-3 mb-4">
          <h2 className="text-xl font-semibold">타입:</h2>
          <ul className="flex flex-wrap gap-2">
            {pokemonData.types.map((typeInfo: any) => (
              <li
                key={typeInfo.type.name}
                className="text-lg px-2 py-1 rounded-full text-white"
                style={{
                  backgroundColor: typeColors[typeInfo.type.name],
                }}
              >
                {typeInfo.type.korean_name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <h2 className="text-xl font-semibold ">특성:</h2>
          <ul className="flex flex-wrap gap-2">
            {pokemonData.abilities.map((abilityInfo: any) => (
              <li key={abilityInfo.ability.name} className="text-lg">
                {abilityInfo.ability.korean_name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">신장 및 체중:</h2>
          <p className="text-lg">{`신장: ${pokemonData.height / 10} m`}</p>
          <p className="text-lg">{`체중: ${pokemonData.weight / 10} kg`}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">능력치:</h2>
          <ul>
            {pokemonData.stats.map((statInfo: any) => (
              <li key={statInfo.stat.name} className="text-lg mb-2">
                {statInfo.stat.name}:
                <span className="ml-2">{statInfo.base_stat}</span>
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500"
                    style={{ width: `${(statInfo.base_stat / 255) * 100}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
