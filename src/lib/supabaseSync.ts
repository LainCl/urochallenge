import { supabase, isSupabaseConfigured } from './supabase';

export interface SupabaseConnectionStatus {
  configured: boolean;
  connected: boolean;
  message: string;
}

/**
 * Checks whether Supabase environment variables are present and verifies
 * connectivity with the `categories` table when configured.
 */
export async function checkSupabaseConnection(): Promise<SupabaseConnectionStatus> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      configured: false,
      connected: false,
      message:
        'Modo Demo Local activo (localStorage). Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env para habilitar sincronización en la nube.',
    };
  }

  try {
    const { error } = await supabase.from('categories').select('id').limit(1);
    if (error) {
      return {
        configured: true,
        connected: false,
        message: `Variables configuradas, pero la consulta falló: ${error.message}`,
      };
    }
    return {
      configured: true,
      connected: true,
      message: 'Conectado correctamente a Supabase.',
    };
  } catch (err) {
    return {
      configured: true,
      connected: false,
      message: err instanceof Error ? err.message : 'Error de red al conectar con Supabase.',
    };
  }
}
