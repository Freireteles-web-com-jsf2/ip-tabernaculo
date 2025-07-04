import { FaUsers, FaHandHoldingUsd, FaMoneyBillWave, FaArrowUp, FaArrowDown, FaInfoCircle, FaCalendarCheck } from "react-icons/fa";

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div
        className="highlight-card flex items-center transition-transform duration-300 hover:-translate-y-1"
        style={{
          background: 'var(--background)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
          padding: '1.25rem',
        }}
      >
        <div className="p-3 rounded-full mr-4" style={{ background: 'var(--primary)', color: '#fff', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}>
          <FaUsers className="text-xl" />
        </div>
        <div>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Total de Membros</p>
          <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>328</h3>
          <p className="text-xs mt-1" style={{ color: '#22c55e' }}>
            <FaArrowUp className="inline" /> 12% desde o mês passado
          </p>
        </div>
      </div>
      <div
        className="highlight-card flex items-center transition-transform duration-300 hover:-translate-y-1"
        style={{
          background: 'var(--background)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
          padding: '1.25rem',
        }}
      >
        <div className="p-3 rounded-full mr-4" style={{ background: '#16a34a', color: '#fff', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}>
          <FaHandHoldingUsd className="text-xl" />
        </div>
        <div>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Receitas deste mês</p>
          <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>R$ 12,450</h3>
          <p className="text-xs mt-1" style={{ color: '#22c55e' }}>
            <FaArrowUp className="inline" /> 8% desde o mês passado
          </p>
        </div>
      </div>
      <div
        className="highlight-card flex items-center transition-transform duration-300 hover:-translate-y-1"
        style={{
          background: 'var(--background)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
          padding: '1.25rem',
        }}
      >
        <div className="p-3 rounded-full mr-4" style={{ background: '#eab308', color: '#fff', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}>
          <FaMoneyBillWave className="text-xl" />
        </div>
        <div>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Despesas deste mês</p>
          <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>R$ 8,120</h3>
          <p className="text-xs mt-1" style={{ color: '#ef4444' }}>
            <FaArrowDown className="inline" /> 5% desde o mês passado
          </p>
        </div>
      </div>
      <div
        className="highlight-card flex items-center transition-transform duration-300 hover:-translate-y-1"
        style={{
          background: 'var(--background)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
          padding: '1.25rem',
        }}
      >
        <div className="p-3 rounded-full mr-4" style={{ background: '#7c3aed', color: '#fff', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}>
          <FaCalendarCheck className="text-xl" />
        </div>
        <div>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Eventos esta semana</p>
          <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>5</h3>
          <p className="text-xs mt-1" style={{ color: 'var(--primary)' }}>
            <FaInfoCircle className="inline" /> 2 eventos hoje
          </p>
        </div>
      </div>
    </div>
  );
} 