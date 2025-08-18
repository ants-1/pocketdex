import { Pokemon, AddMyDexInput } from "./types.js";
import { db } from "./database/db.js";

export const resolvers = {
  Query: {
    myDex: async (): Promise<Pokemon[]> => {
      const { rows } = await db.query("SELECT * FROM my_dex ORDER BY id ASC");
      return rows.map((row: any) => ({
        id: row.id.toString(),
        name: row.name,
        pokemonTypes: row.pokemon_types,
        spriteUrl: row.sprite_url,
      }));
    },
  },

  Mutation: {
    addToMyDex: async (
      _: unknown,
      { id, myDex }: { id: string; myDex: AddMyDexInput }
    ): Promise<Pokemon> => {
      const { name, pokemonTypes, spriteUrl } = myDex;

      const { rows: existsRows } = await db.query(
        "SELECT * FROM my_dex WHERE id = $1",
        [id]
      );
      if (existsRows.length > 0) {
        return {
          id: existsRows[0].id.toString(),
          name: existsRows[0].name,
          pokemonTypes: existsRows[0].pokemon_types,
          spriteUrl: existsRows[0].sprite_url,
        };
      }

      const { rows } = await db.query(
        "INSERT INTO my_dex (id, name, pokemon_types, sprite_url) VALUES ($1, $2, $3, $4) RETURNING *",
        [id, name, pokemonTypes, spriteUrl]
      );
      const inserted = rows[0];
      return {
        id: inserted.id.toString(),
        name: inserted.name,
        pokemonTypes: inserted.pokemon_types,
        spriteUrl: inserted.sprite_url,
      };
    },

    removeFromMyDex: async (
      _: unknown,
      { id }: { id: string }
    ): Promise<Pokemon | null> => {
      const { rows } = await db.query(
        "DELETE FROM my_dex WHERE id = $1 RETURNING *",
        [id]
      );
      if (!rows[0]) return null;

      return {
        id: rows[0].id.toString(),
        name: rows[0].name,
        pokemonTypes: rows[0].pokemon_types,
        spriteUrl: rows[0].sprite_url,
      };
    },
  },
};
