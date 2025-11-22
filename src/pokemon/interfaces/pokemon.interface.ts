export interface PokemonSummary {
  id: number;
  name: string;
  image: string;
}

export interface PokemonDetail extends PokemonSummary {
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  types: string[];
  abilities: string[];
}

// Interfaces for PokeAPI raw responses to ensure type safety when fetching
export interface PokeAPIPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokeAPIPokemonDetailResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}
