import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Stethoscope,
  Sparkles,
  ShieldCheck,
  UserCheck,
  UserPlus,
  LogIn,
  ArrowRight,
  Award,
  BookOpenCheck,
  Clock,
  Users,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';

export const LoginPage: React.FC = () => {
  const { loginAsDemo, loginWithCredentials, isDemoMode } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const allProfiles = uroRepository.getAllProfiles();
  const customAccounts = allProfiles.filter(
    (p) => p.id !== 'user-demo-01' && p.id !== 'admin-demo-01'
  );

  const handleQuickDemo = (role: 'user' | 'admin') => {
    loginAsDemo(role);
    navigate(role === 'admin' ? '/admin' : '/app');
  };

  const handleSelectAccount = (accountEmail: string) => {
    setEmail(accountEmail);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError('Por favor ingresa tu correo electrónico.');
      return;
    }
    try {
      const logged = loginWithCredentials(email, password);
      navigate(logged.role === 'admin' ? '/admin' : '/app');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión.');
    }
  };

  return (
    <div className="min-h-screen bg-mesh-violet flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-[36px] p-7 sm:p-9 card-soft-shadow border border-white">
        {/* Top Brand & Mode Switcher */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl card-hero-violet flex items-center justify-center text-white shadow-md">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#202744]">
                Uro<span className="text-[#5149B8]">Challenge</span>
              </h1>
              <span className="text-xs font-semibold text-[#858BA1]">
                Plataforma de Aprendizaje Urológico
              </span>
            </div>
          </div>
          <Link to="/onboarding" className="text-xs font-bold text-[#5149B8] hover:underline">
            Bienvenida
          </Link>
        </div>

        {/* Prominent Auth Tabs: Iniciar Sesión / Crear Nueva Cuenta */}
        <div className="grid grid-cols-2 gap-1.5 bg-[#F5F7FC] p-1.5 rounded-2xl mb-6 border border-slate-200/70">
          <div className="py-2.5 px-3 rounded-xl bg-[#5149B8] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm">
            <LogIn className="w-3.5 h-3.5" />
            <span>Iniciar Sesión</span>
          </div>
          <Link
            to="/register"
            className="py-2.5 px-3 rounded-xl text-[#202744] hover:bg-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#5149B8]" />
            <span>Crear Nueva Cuenta</span>
          </Link>
        </div>

        <h2 className="text-2xl font-extrabold text-[#202744] mb-1">Bienvenido de nuevo</h2>
        <p className="text-xs text-[#858BA1] mb-5 leading-relaxed">
          Ingresa con tu correo electrónico registrado o crea una cuenta nueva para guardar tu progreso y nivel RPG.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1.5">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu.correo@universidad.edu"
              className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744] focus:outline-none focus:border-[#5149B8]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744] focus:outline-none focus:border-[#5149B8]"
            />
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-red-50 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/25 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Iniciar Sesión</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Registered Custom Accounts on this device */}
        {customAccounts.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#5149B8] mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Cuentas creadas en este dispositivo ({customAccounts.length})</span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {customAccounts.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleSelectAccount(acc.email)}
                  className="w-full p-2.5 rounded-2xl bg-[#F5F7FC] hover:bg-[#5149B8]/10 border border-slate-200/70 text-left flex items-center justify-between transition cursor-pointer"
                >
                  <div className="min-w-0">
                    <span className="text-xs font-extrabold text-[#202744] block truncate">
                      {acc.display_name}
                    </span>
                    <span className="text-[11px] text-[#858BA1] block truncate">{acc.email}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#5149B8] border border-[#5149B8]/20 shrink-0">
                    Seleccionar
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Instant Demo Access Cards */}
        {isDemoMode && (
          <div className="bg-[#F5F7FC] rounded-3xl p-4 mt-5 border border-[#5149B8]/15 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5149B8]">
                Cuentas de Muestra (Modo Demo)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#C3F574] text-[#202744] text-[10px] font-extrabold">
                1 Clic
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('user')}
                className="p-3 rounded-2xl bg-white hover:bg-[#5149B8] hover:text-white text-[#202744] border border-slate-200/80 text-left transition group cursor-pointer"
              >
                <div className="flex items-center gap-2 font-extrabold text-xs mb-0.5">
                  <UserCheck className="w-4 h-4 text-[#5149B8] group-hover:text-[#C3F574]" />
                  <span>Usuario Muestra</span>
                </div>
                <span className="text-[11px] opacity-75 block truncate">Dra. Sofía Mendoza</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="p-3 rounded-2xl bg-white hover:bg-[#202744] hover:text-white text-[#202744] border border-slate-200/80 text-left transition group cursor-pointer"
              >
                <div className="flex items-center gap-2 font-extrabold text-xs mb-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#5149B8] group-hover:text-[#83D0E5]" />
                  <span>Admin Muestra</span>
                </div>
                <span className="text-[11px] opacity-75 block truncate">Dr. Carlos Valdivia</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-[#858BA1]">
          ¿Eres nuevo en UroChallenge?{' '}
          <Link to="/register" className="font-extrabold text-[#5149B8] hover:underline">
            Crear nueva cuenta académica
          </Link>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const { registerNewUser } = useApp();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [specialty, setSpecialty] = useState('Residente de Urología • R1');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!displayName.trim() || !email.trim()) {
      setError('Por favor completa tu nombre visible y correo electrónico.');
      return;
    }
    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    try {
      registerNewUser(displayName, email, specialty, password);
      navigate('/onboarding');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar la cuenta.');
    }
  };

  return (
    <div className="min-h-screen bg-mesh-violet flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-[36px] p-7 sm:p-9 card-soft-shadow border border-white">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl card-hero-violet flex items-center justify-center text-white">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-[#202744]">Crear Nueva Cuenta</h1>
            <p className="text-xs text-[#858BA1]">Comienza desde Nivel I — Aprendiz (0 XP)</p>
          </div>
        </div>

        {/* Prominent Auth Tabs */}
        <div className="grid grid-cols-2 gap-1.5 bg-[#F5F7FC] p-1.5 rounded-2xl mb-6 border border-slate-200/70">
          <Link
            to="/login"
            className="py-2.5 px-3 rounded-xl text-[#202744] hover:bg-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition"
          >
            <LogIn className="w-3.5 h-3.5 text-[#5149B8]" />
            <span>Iniciar Sesión</span>
          </Link>
          <div className="py-2.5 px-3 rounded-xl bg-[#5149B8] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Crear Nueva Cuenta</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">
              Nombre completo visible
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Ej. Dr. Martín Morales"
              className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744] focus:outline-none focus:border-[#5149B8]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="martin.morales@hospital.edu"
              className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744] focus:outline-none focus:border-[#5149B8]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">
              Etapa formativa / Especialidad
            </label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744] focus:outline-none focus:border-[#5149B8]"
            >
              <option value="Estudiante de Medicina">Estudiante de Medicina</option>
              <option value="Médico Interno">Médico Interno</option>
              <option value="Residente de Urología • R1">Residente de Urología • R1</option>
              <option value="Residente de Urología • R2/R3">Residente de Urología • R2/R3</option>
              <option value="Médico General / Urgencias">Médico General / Urgencias</option>
              <option value="Especialista en Urología">Especialista en Urología</option>
              <option value="Profesional de Salud en Formación">Profesional de Salud en Formación</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mín. 4 caracteres"
                className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744] focus:outline-none focus:border-[#5149B8]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite la contraseña"
                className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744] focus:outline-none focus:border-[#5149B8]"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-red-50 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/25 transition cursor-pointer mt-2"
          >
            Crear cuenta e iniciar sesión
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-[#858BA1]">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-extrabold text-[#5149B8] hover:underline">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export const OnboardingPage: React.FC = () => {
  const { user, updateCurrentUserProfile, loginAsDemo } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const slides = [
    {
      badge: 'Microaprendizaje Clínico',
      title: 'Aprende urología, un desafío a la vez',
      description:
        'Refuerza conceptos esenciales de anatomía, litiasis, infecciones urinarias, HPB y urgencias urológicas con preguntas periódicas breves y explicaciones claras.',
      stats: [
        { icon: Clock, value: '3 min', label: 'Por sesión' },
        { icon: BookOpenCheck, value: '9 áreas', label: 'Temáticas' },
        { icon: Award, value: '+Puntos', label: 'Auditables' },
      ],
    },
    {
      badge: 'Evaluación Continua',
      title: 'Tests de 10 preguntas con retroalimentación inmediata',
      description:
        'Pon a prueba tu razonamiento diagnóstico en sesiones de 10 preguntas seleccionadas sin repetición, conoce tu porcentaje de aciertos y revisa cada justificación académica.',
      stats: [
        { icon: Sparkles, value: '10 preg.', label: 'Por evaluación' },
        { icon: BookOpenCheck, value: '100%', label: 'Explicado' },
        { icon: Award, value: 'Rachas', label: '3 y 7 días' },
      ],
    },
    {
      badge: 'Reconocimiento Académico',
      title: 'Sube de nivel RPG y canjea recompensas',
      description:
        'Acumula Experiencia (XP) permanente para ascender desde Aprendiz hasta Maestro Urológico, y usa tus puntos canjeables en el catálogo de premios.',
      stats: [
        { icon: Award, value: '5 Niveles', label: 'Progresión RPG' },
        { icon: ShieldCheck, value: 'Insignias', label: 'Coleccionables' },
        { icon: Sparkles, value: 'Progreso', label: 'En tiempo real' },
      ],
    },
  ];

  const currentSlide = slides[step];

  const handleFinish = () => {
    if (!user) {
      loginAsDemo('user');
    } else {
      updateCurrentUserProfile({ onboarding_completed: true });
    }
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-mesh-violet flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] p-6 sm:p-8 card-soft-shadow border border-white overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-5">
          <span className="px-3.5 py-1 rounded-full bg-[#5149B8] text-white text-xs font-extrabold">
            {currentSlide.badge}
          </span>
          <span className="text-xs font-bold text-[#858BA1]">
            Paso {step + 1} de {slides.length}
          </span>
        </div>

        {/* Hero Medical Illustration Card */}
        <div className="rounded-[28px] bg-gradient-to-br from-[#5149B8] via-[#7778ED] to-[#83D0E5] p-6 text-white mb-6 relative overflow-hidden">
          <div className="w-32 h-32 rounded-full bg-white/15 absolute -right-8 -bottom-8" />
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold leading-tight mb-2">{currentSlide.title}</h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            {currentSlide.description}
          </p>
        </div>

        {/* Three stat boxes */}
        <div className="mb-6">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#858BA1] mb-3">
            Pilares de la experiencia
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            {currentSlide.stats.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F5F7FC] rounded-2xl p-3.5 text-center border border-slate-100"
                >
                  <Icon className="w-5 h-5 text-[#5149B8] mx-auto mb-1.5" />
                  <span className="block text-sm font-extrabold text-[#202744]">{st.value}</span>
                  <span className="block text-[11px] text-[#858BA1]">{st.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStep(idx)}
              aria-label={`Ir al paso ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                step === idx ? 'w-8 bg-[#5149B8]' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center gap-3">
          {step < slides.length - 1 ? (
            <>
              <button
                type="button"
                onClick={handleFinish}
                className="py-3.5 px-5 rounded-full bg-[#F5F7FC] hover:bg-slate-200 text-[#858BA1] font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                Omitir
              </button>
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#7778ED] hover:bg-[#5149B8] text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/25 transition cursor-pointer"
              >
                Siguiente
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-4 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/30 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Comenzar ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
