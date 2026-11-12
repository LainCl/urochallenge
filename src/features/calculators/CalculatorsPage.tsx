import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calculator,
  Activity,
  Droplets,
  ShieldCheck,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

type CalcTab = 'ipss' | 'psad' | 'renal' | 'bosniak' | 'ckdepi';

const IPSS_QUESTIONS = [
  'Sensación de vaciamiento vesical incompleto',
  'Frecuencia urinaria (< 2 horas entre micciones)',
  'Intermitencia (chorro que se detiene y reinicia)',
  'Urgencia miccional (dificultad para posponer)',
  'Chorro miccional débil',
  'Esfuerzo o pujo para iniciar la micción',
  'Nicturia (veces que se levanta a orinar de noche, 0 a 5+)',
];

const IPSS_FREQ_LABELS = [
  '0 (Nunca)',
  '1 (< 1/5 veces)',
  '2 (< mitad)',
  '3 (La mitad)',
  '4 (> mitad)',
  '5 (Casi siempre)',
];

export const CalculatorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CalcTab>('ipss');

  // 1. IPSS State
  const [ipssScores, setIpssScores] = useState<number[]>([1, 2, 1, 1, 2, 0, 2]);
  const [ipssQol, setIpssQol] = useState<number>(2);
  const ipssTotal = ipssScores.reduce((a, b) => a + b, 0);
  const ipssSeverity =
    ipssTotal <= 7
      ? { label: 'Síntomas Leves (0–7)', cls: 'bg-emerald-100 text-emerald-800', advice: 'Observación, medidas conductuales y reevaluación periódica.' }
      : ipssTotal <= 19
        ? { label: 'Síntomas Moderados (8–19)', cls: 'bg-amber-100 text-amber-800', advice: 'Considerar terapia médica (alfabloqueador ± 5-ARI si próstata > 30–40 mL).' }
        : { label: 'Síntomas Severos (20–35)', cls: 'bg-rose-100 text-rose-800', advice: 'Terapia médica combinada o evaluación quirúrgica (RTU-P / HoLEP) según RPM y complicaciones.' };

  // 2. PSAD State
  const [psaVal, setPsaVal] = useState<string>('6.2');
  const [prostVol, setProstVol] = useState<string>('48');
  const psaNum = parseFloat(psaVal) || 0;
  const volNum = parseFloat(prostVol) || 0;
  const psad = volNum > 0 ? psaNum / volNum : 0;

  // 3. R.E.N.A.L. Nephrometry Score State
  const [rPts, setRPts] = useState<1 | 2 | 3>(1);
  const [ePts, setEPts] = useState<1 | 2 | 3>(1);
  const [nPts, setNPts] = useState<1 | 2 | 3>(2);
  const [aDir, setADir] = useState<'a' | 'p' | 'x'>('p');
  const [lPts, setLPts] = useState<1 | 2 | 3>(1);
  const renalTotal = rPts + ePts + nPts + lPts;
  const renalComplexity =
    renalTotal <= 6
      ? { label: 'Complejidad Baja (4–6)', cls: 'bg-emerald-100 text-emerald-800', desc: 'Candidato ideal para nefrectomía parcial con bajo riesgo de complicaciones.' }
      : renalTotal <= 9
        ? { label: 'Complejidad Moderada (7–9)', cls: 'bg-amber-100 text-amber-800', desc: 'Nefrectomía parcial factible con experiencia quirúrgica y planificación vascular.' }
        : { label: 'Complejidad Alta (10–12)', cls: 'bg-rose-100 text-rose-800', desc: 'Mayor riesgo de isquemia prolongada o conversión; evaluar nefrectomía parcial experta vs radical.' };

  // 4. Bosniak 2019 Selector
  const [bosniakClass, setBosniakClass] = useState<'I' | 'II' | 'IIF' | 'III' | 'IV'>('IIF');
  const bosniakInfo: Record<
    'I' | 'II' | 'IIF' | 'III' | 'IV',
    { title: string; criteria: string; malignancy: string; conduct: string; badgeCls: string }
  > = {
    I: {
      title: 'Bosniak I — Quiste simple benigno',
      criteria: 'Pared delgada imperceptible (≤ 2 mm), contenido homogéneo de densidad agua (-9 a +20 UH), sin septos, calcificaciones ni realce.',
      malignancy: '~0% malignidad',
      conduct: 'No requiere seguimiento ni tratamiento.',
      badgeCls: 'bg-emerald-100 text-emerald-800',
    },
    II: {
      title: 'Bosniak II — Quiste mínimamente complejo benigno',
      criteria: 'Hasta 3 septos delgados (≤ 2 mm) sin realce mensurable o calcificación fina; o quiste hiperdenso homogéneo ≤ 3 cm sin realce.',
      malignancy: '< 1% malignidad',
      conduct: 'No requiere seguimiento.',
      badgeCls: 'bg-emerald-100 text-emerald-800',
    },
    IIF: {
      title: 'Bosniak IIF — Quiste complejo para seguimiento ("Follow-up")',
      criteria: 'Múltiples septos delgados (≥ 4) con mínimo realce percibido o leve engrosamiento liso (3 mm), o quiste hiperdenso > 3 cm sin realce.',
      malignancy: '~5–10% malignidad',
      conduct: 'Seguimiento seriado con TC/RM (ej. 6 y 12 meses, luego anual hasta 5 años).',
      badgeCls: 'bg-amber-100 text-amber-800',
    },
    III: {
      title: 'Bosniak III — Quiste indeterminado',
      criteria: 'Pared o septos engrosados (≥ 4 mm) o irregulares con realce mensurable, sin nódulo mural definido.',
      malignancy: '~50% malignidad',
      conduct: 'Resección quirúrgica (nefrectomía parcial si factible) o vigilancia activa seleccionada en pacientes frágiles.',
      badgeCls: 'bg-orange-100 text-orange-800',
    },
    IV: {
      title: 'Bosniak IV — Masa quística maligna',
      criteria: 'Componente sólido o nódulo mural con realce vascular evidente (≥ 4 mm de protrusión obtusa o cualquier nódulo con márgenes agudos).',
      malignancy: '~85–90% malignidad',
      conduct: 'Tratamiento quirúrgico oncológico (nefrectomía parcial o radical según estadío).',
      badgeCls: 'bg-rose-100 text-rose-800',
    },
  };

  // 5. CKD-EPI 2021 (Race-free) eGFR
  const [crVal, setCrVal] = useState<string>('1.1');
  const [ageVal, setAgeVal] = useState<string>('62');
  const [sex, setSex] = useState<'M' | 'F'>('M');
  const cr = Math.max(0.2, parseFloat(crVal) || 1.0);
  const age = Math.max(18, Math.min(110, parseFloat(ageVal) || 60));
  const kappa = sex === 'F' ? 0.7 : 0.9;
  const alpha = sex === 'F' ? -0.241 : -0.302;
  const sexFactor = sex === 'F' ? 1.012 : 1.0;
  const egfr = Math.round(
    142 *
      Math.pow(Math.min(cr / kappa, 1), alpha) *
      Math.pow(Math.max(cr / kappa, 1), -1.2) *
      Math.pow(0.9938, age) *
      sexFactor
  );
  const kdigoStage =
    egfr >= 90
      ? { stage: 'G1 (Normal o alto ≥ 90)', cls: 'bg-emerald-100 text-emerald-800' }
      : egfr >= 60
        ? { stage: 'G2 (Levemente disminuida 60–89)', cls: 'bg-sky-100 text-sky-800' }
        : egfr >= 45
          ? { stage: 'G3a (Leve a moderada 45–59)', cls: 'bg-amber-100 text-amber-800' }
          : egfr >= 30
            ? { stage: 'G3b (Moderada a severa 30–44)', cls: 'bg-orange-100 text-orange-800' }
            : egfr >= 15
              ? { stage: 'G4 (Severamente disminuida 15–29)', cls: 'bg-rose-100 text-rose-800' }
              : { stage: 'G5 (Falla renal < 15)', cls: 'bg-rose-200 text-rose-900' };

  const tabs: { id: CalcTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'ipss', label: 'IPSS (HPB)', icon: Activity },
    { id: 'psad', label: 'Densidad APE', icon: Sparkles },
    { id: 'renal', label: 'Score R.E.N.A.L.', icon: ShieldCheck },
    { id: 'bosniak', label: 'Bosniak 2019', icon: Droplets },
    { id: 'ckdepi', label: 'TFG (CKD-EPI)', icon: Calculator },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/app')}
          className="w-10 h-10 rounded-full bg-white card-soft-shadow flex items-center justify-center text-[#202744] hover:text-[#5149B8] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block">
            Herramientas de Práctica Clínica
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#202744]">
            Calculadoras y Escalas Urológicas
          </h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-3xl card-soft-shadow border border-white">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition cursor-pointer ${
                active
                  ? 'bg-[#5149B8] text-white shadow-sm'
                  : 'text-[#202744]/80 hover:bg-[#F5F7FC]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. IPSS */}
      {activeTab === 'ipss' && (
        <section className="bg-white rounded-[32px] p-6 sm:p-8 card-soft-shadow border border-white space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#202744]">
                Cuestionario IPSS (International Prostate Symptom Score)
              </h2>
              <p className="text-xs text-[#858BA1]">
                Evalúa síntomas del tracto urinario inferior (STUI/LUTS) durante el último mes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIpssScores([0, 0, 0, 0, 0, 0, 0]);
                setIpssQol(0);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#F5F7FC] text-xs font-bold text-[#5149B8] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
            </button>
          </div>

          <div className="space-y-4">
            {IPSS_QUESTIONS.map((qText, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F5F7FC] space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-bold text-[#202744]">
                    {idx + 1}. {qText}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-[#5149B8] text-xs font-black">
                    {ipssScores[idx]} pts
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {[0, 1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() =>
                        setIpssScores((prev) => prev.map((s, i) => (i === idx ? val : s)))
                      }
                      className={`py-2 px-2 rounded-xl text-meta font-extrabold transition cursor-pointer ${
                        ipssScores[idx] === val
                          ? 'bg-[#5149B8] text-white shadow-xs'
                          : 'bg-white text-[#202744] hover:bg-[#5149B8]/10'
                      }`}
                    >
                      {idx === 6 ? `${val}${val === 5 ? '+' : ''} veces` : IPSS_FREQ_LABELS[val]}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="p-4 rounded-2xl bg-[#F5F7FC] space-y-2">
              <span className="text-xs sm:text-sm font-bold text-[#202744] block">
                Calidad de vida (QoL): Si tuviera que pasar el resto de su vida con sus síntomas actuales, ¿cómo se sentiría?
              </span>
              <div className="grid grid-cols-7 gap-1.5">
                {[0, 1, 2, 3, 4, 5, 6].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setIpssQol(val)}
                    className={`py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      ipssQol === val
                        ? 'bg-[#202744] text-[#C3F574]'
                        : 'bg-white text-[#202744] hover:bg-slate-100'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#F5F7FC] border border-[#5149B8]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block">
                Resultado IPSS
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-[#202744]">{ipssTotal} / 35</span>
                <span className="text-xs font-bold text-[#858BA1]">• QoL: {ipssQol}/6</span>
              </div>
              <p className="text-xs text-[#202744] mt-1">{ipssSeverity.advice}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-xs font-extrabold shrink-0 ${ipssSeverity.cls}`}>
              {ipssSeverity.label}
            </span>
          </div>
        </section>
      )}

      {/* 2. PSAD */}
      {activeTab === 'psad' && (
        <section className="bg-white rounded-[32px] p-6 sm:p-8 card-soft-shadow border border-white space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#202744]">
              Densidad de Antígeno Prostático Específico (PSAD)
            </h2>
            <p className="text-xs text-[#858BA1]">
              Útil para estratificar riesgo en lesiones PI-RADS 3–4 y candidatos a vigilancia activa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-[#202744] mb-1.5">
                APE Total (ng/mL)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={psaVal}
                onChange={(e) => setPsaVal(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm font-bold text-[#202744]"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-[#202744] mb-1.5">
                Volumen Prostático por RM o Eco (mL / cc)
              </label>
              <input
                type="number"
                step="1"
                min="1"
                value={prostVol}
                onChange={(e) => setProstVol(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm font-bold text-[#202744]"
              />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#F5F7FC] border border-[#5149B8]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block">
                PSAD Calculado
              </span>
              <span className="text-3xl font-black text-[#202744] block mt-0.5">
                {psad.toFixed(2)} ng/mL/cc
              </span>
              <p className="text-xs text-[#858BA1] mt-1">
                {psad >= 0.15
                  ? 'PSAD ≥ 0,15 ng/mL/cc: mayor probabilidad de cáncer clínicamente significativo; apoya realizar biopsia en PI-RADS 3.'
                  : 'PSAD < 0,15 ng/mL/cc: menor riesgo relativo; en PI-RADS ≤ 3 permite considerar seguimiento con APE.'}
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-xs font-extrabold shrink-0 ${
                psad >= 0.15 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {psad >= 0.15 ? 'Elevada (≥ 0,15)' : 'Baja (< 0,15)'}
            </span>
          </div>
        </section>
      )}

      {/* 3. R.E.N.A.L. SCORE */}
      {activeTab === 'renal' && (
        <section className="bg-white rounded-[32px] p-6 sm:p-8 card-soft-shadow border border-white space-y-5">
          <div>
            <h2 className="text-lg font-extrabold text-[#202744]">
              Score de Nefrometría R.E.N.A.L. (Kutikov & Uzzo)
            </h2>
            <p className="text-xs text-[#858BA1]">
              Estandariza la complejidad anatómica de masas renales para planificar nefrectomía parcial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F5F7FC] space-y-2">
              <span className="text-xs font-extrabold text-[#202744] block">
                R — Diámetro máximo (Radius)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {([
                  [1, '≤ 4 cm (1 pt)'],
                  [2, '> 4 a < 7 cm (2 pts)'],
                  [3, '≥ 7 cm (3 pts)'],
                ] as const).map(([v, lbl]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setRPts(v)}
                    className={`p-2 rounded-xl text-meta font-extrabold cursor-pointer ${
                      rPts === v ? 'bg-[#5149B8] text-white' : 'bg-white text-[#202744]'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F7FC] space-y-2">
              <span className="text-xs font-extrabold text-[#202744] block">
                E — Componente Exofítico / Endofítico
              </span>
              <div className="grid grid-cols-3 gap-2">
                {([
                  [1, '≥ 50% exofítico (1)'],
                  [2, '< 50% exofítico (2)'],
                  [3, '100% endofítico (3)'],
                ] as const).map(([v, lbl]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setEPts(v)}
                    className={`p-2 rounded-xl text-meta font-extrabold cursor-pointer ${
                      ePts === v ? 'bg-[#5149B8] text-white' : 'bg-white text-[#202744]'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F7FC] space-y-2">
              <span className="text-xs font-extrabold text-[#202744] block">
                N — Cercanía al sistema colector / seno (Nearness)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {([
                  [1, '≥ 7 mm (1 pt)'],
                  [2, '> 4 a < 7 mm (2)'],
                  [3, '≤ 4 mm (3 pts)'],
                ] as const).map(([v, lbl]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setNPts(v)}
                    className={`p-2 rounded-xl text-meta font-extrabold cursor-pointer ${
                      nPts === v ? 'bg-[#5149B8] text-white' : 'bg-white text-[#202744]'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F7FC] space-y-2">
              <span className="text-xs font-extrabold text-[#202744] block">
                L — Localización respecto a líneas polares
              </span>
              <div className="grid grid-cols-3 gap-2">
                {([
                  [1, 'Sobre/bajo línea polar (1)'],
                  [2, 'Cruza línea polar (2)'],
                  [3, '>50% entre líneas / axial (3)'],
                ] as const).map(([v, lbl]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setLPts(v)}
                    className={`p-2 rounded-xl text-meta font-extrabold cursor-pointer ${
                      lPts === v ? 'bg-[#5149B8] text-white' : 'bg-white text-[#202744]'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F7FC] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-extrabold text-[#202744]">
              A — Descriptivo Anterior (a) / Posterior (p) / Indeterminado (x)
            </span>
            <div className="flex gap-2">
              {(['a', 'p', 'x'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setADir(d)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-extrabold uppercase cursor-pointer ${
                    aDir === d ? 'bg-[#202744] text-[#C3F574]' : 'bg-white text-[#202744]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#F5F7FC] border border-[#5149B8]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block">
                Puntaje R.E.N.A.L. Total
              </span>
              <span className="text-3xl font-black text-[#202744] block mt-0.5">
                {renalTotal}
                {aDir}
              </span>
              <p className="text-xs text-[#858BA1] mt-1">{renalComplexity.desc}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-xs font-extrabold shrink-0 ${renalComplexity.cls}`}>
              {renalComplexity.label}
            </span>
          </div>
        </section>
      )}

      {/* 4. BOSNIAK */}
      {activeTab === 'bosniak' && (
        <section className="bg-white rounded-[32px] p-6 sm:p-8 card-soft-shadow border border-white space-y-5">
          <div>
            <h2 className="text-lg font-extrabold text-[#202744]">
              Clasificación de Bosniak (Actualización 2019) para Masas Renales Quísticas
            </h2>
            <p className="text-xs text-[#858BA1]">
              Selecciona la categoría imagenológica para revisar criterios, riesgo de malignidad y conducta.
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {(['I', 'II', 'IIF', 'III', 'IV'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setBosniakClass(cat)}
                className={`py-3 rounded-2xl text-sm font-black transition cursor-pointer ${
                  bosniakClass === cat
                    ? 'bg-[#5149B8] text-white shadow-md'
                    : 'bg-[#F5F7FC] text-[#202744] hover:bg-[#5149B8]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="p-5 rounded-3xl bg-[#F5F7FC] border border-[#5149B8]/20 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-extrabold text-[#202744]">
                {bosniakInfo[bosniakClass].title}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold ${bosniakInfo[bosniakClass].badgeCls}`}
              >
                {bosniakInfo[bosniakClass].malignancy}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#202744] leading-relaxed">
              <strong className="text-[#5149B8]">Criterios TC/RM:</strong>{' '}
              {bosniakInfo[bosniakClass].criteria}
            </p>
            <p className="text-xs sm:text-sm text-[#202744] leading-relaxed">
              <strong className="text-[#5149B8]">Conducta recomendada:</strong>{' '}
              {bosniakInfo[bosniakClass].conduct}
            </p>
          </div>
        </section>
      )}

      {/* 5. CKD-EPI 2021 */}
      {activeTab === 'ckdepi' && (
        <section className="bg-white rounded-[32px] p-6 sm:p-8 card-soft-shadow border border-white space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#202744]">
              Tasa de Filtración Glomerular Estimada (CKD-EPI 2021 sin raza)
            </h2>
            <p className="text-xs text-[#858BA1]">
              Estimación rápida preoperatoria (ej. planificación de nefrectomía o uso de contraste).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-[#202744] mb-1.5">
                Creatinina Sérica (mg/dL)
              </label>
              <input
                type="number"
                step="0.05"
                min="0.2"
                value={crVal}
                onChange={(e) => setCrVal(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm font-bold text-[#202744]"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-[#202744] mb-1.5">
                Edad (años)
              </label>
              <input
                type="number"
                min="18"
                max="110"
                value={ageVal}
                onChange={(e) => setAgeVal(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm font-bold text-[#202744]"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-[#202744] mb-1.5">Sexo</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSex('M')}
                  className={`py-3 rounded-2xl text-xs font-extrabold cursor-pointer ${
                    sex === 'M' ? 'bg-[#5149B8] text-white' : 'bg-[#F5F7FC] text-[#202744]'
                  }`}
                >
                  Masculino
                </button>
                <button
                  type="button"
                  onClick={() => setSex('F')}
                  className={`py-3 rounded-2xl text-xs font-extrabold cursor-pointer ${
                    sex === 'F' ? 'bg-[#5149B8] text-white' : 'bg-[#F5F7FC] text-[#202744]'
                  }`}
                >
                  Femenino
                </button>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#F5F7FC] border border-[#5149B8]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block">
                TFG Estimada
              </span>
              <span className="text-3xl font-black text-[#202744] block mt-0.5">
                {egfr} mL/min/1,73 m²
              </span>
            </div>
            <span className={`px-4 py-2 rounded-full text-xs font-extrabold shrink-0 ${kdigoStage.cls}`}>
              {kdigoStage.stage}
            </span>
          </div>
        </section>
      )}
    </div>
  );
};
