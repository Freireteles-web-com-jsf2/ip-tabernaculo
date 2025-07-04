export default function FinanceChart() {
  return (
    <div
      className="lg:col-span-2"
      style={{
        background: 'var(--background)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)',
        padding: '1.25rem',
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>Desempenho Financeiro</h2>
        <select
          className="text-sm rounded px-2 py-1"
          style={{
            border: '1px solid var(--border)',
            background: 'var(--muted)',
            color: 'var(--foreground)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <option>Últimos 6 meses</option>
          <option>Este ano</option>
          <option>Último ano</option>
        </select>
      </div>
      <div
        className="h-72 w-full rounded flex items-end justify-around py-4"
        style={{ background: 'var(--muted)' }}
      >
        <div className="w-8 rounded-t" style={{ background: 'var(--primary)', height: '40%' }}></div>
        <div className="w-8 rounded-t" style={{ background: 'var(--primary)', height: '60%' }}></div>
        <div className="w-8 rounded-t" style={{ background: 'var(--primary)', height: '80%' }}></div>
        <div className="w-8 rounded-t" style={{ background: 'var(--primary)', height: '45%' }}></div>
        <div className="w-8 rounded-t" style={{ background: '#16a34a', height: '75%' }}></div>
        <div className="w-8 rounded-t" style={{ background: '#16a34a', height: '60%' }}></div>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ background: 'var(--primary)' }}></div>
          <span className="text-xs" style={{ color: 'var(--foreground)' }}>Receitas</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ background: '#16a34a' }}></div>
          <span className="text-xs" style={{ color: 'var(--foreground)' }}>Despesas</span>
        </div>
      </div>
    </div>
  );
} 