"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";
import { IMaskInput } from 'react-imask';
import Image from 'next/image';
import { supabase } from '@/context/SupabaseClient';
import { TablesInsert, Constants } from '@/types/supabase';

export default function NovaPessoaPage() {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [grupo, setGrupo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [telefoneFixo, setTelefoneFixo] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [cargos, setCargos] = useState<{ id: number, nome: string }[]>([]);
  const [grupos, setGrupos] = useState<{ id: number, nome: string }[]>([]);
  const [cargoId, setCargoId] = useState("");
  const [grupoId, setGrupoId] = useState("");
  const [status, setStatus] = useState('ativo');
  const [role, setRole] = useState('membro');
  const router = useRouter();

  useEffect(() => {
    async function carregarCargosGrupos() {
      const { data: cargosData } = await supabase.from('cargos').select('id, nome');
      setCargos(cargosData || []);
      const { data: gruposData } = await supabase.from('grupos').select('id, nome');
      setGrupos(gruposData || []);
    }
    carregarCargosGrupos();
  }, []);

  function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setFoto(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let foto_url: string | null = null;
    if (foto && foto.startsWith('data:')) {
      // Upload da foto para o Supabase Storage
      const file = await (await fetch(foto)).blob();
      const fileName = `membro_${Date.now()}.png`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('fotos-membros').upload(fileName, file, { upsert: true });
      if (uploadError) {
        alert('Erro ao fazer upload da foto');
        return;
      }
      foto_url = supabase.storage.from('fotos-membros').getPublicUrl(fileName).data.publicUrl;
    }
    const novoMembro: TablesInsert<'pessoas'> = {
      nome,
      email,
      telefone,
      endereco: `${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}, ${cep}`,
      observacoes,
      foto_url,
      cargo_id: cargoId ? Number(cargoId) : null,
      grupo_id: grupoId ? Number(grupoId) : null,
      status,
      role,
    };
    const { error } = await supabase.from('pessoas').insert([novoMembro]);
    if (error) {
      alert('Erro ao cadastrar membro!');
      return;
    }
    alert('Membro cadastrado com sucesso!');
    router.push('/pessoas');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background)',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--background)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '28rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center flex items-center justify-center gap-2 drop-shadow" style={{ color: 'var(--primary)', fontFamily: 'var(--font-sans)' }}>
          <FaUserPlus /> Novo Membro
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
          <span className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>Clique na foto para adicionar</span>
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
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Telefone Fixo</label>
        <IMaskInput
          mask="(00) 0000-0000"
          value={telefoneFixo}
          onAccept={(value: string) => setTelefoneFixo(value)}
          className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}
        />
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>WhatsApp</label>
        <IMaskInput
          mask="(00) 00000-0000"
          value={whatsapp}
          onAccept={(value: string) => setWhatsapp(value)}
          className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Rua</label>
            <input type="text" className="w-full p-2 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }} value={rua} onChange={e => setRua(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Número</label>
            <input type="text" className="w-full p-2 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }} value={numero} onChange={e => setNumero(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Bairro</label>
            <input type="text" className="w-full p-2 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }} value={bairro} onChange={e => setBairro(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Cidade</label>
            <input type="text" className="w-full p-2 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }} value={cidade} onChange={e => setCidade(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Estado</label>
            <input type="text" className="w-full p-2 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }} value={estado} onChange={e => setEstado(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>CEP</label>
            <IMaskInput
              mask="00000-000"
              value={cep}
              onAccept={(value: string) => setCep(value)}
              className="w-full p-2 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}
            />
          </div>
        </div>
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Observações</label>
        <textarea className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }} value={observacoes} onChange={e => setObservacoes(e.target.value)} rows={2} />
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}>
          {Constants.public.Enums.status_membro_enum.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Função/Role</label>
        <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}>
          {Constants.public.Enums.role_enum.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button type="submit" className="w-full py-2 rounded text-base font-bold transition-colors shadow-sm mt-2" style={{ background: 'var(--primary)', color: '#fff', letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.10)' }}>Salvar</button>
        <button type="button" onClick={() => router.push("/pessoas")}
          className="w-full mt-2 py-2 rounded border text-base font-bold transition-colors"
          style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'var(--background)' }}>Cancelar</button>
      </form>
    </div>
  );
} 