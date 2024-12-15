export const COLUMN_TYPES = [
  { value: 'varchar', label: 'VARCHAR' },
  { value: 'int', label: 'INT' },
  { value: 'boolean', label: 'BOOLEAN' },
  { value: 'timestamp', label: 'TIMESTAMP' },
  { value: 'text', label: 'TEXT' },
] as const;

export type ColumnType = typeof COLUMN_TYPES[number]['value'];