"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChurch, FaEnvelope, FaLock } from "react-icons/fa";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    // Login real com Supabase Auth
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
    if (error) {
      setErro("E-mail ou senha inválidos.");
      return;
    }
    // Buscar perfil do usuário na tabela pessoas
    const { data: pessoa, error: erroPessoa } = await supabase.from('pessoas').select('role').eq('email', email).single();
    let perfil = "membro";
    if (pessoa && pessoa.role) perfil = pessoa.role;
    localStorage.setItem("usuario", JSON.stringify({ perfil, email }));
    router.push("/");
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
        onSubmit={handleLogin}
        style={{
          background: 'var(--background)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
          padding: '2rem',
          width: '100%',
          maxWidth: '24rem',
        }}
      >
        <div className="flex flex-col items-center mb-6">
          <FaChurch className="text-4xl mb-2 drop-shadow" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--primary)', fontFamily: 'var(--font-sans)' }}>Bem-vindo ao SGI</h1>
          <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Sistema de Gestão de Igrejas</span>
        </div>
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>E-mail</label>
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--primary)' }}><FaEnvelope /></span>
          <input
            type="email"
            className="w-full p-2 pl-10 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
            style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <label className="block mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>Senha</label>
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--primary)' }}><FaLock /></span>
          <input
            type="password"
            className="w-full p-2 pl-10 border rounded text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
            style={{ color: 'var(--foreground)', background: 'var(--background)', borderColor: 'var(--border)' }}
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
        </div>
        {erro && <div className="text-red-600 text-sm mb-2 text-center font-semibold">{erro}</div>}
        <button
          type="submit"
          className="w-full py-2 rounded text-base font-bold transition-colors shadow-sm mt-2"
          style={{ background: 'var(--primary)', color: '#fff', letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.10)' }}
        >
          Entrar
        </button>
        <div className="text-center mt-4">
          <a href="/recuperar-senha" className="text-sm hover:underline font-medium" style={{ color: 'var(--primary)' }}>Esqueci minha senha</a>
        </div>
        <div className="text-center mt-2">
          <a href="/registrar" className="text-sm hover:underline font-medium" style={{ color: 'var(--primary)' }}>Criar conta</a>
        </div>
      </form>
    </div>
  );
} 