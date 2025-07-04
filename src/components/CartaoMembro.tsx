import React from "react";
import Image from 'next/image';

interface CartaoMembroProps {
  nome: string;
  cargo: string;
  grupo: string;
  telefone: string;
  foto?: string;
  validade?: string;
}

const CartaoMembro: React.FC<CartaoMembroProps> = ({ nome, cargo, grupo, telefone, foto, validade }) => {
  return (
    <div
      style={{
        width: 370,
        height: 210,
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%)",
        border: "3px solid #2563eb",
        display: "flex",
        alignItems: "center",
        padding: 0,
        position: "relative",
        fontFamily: 'var(--font-sans)',
        overflow: 'hidden',
      }}
    >
      {/* Faixa colorida à esquerda */}
      <div style={{
        width: 10,
        height: '100%',
        background: '#2563eb',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        marginRight: 0,
      }} />
      {/* Foto */}
      <div style={{ margin: '0 22px 0 18px', display: 'flex', alignItems: 'center' }}>
        <Image
          src={foto || "/window.svg"}
          alt={nome}
          width={80}
          height={80}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #2563eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            background: "#fff"
          }}
        />
      </div>
      {/* Dados do membro */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <h2 style={{ margin: 0, fontSize: 24, color: "#2563eb", fontWeight: 800, lineHeight: 1 }}>{nome}</h2>
        <div style={{ margin: '6px 0 0 0', fontWeight: 600, color: "#334155", fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{}}>{cargo}</span>
          <span style={{ color: '#64748b', fontWeight: 400, fontSize: 15 }}>| Grupo: {grupo}</span>
        </div>
        <div style={{ margin: '8px 0 0 0', color: "#64748b", fontSize: 15 }}>
          Tel: {telefone}
        </div>
        <div style={{ marginTop: 18, fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
          Cartão de Membro
        </div>
      </div>
      {/* Base inferior: validade e logo */}
      <div style={{ position: 'absolute', right: 18, bottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, color: '#2563eb', fontWeight: 700, background: '#e0e7ef', borderRadius: 6, padding: '2px 10px' }}>
          Válido até: {validade || '12/2024'}
        </span>
        <Image src="/globe.svg" alt="logo" width={32} height={32} style={{ position: "absolute", right: 16, bottom: 12, width: 32, opacity: 0.15 }} />
      </div>
      <Image src="/globe.svg" alt="logo" width={36} height={36} style={{ width: 36, opacity: 0.18 }} />
    </div>
  );
};

export default CartaoMembro; 