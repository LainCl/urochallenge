import React from 'react';
import { addDays, format, startOfWeek, isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Check, Flame } from 'lucide-react';

export const ActivityCalendar: React.FC<{
  activeDates: string[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}> = ({ activeDates, selectedDate, onSelectDate }) => {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, idx) => addDays(weekStart, idx));
  const activeSet = new Set(activeDates);

  return (
    <div className="bg-white rounded-[32px] p-5 sm:p-6 card-soft-shadow border border-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-extrabold text-[#202744]">Calendario de Actividad</h3>
          <p className="text-xs text-[#858BA1] capitalize">
            {format(selectedDate, "MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#C3F574]/60 text-[#202744]">
          <Flame className="w-3.5 h-3.5 text-[#5149B8]" />
          <span>{activeDates.length} días activos</span>
        </div>
      </div>

      {/* Horizontal pill strip inspired by "Select date" in reference mobile screen 1 */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
        {days.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const hasActivity = activeSet.has(dateKey);
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());

          let pillStyle = 'bg-[#F5F7FC] text-[#858BA1] hover:bg-slate-100';
          if (isSelected) {
            pillStyle = 'bg-[#C3F574] text-[#202744] shadow-md scale-[1.03]';
          } else if (hasActivity) {
            pillStyle = 'bg-[#5149B8] text-white';
          } else if (isToday) {
            pillStyle = 'bg-[#83D0E5]/30 text-[#202744] border border-[#5149B8]/30';
          }

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onSelectDate(day)}
              className={`py-3 px-1 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${pillStyle}`}
            >
              <span className="text-[10px] font-bold uppercase opacity-80 mb-1">
                {format(day, 'EEE', { locale: es }).slice(0, 3)}
              </span>
              <span className="text-sm sm:text-base font-extrabold">
                {format(day, 'dd')}
              </span>
              <div className="h-3.5 mt-1 flex items-center justify-center">
                {hasActivity ? (
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-[#202744] text-[#C3F574]' : 'bg-white/25 text-white'
                    }`}
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-25" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Recent active dates quick chips */}
      {activeDates.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-[#858BA1]">Días con registro:</span>
          {activeDates.slice(-5).map((dateStr) => (
            <button
              key={dateStr}
              type="button"
              onClick={() => onSelectDate(parseISO(dateStr))}
              className="px-2.5 py-1 rounded-full bg-[#F5F7FC] hover:bg-[#5149B8]/10 text-[11px] font-bold text-[#5149B8] transition cursor-pointer"
            >
              {dateStr}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
