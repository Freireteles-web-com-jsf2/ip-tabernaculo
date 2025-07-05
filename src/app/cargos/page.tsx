"use client";
import { useEffect, useState } from "react";
import { supabase } from '@/context/SupabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useAdminRouteGuard } from '@/context/useAdminRouteGuard';

export default function CargosPage() {
  const isAdmin = useAdminRouteGuard('cargos');
  if (!isAdmin) return null;
  const [cargos, setCargos] = useState<{ id: number, nome: string }[]>([]);
  const [novoCargo, setNovoCargo] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editNome, setEditNome] = useState("");

  useEffect(() => {
    async function fetchCargos() {
      const { data } = await supabase.from('cargos').select('id, nome').order('nome');
      setCargos(data || []);
    }
    fetchCargos();
  }, []);

  async function adicionarCargo(e: React.FormEvent) {
    e.preventDefault();
    if (!novoCargo.trim()) return;
    const { error } = await supabase.from('cargos').insert([{ nome: novoCargo }]);
    if (!error) {
      setNovoCargo("");
      const { data } = await supabase.from('cargos').select('id, nome').order('nome');
      setCargos(data || []);
    }
  }

  async function iniciarEdicao(id: number, nome: string) {
    setEditId(id);
    setEditNome(nome);
  }

  async function salvarEdicao(e: React.FormEvent) {
    e.preventDefault();
    if (!editNome.trim() || editId === null) return;
    const { error } = await supabase.from('cargos').update({ nome: editNome }).eq('id', editId);
    if (!error) {
      setEditId(null);
      setEditNome("");
      const { data } = await supabase.from('cargos').select('id, nome').order('nome');
      setCargos(data || []);
    }
  }

  async function excluirCargo(id: number) {
    if (!window.confirm("Excluir este cargo?")) return;
    const { error } = await supabase.from('cargos').delete().eq('id', id);
    if (!error) {
      setCargos(cargos.filter(c => c.id !== id));
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Cargos</h2>
      <form onSubmit={adicionarCargo} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input value={novoCargo} onChange={e => setNovoCargo(e.target.value)} placeholder="Novo cargo" style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: 6, background: '#2563eb', color: '#fff', fontWeight: 700, border: 'none' }}>Adicionar</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cargos.map(cargo => (
          <li key={cargo.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {editId === cargo.id ? (
              <form onSubmit={salvarEdicao} style={{ display: 'flex', gap: 8, flex: 1 }}>
                <input value={editNome} onChange={e => setEditNome(e.target.value)} style={{ flex: 1, padding: 6, borderRadius: 6, border: '1px solid #ccc' }} />
                <button type="submit" style={{ padding: '6px 12px', borderRadius: 6, background: '#22c55e', color: '#fff', fontWeight: 700, border: 'none' }}>Salvar</button>
                <button type="button" onClick={() => setEditId(null)} style={{ padding: '6px 12px', borderRadius: 6, background: '#e11d48', color: '#fff', fontWeight: 700, border: 'none' }}>Cancelar</button>
              </form>
            ) : (
              <>
                <span style={{ flex: 1 }}>{cargo.nome}</span>
                <button onClick={() => iniciarEdicao(cargo.id, cargo.nome)} style={{ padding: '6px 12px', borderRadius: 6, background: '#2563eb', color: '#fff', fontWeight: 700, border: 'none' }}>Editar</button>
                <button onClick={() => excluirCargo(cargo.id)} style={{ padding: '6px 12px', borderRadius: 6, background: '#e11d48', color: '#fff', fontWeight: 700, border: 'none' }}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 