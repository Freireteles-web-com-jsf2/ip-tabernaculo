import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST() {
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !supabaseUrl) {
    return NextResponse.json({ error: 'Chave de serviço ou URL do Supabase não configurada.' }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, serviceKey);

  // 1. Buscar todos os usuários do Auth
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) {
    return NextResponse.json({ error: 'Erro ao buscar usuários do Auth: ' + authError.message }, { status: 500 });
  }
  // 2. Buscar todos os e-mails já cadastrados em pessoas
  const { data: pessoas, error: pessoasError } = await supabase.from('pessoas').select('email');
  if (pessoasError) {
    return NextResponse.json({ error: 'Erro ao buscar pessoas: ' + pessoasError.message }, { status: 500 });
  }
  const emailsPessoas = (pessoas || []).map((p: { email: string }) => p.email);
  // 3. Filtrar usuários do Auth que não estão em pessoas
  const novos = (authUsers?.users || []).filter((u: { email?: string }) => u.email && !emailsPessoas.includes(u.email));
  if (novos.length === 0) {
    return NextResponse.json({ message: 'Todos os usuários do Auth já estão sincronizados.' });
  }
  // 4. Inserir os novos na tabela pessoas
  const inserts = novos.map((u: { email?: string }) => ({ nome: '', email: u.email, role: 'membro', status: 'ativo' }));
  const { error: insertError } = await supabase.from('pessoas').insert(inserts);
  if (insertError) {
    return NextResponse.json({ error: 'Erro ao inserir novos usuários: ' + insertError.message }, { status: 500 });
  }
  return NextResponse.json({ message: `Sincronização concluída! ${novos.length} usuário(s) inserido(s).` });
} 