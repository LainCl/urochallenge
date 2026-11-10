# UroChallenge — Plataforma de Aprendizaje Gamificado de Urología

**UroChallenge** es una aplicación web responsive (Mobile-First y Escritorio) diseñada para reforzar conceptos fundamentales de urología mediante desafíos periódicos, evaluaciones de 10 preguntas, rachas de estudio y un sistema auditable de puntos y recompensas.

---

## 1. Comandos de Instalación y Ejecución

En la raíz del workspace (`d:\UroChallenge`):

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo (Vite)
npm run dev

# 3. Ejecutar pruebas unitarias del motor de negocio y puntos (Vitest)
npm run test

# 4. Verificar tipado estricto TypeScript
npm run lint

# 5. Compilar versión de producción
npm run build
```

---

## 2. Acceso al Modo Demo (Usuario Demo y Administrador Demo)

Cuando no se han configurado credenciales externas de Supabase en `.env`, la aplicación se ejecuta automáticamente en **Modo Demo Local Persistente** (identificado visualmente en la barra superior/lateral).

- **Usuario Demo:** `Dra. Sofía Mendoza` (`residente.demo@urochallenge.edu`) — Rol `user`.
- **Administrador Demo:** `Dr. Carlos Valdivia` (`admin.demo@urochallenge.edu`) — Rol `admin`.

### ¿Cómo cambiar entre Usuario Demo y Administrador Demo?
1. **Desde cualquier pantalla de la aplicación:** utiliza el botón **"Cambiar a Admin Demo / Usuario Demo"** ubicado en la barra superior (móvil) o en el panel inferior del Sidebar izquierdo (escritorio).
2. **Desde la pantalla de Login (`/login`):** pulsa directamente sobre las tarjetas de acceso rápido **Usuario Demo** o **Admin Demo**.
3. **Reiniciar datos de demostración:** en `/app/profile` (sección *Utilidad de Modo Demo*) puedes restablecer la base de datos local a su estado semilla inicial en cualquier momento.

---

## 3. Cómo Configurar Supabase (PostgreSQL + Auth + RLS)

La arquitectura está desacoplada a través del repositorio `src/services/uroRepository.ts` y el cliente `src/lib/supabase.ts`. Para conectar un proyecto de Supabase en producción:

1. Crea un proyecto en [Supabase](https://supabase.com/).
2. Abre el **SQL Editor** de Supabase y ejecuta en orden:
   - `supabase/migrations/001_initial_schema.sql` (crea las 16 tablas del modelo, vistas seguras que ocultan `is_correct` al cliente, políticas Row Level Security y la función transaccional `redeem_reward_secure`).
   - `supabase/seed.sql` (inserta las reglas de puntuación iniciales, las 9 categorías urológicas y los premios de demostración).
3. Copia el archivo `.env.example` a `.env` en la raíz del proyecto y completa tus credenciales:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key-publica
   ```
   *(Nunca incluyas la clave `service_role` en el frontend).*

---

## 4. Funcionalidades Implementadas

- **Sistema Visual e Interfaz (Mobile-First + Desktop):** inspirado en la referencia visual adjunta (fondos violetas/índigo `#5149B8` y `#7778ED`, acentos celestes `#83D0E5` y lima `#C3F574`, tarjetas redondeadas, barra de navegación inferior flotante en móvil y sidebar en escritorio).
- **Onboarding, Login y Registro (`/onboarding`, `/login`, `/register`):** presentación en 3 pasos y cambio instantáneo de rol en modo demo.
- **Dashboard Principal (`/app`):** saludo dinámico, saldo de puntos, racha actual y mejor racha, tarjeta hero de pregunta periódica disponible, barra de progreso hacia el próximo premio, buscador y filtro de las 9 categorías urológicas y últimas actividades.
- **Pregunta Periódica (`/app/daily-question`):** frecuencia configurable (diaria, cada 2 días, cada 3 días, semanal o personalizada en horas/días), validación de respuesta única por período, explicación académica, nota editorial y acreditación de puntos con clave de idempotencia. Incluye botón de simulación de siguiente período en modo demo.
- **Test de 10 Preguntas (`/app/quiz`, `/app/quiz/:sessionId`, `/app/quiz/:sessionId/result`):** selección aleatoria sin repeticiones, validación de banco mínimo de 10 preguntas publicadas, avance pregunta a pregunta con bloqueo tras confirmar, pantalla de resultados con puntaje `X/10`, porcentaje de aciertos, puntos ganados y revisión detallada pregunta por pregunta.
- **Motor de Puntos y Rachas (`/app/activity`):** libro mayor inmutable (`points_ledger`) con prevención de duplicados por recarga o doble clic (`idempotency_key`), bonificaciones automáticas por rachas de 3 y 7 días consecutivos y calendario interactivo de actividad.
- **Catálogo y Canje de Premios (`/app/rewards`, `/app/rewards/:rewardId`):** filtro por *"Todos"* y *"Puedo canjear ahora"*, Álbum de Recompensas e Insignias coleccionables, diálogo de confirmación con desglose de saldo, validación de stock y puntos, generación de código único (`URO-2026-XXXX`) e historial de canjes.
- **Estudio & Ciclo Pomodoro (`/app/study`):** temporizador de enfoque clínico con recordatorios de estudio configurables y acreditación automática de **+2 puntos** y **+40 XP** por cada ciclo completado.
- **Sistema RPG de Niveles, Experiencia (XP) y Logros (`/app/trajectory`, `/admin/gamification`):**
  - **Dos economías 100% independientes:**
    1. **Puntos UroChallenge (`points_ledger`):** se ganan y se gastan al canjear premios.
    2. **Experiencia (`experience_ledger` y `user_experience`):** se acumula permanentemente por actividades educativas, desbloquea niveles RPG (`Nivel I — Aprendiz` a `Nivel V — Maestro Urológico`) y **nunca disminuye** al gastar puntos o canjear recompensas.
  - **Tarjeta destacada `"Mi progreso"` en Dashboard y Perfil:** muestra insignia del nivel actual, numeral romano, XP acumulados, barra de progreso animada, porcentaje de avance y XP restantes para el próximo nivel.
  - **Notificación emergente de subida de nivel (`LevelUpNotificationModal`):** detecta automáticamente cuando el usuario alcanza uno o varios niveles nuevos, registra la fecha en `user_level_history` y despliega un modal de felicitación con la nueva insignia desbloqueada.
  - **Pantalla `"Mi trayectoria"` (`/app/trajectory`):** línea de tiempo vertical con los 5 niveles RPG (estado Completado, Nivel Actual o Bloqueado), insignias automáticas por logros (`achievements` / `user_achievements`) y libro mayor de experiencia (`experience_ledger`).
- **Panel Administrativo Protegido (`/admin/*`):**
  - Dashboard de métricas (`/admin`).
  - **Módulo de Gamificación (`/admin/gamification`):** creación y edición de niveles RPG, configuración de reglas de XP por actividad, gestión de logros automáticos e inspección/ajuste auditado de XP por usuario.
  - CRUD completo de preguntas con soporte de 2 a 6 alternativas, duplicación y publicación/archivo (`/admin/questions`, `/admin/questions/new`, `/admin/questions/:id`).
  - CRUD de categorías urológicas (`/admin/categories`).
  - CRUD de premios y control de stock (`/admin/rewards`).
  - Gestión de canjes con reembolso compensatorio automático en el libro de puntos al rechazar o cancelar (`/admin/redemptions`).
  - Gestión de usuarios y ajustes administrativos de saldo con motivo obligatorio (`/admin/users`).
  - Configuración de frecuencia periódica y reglas de puntuación (`/admin/settings`).
  - Registro completo de auditoría administrativa (`/admin/audit`).
