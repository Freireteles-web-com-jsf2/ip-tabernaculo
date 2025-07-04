"use client";
import { useState } from "react";
import { FaChurch, FaEnvelope } from "react-icons/fa";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(true);
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
          padding: '2rem',
          width: '100%',
          maxWidth: '24rem',
        }}
      >
        <div className="flex flex-col items-center mb-6">
          <FaChurch className="text-4xl mb-2 drop-shadow" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--primary)', fontFamily: 'var(--font-sans)' }}>Recuperar Senha</h1>
          <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Informe seu e-mail para receber as instruções</span>
        </div>
        {enviado ? (
          <div className="text-green-700 text-center mb-4 font-semibold">Se o e-mail estiver cadastrado, você receberá as instruções em instantes.</div>
        ) : (
          <>
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
            <button
              type="submit"
              className="w-full py-2 rounded text-base font-bold transition-colors shadow-sm"
              style={{ background: 'var(--primary)', color: '#fff', letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.10)' }}
            >
              Enviar instrução
            </button>
          </>
        )}
        <div className="text-center mt-4">
          <a href="/login" className="text-sm hover:underline font-medium" style={{ color: 'var(--primary)' }}>Voltar ao login</a>
        </div>
      </form>
    </div>
  );
} 