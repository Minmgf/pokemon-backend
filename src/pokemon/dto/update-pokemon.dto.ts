import { PartialType } from '@nestjs/swagger';
import { CreatePokemonDto } from './create-pokemon.dto';

/**
 * DTO para actualizar un Pokémon.
 * Extiende de CreatePokemonDto haciendo todos los campos opcionales.
 * No se utiliza actualmente (solo lectura).
 */
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
