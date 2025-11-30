import { useState, useEffect } from 'react';
import { Users, Loader2 } from 'lucide-react';
import { ClientTeam } from '../types';
import { supabase } from '../lib/supabase';

interface TeamSelectorProps {
  selectedTeamId: string;
  onTeamSelect: (teamId: string) => void;
}

export default function TeamSelector({ selectedTeamId, onTeamSelect }: TeamSelectorProps) {
  const [teams, setTeams] = useState<ClientTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('client_teams')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (fetchError) throw fetchError;

      const formattedTeams: ClientTeam[] = (data || []).map(team => ({
        id: team.id,
        name: team.name,
        email: team.email,
        isActive: team.is_active
      }));

      setTeams(formattedTeams);

      // Auto-select first team if none selected
      if (formattedTeams.length > 0 && !selectedTeamId) {
        onTeamSelect(formattedTeams[0].id);
      }
    } catch (err: any) {
      console.error('Error fetching teams:', err);
      setError('Failed to load team members. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 border border-red-500/20">
        <p className="text-red-400 text-center">{error}</p>
        <button
          onClick={fetchTeams}
          className="mt-4 w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <p className="text-slate-400 text-center">No team members available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center mb-4">
        <Users className="w-5 h-5 text-emerald-500 mr-2" />
        <h3 className="text-lg font-semibold text-white">Select Your Account Manager</h3>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        Choose a team member who will assist you with your order and payment process.
      </p>
      <div className="space-y-3">
        {teams.map((team) => (
          <label
            key={team.id}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedTeamId === team.id
                ? 'border-emerald-500 bg-emerald-500/10'
                : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
            }`}
          >
            <input
              type="radio"
              name="team"
              value={team.id}
              checked={selectedTeamId === team.id}
              onChange={() => onTeamSelect(team.id)}
              className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
            />
            <div className="ml-3">
              <p className="text-white font-medium">{team.name}</p>
              <p className="text-slate-400 text-sm">{team.email}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}