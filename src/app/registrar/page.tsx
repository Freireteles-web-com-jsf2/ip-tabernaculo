"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    setCarregando(true);
    // Cria usuário no Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });
    if (error) {
      setErro(error.message);
      setCarregando(false);
      return;
    }
    // Cria registro na tabela pessoas
    const { error: erroPessoa } = await supabase.from('pessoas').insert({
      nome,
      email,
      role: 'membro',
      status: 'pendente',
    });
    if (erroPessoa) {
      setErro('Usuário criado, mas houve erro ao salvar dados pessoais. Contate o suporte.');
      setCarregando(false);
      return;
    }
    setSucesso('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.');
    setCarregando(false);
    setTimeout(() => router.push('/login'), 3000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Criar Conta</h2>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Nome</label>
          <input type="text" className="w-full p-2 rounded bg-gray-700 text-white" value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">E-mail</label>
          <input type="email" className="w-full p-2 rounded bg-gray-700 text-white" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Senha</label>
          <input type="password" className="w-full p-2 rounded bg-gray-700 text-white" value={senha} onChange={e => setSenha(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Confirmar Senha</label>
          <input type="password" className="w-full p-2 rounded bg-gray-700 text-white" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} />
        </div>
        {erro && <div className="text-red-400 mb-2 text-center">{erro}</div>}
        {sucesso && <div className="text-green-400 mb-2 text-center">{sucesso}</div>}
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" disabled={carregando}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-300 hover:underline">Já tenho conta</a>
        </div>
      </form>
    </div>
  );
} 