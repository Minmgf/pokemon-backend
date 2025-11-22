import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Pokemon')
@Controller('Pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  /**
   * GET /pokemon
   * Obtiene una lista paginada de pokemones.
   * Soporta paginación a través del parámetro 'page'.
   */
  @Get()
  @ApiOperation({ summary: 'Obtiene lista de pokemones paginados' })
  @ApiResponse({ status: 200, description: 'Lista de Pokemones' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default 1)',
  })
  findAll(@Query('page') page: number = 1) {
    return this.pokemonService.findAll(page);
  }

  /**
   * GET /pokemon/:id
   * Obtiene información detallada de un pokemon por su ID.
   * Valida que el ID sea un número usando ParseIntPipe.
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene informacion detallada de un pokemon por su ID',
  })
  @ApiResponse({ status: 200, description: 'Pokemon encontrado' })
  @ApiResponse({ status: 404, description: 'Pokemon no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.findOne(id);
  }
}
