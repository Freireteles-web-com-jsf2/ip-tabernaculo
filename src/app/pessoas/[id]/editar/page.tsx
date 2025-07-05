"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { IMaskInput } from 'react-imask';
import Image from 'next/image';
import { supabase } from '@/context/SupabaseClient';
import { TablesUpdate, Enums } from '@/types/supabase';

const MOCK_MEMBROS = [
  {
    id: 1,
    nome: "Ana Paula",
    cargo: "Líder",
    grupo: "Louvor",
    telefone: "(11) 98765-4321",
    foto: "https://randomuser.me/api/portraits/women/11.jpg",
    email: "ana.paula@email.com",
    telefoneFixo: "(11) 4002-8922",
    whatsapp: "(11) 98765-4321",
    rua: "Rua das Flores",
    numero: "123",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01000-000",
    observacoes: "Líder do grupo de louvor."
  },
  {
    id: 2,
    nome: "João Silva",
    cargo: "Membro",
    grupo: "Jovens",
    telefone: "(11) 91234-5678",
    foto: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "joao.silva@email.com",
    telefoneFixo: "(11) 4002-1234",
    whatsapp: "(11) 91234-5678",
    rua: "Av. Brasil",
    numero: "456",
    bairro: "Jardim",
    cidade: "Guarulhos",
    estado: "SP",
    cep: "07000-000",
    observacoes: "Participa do grupo de jovens."
  },
  {
    id: 3,
    nome: "Carlos Eduardo",
    cargo: "Tesoureiro",
    grupo: "Financeiro",
    telefone: "(11) 99876-5432",
    foto: "https://randomuser.me/api/portraits/men/31.jpg",
    email: "carlos.edu@email.com",
    telefoneFixo: "(11) 4002-8765",
    whatsapp: "(11) 99876-5432",
    rua: "Rua do Tesouro",
    numero: "789",
    bairro: "Bela Vista",
    cidade: "Osasco",
    estado: "SP",
    cep: "06000-000",
    observacoes: "Responsável pelo financeiro."
  },
];

export default function EditarPessoaPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const membro = MOCK_MEMBROS.find(m => m.id === id);

  const [nome, setNome] = useState("");
  const [cargos, setCargos] = useState<{ id: number, nome: string }[]>([]);
  const [grupos, setGrupos] = useState<{ id: number, nome: string }[]>([]);
  const [cargoId, setCargoId] = useState("");
  const [grupoId, setGrupoId] = useState("");
  const [telefone, setTelefone] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [status, setStatus] = useState<Enums<'status_membro_enum'>>('ativo');
  const [role, setRole] = useState<Enums<'role_enum'>>('membro');

  useEffect(() => {
    async function carregarMembro() {
      const { data } = await supabase.from('pessoas').select('*').eq('id', id).single();
      if (data) {
        setNome(data.nome || "");
        setCargoId(data.cargo_id ? String(data.cargo_id) : "");
        setGrupoId(data.grupo_id ? String(data.grupo_id) : "");
        setTelefone(data.telefone || "");
        setFoto(data.foto_url || null);
        setEmail(data.email || "");
        setObservacoes(data.observacoes || "");
        setStatus((data.status as Enums<'status_membro_enum'>) || 'ativo');
        setRole((data.role as Enums<'role_enum'>) || 'membro');
      }
      setCarregando(false);
    }
    async function carregarCargosGrupos() {
      const { data: cargosData } = await supabase.from('cargos').select('id, nome');
      setCargos(cargosData || []);
      const { data: gruposData } = await supabase.from('grupos').select('id, nome');
      setGrupos(gruposData || []);
    }
    carregarMembro();
    carregarCargosGrupos();
  }, [id]);

  function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setFoto(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let foto_url = foto;
    if (foto && foto.startsWith('data:')) {
      const file = await (await fetch(foto)).blob();
      const fileName = `membro_${id}_${Date.now()}.png`;
      const { error: uploadError } = await supabase.storage.from('fotos-membros').upload(fileName, file, { upsert: true });
      if (uploadError) {
        alert('Erro ao fazer upload da foto');
        return;
      }
      foto_url = supabase.storage.from('fotos-membros').getPublicUrl(fileName).data.publicUrl;
    }
    const atualizacao: TablesUpdate<'pessoas'> = {
      nome,
      email,
      telefone,
      foto_url,
      cargo_id: cargoId ? Number(cargoId) : null,
      grupo_id: grupoId ? Number(grupoId) : null,
      status,
      role,
      observacoes,
    };
    const { error } = await supabase.from('pessoas').update(atualizacao).eq('id', id);
    if (error) {
      alert('Erro ao atualizar membro!');
      return;
    }
    alert('Dados do membro atualizados!');
    router.push(`/pessoas/${id}`);
  }

  if (carregando) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>Carregando...</div>;
  }

  if (!membro) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
        <div style={{ background: 'var(--background)', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p className="text-red-600 font-bold">Membro não encontrado.</p>
          <button onClick={() => router.push("/pessoas")} style={{ marginTop: '1rem', padding: '0.5rem 1.2rem', borderRadius: 'var(--radius)', background: 'var(--primary)', color: '#fff', fontWeight: 700, border: 'none', boxShadow: 'var(--shadow)', cursor: 'pointer' }}>Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
      <form onSubmit={handleSubmit} style={{ background: 'var(--background)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', padding: '2.5rem', width: '100%', maxWidth: '28rem', display: 'flex', flexDirection: 'column' }}>
        <button type="button" onClick={() => router.push(`/pessoas/${id}`)} style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
          <FaArrowLeft /> Voltar ao Perfil
        </button>
        <h1 className="text-3xl font-extrabold mb-6 text-center flex items-center justify-center gap-2 drop-shadow" style={{ color: 'var(--primary)', fontFamily: 'var(--font-sans)' }}>
          <FaSave /> Editar Membro
        </h1>
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            {foto ? (
              <Image
                src={foto}
                alt="Foto"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover border-4 shadow group-hover:opacity-80 transition"
                style={{ borderColor: 'var(--border)' }}
              />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-[var(--muted-foreground)] border-4 shadow" style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}>
                Foto
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFoto}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Trocar foto"
            />
          </div>
          <span className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>Clique na foto para alterar</span>
        </div>
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Nome</label>
        <input type="text" className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }} value={nome} onChange={e => setNome(e.target.value)} required />
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Cargo</label>
        <select value={cargoId} onChange={e => setCargoId(e.target.value)} className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}>
          <option value="">Selecione</option>
          {cargos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Grupo</label>
        <select value={grupoId} onChange={e => setGrupoId(e.target.value)} className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}>
          <option value="">Selecione</option>
          {grupos.map(g => <option key={g.id} value={g.id}>{g.nome}</option>)}
        </select>
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Telefone</label>
        <IMaskInput
          mask="(00) 00000-0000"
          value={telefone}
          onAccept={(value: string) => setTelefone(value)}
          className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}
          required
        />
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>E-mail</label>
        <input type="email" className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }} value={email} onChange={e => setEmail(e.target.value)} />
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Observações</label>
        <textarea className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }} value={observacoes} onChange={e => setObservacoes(e.target.value)} />
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Status</label>
        <select value={status} onChange={e => setStatus(e.target.value as Enums<'status_membro_enum'>)} className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
          <option value="visitante">Visitante</option>
          <option value="afastado">Afastado</option>
        </select>
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Perfil</label>
        <select value={role} onChange={e => setRole(e.target.value as Enums<'role_enum'>)} className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}>
          <option value="membro">Membro</option>
          <option value="admin">Admin</option>
          <option value="lider">Líder</option>
          <option value="secretario">Secretário</option>
          <option value="tesoureiro">Tesoureiro</option>
        </select>
        <button type="submit" className="w-full py-2 rounded text-base font-bold transition-colors shadow-sm mt-2" style={{ background: 'var(--primary)', color: '#fff', letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.10)' }}>Salvar Alterações</button>
      </form>
    </div>
  );
} 