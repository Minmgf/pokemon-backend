import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  PokemonSummary,
  PokemonDetail,
  PokeAPIPokemonListResponse,
  PokeAPIPokemonDetailResponse,
} from './interfaces/pokemon.interface';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtiene lista de Pokemones desde la PokeAPI externa.
   * Transforma los datos crudos a PokemonSummary.
   * @param page - El número de página a obtener (por defecto es 1).
   */
  async findAll(page: number = 1): Promise<PokemonSummary[]> {
    const limit = 10;
    const offset = (page - 1) * limit;
    const { data } = await firstValueFrom(
      this.httpService.get<PokeAPIPokemonListResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      ),
    );

    return data.results.map((pokemon) => {
      // Extraer ID de la URL: https://pokeapi.co/api/v2/pokemon/1/
      const segments = pokemon.url.split('/').filter(Boolean);
      const idStr = segments.pop();
      const id = idStr ? parseInt(idStr, 10) : 0;
      return {
        id,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    });
  }

  /**
   * Informacion detallada de un Pokémon por su ID.
   * Mapea la respuesta compleja de PokeAPI a PokemonDetail.
   * @param id - Identificador del Pokémon.
   * @throws NotFoundException si el Pokémon no es encontrado.
   */
  async findOne(id: number): Promise<PokemonDetail> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<PokeAPIPokemonDetailResponse>(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
        ),
      );

      return {
        id: data.id,
        name: data.name,
        image:
          data.sprites.other?.['official-artwork']?.front_default ||
          data.sprites.front_default,
        stats: {
          hp: data.stats.find((s) => s.stat.name === 'hp')?.base_stat || 0,
          attack:
            data.stats.find((s) => s.stat.name === 'attack')?.base_stat || 0,
          defense:
            data.stats.find((s) => s.stat.name === 'defense')?.base_stat || 0,
          speed:
            data.stats.find((s) => s.stat.name === 'speed')?.base_stat || 0,
        },
        types: data.types.map((t) => t.type.name),
        abilities: data.abilities.map((a) => a.ability.name),
      };
    } catch (error) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
  }
}
