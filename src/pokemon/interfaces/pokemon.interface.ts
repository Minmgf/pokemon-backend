// Interfaz de un Pokémon.
export interface PokemonSummary {
  id: number;
  name: string;
  image: string;
}

// Interfaz extendida para la vista detallada de un Pokémon.
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

// Estructura cruda de la respuesta de la PokeAPI (lista).
export interface PokeAPIPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

/**
 * Estructura completa de la PokeAPI (detalle).
 * Mapea la estructura compleja externa a una interfaz tipada para un acceso seguro.
 */
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
