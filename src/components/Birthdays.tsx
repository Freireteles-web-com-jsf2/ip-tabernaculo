import Image from 'next/image';

export default function Birthdays() {
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
      <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>Aniversariantes deste mês</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="text-center">
          <Image src="https://randomuser.me/api/portraits/women/11.jpg" alt="Member" width={64} height={64} className="w-16 h-16 rounded-full mx-auto object-cover mb-2 border" style={{ borderColor: 'var(--border)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Ana Paula</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>15/05</p>
        </div>
        <div className="text-center">
          <Image src="https://randomuser.me/api/portraits/men/42.jpg" alt="Member" width={64} height={64} className="w-16 h-16 rounded-full mx-auto object-cover mb-2 border" style={{ borderColor: 'var(--border)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Carlos Alberto</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>18/05</p>
        </div>
        <div className="text-center">
          <Image src="https://randomuser.me/api/portraits/women/33.jpg" alt="Member" width={64} height={64} className="w-16 h-16 rounded-full mx-auto object-cover mb-2 border" style={{ borderColor: 'var(--border)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Mariana Costa</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>20/05</p>
        </div>
        <div className="text-center">
          <Image src="https://randomuser.me/api/portraits/men/22.jpg" alt="Member" width={64} height={64} className="w-16 h-16 rounded-full mx-auto object-cover mb-2 border" style={{ borderColor: 'var(--border)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Roberto Santos</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>22/05</p>
        </div>
        <div className="text-center">
          <Image src="https://randomuser.me/api/portraits/women/55.jpg" alt="Member" width={64} height={64} className="w-16 h-16 rounded-full mx-auto object-cover mb-2 border" style={{ borderColor: 'var(--border)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Sandra Pereira</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>25/05</p>
        </div>
        <div className="text-center">
          <Image src="https://randomuser.me/api/portraits/men/65.jpg" alt="Member" width={64} height={64} className="w-16 h-16 rounded-full mx-auto object-cover mb-2 border" style={{ borderColor: 'var(--border)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Luís Fernando</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>28/05</p>
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