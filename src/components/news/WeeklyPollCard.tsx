import React, { useState } from 'react';
import { WeeklyPoll } from '../../types';
import { Vote, CheckCircle2, Users, Calendar, AlertCircle } from 'lucide-react';

interface WeeklyPollCardProps {
  poll: WeeklyPoll;
  onVote: (pollId: string, optionId: string) => void;
  className?: string;
}

export const WeeklyPollCard: React.FC<WeeklyPollCardProps> = ({
  poll,
  onVote,
  className = '',
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(poll.userVotedOptionId || null);
  const [hasVoted, setHasVoted] = useState<boolean>(!!poll.userVotedOptionId);
  const [submitting, setSubmitting] = useState(false);

  const handleCastVote = () => {
    if (!selectedOption || hasVoted) return;
    setSubmitting(true);
    setTimeout(() => {
      onVote(poll.id, selectedOption);
      setHasVoted(true);
      setSubmitting(false);
    }, 400);
  };

  const totalVotesCount = poll.totalVotes + (hasVoted && !poll.userVotedOptionId ? 1 : 0);

  return (
    <div className={`bg-white border-2 border-neutral-900 shadow-md p-6 relative overflow-hidden ${className}`}>
      {/* Top Tag & Participation Badge */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-none bg-[#D71920] text-white flex items-center justify-center">
            <Vote className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-[#D71920] block">
              PARTICIPACIÓN CIUDADANA
            </span>
            <h3 className="text-sm font-black uppercase tracking-tight text-neutral-900 font-sans">
              Encuesta de la Semana
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-1">
          <Calendar className="w-3 h-3 text-neutral-400" />
          <span>Cierra: {poll.closingDate}</span>
        </div>
      </div>

      {/* Poll Question */}
      <div className="space-y-2 mb-5">
        <h4 className="text-base md:text-lg font-black text-neutral-900 leading-snug font-sans">
          {poll.question}
        </h4>
        {poll.description && (
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            {poll.description}
          </p>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {poll.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const currentVotes = option.votes + (hasVoted && isSelected && !poll.userVotedOptionId ? 1 : 0);
          const percent = totalVotesCount > 0 ? Math.round((currentVotes / totalVotesCount) * 100) : 0;

          return (
            <div
              key={option.id}
              onClick={() => {
                if (!hasVoted) setSelectedOption(option.id);
              }}
              className={`p-3 border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-[#D71920] bg-red-50/40 shadow-xs'
                  : 'border-neutral-200 hover:border-neutral-400 bg-neutral-50/50'
              }`}
            >
              {/* Progress Bar background if voted or previewing */}
              {hasVoted && (
                <div
                  className="absolute top-0 bottom-0 left-0 bg-[#D71920]/15 transition-all duration-700 pointer-events-none"
                  style={{ width: `${percent}%` }}
                />
              )}

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 flex-1">
                  <div
                    className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-[#D71920] bg-[#D71920] text-white'
                        : 'border-neutral-400 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs font-semibold text-neutral-800 leading-snug">
                    {option.text}
                  </span>
                </div>

                {hasVoted && (
                  <div className="text-right shrink-0">
                    <span className="text-sm font-black font-mono text-[#D71920] tabular-nums">
                      {percent}%
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono block">
                      {currentVotes.toLocaleString()} votos
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Vote Action & Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-200">
        <div className="flex items-center gap-2 text-xs text-neutral-600 font-mono">
          <Users className="w-3.5 h-3.5 text-neutral-400" />
          <span>{totalVotesCount.toLocaleString()} ciudadanos han votado</span>
        </div>

        {!hasVoted ? (
          <button
            onClick={handleCastVote}
            disabled={!selectedOption || submitting}
            className="px-5 py-2 bg-[#D71920] hover:bg-red-700 disabled:opacity-40 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Vote className="w-3.5 h-3.5" />
            <span>{submitting ? 'Registrando...' : 'Votar Ahora'}</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Tu voto fue computado exitosamente</span>
          </div>
        )}
      </div>
    </div>
  );
};
