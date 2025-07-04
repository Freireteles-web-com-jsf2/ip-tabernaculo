import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function RecentTransactions() {
  return (
    <div
      style={{
        background: 'var(--background)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)',
        padding: '1.25rem',
      }}
    >
      <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>Últimas Transações</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-2 border-b" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full" style={{ background: '#bbf7d0', color: '#16a34a' }}>
              <FaArrowDown className="text-sm" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Dízimo</p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Maria Silva</p>
            </div>
          </div>
          <div className="font-medium" style={{ color: '#16a34a' }}>R$ 120,00</div>
        </div>
        <div className="flex items-center justify-between p-2 border-b" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full" style={{ background: '#bbf7d0', color: '#16a34a' }}>
              <FaArrowDown className="text-sm" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Oferta</p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Dominical</p>
            </div>
          </div>
          <div className="font-medium" style={{ color: '#16a34a' }}>R$ 1,450,00</div>
        </div>
        <div className="flex items-center justify-between p-2 border-b" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full" style={{ background: '#fee2e2', color: '#dc2626' }}>
              <FaArrowUp className="text-sm" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Conta de Luz</p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Energia</p>
            </div>
          </div>
          <div className="font-medium" style={{ color: '#dc2626' }}>- R$ 380,00</div>
        </div>
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full" style={{ background: '#bbf7d0', color: '#16a34a' }}>
              <FaArrowDown className="text-sm" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Doação</p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>João Batista</p>
            </div>
          </div>
          <div className="font-medium" style={{ color: '#16a34a' }}>R$ 500,00</div>
        </div>
      </div>
      <button
        className="w-full mt-4 py-2 rounded text-sm font-bold transition-colors shadow-sm"
        style={{
          background: 'var(--primary)',
          color: '#fff',
          letterSpacing: '0.5px',
          textShadow: '0 1px 2px rgba(0,0,0,0.10)'
        }}
      >
        Ver Todas
      </button>
    </div>
  );
} 