import { neon } from '@neondatabase/serverless';

let _sql: ReturnType<typeof neon> | null = null;

export function getSql() {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set');
    _sql = neon(url);
  }
  return _sql;
}

// Default export that works as tagged template
export default function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  return getSql()(strings, ...values);
}
