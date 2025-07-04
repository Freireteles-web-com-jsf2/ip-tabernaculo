import { FaEllipsisV } from "react-icons/fa";
import Image from 'next/image';

export default function RecentMembers() {
  return (
    <div
      style={{
        background: 'var(--background)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)',
        padding: '1.25rem',
        marginBottom: '1.5rem',
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>Membros Recentes</h2>
        <button className="text-sm font-medium" style={{ color: 'var(--primary)' }}>Ver Todos</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-xs" style={{ color: 'var(--muted-foreground)', borderBottom: '1px solid var(--border)' }}>
              <th className="pb-2">Nome</th>
              <th className="pb-2">Telefone</th>
              <th className="pb-2">Data de Cadastro</th>
              <th className="pb-2">Departamento</th>
              <th className="pb-2">Status</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-[var(--muted)] transition-colors">
              <td className="py-3">
                <div className="flex items-center space-x-2">
                  <Image src="https://randomuser.me/api/portraits/women/21.jpg" alt="Member" width={32} height={32} className="w-8 h-8 rounded-full object-cover border" style={{ borderColor: 'var(--border)' }} />
                  <span style={{ color: 'var(--foreground)' }}>Juliana Almeida</span>
                </div>
              </td>
              <td style={{ color: '#fff' }}>(11) 98765-4321</td>
              <td style={{ color: 'var(--muted-foreground)' }}>15/05/2023</td>
              <td style={{ color: '#fff' }}>Louvor</td>
              <td><span className="px-2 py-1 rounded-full text-xs" style={{ background: '#bbf7d0', color: '#16a34a' }}>Ativo</span></td>
              <td className="text-right">
                <button className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-[var(--muted)] transition-colors">
              <td className="py-3">
                <div className="flex items-center space-x-2">
                  <Image src="https://randomuser.me/api/portraits/men/31.jpg" alt="Member" width={32} height={32} className="w-8 h-8 rounded-full object-cover border" style={{ borderColor: 'var(--border)' }} />
                  <span style={{ color: 'var(--foreground)' }}>Carlos Eduardo</span>
                </div>
              </td>
              <td style={{ color: '#fff' }}>(11) 98765-1234</td>
              <td style={{ color: 'var(--muted-foreground)' }}>14/05/2023</td>
              <td style={{ color: '#fff' }}>Diaconato</td>
              <td><span className="px-2 py-1 rounded-full text-xs" style={{ background: '#bbf7d0', color: '#16a34a' }}>Ativo</span></td>
              <td className="text-right">
                <button className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-[var(--muted)] transition-colors">
              <td className="py-3">
                <div className="flex items-center space-x-2">
                  <Image src="https://randomuser.me/api/portraits/women/45.jpg" alt="Member" width={32} height={32} className="w-8 h-8 rounded-full object-cover border" style={{ borderColor: 'var(--border)' }} />
                  <span style={{ color: 'var(--foreground)' }}>Patrícia Oliveira</span>
                </div>
              </td>
              <td style={{ color: '#fff' }}>(11) 98765-5678</td>
              <td style={{ color: 'var(--muted-foreground)' }}>12/05/2023</td>
              <td style={{ color: '#fff' }}>Escola Bíblica</td>
              <td><span className="px-2 py-1 rounded-full text-xs" style={{ background: '#fef9c3', color: '#eab308' }}>Novo</span></td>
              <td className="text-right">
                <button className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-[var(--muted)] transition-colors">
              <td className="py-3">
                <div className="flex items-center space-x-2">
                  <Image src="https://randomuser.me/api/portraits/men/52.jpg" alt="Member" width={32} height={32} className="w-8 h-8 rounded-full object-cover border" style={{ borderColor: 'var(--border)' }} />
                  <span style={{ color: 'var(--foreground)' }}>Marcos Vinícius</span>
                </div>
              </td>
              <td style={{ color: '#fff' }}>(11) 98765-8765</td>
              <td style={{ color: 'var(--muted-foreground)' }}>10/05/2023</td>
              <td style={{ color: '#fff' }}>Intercessão</td>
              <td><span className="px-2 py-1 rounded-full text-xs" style={{ background: '#bbf7d0', color: '#16a34a' }}>Ativo</span></td>
              <td className="text-right">
                <button className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 