export default function UpcomingEvents() {
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
      <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)', letterSpacing: '-0.5px' }}>Próximos Eventos</h2>
      <div className="space-y-3">
        <div className="p-3 rounded border-l-4" style={{ borderLeft: '4px solid var(--primary)', background: 'var(--accent)' }}>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-base" style={{ color: '#fff', fontFamily: 'var(--font-sans)' }}>Culto de Jovens</p>
              <p className="text-xs font-medium" style={{ color: '#fff' }}>Sábado, 18:00 - 20:00</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-semibold shadow-sm" style={{ background: 'var(--primary)', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.10)' }}>Hoje</span>
          </div>
          <p className="text-sm mt-1 font-medium" style={{ color: '#fff' }}>Local: <span style={{ fontWeight: 700 }}>Salão Principal</span></p>
        </div>
        <div className="p-3 rounded border-l-4" style={{ borderLeft: '4px solid #7c3aed', background: '#7c3aed' }}>
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-base" style={{ color: '#fff', fontFamily: 'var(--font-sans)' }}>Reunião de Líderes</p>
              <p className="text-xs font-medium" style={{ color: '#fff' }}>Quarta-feira, 19:00 - 21:00</p>
            </div>
          </div>
          <p className="text-sm mt-1 font-medium" style={{ color: '#fff' }}>Local: <span style={{ fontWeight: 700 }}>Sala de Reuniões</span></p>
        </div>
        <div className="p-3 rounded border-l-4" style={{ borderLeft: '4px solid #eab308', background: '#eab308' }}>
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-base" style={{ color: '#fff', fontFamily: 'var(--font-sans)' }}>Encontro de Casais</p>
              <p className="text-xs font-medium" style={{ color: '#fff' }}>Sábado, 14:00 - 17:00</p>
            </div>
          </div>
          <p className="text-sm mt-1 font-medium" style={{ color: '#fff' }}>Local: <span style={{ fontWeight: 700 }}>Auditório</span></p>
        </div>
        <div className="p-3 rounded border-l-4" style={{ borderLeft: '4px solid #16a34a', background: '#16a34a' }}>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-base" style={{ color: '#fff', fontFamily: 'var(--font-sans)' }}>Batismo</p>
              <p className="text-xs font-medium" style={{ color: '#fff' }}>Domingo, 09:00 - 10:00</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-semibold shadow-sm" style={{ background: '#fff', color: '#16a34a', textShadow: '0 1px 2px rgba(0,0,0,0.10)' }}>Novo</span>
          </div>
          <p className="text-sm mt-1 font-medium" style={{ color: '#fff' }}>Local: <span style={{ fontWeight: 700 }}>Piscina Batismal</span></p>
        </div>
      </div>
      <button
        className="w-full mt-4 py-2 rounded text-sm font-bold transition-colors shadow-sm"
        style={{ background: 'var(--primary)', color: '#fff', letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.10)' }}
      >
        Ver Todos
      </button>
    </div>
  );
} 