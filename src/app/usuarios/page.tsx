"use client";
import { useEffect, useState } from "react";
import { supabase } from '@/context/SupabaseClient';
import { useAdminRouteGuard } from '@/context/useAdminRouteGuard';
import { Constants, TablesInsert, TablesUpdate, Enums } from '@/types/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function UsuariosPage() {
  const isAdmin = useAdminRouteGuard('usuarios');
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [pendentes, setPendentes] = useState<any[]>([]);
  const [novoEmail, setNovoEmail] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoRole, setNovoRole] = useState<Enums<'role_enum'>>("membro");
  const [novaSenha, setNovaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const supabase = createClientComponentClient();
  const [editRoles, setEditRoles] = useState<{[id: number]: Enums<'role_enum'>}>({});

  useEffect(() => {
    async function fetchUsuarios() {
      const { data } = await supabase.from('pessoas').select('id, nome, email, role, status');
      setUsuarios((data || []).filter(u => u.status !== 'pendente'));
      setPendentes((data || []).filter(u => u.status === 'pendente'));
    }
    fetchUsuarios();
  }, []);

  async function handleCriarUsuario(e: React.FormEvent) {
    e.preventDefault();
    setErro(""); setSucesso("");
    // 1. Criar usuário no Supabase Auth
    const { error: authError } = await supabase.auth.signUp({
      email: novoEmail,
      password: novaSenha,
    });
    if (authError) {
      setErro("Erro ao criar usuário no Auth: " + authError.message);
      return;
    }
    // 2. Criar na tabela pessoas
    const novo: TablesInsert<'pessoas'> = {
      nome: novoNome,
      email: novoEmail,
      role: novoRole,
    };
    const { error: dbError } = await supabase.from('pessoas').insert([novo]);
    if (dbError) {
      setErro("Erro ao criar usuário no banco: " + dbError.message);
      return;
    }
    setSucesso("Usuário criado com sucesso!");
    setNovoEmail(""); setNovoNome(""); setNovaSenha(""); setNovoRole("membro");
    const { data } = await supabase.from('pessoas').select('id, nome, email, role');
    setUsuarios(data || []);
  }

  function handleRoleChange(id: number, value: Enums<'role_enum'>) {
    setEditRoles(prev => ({ ...prev, [id]: value }));
  }

  async function handleSalvarRole(id: number) {
    const novoRole = editRoles[id];
    if (!novoRole) return;
    setErro(""); setSucesso("");
    const atualizacao: TablesUpdate<'pessoas'> = { role: novoRole };
    const { error } = await supabase.from('pessoas').update(atualizacao).eq('id', id);
    if (error) {
      setErro("Erro ao atualizar perfil: " + error.message);
      return;
    }
    setSucesso("Perfil atualizado com sucesso!");
    // Atualizar listagem
    const { data } = await supabase.from('pessoas').select('id, nome, email, role, status');
    setUsuarios((data || []).filter(u => u.status !== 'pendente'));
    setPendentes((data || []).filter(u => u.status === 'pendente'));
    setEditRoles(prev => { const copy = { ...prev }; delete copy[id]; return copy; });
  }

  async function aprovarUsuario(id: number) {
    setErro(""); setSucesso("");
    const { error } = await supabase.from('pessoas').update({ status: 'ativo' }).eq('id', id);
    if (error) {
      setErro("Erro ao aprovar usuário: " + error.message);
      return;
    }
    setSucesso("Usuário aprovado!");
    setPendentes(pendentes.filter(u => u.id !== id));
    setUsuarios([...usuarios, { ...pendentes.find(u => u.id === id), status: 'ativo' }]);
  }

  async function rejeitarUsuario(id: number) {
    setErro(""); setSucesso("");
    const { error } = await supabase.from('pessoas').delete().eq('id', id);
    if (error) {
      setErro("Erro ao rejeitar usuário: " + error.message);
      return;
    }
    setSucesso("Usuário rejeitado e removido!");
    setPendentes(pendentes.filter(u => u.id !== id));
  }

  async function sincronizarUsuariosAuth() {
    setErro(""); setSucesso("");
    try {
      const res = await fetch('/api/sync-auth-users', { method: 'POST' });
      const result = await res.json();
      if (!res.ok) {
        setErro(result.error || 'Erro desconhecido ao sincronizar.');
        return;
      }
      setSucesso(result.message || 'Sincronização concluída!');
      // Atualizar listagem
      const { data } = await supabase.from('pessoas').select('id, nome, email, role, status');
      setUsuarios((data || []).filter(u => u.status !== 'pendente'));
      setPendentes((data || []).filter(u => u.status === 'pendente'));
    } catch (e: any) {
      setErro('Erro ao sincronizar: ' + (e.message || e));
    }
  }

  if (!isAdmin) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Gerenciar Usuários</h2>
        <button onClick={sincronizarUsuariosAuth} className="mb-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition">Sincronizar usuários do Auth</button>
        <form onSubmit={handleCriarUsuario} className="flex flex-wrap gap-4 mb-8">
          <input value={novoNome} onChange={e => setNovoNome(e.target.value)} placeholder="Nome" className="flex-1 p-2 rounded bg-gray-700 text-white" required />
          <input value={novoEmail} onChange={e => setNovoEmail(e.target.value)} placeholder="E-mail" type="email" className="flex-1 p-2 rounded bg-gray-700 text-white" required />
          <input value={novaSenha} onChange={e => setNovaSenha(e.target.value)} placeholder="Senha" type="password" className="flex-1 p-2 rounded bg-gray-700 text-white" required />
          <select value={novoRole} onChange={e => setNovoRole(e.target.value as Enums<'role_enum'>)} className="flex-1 p-2 rounded bg-gray-700 text-white">
            {Constants.public.Enums.role_enum.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition">Criar Usuário</button>
        </form>
        {erro && <div className="text-red-400 mb-2 text-center">{erro}</div>}
        {sucesso && <div className="text-green-400 mb-2 text-center">{sucesso}</div>}
        {pendentes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">Usuários Pendentes de Aprovação</h2>
            <table className="min-w-full bg-gray-700 rounded mb-4 text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4">Nome</th>
                  <th className="py-2 px-4">E-mail</th>
                  <th className="py-2 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pendentes.map((u) => (
                  <tr key={u.id} className="border-b border-gray-600">
                    <td className="py-2 px-4">{u.nome}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button onClick={() => aprovarUsuario(u.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Aprovar</button>
                      <button onClick={() => rejeitarUsuario(u.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Rejeitar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <table className="min-w-full bg-gray-700 rounded text-white">
          <thead>
            <tr>
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">E-mail</th>
              <th className="py-2 px-4">Perfil</th>
              <th className="py-2 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => {
              const valorEditado = editRoles[u.id] ?? u.role;
              return (
                <tr key={u.id} className="border-b border-gray-600">
                  <td className="py-2 px-4">{u.nome}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  <td className="py-2 px-4">{u.role}</td>
                  <td className="py-2 px-4 flex gap-2 items-center">
                    <select
                      value={valorEditado}
                      onChange={e => handleRoleChange(u.id, e.target.value as Enums<'role_enum'>)}
                      className="p-1 rounded bg-gray-800 text-white border border-gray-600"
                    >
                      {Constants.public.Enums.role_enum.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    {valorEditado !== u.role && (
                      <button
                        onClick={() => handleSalvarRole(u.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >Salvar</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 