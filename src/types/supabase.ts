// Tipos gerados do Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cargos: {
        Row: {
          criado_em: string | null
          id: number
          nome: string
        }
        Insert: {
          criado_em?: string | null
          id?: number
          nome: string
        }
        Update: {
          criado_em?: string | null
          id?: number
          nome?: string
        }
        Relationships: []
      }
      grupos: {
        Row: {
          criado_em: string | null
          id: number
          nome: string
          tipo: Database["public"]["Enums"]["grupo_enum"]
        }
        Insert: {
          criado_em?: string | null
          id?: number
          nome: string
          tipo?: Database["public"]["Enums"]["grupo_enum"]
        }
        Update: {
          criado_em?: string | null
          id?: number
          nome?: string
          tipo?: Database["public"]["Enums"]["grupo_enum"]
        }
        Relationships: []
      }
      pessoas: {
        Row: {
          atualizado_em: string | null
          cargo_id: number | null
          criado_em: string | null
          data_nascimento: string | null
          email: string | null
          endereco: string | null
          foto_url: string | null
          grupo_id: number | null
          id: number
          nome: string
          observacoes: string | null
          role: Database["public"]["Enums"]["role_enum"] | null
          status: Database["public"]["Enums"]["status_membro_enum"]
          telefone: string | null
        }
        Insert: {
          atualizado_em?: string | null
          cargo_id?: number | null
          criado_em?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          foto_url?: string | null
          grupo_id?: number | null
          id?: number
          nome: string
          observacoes?: string | null
          role?: Database["public"]["Enums"]["role_enum"] | null
          status?: Database["public"]["Enums"]["status_membro_enum"]
          telefone?: string | null
        }
        Update: {
          atualizado_em?: string | null
          cargo_id?: number | null
          criado_em?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          foto_url?: string | null
          grupo_id?: number | null
          id?: number
          nome?: string
          observacoes?: string | null
          role?: Database["public"]["Enums"]["role_enum"] | null
          status?: Database["public"]["Enums"]["status_membro_enum"]
          telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pessoas_cargo_id_fkey"
            columns: ["cargo_id"]
            isOneToOne: false
            referencedRelation: "cargos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pessoas_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      grupo_enum:
        | "adultos"
        | "jovens"
        | "adolescentes"
        | "criancas"
        | "visitante"
        | "outro"
      role_enum: "admin" | "lider" | "secretario" | "tesoureiro" | "membro"
      status_membro_enum: "ativo" | "inativo" | "visitante" | "afastado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      grupo_enum: [
        "adultos",
        "jovens",
        "adolescentes",
        "criancas",
        "visitante",
        "outro",
      ],
      role_enum: ["admin", "lider", "secretario", "tesoureiro", "membro"],
      status_membro_enum: ["ativo", "inativo", "visitante", "afastado"],
    },
  },
} as const 