import { SavedSchema } from '@/types/erd';

export const saveSchema = (schema: SavedSchema) => {
  const savedSchemas = getSavedSchemas();
  savedSchemas.push(schema);
  localStorage.setItem('saved-schemas', JSON.stringify(savedSchemas));
};

export const getSavedSchemas = (): SavedSchema[] => {
  const saved = localStorage.getItem('saved-schemas');
  return saved ? JSON.parse(saved) : [];
};

export const deleteSchema = (timestamp: number) => {
  const schemas = getSavedSchemas().filter(
    (schema) => schema.timestamp !== timestamp
  );
  localStorage.setItem('saved-schemas', JSON.stringify(schemas));
};