"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Usuario {
  perfil: string;
  email: string;
}

interface AuthContextProps {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  usuario: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Carregar usuário do localStorage apenas no client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("usuario");
      if (user) setUsuario(JSON.parse(user));
      setCarregando(false);
    }
  }, []);

  // Proteger rotas (exceto login e recuperar-senha)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rotasPublicas = ["/login", "/recuperar-senha", "/registrar"];
    const user = localStorage.getItem("usuario");
    if (!rotasPublicas.includes(pathname) && !user) {
      router.push("/login");
    }
    if (rotasPublicas.includes(pathname) && user) {
      router.push("/");
    }
  }, [pathname, router]);

  function login(usuario: Usuario) {
    setUsuario(usuario);
    if (typeof window !== "undefined") {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    }
  }

  function logout() {
    setUsuario(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("usuario");
    }
    router.push("/login");
  }

  if (carregando) return null;

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 