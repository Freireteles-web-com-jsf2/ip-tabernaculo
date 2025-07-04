import { FaChurch, FaAngleLeft, FaTachometerAlt, FaUsers, FaSitemap, FaWallet, FaWarehouse, FaCalendarAlt, FaBullhorn, FaEnvelope, FaCog, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import Image from 'next/image';
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ sidebarCollapsed, toggleSidebar }: SidebarProps) {
  const { usuario } = useAuth();
  const isAdmin = usuario?.perfil === 'admin';

  return (
    <div
      className={`sidebar fixed h-full flex flex-col z-50 transition-all duration-300 ${sidebarCollapsed ? "w-20" : "w-64"}`}
      style={{
        background: 'var(--background)',
        color: 'var(--foreground)',
        borderRight: '1px solid var(--border)',
        borderRadius: sidebarCollapsed ? '0 var(--radius) var(--radius) 0' : '0',
        boxShadow: 'var(--shadow)',
      }}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center space-x-2">
          <FaChurch className="text-2xl" style={{ color: '#facc15' }} />
          {!sidebarCollapsed && <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-sans)', color: 'var(--primary)' }}>
            
            IP-Tabernaculo
            
            </span>}
        </div>
        <button onClick={toggleSidebar} className="text-[var(--muted-foreground)] focus:outline-none">
          <FaAngleLeft className={`collapse-icon transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`} />
        </button>
      </div>
      {/* User Profile */}
      <div className="p-4 flex items-center space-x-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" width={40} height={40} className="w-10 h-10 rounded-full object-cover border" style={{ borderColor: 'var(--border)' }} />
        {!sidebarCollapsed && (
          <div>
            <p className="font-medium" style={{ fontFamily: 'var(--font-sans)', color: 'var(--foreground)' }}>Pr. João Silva</p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Pastor Sênior</p>
          </div>
        )}
      </div>
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          <div className="mb-4">
            <p className="text-xs uppercase px-2 mb-2" style={{ color: 'var(--muted-foreground)' }}>Principal</p>
            <Link href="/" className="block px-3 py-2 rounded font-medium flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>
              <FaTachometerAlt className="w-5 text-center" />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </Link>
            <Link href="/pessoas" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
              <FaUsers className="w-5 text-center" />
              {!sidebarCollapsed && <span>Membros</span>}
            </Link>
          </div>
          <div className="mb-4">
            <p className="text-xs uppercase px-2 mb-2" style={{ color: 'var(--muted-foreground)' }}>Gestão</p>
            <a href="#" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
              <FaSitemap className="w-5 text-center" />
              {!sidebarCollapsed && <span>Departamentos</span>}
            </a>
            <a href="#" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
              <FaWallet className="w-5 text-center" />
              {!sidebarCollapsed && <span>Finanças</span>}
            </a>
            <a href="#" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
              <FaWarehouse className="w-5 text-center" />
              {!sidebarCollapsed && <span>Patrimônio</span>}
            </a>
          </div>
          <div className="mb-4">
            <p className="text-xs uppercase px-2 mb-2" style={{ color: 'var(--muted-foreground)' }}>Comunicação</p>
            <a href="#" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
              <FaCalendarAlt className="w-5 text-center" />
              {!sidebarCollapsed && <span>Agenda</span>}
            </a>
            <a href="#" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
              <FaBullhorn className="w-5 text-center" />
              {!sidebarCollapsed && <span>Mural</span>}
            </a>
            <a href="#" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
              <FaEnvelope className="w-5 text-center" />
              {!sidebarCollapsed && <span>Mensagens</span>}
            </a>
          </div>
          <div className="mb-4">
            <p className="text-xs uppercase px-2 mb-2" style={{ color: 'var(--muted-foreground)' }}>Configurações</p>
            <a href="#" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
              <FaCog className="w-5 text-center" />
              {!sidebarCollapsed && <span>Sistema</span>}
            </a>
            <a href="#" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
              <FaUserShield className="w-5 text-center" />
              {!sidebarCollapsed && <span>Permissões</span>}
            </a>
            {isAdmin && (
              <>
                <Link href="/usuarios" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
                  <FaUsers className="w-5 text-center" />
                  {!sidebarCollapsed && <span>Usuários</span>}
                </Link>
                <Link href="/cargos" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
                  <FaSitemap className="w-5 text-center" />
                  {!sidebarCollapsed && <span>Cargos</span>}
                </Link>
                <Link href="/grupos" className="block px-3 py-2 rounded flex items-center space-x-2 mb-1 hover:bg-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
                  <FaWarehouse className="w-5 text-center" />
                  {!sidebarCollapsed && <span>Grupos</span>}
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      {/* Collapse Footer */}
      <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <button
          className="w-full py-2 px-3 rounded text-sm flex items-center justify-center space-x-2 transition-colors shadow"
          style={{
            background: 'var(--destructive)',
            color: 'var(--destructive-foreground)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
            border: 'none',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#dc2626')}
          onMouseOut={e => (e.currentTarget.style.background = 'var(--destructive)')}
        >
          <FaSignOutAlt />
          {!sidebarCollapsed && <span>Sair</span>}
        </button>
      </div>
    </div>
  );
} 