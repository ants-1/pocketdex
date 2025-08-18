export interface Pokemon {
  id: string;
  name: string;
  pokemonTypes: string[];
  spriteUrl?: string | null;
}

export interface AddMyDexInput {
  id: string;
  name: string;
  pokemonTypes: string[];
  spriteUrl?: string | null;
}
