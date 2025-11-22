import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';

//  Módulo Raíz de la aplicación.

@Module({
  imports: [PokemonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
