import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { supabaseLog } from './SupabaseLogClient';

export function useAdminRouteGuard(page: string) {
  const { usuario } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!usuario || usuario.perfil !== 'admin') {
      console.warn(`Acesso negado à página ${page} por usuário: ${usuario?.email || 'desconhecido'}`);
      // Log no banco (client sem tipagem)
      supabaseLog.from('audit_log_entries').insert([
        {
          event: 'acesso_negado',
          page,
          email: usuario?.email || 'desconhecido',
          data: new Date().toISOString(),
        }
      ]);
      if (typeof window !== 'undefined') router.replace('/');
    }
  }, [usuario, router, page]);

  return usuario && usuario.perfil === 'admin';
} 