"use client";
import { useEffect, useState } from "react";
import { supabase } from '@/context/SupabaseClient';
import { useAdminRouteGuard } from '@/context/useAdminRouteGuard';

export default function GruposPage() {
  const isAdmin = useAdminRouteGuard('grupos');
  const [grupos, setGrupos] = useState<{ id: number, nome: string }[]>([]);
  const [novoGrupo, setNovoGrupo] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editNome, setEditNome] = useState("");
  if (!isAdmin) return null;

  useEffect(() => {
    async function fetchGrupos() {
      const { data } = await supabase.from('grupos').select('id, nome').order('nome');
      setGrupos(data || []);
    }
    fetchGrupos();
  }, []);

  async function adicionarGrupo(e: React.FormEvent) {
    e.preventDefault();
    if (!novoGrupo.trim()) return;
    const { error } = await supabase.from('grupos').insert([{ nome: novoGrupo }]);
    if (!error) {
      setNovoGrupo("");
      const { data } = await supabase.from('grupos').select('id, nome').order('nome');
      setGrupos(data || []);
    }
  }

  async function iniciarEdicao(id: number, nome: string) {
    setEditId(id);
    setEditNome(nome);
  }

  async function salvarEdicao(e: React.FormEvent) {
    e.preventDefault();
    if (!editNome.trim() || editId === null) return;
    const { error } = await supabase.from('grupos').update({ nome: editNome }).eq('id', editId);
    if (!error) {
      setEditId(null);
      setEditNome("");
      const { data } = await supabase.from('grupos').select('id, nome').order('nome');
      setGrupos(data || []);
    }
  }

  async function excluirGrupo(id: number) {
    if (!window.confirm("Excluir este grupo?")) return;
    const { error } = await supabase.from('grupos').delete().eq('id', id);
    if (!error) {
      setGrupos(grupos.filter(g => g.id !== id));
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Grupos</h2>
      <form onSubmit={adicionarGrupo} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input value={novoGrupo} onChange={e => setNovoGrupo(e.target.value)} placeholder="Novo grupo" style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: 6, background: '#2563eb', color: '#fff', fontWeight: 700, border: 'none' }}>Adicionar</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {grupos.map(grupo => (
          <li key={grupo.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {editId === grupo.id ? (
              <form onSubmit={salvarEdicao} style={{ display: 'flex', gap: 8, flex: 1 }}>
                <input value={editNome} onChange={e => setEditNome(e.target.value)} style={{ flex: 1, padding: 6, borderRadius: 6, border: '1px solid #ccc' }} />
                <button type="submit" style={{ padding: '6px 12px', borderRadius: 6, background: '#22c55e', color: '#fff', fontWeight: 700, border: 'none' }}>Salvar</button>
                <button type="button" onClick={() => setEditId(null)} style={{ padding: '6px 12px', borderRadius: 6, background: '#e11d48', color: '#fff', fontWeight: 700, border: 'none' }}>Cancelar</button>
              </form>
            ) : (
              <>
                <span style={{ flex: 1 }}>{grupo.nome}</span>
                <button onClick={() => iniciarEdicao(grupo.id, grupo.nome)} style={{ padding: '6px 12px', borderRadius: 6, background: '#2563eb', color: '#fff', fontWeight: 700, border: 'none' }}>Editar</button>
                <button onClick={() => excluirGrupo(grupo.id)} style={{ padding: '6px 12px', borderRadius: 6, background: '#e11d48', color: '#fff', fontWeight: 700, border: 'none' }}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 