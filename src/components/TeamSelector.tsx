import { Phone, Mail, User as UserIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ClientTeam } from '../types';

const mockTeams: ClientTeam[] = [
  {
    id: 'team_1',
    name: 'Raj Kumar',
    email: 'raj.kumar@forexeapro.com',
    isActive: true
  },
  {
    id: 'team_2',
    name: 'Priya Singh',
    email: 'priya.singh@forexeapro.com',
    isActive: true
  },
  {
    id: 'team_3',
    name: 'Amit Patel',
    email: 'amit.patel@forexeapro.com',
    isActive: true
  },
  {
    id: 'team_4',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@forexeapro.com',
    isActive: true
  },
  {
    id: 'team_5',
    name: 'Marco Rodriguez',
    email: 'marco.rodriguez@forexeapro.com',
    isActive: true
  }
];

interface TeamSelectorProps {
  selectedTeamId: string | null;
  onTeamSelect: (teamId: string) => void;
}

export default function TeamSelector({ selectedTeamId, onTeamSelect }: TeamSelectorProps) {
  const [teams, setTeams] = useState<ClientTeam[]>([]);

  useEffect(() => {
    setTeams(mockTeams.filter(team => team.isActive));
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h3 className="text-lg font-bold text-white mb-4">Assign to Client Team Member</h3>
      <p className="text-slate-400 text-sm mb-4">
        Select a team member who will call you to proceed with payment
      </p>

      <div className="space-y-3">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => onTeamSelect(team.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selectedTeamId === team.id
                ? 'bg-emerald-500/10 border-emerald-500'
                : 'bg-slate-800 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3 ${
                  selectedTeamId === team.id
                    ? 'bg-emerald-500'
                    : 'bg-slate-700'
                }`}>
                  {team.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold">{team.name}</div>
                  <div className="text-sm text-slate-400 flex items-center mt-1">
                    <Mail className="w-4 h-4 mr-1" />
                    {team.email}
                  </div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedTeamId === team.id
                  ? 'border-emerald-500 bg-emerald-500'
                  : 'border-slate-500'
              }`}>
                {selectedTeamId === team.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedTeamId && (
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <div className="flex items-start">
            <Phone className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-emerald-400 font-semibold text-sm mb-1">Next Steps</p>
              <p className="text-slate-300 text-sm">
                After placing your order, the assigned team member will call you to confirm and arrange payment via preferred method (Bank Transfer, Card, UPI, etc.)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
