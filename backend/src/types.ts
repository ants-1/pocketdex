export interface Pokemon {
  id: string;
  name: string;
  pokemonTypes: string[];
  spriteUrl?: string | null;
}

export interface AddMyDexInput {
  name: string;
  pokemonTypes: string[];
  spriteUrl?: string | null;
}
