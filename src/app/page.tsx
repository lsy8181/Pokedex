import PokemonList from "@/compoents/PokemonList";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">포켓몬 도감</h1>
      <PokemonList />
    </main>
  );
}
