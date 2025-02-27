import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { product } from './product'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author  , product ],
}