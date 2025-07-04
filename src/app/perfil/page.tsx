"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { IMaskInput } from 'react-imask';
import Image from 'next/image';

export default function PerfilPage() {
  const { usuario, login } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [telefone, setTelefone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome || "");
      setEmail(usuario.email || "");
      setFoto(usuario.foto || null);
      setTelefone(usuario.telefone || "");
      setWhatsapp(usuario.whatsapp || "");
      setRua(usuario.rua || "");
      setNumero(usuario.numero || "");
      setBairro(usuario.bairro || "");
      setCidade(usuario.cidade || "");
      setEstado(usuario.estado || "");
      setCep(usuario.cep || "");
    }
  }, [usuario]);

  function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setFoto(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aqui você pode salvar os dados no contexto ou backend
    login({ ...usuario, nome, email, foto, telefone, whatsapp, rua, numero, bairro, cidade, estado, cep });
    setMensagem("Perfil atualizado com sucesso!");
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
      <form onSubmit={handleSubmit} style={{ background: 'var(--background)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', padding: '2.5rem', width: '100%', maxWidth: '28rem', display: 'flex', flexDirection: 'column' }}>
        <h1 className="text-3xl font-extrabold mb-6 text-center flex items-center justify-center gap-2 drop-shadow" style={{ color: 'var(--primary)', fontFamily: 'var(--font-sans)' }}>
          Meu Perfil
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
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>E-mail</label>
        <input type="email" className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }} value={email} onChange={e => setEmail(e.target.value)} required />
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Telefone</label>
        <IMaskInput
          mask="(00) 00000-0000"
          value={telefone}
          onAccept={(value: string) => setTelefone(value)}
          className="w-full p-2 mb-4 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}
          required
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
        <button type="submit" className="w-full py-2 rounded text-base font-bold transition-colors shadow-sm mt-2" style={{ background: 'var(--primary)', color: '#fff', letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.10)' }}>Salvar</button>
        {mensagem && <div className="text-green-600 text-center mt-4 font-semibold">{mensagem}</div>}
      </form>
    </div>
  );
} 