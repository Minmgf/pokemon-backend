import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of pokemons with pagination' })
  @ApiResponse({ status: 200, description: 'List of pokemons' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default 1)',
  })
  findAll(@Query('page') page: number = 1) {
    return this.pokemonService.findAll(page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pokemon details by ID' })
  @ApiResponse({ status: 200, description: 'Pokemon details' })
  @ApiResponse({ status: 404, description: 'Pokemon not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.findOne(id);
  }
}
