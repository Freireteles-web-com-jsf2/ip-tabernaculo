import { FaTachometerAlt, FaBell, FaSearch, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { usuario, logout } = useAuth();

  return (
    <header
      className="bg-[var(--background)] p-4 flex justify-between items-center sticky top-0 z-40 shadow"
      style={{
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)',
        margin: '0.5rem',
      }}
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold flex items-center text-[var(--primary)]" style={{ fontFamily: 'var(--font-sans)' }}>
          <FaTachometerAlt className="mr-2" />
          IP-Tabernaculo de Deus
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden sm:block text-sm font-medium text-[var(--muted-foreground)]" style={{ fontFamily: 'var(--font-sans)' }}>
          {usuario?.email}
        </div>
        <div className="relative">
          <button className="text-[var(--muted-foreground)] hover:text-[var(--primary)] focus:outline-none">
            <FaBell className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-[var(--destructive)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>
        </div>
        <button className="text-[var(--muted-foreground)] hover:text-[var(--primary)] focus:outline-none">
          <FaSearch className="text-xl" />
        </button>
        <button className="text-[var(--muted-foreground)] hover:text-[var(--primary)] focus:outline-none">
          <FaCog className="text-xl" />
        </button>
        <button onClick={logout} className="text-[var(--muted-foreground)] hover:text-[var(--destructive)] focus:outline-none flex items-center space-x-1 ml-2">
          <FaSignOutAlt />
          <span className="hidden sm:inline text-xs">Sair</span>
        </button>
      </div>
    </header>
  );
} 