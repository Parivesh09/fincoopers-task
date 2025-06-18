'use client';

import { useState } from 'react';
import { mockTeams as initialTeams } from '@/lib/data';
import { Users, Folder, Pencil, Trash2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { Team } from '@/types';

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [editTeam, setEditTeam] = useState<Team | null>(null);
  const [editName, setEditName] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (team: Team) => {
    setEditTeam(team);
    setEditName(team.name);
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (!editTeam) return;
    setTeams((prev) => prev.map((t) => t.id === editTeam.id ? { ...t, name: editName } : t));
    setIsEditModalOpen(false);
    setEditTeam(null);
    setEditName('');
  };

  const handleDelete = (id: string) => {
    setTeams((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-4xl font-bold text-foreground mb-8">Teams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teams.map((team) => (
          <div key={team.id} className="bg-card border border-border rounded-lg shadow p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground flex-1">{team.name}</h2>
              <button onClick={() => handleEditClick(team)} className="p-2 rounded hover:bg-accent transition" title="Edit team"><Pencil className="h-4 w-4 text-muted-foreground" /></button>
              <button onClick={() => handleDelete(team.id)} className="p-2 rounded hover:bg-destructive/20 transition" title="Delete team"><Trash2 className="h-4 w-4 text-destructive" /></button>
            </div>
            <div>
              <h3 className="text-lg font-medium text-muted-foreground mb-1">Members:</h3>
              <div className="flex flex-wrap gap-2">
                {team.members.map((member) => (
                  <span key={member.id} className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                    {member.initials} <span className="ml-2">{member.name}</span>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-muted-foreground mb-1 mt-2">Projects:</h3>
              <div className="flex flex-wrap gap-2">
                {team.projects.map((project) => (
                  <span key={project.id} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Folder className="h-4 w-4 mr-1" />{project.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Team">
        <form onSubmit={e => { e.preventDefault(); handleEditSave(); }} className="flex flex-col gap-4">
          <label className="text-foreground font-medium">Team Name</label>
          <input
            className="border border-border rounded p-2 bg-background text-foreground"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            required
          />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded bg-muted text-muted-foreground hover:bg-muted/80">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
} 
