export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      exchange_configs: {
        Row: {
          api_key_encrypted: string
          api_secret_encrypted: string
          created_at: string | null
          exchange: string
          id: string
          is_testnet: boolean | null
          last_verified_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          api_key_encrypted: string
          api_secret_encrypted: string
          created_at?: string | null
          exchange?: string
          id?: string
          is_testnet?: boolean | null
          last_verified_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          api_key_encrypted?: string
          api_secret_encrypted?: string
          created_at?: string | null
          exchange?: string
          id?: string
          is_testnet?: boolean | null
          last_verified_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exchange_configs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_stats: {
        Row: {
          created_at: string | null
          date: string
          id: string
          losing_trades: number | null
          max_drawdown: number | null
          total_pnl: number | null
          total_pnl_percent: number | null
          total_trades: number | null
          user_id: string
          winning_trades: number | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          losing_trades?: number | null
          max_drawdown?: number | null
          total_pnl?: number | null
          total_pnl_percent?: number | null
          total_trades?: number | null
          user_id: string
          winning_trades?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          losing_trades?: number | null
          max_drawdown?: number | null
          total_pnl?: number | null
          total_pnl_percent?: number | null
          total_trades?: number | null
          user_id?: string
          winning_trades?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_verified: boolean | null
          profit_factor: number | null
          role: string
          total_signals: number | null
          total_subscribers: number | null
          updated_at: string | null
          win_rate: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          is_verified?: boolean | null
          profit_factor?: number | null
          role?: string
          total_signals?: number | null
          total_subscribers?: number | null
          updated_at?: string | null
          win_rate?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          profit_factor?: number | null
          role?: string
          total_signals?: number | null
          total_subscribers?: number | null
          updated_at?: string | null
          win_rate?: number | null
        }
        Relationships: []
      }
      signals: {
        Row: {
          closed_at: string | null
          created_at: string | null
          entry_price: number | null
          id: string
          leverage: number | null
          notes: string | null
          order_type: string
          pnl_percent: number | null
          provider_id: string
          result: string | null
          risk_reward_ratio: number | null
          side: string
          status: string | null
          stop_loss: number | null
          symbol: string
          take_profit_1: number | null
          take_profit_2: number | null
          take_profit_3: number | null
          updated_at: string | null
        }
        Insert: {
          closed_at?: string | null
          created_at?: string | null
          entry_price?: number | null
          id?: string
          leverage?: number | null
          notes?: string | null
          order_type?: string
          pnl_percent?: number | null
          provider_id: string
          result?: string | null
          risk_reward_ratio?: number | null
          side: string
          status?: string | null
          stop_loss?: number | null
          symbol: string
          take_profit_1?: number | null
          take_profit_2?: number | null
          take_profit_3?: number | null
          updated_at?: string | null
        }
        Update: {
          closed_at?: string | null
          created_at?: string | null
          entry_price?: number | null
          id?: string
          leverage?: number | null
          notes?: string | null
          order_type?: string
          pnl_percent?: number | null
          provider_id?: string
          result?: string | null
          risk_reward_ratio?: number | null
          side?: string
          status?: string | null
          stop_loss?: number | null
          symbol?: string
          take_profit_1?: number | null
          take_profit_2?: number | null
          take_profit_3?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "signals_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          auto_trade: boolean | null
          created_at: string | null
          expires_at: string | null
          id: string
          provider_id: string
          status: string | null
          subscription_type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_trade?: boolean | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          provider_id: string
          status?: string | null
          subscription_type?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_trade?: boolean | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          provider_id?: string
          status?: string | null
          subscription_type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trade_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          exchange: string
          exchange_order_id: string | null
          exchange_response: Json | null
          id: string
          order_type: string
          price: number | null
          quantity: number
          side: string
          signal_id: string | null
          status: string
          symbol: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          exchange: string
          exchange_order_id?: string | null
          exchange_response?: Json | null
          id?: string
          order_type: string
          price?: number | null
          quantity: number
          side: string
          signal_id?: string | null
          status: string
          symbol: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          exchange?: string
          exchange_order_id?: string | null
          exchange_response?: Json | null
          id?: string
          order_type?: string
          price?: number | null
          quantity?: number
          side?: string
          signal_id?: string | null
          status?: string
          symbol?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trade_logs_signal_id_fkey"
            columns: ["signal_id"]
            isOneToOne: false
            referencedRelation: "signals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trade_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trading_params: {
        Row: {
          auto_trade_enabled: boolean | null
          created_at: string | null
          execution_type: string | null
          fixed_position_size: number | null
          id: string
          max_drawdown: number | null
          max_trades_per_day: number | null
          position_size_type: string | null
          risk_per_trade: number | null
          updated_at: string | null
          use_stop_loss: boolean | null
          use_take_profit: boolean | null
          user_id: string
        }
        Insert: {
          auto_trade_enabled?: boolean | null
          created_at?: string | null
          execution_type?: string | null
          fixed_position_size?: number | null
          id?: string
          max_drawdown?: number | null
          max_trades_per_day?: number | null
          position_size_type?: string | null
          risk_per_trade?: number | null
          updated_at?: string | null
          use_stop_loss?: boolean | null
          use_take_profit?: boolean | null
          user_id: string
        }
        Update: {
          auto_trade_enabled?: boolean | null
          created_at?: string | null
          execution_type?: string | null
          fixed_position_size?: number | null
          id?: string
          max_drawdown?: number | null
          max_trades_per_day?: number | null
          position_size_type?: string | null
          risk_per_trade?: number | null
          updated_at?: string | null
          use_stop_loss?: boolean | null
          use_take_profit?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trading_params_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_providers: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          id: string
          provider_description: string | null
          provider_id: string
          provider_name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          provider_description?: string | null
          provider_id: string
          provider_name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          provider_description?: string | null
          provider_id?: string
          provider_name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_signals: {
        Row: {
          created_at: string | null
          error_message: string | null
          exchange_order_id: string | null
          executed_at: string | null
          executed_price: number | null
          executed_quantity: number | null
          execution_status: string | null
          id: string
          pnl: number | null
          pnl_percent: number | null
          signal_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          exchange_order_id?: string | null
          executed_at?: string | null
          executed_price?: number | null
          executed_quantity?: number | null
          execution_status?: string | null
          id?: string
          pnl?: number | null
          pnl_percent?: number | null
          signal_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          exchange_order_id?: string | null
          executed_at?: string | null
          executed_price?: number | null
          executed_quantity?: number | null
          execution_status?: string | null
          id?: string
          pnl?: number | null
          pnl_percent?: number | null
          signal_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_signals_signal_id_fkey"
            columns: ["signal_id"]
            isOneToOne: false
            referencedRelation: "signals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_signals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_subscriber_count: {
        Args: { p_provider_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
