# UroChallenge --- Especificación funcional y prompt de desarrollo para Google Antigravity

> **Nombre provisional:** UroChallenge\
> **Producto:** Aplicación de aprendizaje gamificado de urología\
> **Objetivo:** entregar microaprendizaje periódico, evaluaciones breves
> y un sistema transparente de puntos y recompensas.\
> **Referencia visual:** imagen adjunta por el usuario (tres pantallas
> móviles sobre fondo violeta, tarjetas celestes, interfaz médica
> limpia).

------------------------------------------------------------------------

## 1. Instrucción principal para Antigravity

Actúa como un equipo senior de producto, UX/UI, arquitectura y
desarrollo full-stack. Diseña e implementa una aplicación web responsive
llamada **UroChallenge**, centrada en preguntas educativas básicas de
urología y recompensas por participación y desempeño.

Construye una aplicación funcional, no solamente un prototipo visual.
Antes de implementar, inspecciona el repositorio y conserva las
decisiones o componentes que ya existan y sean útiles. Si el proyecto
está vacío, inicialízalo con la arquitectura propuesta en este
documento.

La referencia visual adjunta debe guiar el lenguaje gráfico, pero no
debe copiarse literalmente: adapta su composición a una app educativa de
urología. Prioriza la experiencia móvil y asegúrate de que también
funcione bien en escritorio.

No inventes evidencia médica ni presentes el contenido educativo como
consejo clínico. Las preguntas deben ser editables y revisables por un
administrador/editor antes de publicarse.

------------------------------------------------------------------------

## 2. Objetivos del producto

1.  Facilitar el aprendizaje continuo de conceptos fundamentales de
    urología.
2.  Incentivar la participación mediante preguntas periódicas.
3.  Permitir realizar tests de 10 preguntas.
4.  Asignar puntos de forma consistente y auditable.
5.  Permitir definir premios y sus costos en puntos.
6.  Mostrar progreso, historial, rachas y premios canjeados.
7.  Permitir que un administrador gestione preguntas, frecuencia, reglas
    de puntuación y recompensas.

### Público objetivo

Usuarios que desean reforzar conocimientos básicos de urología:
estudiantes, internos, profesionales en formación u otros perfiles
definidos por la organización. El público exacto debe poder configurarse
y no debe asumirse un nivel de especialización avanzado.

------------------------------------------------------------------------

## 3. Diseño visual y experiencia de usuario

### 3.1 Dirección visual

Tomar como referencia la imagen proporcionada:

-   Fondo principal violeta/índigo.
-   Superficies blancas o ligeramente azuladas.
-   Tarjetas celestes y turquesas para destacar contenido.
-   Botones primarios violetas con texto blanco.
-   Esquinas redondeadas y sombras suaves.
-   Iconos lineales simples.
-   Tipografía sans-serif moderna y legible.
-   Diseño limpio, amable, médico y contemporáneo.
-   Evitar una estética hospitalaria fría o excesivamente corporativa.

Paleta inicial sugerida (editable en variables CSS): - Violeta
principal: `#5149B8` - Violeta secundario: `#7778ED` - Celeste:
`#83D0E5` - Turquesa claro: `#B8E5E8` - Fondo suave: `#F5F7FC` - Texto
principal: `#202744` - Texto secundario: `#858BA1` - Blanco: `#FFFFFF`

Usar contraste accesible. No depender exclusivamente del color para
comunicar aciertos, errores o estados.

### 3.2 Adaptación de las tres pantallas de referencia

**Pantalla 1 --- Bienvenida / onboarding** - Ilustración o fotografía
médica genérica, no de una persona identificable. - Mensaje: "Aprende
urología, un desafío a la vez". - Texto breve que explique preguntas
periódicas y recompensas. - CTA: "Comenzar". - Indicador de pasos si se
implementa onboarding.

**Pantalla 2 --- Inicio / descubrir** - Saludo al usuario. - Resumen de
puntos acumulados y racha. - Buscador o acceso a categorías. - Tarjetas
de categorías con iconos. - Tarjeta destacada "Pregunta disponible". -
CTA principal: "Responder ahora". - Acceso secundario: "Realizar test de
10 preguntas". - Tarjeta de progreso o premio próximo.

**Pantalla 3 --- Agenda / actividad** - Calendario o selector de días
con actividad. - Próxima pregunta programada y estado de
disponibilidad. - Lista de actividades, hitos, recordatorios y
premios. - Navegación inferior con Inicio, Actividad, Premios y Perfil.

### 3.3 Componentes de interfaz

Crear componentes reutilizables: - `AppShell` - `BottomNavigation` -
`HeaderGreeting` - `PointsSummaryCard` - `StreakCard` -
`DailyQuestionCard` - `QuizProgress` - `AnswerOption` -
`QuestionResult` - `CategoryCard` - `RewardCard` -
`RewardRedemptionDialog` - `ActivityCalendar` - `EmptyState` -
`LoadingState` - `ErrorState` - `AdminSidebar` o navegación
administrativa adaptable.

------------------------------------------------------------------------

## 4. Módulos funcionales

### 4.1 Registro e inicio de sesión

Para el MVP: - Permitir registro e inicio de sesión. - Perfil con nombre
visible, correo y fecha de creación. - Roles: `user`, `admin` y
opcionalmente `editor`. - Un usuario normal no puede acceder a funciones
administrativas. - Incluir cierre de sesión. - No almacenar contraseñas
en texto plano.

Si la integración de autenticación no está disponible durante la primera
iteración, crear un modo demo claramente identificado y separar la capa
de autenticación para reemplazarla después.

### 4.2 Pregunta periódica

La frecuencia debe ser configurable por el administrador: - Cada día. -
Cada 2 días. - Cada 3 días. - Semanal. - Intervalo personalizado en
horas o días.

Reglas: 1. El sistema determina si el usuario tiene una pregunta
disponible según la programación. 2. El usuario puede responder una vez
cada pregunta asignada, salvo que el administrador configure reintentos.
3. Al responder, mostrar si acertó, explicación y referencia
bibliográfica si está registrada. 4. Registrar fecha, pregunta,
alternativa seleccionada, resultado y puntos obtenidos. 5. No revelar la
respuesta correcta antes de que el usuario responda. 6. Si no hay
preguntas disponibles, mostrar un estado vacío amable y la fecha
estimada del próximo desafío.

La programación debe calcularse usando fechas y zona horaria
configurables. No confiar únicamente en un temporizador del navegador
para garantizar la frecuencia. La regla definitiva debe validarse en
backend cuando exista.

### 4.3 Banco de preguntas

Cada pregunta debe tener: - Enunciado. - Categoría. - Nivel: básico,
intermedio o avanzado. - Cuatro alternativas por defecto (permitir
configurar entre 2 y 6). - Una respuesta correcta en preguntas de
selección única. - Explicación breve. - Fuente o referencia
bibliográfica opcional. - Etiquetas. - Estado: borrador, pendiente de
revisión, publicada o archivada. - Autor/editor. - Fecha de creación y
actualización.

Categorías iniciales sugeridas: - Anatomía y fisiología urológica. -
Infecciones urinarias. - Litiasis urinaria. - Hiperplasia prostática
benigna. - Cáncer urológico (conceptos generales). - Incontinencia
urinaria. - Salud masculina. - Urgencias urológicas (conceptos
básicos). - Función renal y vías urinarias.

El administrador puede crear, editar, duplicar, publicar, despublicar y
archivar preguntas. Agregar filtros por categoría, nivel y estado.
Incluir importación/exportación CSV como mejora posterior, no como
requisito para bloquear el MVP.

### 4.4 Test de 10 preguntas

Flujo: 1. El usuario pulsa "Realizar test". 2. El sistema selecciona 10
preguntas publicadas y elegibles. 3. Evitar repetir preguntas que el
usuario acaba de contestar cuando exista suficiente banco. 4. Mostrar
una pregunta por pantalla, con progreso `1 de 10`. 5. Permitir
seleccionar una alternativa y confirmar. 6. Definir claramente si se
permite volver a preguntas anteriores; para el MVP, no permitir cambios
una vez confirmada la respuesta. 7. Al finalizar, mostrar resultados.

Pantalla de resultados: - Puntaje: `X/10`. - Porcentaje de aciertos. -
Puntos ganados. - Resumen de respuestas correctas e incorrectas. -
Explicaciones. - Botón "Volver al inicio". - Botón "Revisar respuestas".

Si hay menos de 10 preguntas publicadas y elegibles, informar al usuario
y no iniciar un test incompleto sin advertencia. El administrador puede
configurar el tamaño del test en una futura versión, pero el valor por
defecto del MVP es 10.

### 4.5 Puntos y reglas de puntuación

Todas las reglas deben poder configurarse desde administración. Valores
iniciales sugeridos:

  Acción                                           Puntos iniciales
  -------------------------------------------- --------------------
  Responder pregunta periódica                                    5
  Responder correctamente pregunta periódica         +5 adicionales
  Completar test de 10 preguntas                                 10
  Cada respuesta correcta del test                                2
  Completar 3 días consecutivos de actividad      5 de bonificación
  Completar 7 días consecutivos de actividad     15 de bonificación

Reglas importantes: - Mostrar antes de cada actividad cómo se obtienen
puntos. - Evitar duplicar puntos por reintentos, recargas o doble
clic. - Cada asignación debe generar un movimiento en un libro de puntos
(`points_ledger`). - El saldo se calcula a partir de movimientos
acreditados y débitos por canjes. - Registrar motivo, fecha, usuario,
actividad relacionada y cantidad. - No permitir saldo negativo. - Los
cambios administrativos de puntos deben registrar administrador, motivo
y fecha. - No entregar puntos por una actividad que no se haya
completado correctamente.

El administrador puede editar valores y activar/desactivar
bonificaciones. Los valores de esta tabla son parámetros de inicio, no
reglas médicas ni definitivas.

### 4.6 Premios y canjes

Catálogo de premios con: - Nombre. - Descripción. - Imagen opcional. -
Costo en puntos. - Stock opcional (ilimitado o cantidad definida). -
Estado: activo/inactivo. - Condiciones del premio. - Fecha de vigencia
opcional.

Flujo de canje: 1. Usuario abre "Premios". 2. Ve su saldo y los premios
disponibles. 3. Puede filtrar por "Puedo canjear" y "Todos". 4. Al
seleccionar un premio, se muestra confirmación con el costo. 5. Al
confirmar, validar saldo y stock en backend. 6. Registrar el canje y
descontar puntos mediante un movimiento de débito. 7. Mostrar
comprobante o código de canje único. 8. El canje queda con estado:
pendiente, aprobado, entregado, rechazado o cancelado.

No descontar puntos dos veces si se repite la solicitud. Si un canje se
cancela o rechaza, devolver los puntos mediante un movimiento
compensatorio, nunca borrando el movimiento original.

### 4.7 Perfil, progreso e historial

Mostrar: - Nombre y avatar inicial. - Saldo actual. - Total de puntos
ganados. - Cantidad de preguntas respondidas. - Tests completados. -
Porcentaje histórico de aciertos. - Racha actual y mejor racha. -
Premios canjeados. - Historial cronológico de actividades y movimientos
de puntos.

### 4.8 Recordatorios y notificaciones

-   El usuario puede activar/desactivar recordatorios.
-   La hora preferida es configurable.
-   En web, implementar notificaciones del navegador solo después de
    solicitar permiso explícito.
-   Si no hay permiso, usar recordatorios dentro de la aplicación.
-   No afirmar que una notificación se enviará si la aplicación está
    cerrada, a menos que exista backend y un servicio de push
    configurado.
-   Preparar la arquitectura para notificaciones push futuras.
-   La frecuencia de preguntas se administra desde el backend; un
    `setInterval` local no debe ser la fuente de verdad.

### 4.9 Panel administrativo

Rutas protegidas para administradores: - Dashboard: usuarios activos,
preguntas respondidas, tests completados, puntos emitidos y canjes
pendientes. - Banco de preguntas: CRUD, filtros y publicación. -
Categorías: CRUD. - Recompensas: CRUD, stock y estado. - Configuración:
frecuencia, puntuación, rachas y reglas de test. - Usuarios: búsqueda,
detalle, actividad y saldo. - Canjes: aprobar, rechazar, marcar
entregado y registrar observaciones. - Auditoría: cambios
administrativos y ajustes de puntos.

------------------------------------------------------------------------

## 5. Arquitectura técnica recomendada

### Stack sugerido

-   Frontend: React + TypeScript + Vite.
-   Estilos: Tailwind CSS.
-   Iconos: Lucide React.
-   Enrutamiento: React Router.
-   Formularios y validación: React Hook Form + Zod.
-   Estado remoto: TanStack Query si se utiliza API.
-   Backend y base de datos: Supabase (PostgreSQL + Auth + Row Level
    Security).
-   Gráficos administrativos: Recharts, solo donde aporten valor.
-   Fechas: date-fns.
-   Pruebas: Vitest + React Testing Library; Playwright para flujos
    críticos.

Si el usuario todavía no ha configurado Supabase, crear primero un modo
demo local funcional con repositorios/servicios desacoplados y
persistencia en `localStorage`. No mezclar lógica de negocio
directamente con componentes visuales. Dejar preparada la migración a
Supabase sin reescribir las pantallas.

### Estructura de carpetas propuesta

``` text
urochallenge/
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers.tsx
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── questions/
│   │   ├── rewards/
│   │   └── dashboard/
│   ├── features/
│   │   ├── auth/
│   │   ├── home/
│   │   ├── daily-question/
│   │   ├── quiz/
│   │   ├── rewards/
│   │   ├── profile/
│   │   └── admin/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── data/
│   ├── types/
│   ├── utils/
│   └── styles/
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── tests/
├── .env.example
├── package.json
└── README.md
```

------------------------------------------------------------------------

## 6. Modelo de base de datos

Diseñar el esquema pensando en Supabase/PostgreSQL. Usar UUID como clave
primaria, `created_at` y `updated_at` donde corresponda, claves foráneas
e índices.

### `profiles`

-   `id` UUID PK, relacionado con `auth.users.id`.
-   `display_name` TEXT.
-   `avatar_url` TEXT nullable.
-   `role` TEXT (`user`, `editor`, `admin`).
-   `timezone` TEXT, por defecto configurable.
-   `reminders_enabled` BOOLEAN.
-   `reminder_time` TIME nullable.
-   `created_at`, `updated_at`.

### `categories`

-   `id` UUID PK.
-   `name` TEXT.
-   `description` TEXT nullable.
-   `icon` TEXT nullable.
-   `is_active` BOOLEAN.
-   `created_at`, `updated_at`.

### `questions`

-   `id` UUID PK.
-   `category_id` UUID FK.
-   `question_text` TEXT.
-   `difficulty` TEXT (`basic`, `intermediate`, `advanced`).
-   `explanation` TEXT.
-   `reference_text` TEXT nullable.
-   `status` TEXT (`draft`, `review`, `published`, `archived`).
-   `created_by` UUID FK a profiles.
-   `reviewed_by` UUID nullable.
-   `published_at` TIMESTAMPTZ nullable.
-   `created_at`, `updated_at`.

### `question_options`

-   `id` UUID PK.
-   `question_id` UUID FK.
-   `option_text` TEXT.
-   `is_correct` BOOLEAN.
-   `sort_order` INT.

No exponer `is_correct` al cliente antes de que se registre la
respuesta. En producción, entregar preguntas y validar respuestas
mediante funciones/RPC o endpoints seguros del servidor.

### `question_schedules`

-   `id` UUID PK.
-   `name` TEXT.
-   `interval_value` INT.
-   `interval_unit` TEXT (`hours`, `days`).
-   `starts_at` TIMESTAMPTZ.
-   `is_active` BOOLEAN.
-   `created_at`, `updated_at`.

### `daily_assignments`

-   `id` UUID PK.
-   `user_id` UUID FK.
-   `question_id` UUID FK.
-   `available_at` TIMESTAMPTZ.
-   `expires_at` TIMESTAMPTZ nullable.
-   `status` TEXT (`available`, `answered`, `expired`).
-   `answered_at` TIMESTAMPTZ nullable.
-   Restricción única adecuada para impedir asignaciones duplicadas por
    usuario y periodo.

### `answer_attempts`

-   `id` UUID PK.
-   `user_id` UUID FK.
-   `question_id` UUID FK.
-   `selected_option_id` UUID FK.
-   `is_correct` BOOLEAN, calculado por servidor.
-   `source` TEXT (`daily`, `quiz`).
-   `quiz_session_id` UUID nullable.
-   `points_awarded` INT.
-   `answered_at` TIMESTAMPTZ.
-   Idempotencia mediante identificador de actividad o restricción única
    adecuada.

### `quiz_sessions`

-   `id` UUID PK.
-   `user_id` UUID FK.
-   `status` TEXT (`in_progress`, `completed`, `abandoned`).
-   `total_questions` INT, por defecto 10.
-   `correct_answers` INT nullable.
-   `points_awarded` INT.
-   `started_at`, `completed_at`.

### `quiz_session_questions`

-   `id` UUID PK.
-   `quiz_session_id` UUID FK.
-   `question_id` UUID FK.
-   `position` INT.
-   `selected_option_id` UUID nullable.
-   `is_correct` BOOLEAN nullable.
-   `answered_at` TIMESTAMPTZ nullable.

### `point_rules`

-   `id` UUID PK.
-   `action_key` TEXT UNIQUE.
-   `description` TEXT.
-   `points` INT.
-   `is_active` BOOLEAN.
-   `updated_by` UUID FK.
-   `updated_at`.

### `points_ledger`

-   `id` UUID PK.
-   `user_id` UUID FK.
-   `amount` INT (positivo para abonos, negativo para débitos).
-   `entry_type` TEXT (`earn`, `redeem`, `refund`, `adjustment`,
    `bonus`).
-   `reason` TEXT.
-   `reference_id` UUID nullable.
-   `idempotency_key` TEXT UNIQUE.
-   `created_by` UUID nullable.
-   `created_at`.

### `rewards`

-   `id` UUID PK.
-   `name` TEXT.
-   `description` TEXT.
-   `image_url` TEXT nullable.
-   `points_cost` INT.
-   `stock` INT nullable (NULL significa ilimitado).
-   `is_active` BOOLEAN.
-   `valid_from`, `valid_until` TIMESTAMPTZ nullable.
-   `created_at`, `updated_at`.

### `redemptions`

-   `id` UUID PK.
-   `user_id` UUID FK.
-   `reward_id` UUID FK.
-   `points_spent` INT.
-   `redemption_code` TEXT UNIQUE.
-   `status` TEXT (`pending`, `approved`, `delivered`, `rejected`,
    `cancelled`).
-   `admin_note` TEXT nullable.
-   `processed_by` UUID nullable.
-   `created_at`, `updated_at`.

### `user_streaks`

-   `user_id` UUID PK/FK.
-   `current_streak` INT.
-   `best_streak` INT.
-   `last_activity_date` DATE nullable.
-   `updated_at`.

### `app_settings`

-   `key` TEXT PK.
-   `value` JSONB.
-   `updated_by` UUID nullable.
-   `updated_at`.

### `admin_audit_log`

-   `id` UUID PK.
-   `admin_user_id` UUID FK.
-   `action` TEXT.
-   `entity_type` TEXT.
-   `entity_id` UUID nullable.
-   `before_data` JSONB nullable.
-   `after_data` JSONB nullable.
-   `created_at`.

------------------------------------------------------------------------

## 7. Seguridad y reglas de negocio

-   Activar Row Level Security (RLS) en todas las tablas expuestas.
-   Un usuario solo puede leer/actualizar su perfil permitido, sus
    asignaciones, intentos, sesiones, saldo, historial y canjes.
-   Solo administradores pueden gestionar usuarios, reglas, premios,
    categorías, programación y preguntas.
-   Editores pueden gestionar preguntas si el rol y permisos lo
    permiten, pero no modificar puntos ni canjes.
-   Nunca confiar en el puntaje, saldo, respuesta correcta, stock o rol
    enviados desde el navegador.
-   Calcular respuestas y puntos en backend.
-   Usar transacciones para canjes: validar saldo, descontar puntos,
    reservar stock y crear canje atómicamente.
-   Usar claves de idempotencia para evitar duplicados por reintentos.
-   Registrar auditoría de cambios sensibles.
-   No incluir secretos ni claves `service_role` en el frontend.
-   Validar todos los datos en cliente y servidor.

------------------------------------------------------------------------

## 8. Datos de demostración

Crear datos semilla para probar la aplicación: - 8 a 10 categorías
iniciales. - Al menos 20 preguntas de ejemplo de nivel básico,
distribuidas entre categorías. - 5 premios ficticios. - Reglas de puntos
iniciales. - Un usuario demo y un administrador demo únicamente en
entorno local.

Las preguntas de demostración deben: - Ser educativas, introductorias y
de selección única. - Tener explicación breve y fuente/referencia cuando
sea posible. - Estar marcadas como contenido de demostración pendiente
de validación editorial. - No incluir recomendaciones de tratamiento
individual ni instrucciones para autodiagnóstico. - Evitar afirmaciones
clínicas dudosas o ambiguas.

No presentar el banco de ejemplo como material médico validado. Dejar
visible en el entorno de administración quién debe revisar/publicar cada
pregunta.

------------------------------------------------------------------------

## 9. Pantallas y rutas

### Usuario

-   `/login`
-   `/register`
-   `/onboarding`
-   `/app` --- inicio.
-   `/app/daily-question` --- pregunta periódica.
-   `/app/quiz` --- introducción al test.
-   `/app/quiz/:sessionId` --- test activo.
-   `/app/quiz/:sessionId/result` --- resultados.
-   `/app/activity` --- calendario e historial.
-   `/app/rewards` --- catálogo.
-   `/app/rewards/:rewardId` --- detalle y canje.
-   `/app/profile` --- perfil y progreso.

### Administración

-   `/admin` --- dashboard.
-   `/admin/questions`
-   `/admin/questions/new`
-   `/admin/questions/:id`
-   `/admin/categories`
-   `/admin/rewards`
-   `/admin/users`
-   `/admin/redemptions`
-   `/admin/settings`
-   `/admin/audit`

------------------------------------------------------------------------

## 10. Criterios de aceptación del MVP

La primera versión se considera funcional cuando:

1.  La aplicación abre y navega sin errores.
2.  El usuario puede entrar en modo demo o autenticarse si el backend
    está configurado.
3.  El inicio muestra puntos, actividad y acceso a pregunta/test.
4.  El usuario puede responder una pregunta periódica.
5.  El sistema muestra resultado y explicación.
6.  El usuario puede completar un test de 10 preguntas cuando hay
    suficientes preguntas publicadas.
7.  El resultado del test calcula aciertos, porcentaje y puntos
    correctamente.
8.  Los puntos persisten al recargar la página.
9.  El usuario ve saldo e historial de movimientos.
10. El usuario puede ver premios y realizar un canje si tiene saldo
    suficiente.
11. Un usuario sin puntos suficientes no puede canjear.
12. No se puede duplicar un abono o canje al recargar o repetir una
    petición.
13. El panel administrativo permite crear y editar preguntas y premios.
14. La frecuencia y puntuación se pueden modificar desde configuración.
15. La interfaz funciona en móvil, tablet y escritorio.
16. Los estados vacíos, carga y error tienen diseño.
17. Existe un README con instalación, ejecución, variables de entorno y
    modo demo.

------------------------------------------------------------------------

## 11. Orden de implementación solicitado

Implementa por etapas y valida cada etapa antes de avanzar:

### Fase 1 --- Base visual y navegación

-   Configurar React, TypeScript, Vite y Tailwind.
-   Crear sistema de diseño basado en la imagen.
-   Crear navegación responsive.
-   Construir pantallas con datos mock.

### Fase 2 --- Experiencia de aprendizaje

-   Banco de preguntas.
-   Pregunta periódica.
-   Test de 10 preguntas.
-   Resultados y explicaciones.

### Fase 3 --- Gamificación

-   Motor de puntos.
-   Historial de movimientos.
-   Rachas.
-   Catálogo y canje de premios.

### Fase 4 --- Administración

-   CRUD de preguntas, categorías y premios.
-   Configuración de frecuencia y reglas.
-   Gestión de canjes y usuarios.

### Fase 5 --- Persistencia y seguridad

-   Supabase Auth y PostgreSQL.
-   RLS y políticas.
-   Funciones seguras para validar respuestas, puntos y canjes.
-   Migraciones y seed.

### Fase 6 --- Calidad

-   Pruebas de flujos críticos.
-   Accesibilidad.
-   Responsive.
-   Manejo de errores.
-   Documentación.

Si Supabase no está configurado, completar un MVP local persistente y
funcional con `localStorage`, pero aislar los repositorios para
facilitar la migración. No dejar botones decorativos sin acción: cada
botón debe navegar, guardar, confirmar o mostrar un estado explicativo.

------------------------------------------------------------------------

## 12. Instrucciones finales de calidad

-   Prioriza claridad, rapidez y facilidad de uso.
-   Diseña primero para móvil, siguiendo la composición de la referencia
    visual.
-   Usa animaciones sutiles y evita efectos que distraigan.
-   Mantén componentes pequeños y reutilizables.
-   Usa TypeScript estricto y evita `any` salvo justificación.
-   Centraliza las reglas de puntuación y programación.
-   Separa datos, lógica de negocio, servicios y UI.
-   Incluye confirmación para canjes y acciones administrativas
    destructivas.
-   No simules integraciones externas como si estuvieran conectadas.
-   No afirmes que las notificaciones push funcionan si no existe
    infraestructura real.
-   Añade comentarios solo donde aporten claridad.
-   Al finalizar cada fase, ejecuta lint, typecheck y pruebas
    disponibles; corrige errores antes de continuar.
-   Entrega un README y un resumen de lo implementado, lo pendiente y
    cómo ejecutar el proyecto.

**Resultado esperado:** una aplicación web de aprendizaje gamificado de
urología, visualmente inspirada en la imagen adjunta, con preguntas
periódicas, tests de 10 preguntas, puntos, premios canjeables y
administración configurable.
