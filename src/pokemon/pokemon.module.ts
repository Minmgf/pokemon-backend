import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { HttpModule } from '@nestjs/axios';

/**
 * Módulo de Pokémon.
 * Agrupa el Controlador (Rutas) y el Servicio (Lógica)
 * HttpModule para peticiones a la API externa.
 */
@Module({
  imports: [HttpModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
