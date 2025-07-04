"use client";
import { useRouter, useParams } from "next/navigation";
import { FaUserEdit, FaArrowLeft, FaIdCard } from "react-icons/fa";
import CartaoMembro from "@/components/CartaoMembro";
import { useState } from "react";
import Image from 'next/image';

const MOCK_MEMBROS = [
  { id: 1, nome: "Ana Paula", cargo: "Líder", grupo: "Louvor", telefone: "(11) 98765-4321", foto: "https://randomuser.me/api/portraits/women/11.jpg" },
  { id: 2, nome: "João Silva", cargo: "Membro", grupo: "Jovens", telefone: "(11) 91234-5678", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, nome: "Carlos Eduardo", cargo: "Tesoureiro", grupo: "Financeiro", telefone: "(11) 99876-5432", foto: "https://randomuser.me/api/portraits/men/31.jpg" },
];

export default function PerfilMembroPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const membro = MOCK_MEMBROS.find(m => m.id === id);
  const [showCartao, setShowCartao] = useState(false);

  function handleCartao() {
    if (!membro) return;
    setShowCartao(true);
  }

  function handlePrintCartao() {
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
      <div style={{ background: 'var(--background)', padding: '2.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', width: '100%', maxWidth: '28rem' }}>
        <button onClick={() => router.push("/pessoas")} style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
          <FaArrowLeft /> Voltar
        </button>
        <div className="flex flex-col items-center mb-6">
          <Image src={membro.foto} alt={membro.nome} width={96} height={96} className="w-24 h-24 rounded-full object-cover border-4 shadow mb-2" style={{ borderColor: 'var(--border)' }} />
          <h2 className="text-2xl font-extrabold mb-1 drop-shadow text-center" style={{ color: 'var(--primary)', fontFamily: 'var(--font-sans)' }}>{membro.nome}</h2>
          <p className="font-semibold text-center" style={{ color: 'var(--muted-foreground)' }}>{membro.cargo} - {membro.grupo}</p>
        </div>
        <div className="mb-6">
          <p className="font-semibold" style={{ color: 'var(--primary)' }}>Telefone:</p>
          <p style={{ color: 'var(--foreground)' }}>{membro.telefone}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="w-full flex items-center justify-center gap-2 font-bold transition-colors shadow-sm"
            style={{ background: 'var(--primary)', color: '#fff', padding: '0.75rem 0', borderRadius: 'var(--radius)', letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.10)', border: 'none' }}
            onClick={() => router.push(`/pessoas/${id}/editar`)}
          >
            <FaUserEdit /> Editar Dados
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 font-bold transition-colors shadow-sm"
            style={{ background: '#22c55e', color: '#fff', padding: '0.75rem 0', borderRadius: 'var(--radius)', letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.10)', border: 'none' }}
            onClick={handleCartao}
          >
            <FaIdCard /> Cartão de Membro
          </button>
        </div>
        {showCartao && membro && (
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
                <CartaoMembro nome={membro.nome} cargo={membro.cargo} grupo={membro.grupo} telefone={membro.telefone} foto={membro.foto} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
                <button onClick={handlePrintCartao} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>Imprimir</button>
                <button onClick={() => setShowCartao(false)} style={{ background: '#e11d48', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>Fechar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 