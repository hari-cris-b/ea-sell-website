import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { CheckCircle2, XCircle, Database, Users, ShoppingCart } from 'lucide-react';

interface TableCheck {
  name: string;
  exists: boolean;
  count: number;
}

export default function DatabaseStatus() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [tables, setTables] = useState<TableCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkDatabase();
  }, []);

  const checkDatabase = async () => {
    setIsLoading(true);
    setIsConfigured(isSupabaseConfigured());

    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    try {
      const tableChecks: TableCheck[] = [];

      // Check customer_users table
      const { data: users, error: usersError } = await supabase
        .from('customer_users')
        .select('id', { count: 'exact', head: true });
      
      tableChecks.push({
        name: 'customer_users',
        exists: !usersError,
        count: users?.length || 0
      });

      // Check client_teams table
      const { data: teams, error: teamsError } = await supabase
        .from('client_teams')
        .select('id', { count: 'exact', head: true });
      
      tableChecks.push({
        name: 'client_teams',
        exists: !teamsError,
        count: teams?.length || 0
      });

      // Check orders table
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('id', { count: 'exact', head: true });
      
      tableChecks.push({
        name: 'orders',
        exists: !ordersError,
        count: orders?.length || 0
      });

      setTables(tableChecks);
    } catch (error) {
      console.error('Database check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (tableName: string) => {
    switch (tableName) {
      case 'customer_users':
        return <Users className="w-5 h-5" />;
      case 'client_teams':
        return <Users className="w-5 h-5" />;
      case 'orders':
        return <ShoppingCart className="w-5 h-5" />;
      default:
        return <Database className="w-5 h-5" />;
    }
  };

  if (!isConfigured) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
        <div className="flex items-center">
          <XCircle className="w-5 h-5 text-red-400 mr-2" />
          <p className="text-red-400 font-medium">Supabase not configured</p>
        </div>
        <p className="text-red-300 text-sm mt-2">
          Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <p className="text-slate-400">Checking database connection...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Database className="w-5 h-5 text-emerald-500 mr-2" />
        <h3 className="text-white font-semibold">Database Status</h3>
      </div>
      <div className="space-y-2">
        {tables.map((table) => (
          <div
            key={table.name}
            className="flex items-center justify-between p-3 bg-slate-900 rounded-lg"
          >
            <div className="flex items-center">
              {getIcon(table.name)}
              <span className="ml-2 text-slate-300">{table.name}</span>
            </div>
            <div className="flex items-center">
              {table.exists ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                  <span className="text-emerald-400 text-sm">{table.count} records</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-red-400 text-sm">Not found</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={checkDatabase}
        className="mt-4 w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
      >
        Refresh Status
      </button>
    </div>
  );
}
