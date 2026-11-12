export interface ClinicalCaseStep {
  step_number: number;
  stage_title: string;
  clinical_update: string;
  question_text: string;
  options: [string, string, string, string];
  correct_index: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  category_id: string;
  category_name: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  patient_summary: string;
  vignette: string;
  image_url?: string | null;
  image_caption?: string | null;
  reference_text: string;
  steps: ClinicalCaseStep[];
}

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'case-litiasis-sepsis',
    title: 'Dolor lumbar agudo, fiebre y obstrucción ureteral',
    category_id: 'cat-urgencias',
    category_name: 'Urgencias Urológicas',
    difficulty: 'intermediate',
    patient_summary: 'Mujer de 52 años • Urgencias • Fiebre 38,9 °C',
    vignette:
      'Paciente diabética tipo 2 que consulta en urgencias por dolor tipo cólico en fosa iliaca y flanco izquierdo de 18 horas de evolución, asociado a escalofríos, náuseas y fiebre cuantificada de 38,9 °C. Al ingreso: PA 92/58 mmHg, FC 114 lpm, puñopercusión izquierda intensamente positiva.',
    reference_text: 'Guías EAU de Urolitiasis e Infecciones Urológicas.',
    steps: [
      {
        step_number: 1,
        stage_title: 'Paso 1: Estudio inicial en urgencias',
        clinical_update: 'La paciente está taquicárdica, hipotensa y febril. Se instalan dos vías venosas periféricas y cristaloides.',
        question_text:
          'Además de hemocultivos, urocultivo y laboratorio de urgencia (hemograma, PCR, creatinina, lactato), ¿cuál es el estudio imagenológico de elección para confirmar la causa obstructiva?',
        options: [
          'Tomografía computarizada (TC) abdominopélvica sin contraste (PieloTAC)',
          'Cistoscopia flexible de urgencia en el box de reanimación',
          'Urografía intravenosa convencional con doble dosis de contraste yodado',
          'Resonancia magnética pélvica con gadolinio como primera línea',
        ],
        correct_index: 0,
        explanation:
          'El PieloTAC (TC sin contraste) es el estándar de oro por su sensibilidad (>95%) y especificidad para detectar cálculos, su tamaño, localización y signos de obstrucción o complicación perirrenal, sin riesgo de nefrotoxicidad por contraste.',
      },
      {
        step_number: 2,
        stage_title: 'Paso 2: Conducta quirúrgica inmediata',
        clinical_update:
          'El PieloTAC confirma un cálculo de 8 mm en el uréter proximal izquierdo con hidronefrosis moderada y estriación de la grasa perirrenal. Leucocitos 19.400/mm³, Creatinina 1,9 mg/dL.',
        question_text:
          'Junto con iniciar antibioterapia intravenosa de amplio espectro, ¿cuál es la conducta urológica inmediata indicada?',
        options: [
          'Descompresión urgente de la vía urinaria mediante catéter doble J o nefrostomía percutánea',
          'Ureterolitotomía endoscópica con láser Holmium inmediata para extraer el cálculo en agudo',
          'Terapia médica expulsiva con tamsulosina ambulatoria y control en 72 horas',
          'Litotricia extracorpórea por ondas de choque (LEOC) de urgencia en las primeras 6 horas',
        ],
        correct_index: 0,
        explanation:
          'La litiasis ureteral obstructiva asociada a infección/sepsis es una emergencia urológica. La vía urinaria infectada y obstruida debe descomprimirse de inmediato (catéter ureteral doble J o nefrostomía percutánea). La extracción definitiva del cálculo se difiere hasta resolver la sepsis.',
      },
      {
        step_number: 3,
        stage_title: 'Paso 3: Manejo definitivo diferido',
        clinical_update:
          'Tras la instalación del catéter doble J y 7 días de antibióticos dirigidos, la paciente evoluciona afebril, normotensa y con creatinina normalizada (0,8 mg/dL) y urocultivo de control negativo.',
        question_text:
          '¿Cuál es la mejor estrategia para el tratamiento definitivo del cálculo de 8 mm en uréter proximal?',
        options: [
          'Ureteroscopía semirrígida o flexible con litotricia láser tras confirmar orina estéril',
          'Mantener el catéter doble J de forma permanente sin extraer el cálculo',
          'Nefrectomía simple laparoscópica por el antecedente de pielonefritis obstructiva',
          'Alcalinización urinaria oral asumiendo que todo cálculo ureteral se disuelve',
        ],
        correct_index: 0,
        explanation:
          'Una vez resuelto el cuadro séptico y con urocultivo negativo, se procede al tratamiento definitivo del cálculo (ureteroscopía con litotricia láser o LEOC según densidad/anatomía) y posterior retiro del catéter doble J.',
      },
    ],
  },
  {
    id: 'case-cap-localizado',
    title: 'Elevación de APE y lesión PI-RADS 4 en RM multiparamétrica',
    category_id: 'cat-oncologia',
    category_name: 'Oncología Urológica',
    difficulty: 'intermediate',
    patient_summary: 'Varón de 64 años • Policlínico de Urología • APE 8,4 ng/mL',
    vignette:
      'Varón de 64 años, asintomático urinario, sin antecedentes mórbidos relevantes. Su padre falleció por cáncer de próstata a los 74 años. Presenta APE total de 8,4 ng/mL (confirmado en segunda medición) y tacto rectal con nódulo firme en lóbulo derecho (cT2a).',
    reference_text: 'Manual de Urología SCHU — Capítulo Cáncer de Próstata.',
    steps: [
      {
        step_number: 1,
        stage_title: 'Paso 1: Estudio imagenológico pre-biopsia',
        clinical_update: 'Se solicita resonancia magnética multiparamétrica de próstata (RMmp) antes de decidir la biopsia.',
        question_text:
          'La RMmp informa una lesión de 11 mm en zona periférica posterolateral derecha clasificada como PI-RADS 4. ¿Qué significa esta puntuación y qué conducta corresponde?',
        options: [
          'Alta probabilidad de cáncer clínicamente significativo; se indica biopsia prostática dirigida por fusión + sistemática',
          'Lesión benigna inflamatoria (prostatitis); se repite APE en 12 meses sin biopsia',
          'Enfermedad metastásica ósea confirmada; se inicia terapia de deprivación androgénica directa',
          'Contraindicación de biopsia transperineal por riesgo de diseminación capsular',
        ],
        correct_index: 0,
        explanation:
          'Un PI-RADS 4 indica probabilidad alta de carcinoma clínicamente significativo. Las guías recomiendan biopsia prostática combinando tomas dirigidas a la lesión (fusión RM/ecografía o cognitiva) más muestreo sistemático.',
      },
      {
        step_number: 2,
        stage_title: 'Paso 2: Interpretación anatomopatológica y riesgo',
        clinical_update:
          'La biopsia confirma adenocarcinoma acinar de próstata Gleason 3+4 = 7 (Grupo Grado ISUP 2) en 4 de 12 cilindros, con compromiso máximo del 45% y sin invasión perineural extensa.',
        question_text:
          'Con cT2a, APE 8,4 ng/mL e ISUP 2, ¿en qué categoría de riesgo se clasifica y qué estudio de etapificación puede considerarse según disponibilidad?',
        options: [
          'Riesgo intermedio favorable; el PET-CT PSMA (o cintigrama + TC) se reserva según carga/riesgo o sospecha clínica',
          'Riesgo muy bajo; se indica vigilancia activa obligatoria sin evaluar otras opciones',
          'Riesgo metastásico de alto volumen; requiere docetaxel + abiraterona inmediato',
          'Tumor urotelial prostático primario; requiere cistoprostatectomía radical',
        ],
        correct_index: 0,
        explanation:
          'Un paciente con cT2a, APE < 10 ng/mL e ISUP 2 (Gleason 3+4) con <50% de cilindros positivos corresponde a riesgo intermedio favorable (según NCCN).',
      },
      {
        step_number: 3,
        stage_title: 'Paso 3: Decisión terapéutica compartida',
        clinical_update: 'El paciente tiene una expectativa de vida > 15 años, función eréctil conservada y continencia normal.',
        question_text:
          '¿Cuáles son las alternativas curativas estándar a discutir con el paciente en riesgo intermedio?',
        options: [
          'Prostatectomía radical (preservación neurovascular si procede) o radioterapia externa (con o sin TDA corta)',
          'Orquiectomía subalbugínea bilateral como monoterapia definitiva',
          'Resección transuretral de próstata (RTU-P) curativa',
          'Quimioterapia adyuvante con cabazitaxel durante 6 ciclos',
        ],
        correct_index: 0,
        explanation:
          'En cáncer de próstata localizado de riesgo intermedio con buena expectativa de vida, las opciones curativas de primera línea son la prostatectomía radical y la radioterapia externa (eventualmente asociada a terapia de deprivación androgénica de corta duración en riesgo intermedio desfavorable).',
      },
    ],
  },
  {
    id: 'case-renal-incidental',
    title: 'Masa renal sólida incidental en paciente asintomático',
    category_id: 'cat-oncologia',
    category_name: 'Oncología Urológica',
    difficulty: 'intermediate',
    patient_summary: 'Varón de 58 años • Hallazgo incidental en ecografía abdominal',
    vignette:
      'Varón de 58 años, hipertenso bien controlado, a quien durante un chequeo por esteatosis hepática se le detecta una masa sólida exofítica de 3,8 cm en el polo inferior del riñón derecho. Sin hematuria ni dolor lumbar. Creatinina basal 0,9 mg/dL.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-18.png',
    image_caption: 'Esquema anatómico de nefrometría renal (RENAL Score) para planificación quirúrgica.',
    reference_text: 'Manual de Urología SCHU — Capítulo Tumores Renales.',
    steps: [
      {
        step_number: 1,
        stage_title: 'Paso 1: Caracterización y estadificación local',
        clinical_update: 'Se solicita estudio con tomografía computarizada para caracterizar la lesión.',
        question_text:
          '¿Qué protocolo de TC confirma mejor una neoplasia renal parenquimatosa y qué incremento densitométrico en Unidades Hounsfield (UH) sugiere realce tumoral verdadero?',
        options: [
          'TC trifásica (sin contraste, corticomedular y excretora) con aumento ≥ 15–20 UH tras el contraste',
          'TC simple sin contraste exclusivamente, buscando calcificaciones > 5 UH',
          'Ecografía Doppler color sin confirmación por imagen axial',
          'Cistografía retrógrada con contraste hidrosoluble',
        ],
        correct_index: 0,
        explanation:
          'La TC renal trifásica (o RM si hay alergia al contraste o insuficiencia renal) es el estándar. Un incremento ≥ 15–20 UH respecto a la fase basal indica vascularización tumoral.',
      },
      {
        step_number: 2,
        stage_title: 'Paso 2: Estadio clínico y planificación quirúrgica',
        clinical_update:
          'La TC muestra una lesión sólida de 3,8 cm, exofítica (>50%), polo inferior derecho, sin adenopatías ni trombo venoso (cT1aN0M0). TC de tórax normal.',
        question_text:
          'Para un tumor renal cT1a (< 4 cm) en un paciente con buena función renal y anatomía favorable, ¿cuál es el tratamiento quirúrgico de elección según guías internacionales?',
        options: [
          'Nefrectomía parcial (cirugía preservadora de nefronas) por vía mínimamente invasiva o abierta',
          'Nefrectomía radical ampliada con linfadenectomía retroperitoneal extensa y adrenalectomía ipsilateral',
          'Quimioterapia neoadyuvante con cisplatino + gemcitabina previo a cirugía',
          'Radioterapia estereotáxica como única opción obligatoria en menores de 60 años',
        ],
        correct_index: 0,
        explanation:
          'En tumores cT1a (≤ 4 cm), la nefrectomía parcial es el estándar de oro porque ofrece resultados oncológicos equivalentes a la nefrectomía radical preservando parénquima y función renal a largo plazo.',
      },
      {
        step_number: 3,
        stage_title: 'Paso 3: Seguimiento postoperatorio',
        clinical_update:
          'La biopsia definitiva informa Carcinoma Renal de Células Claras (CRCC) pT1a, grado ISUP 2, bordes quirúrgicos negativos (R0).',
        question_text:
          '¿Está indicada la terapia sistémica adyuvante con pembrolizumab en este paciente pT1a ISUP 2 R0?',
        options: [
          'No; el ensayo KEYNOTE-564 demostró beneficio en riesgo intermedio-alto o alto (≥ pT2 G4/sarcomatoide, pT3/4, N+ o M1 resecado), no en pT1a de bajo riesgo',
          'Sí; todos los carcinomas de células claras requieren 1 año de pembrolizumab adyuvante',
          'Sí; debe recibir sunitinib adyuvante por 24 meses de forma rutinaria',
          'Requiere radioterapia del lecho renal izquierdo profiláctica',
        ],
        correct_index: 0,
        explanation:
          'La inmunoterapia adyuvante con pembrolizumab (KEYNOTE-564) está indicada en pacientes con riesgo intermedio-alto o alto de recurrencia (pT2 grado 4 o sarcomatoide, pT3/pT4, N+ o M1 NED), pero no en tumores pT1a de bajo grado completamente resecados.',
      },
    ],
  },
  {
    id: 'case-hpb-rao',
    title: 'Retención aguda de orina en paciente con hiperplasia prostática',
    category_id: 'cat-hpb',
    category_name: 'Hiperplasia Prostática Benigna',
    difficulty: 'basic',
    patient_summary: 'Varón de 71 años • Urgencias • Globo vesical doloroso',
    vignette:
      'Varón de 71 años con historia de 3 años de chorro miccional débil, nicturia (4 veces/noche) y tenesmo vesical. Consulta por incapacidad total para orinar en las últimas 10 horas, acompañado de dolor hipogástrico intenso y masa palpable infraumbilical mate a la percusión.',
    reference_text: 'Guías EAU de Síntomas del Tracto Urinario Inferior (LUTS/HPB).',
    steps: [
      {
        step_number: 1,
        stage_title: 'Paso 1: Descompresión vesical inicial',
        clinical_update: 'Se confirma retención aguda de orina (RAO).',
        question_text: '¿Cuál es la primera medida terapéutica inmediata en urgencias?',
        options: [
          'Instalación de sonda vesical Foley (o talla suprapúbica si falla el sondaje uretral)',
          'Indicar tamsulosina oral y esperar 24 horas antes de sondar',
          'Solicitar flujo-presión urodinámico antes de vaciar la vejiga',
          'Realizar prostatectomía abierta de urgencia en las primeras 2 horas',
        ],
        correct_index: 0,
        explanation:
          'Ante una retención aguda de orina, la medida inmediata es el vaciamiento vesical mediante sonda Foley uretral (con técnica estéril). Si existe imposibilidad anatómica o estenosis infranqueable, se indica cistostomía suprapúbica.',
      },
      {
        step_number: 2,
        stage_title: 'Paso 2: Prueba de micción espontánea (TWOC)',
        clinical_update: 'Se evacúan 950 mL de orina clara. Creatinina 1,1 mg/dL, examen de orina sin infección.',
        question_text:
          '¿Qué fármaco aumenta significativamente la probabilidad de éxito al retirar la sonda vesical en una prueba de micción espontánea (TWOC) tras el primer episodio de RAO?',
        options: [
          'Iniciar un alfabloqueador (ej. tamsulosina o alfuzosina) durante al menos 2–3 días antes de retirar la sonda',
          'Administrar furosemida intravenosa justo antes de retirar la sonda',
          'Indicar anticolinérgicos (oxibutinina) en dosis alta antes del retiro',
          'Suspender toda hidratación oral por 48 horas',
        ],
        correct_index: 0,
        explanation:
          'Los alfabloqueadores relajan el músculo liso del cuello vesical y estroma prostático, aumentando significativamente la tasa de micción exitosa tras retirar la sonda vesical (TWOC).',
      },
      {
        step_number: 3,
        stage_title: 'Paso 3: Indicación quirúrgica por volumen prostático',
        clinical_update:
          'El paciente falla dos pruebas de micción espontánea. Una ecografía vesicoprostática muestra una próstata de 110 gramos con lóbulo medio prominente.',
        question_text:
          'Para una próstata sintomática > 80–100 gramos con RAO refractaria, ¿cuáles son las técnicas quirúrgicas recomendadas de primera línea?',
        options: [
          'Enucleación endoscópica (HoLEP / ThuLEP) o adenomectomía prostática simple (abierta / laparoscópica / robótica)',
          'RTU monopolar estándar de 30 minutos sin considerar el volumen',
          'Vigilancia expectante con sonda Foley definitiva sin ofrecer cirugía',
          'Orquiectomía bilateral para reducir el volumen glandular',
        ],
        correct_index: 0,
        explanation:
          'En próstatas grandes (>80–100 mL), las técnicas de elección son la enucleación prostática con láser (HoLEP/ThuLEP) o la adenomectomía simple (abierta o mínimamente invasiva), que logran resección completa del adenoma con menor riesgo que la RTU monopolar prolongada.',
      },
    ],
  },
];
