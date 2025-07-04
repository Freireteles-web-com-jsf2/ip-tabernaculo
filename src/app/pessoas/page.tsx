"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaUserPlus, FaIdCard, FaHome } from "react-icons/fa";
import CartaoMembro from "@/components/CartaoMembro";
import { supabase } from '@/context/SupabaseClient';
import { Tables, TablesInsert, TablesUpdate } from '@/types/supabase';

const MOCK_MEMBROS = [
  { id: 1, nome: "Ana Paula", cargo: "Líder", grupo: "Louvor", telefone: "(11) 98765-4321", status: "Ativo", aniversario: "1990-06-15" },
  { id: 2, nome: "João Silva", cargo: "Membro", grupo: "Jovens", telefone: "(11) 91234-5678", status: "Ativo", aniversario: "1988-04-10" },
  { id: 3, nome: "Carlos Eduardo", cargo: "Tesoureiro", grupo: "Financeiro", telefone: "(11) 99876-5432", status: "Inativo", aniversario: "1995-07-22" },
];

const CARGOS = ["Líder", "Membro", "Tesoureiro"];
const GRUPOS = ["Louvor", "Jovens", "Financeiro"];
const STATUS = ["Ativo", "Inativo"];

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

// Exemplo: Buscar todos os membros (tipado)
async function buscarMembros() {
  const { data, error } = await supabase
    .from('pessoas')
    .select('*');
  // data é Tables<'pessoas'>[] | null
  if (error) console.error(error);
  return data;
}

// Exemplo: Inserir novo membro (tipado)
async function inserirMembro(novo: TablesInsert<'pessoas'>) {
  const { data, error } = await supabase
    .from('pessoas')
    .insert([novo])
    .select();
  if (error) console.error(error);
  return data;
}

// Exemplo: Atualizar membro (tipado)
async function atualizarMembro(id: number, atualizacao: TablesUpdate<'pessoas'>) {
  const { data, error } = await supabase
    .from('pessoas')
    .update(atualizacao)
    .eq('id', id)
    .select();
  if (error) console.error(error);
  return data;
}

export default function PessoasPage() {
  const [busca, setBusca] = useState("");
  const [filtroCargo, setFiltroCargo] = useState("");
  const [filtroGrupo, setFiltroGrupo] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroAniversariante, setFiltroAniversariante] = useState(false);
  const router = useRouter();
  const [membros, setMembros] = useState<Tables<'pessoas'>[]>([]);
  const [membrosFiltrados, setMembrosFiltrados] = useState<Tables<'pessoas'>[]>([]);
  const [showCartao, setShowCartao] = useState(false);
  const [membroCartao, setMembroCartao] = useState<any>(null);
  const [cargos, setCargos] = useState<{ id: number, nome: string }[]>([]);
  const [grupos, setGrupos] = useState<{ id: number, nome: string }[]>([]);

  useEffect(() => {
    async function carregarMembros() {
      const { data } = await supabase.from('pessoas').select('*');
      setMembros(data || []);
    }
    async function carregarCargosGrupos() {
      const { data: cargosData } = await supabase.from('cargos').select('id, nome');
      setCargos(cargosData || []);
      const { data: gruposData } = await supabase.from('grupos').select('id, nome');
      setGrupos(gruposData || []);
    }
    carregarMembros();
    carregarCargosGrupos();
  }, []);

  useEffect(() => {
    const hoje = new Date();
    setMembrosFiltrados(
      membros.filter(m => {
        const buscaMatch =
          !busca || m.nome?.toLowerCase().includes(busca.toLowerCase()) ||
          m.cargo_id?.toString() === busca ||
          m.grupo_id?.toString() === busca;
        const cargoMatch = !filtroCargo || m.cargo_id?.toString() === filtroCargo;
        const grupoMatch = !filtroGrupo || m.grupo_id?.toString() === filtroGrupo;
        const statusMatch = !filtroStatus || m.status === filtroStatus;
        const aniversarianteMatch = !filtroAniversariante ||
          (m.data_nascimento && (new Date(m.data_nascimento).getMonth() === hoje.getMonth()));
        return buscaMatch && cargoMatch && grupoMatch && statusMatch && aniversarianteMatch;
      })
    );
  }, [busca, filtroCargo, filtroGrupo, filtroStatus, filtroAniversariante, membros]);

  function handleImprimirCartao(membro: any) {
    setMembroCartao(membro);
    setShowCartao(true);
  }

  async function handleExcluirMembro(id: number) {
    if (window.confirm("Tem certeza que deseja excluir este membro?")) {
      const { error } = await supabase.from('pessoas').delete().eq('id', id);
      if (error) {
        alert('Erro ao excluir membro!');
        return;
      }
      setMembros(membros.filter(m => m.id !== id));
    }
  }

  return (
    <ClientOnly>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--background)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '64rem',
            background: 'var(--background)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
            border: '1px solid var(--border)',
            padding: '2rem',
            position: 'relative',
          }}
        >
          <button
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'var(--primary)',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius)',
              fontWeight: 600,
              fontSize: '0.95rem',
              boxShadow: 'var(--shadow)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onClick={() => router.push("/")}
          >
            <FaHome /> Dashboard
          </button>
          <div className="flex flex-col items-center mb-8">
            <FaIdCard className="text-3xl mb-2 drop-shadow" style={{ color: 'var(--primary)' }} />
            <h2 className="text-2xl font-bold mb-1 text-center" style={{ color: 'var(--primary)', fontFamily: 'var(--font-sans)' }}>Pessoas/Membros</h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--primary)' }}><FaSearch /></span>
                <input
                  type="text"
                  placeholder="Buscar por nome, cargo ou grupo..."
                  className="border rounded p-2 pl-10 w-full text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                  style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                />
              </div>
              <button
                style={{
                  background: 'var(--primary)',
                  color: '#fff',
                  padding: '0.5rem 1.2rem',
                  borderRadius: 'var(--radius)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: 'var(--shadow)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onClick={() => router.push("/pessoas/nova")}
              >
                <FaUserPlus /> Novo Membro
              </button>
            </div>
          </div>
          {/* Filtros avançados */}
          <div className="flex flex-wrap gap-4 mb-4 items-center">
            <div>
              <label style={{ color: 'var(--primary)', fontWeight: 600, marginRight: 6 }}>Cargo:</label>
              <select value={filtroCargo} onChange={e => setFiltroCargo(e.target.value)} className="border rounded p-1 text-base" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}>
                <option value="">Todos</option>
                {cargos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: 'var(--primary)', fontWeight: 600, marginRight: 6 }}>Grupo:</label>
              <select value={filtroGrupo} onChange={e => setFiltroGrupo(e.target.value)} className="border rounded p-1 text-base" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}>
                <option value="">Todos</option>
                {grupos.map(g => <option key={g.id} value={g.id}>{g.nome}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: 'var(--primary)', fontWeight: 600, marginRight: 6 }}>Status:</label>
              <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)} className="border rounded p-1 text-base" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}>
                <option value="">Todos</option>
                {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" id="aniversariante" checked={filtroAniversariante} onChange={e => setFiltroAniversariante(e.target.checked)} />
              <label htmlFor="aniversariante" style={{ color: 'var(--primary)', fontWeight: 600 }}>Aniversariantes do mês</label>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table
              className="min-w-full rounded-xl shadow border"
              style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
            >
              <thead>
                <tr className="text-left text-xs" style={{ color: 'var(--primary)', background: 'var(--muted)' }}>
                  <th className="py-2 px-2">Nome</th>
                  <th className="py-2 px-2">Cargo</th>
                  <th className="py-2 px-2">Grupo</th>
                  <th className="py-2 px-2">Telefone</th>
                  <th className="py-2 px-2"></th>
                  <th className="py-2 px-2"></th>
                  <th className="py-2 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {membrosFiltrados.map(membro => (
                  <tr key={membro.id} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="py-2 px-2 font-medium" style={{ color: 'var(--foreground)' }}>{membro.nome}</td>
                    <td className="py-2 px-2" style={{ color: 'var(--foreground)' }}>{cargos.find(c => c.id === membro.cargo_id)?.nome || '-'}</td>
                    <td className="py-2 px-2" style={{ color: 'var(--foreground)' }}>{grupos.find(g => g.id === membro.grupo_id)?.nome || '-'}</td>
                    <td className="py-2 px-2" style={{ color: 'var(--foreground)' }}>{membro.telefone}</td>
                    <td className="py-2 px-2 text-right">
                      <button
                        style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={() => router.push(`/pessoas/${membro.id}`)}
                      >
                        Ver Perfil
                      </button>
                    </td>
                    <td className="py-2 px-2 text-right">
                      <button
                        style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.95rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={() => handleImprimirCartao(membro)}
                      >
                        Imprimir Cartão
                      </button>
                    </td>
                    <td className="py-2 px-2 text-right">
                      <button
                        style={{ color: '#e11d48', fontWeight: 600, fontSize: '0.95rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={() => handleExcluirMembro(membro.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {membrosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6" style={{ color: 'var(--muted-foreground)' }}>Nenhum membro encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showCartao && membroCartao && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', minWidth: 380, position: 'relative' }}>
            <div id="cartao-membro-print">
              <CartaoMembro nome={membroCartao.nome} cargo={membroCartao.cargo} grupo={membroCartao.grupo} telefone={membroCartao.telefone} foto={membroCartao.foto} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
              <button onClick={() => {
                const printContents = document.getElementById('cartao-membro-print')?.innerHTML;
                if (!printContents) return;
                const win = window.open('', '', 'width=400,height=300');
                if (!win) return;
                win.document.write('<html><head><title>Cartão de Membro</title>');
                win.document.write('<style>body{margin:0;padding:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#f8fafc;}@media print{body{background:#fff;}}</style>');
                win.document.write('</head><body>');
                win.document.write(printContents);
                win.document.write('</body></html>');
                win.document.close();
                win.focus();
                win.print();
                win.close();
              }} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>Imprimir</button>
              <button onClick={() => setShowCartao(false)} style={{ background: '#e11d48', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </ClientOnly>
  );
} 