import { Question } from '../types/domain';

const MANUAL_UROLOGIA_RENAL_REF =
  'Manual de Urología — Sociedad Chilena de Urología: Capítulo Tumores Renales (https://manualurologia.cl/tumores-renales/)';

interface RawRenalQuestion {
  num: number;
  difficulty: 'intermediate';
  tags: string[];
  question_text: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

const RAW_RENAL_CANCER_QUESTIONS: RawRenalQuestion[] = [
  // ==================== NIVEL INTERMEDIO (1 a 50) ====================
  {
    num: 1,
    difficulty: 'intermediate',
    tags: ['cáncer renal', 'epidemiología', 'Chile', 'DEIS', 'incidencia'],
    question_text:
      'Según los datos epidemiológicos del DEIS (2021) y del estudio de carga de muerte prematura en Chile (Inzunza et al.) citados en el Manual de Urología, ¿cuál es el comportamiento de la incidencia del cáncer renal (CIE-10 C64) y su proyección hacia el año 2035?',
    options: [
      'Presenta una tasa cruda general de 14,9 por 100.000 habitantes que supera los 80 por 100.000 sobre los 65 años, con una reducción proyectada de los años de vida potencialmente perdidos hacia 2035.',
      'Presenta una tasa cruda general de 4,9 por 100.000 habitantes que supera los 40 por 100.000 en hombres mayores de 65 años, con un alza proyectada de los años de vida potencialmente perdidos hacia 2035.',
      'Presenta una tasa cruda general de 9,4 por 100.000 habitantes con distribución igualitaria por sexo y edad media de 48 años, manteniéndose estable la proyección de años de vida potencialmente perdidos hacia 2035.',
      'Presenta una tasa cruda general de 2,1 por 100.000 habitantes que alcanza un máximo de 18 por 100.000 sobre los 75 años, siendo superado en incremento proyectado de mortalidad prematura por el cáncer testicular.',
    ],
    correctIndex: 1,
    explanation:
      'En Chile (DEIS 2021), el cáncer renal parenquimatoso (C64) tiene una tasa cruda de incidencia general de 4,9 por 100.000 habitantes, pero en hombres mayores de 65 años supera los 40 por 100.000 habitantes, con una relación hombre:mujer de 2:1 y edad media de 60–70 años. El análisis de Inzunza et al. proyecta al alza los Años de Vida Potencialmente Perdidos (AVPP) hacia 2035 (34.570 en hombres y 17.720 en mujeres).',
  },
  {
    num: 2,
    difficulty: 'intermediate',
    tags: ['cáncer renal', 'GES 83', 'salud pública', 'plazos legales', 'Chile'],
    question_text:
      'Respecto al Problema de Salud GES N° 83 (Cáncer Renal en personas de 15 años y más), ¿cuáles son los plazos máximos legales de la garantía de oportunidad para la etapificación y para el inicio del tratamiento primario o adyuvante?',
    options: [
      '30 días para la etapificación desde la sospecha diagnóstica por especialista, 45 días para el tratamiento quirúrgico primario desde la indicación y 60 días para el inicio de la terapia sistémica adyuvante.',
      '60 días para la etapificación desde la emisión del Informe de Proceso Diagnóstico (IPD), 30 días para la cirugía primaria desde la confirmación y 45 días para el inicio de la adyuvancia o radioterapia.',
      '45 días para la etapificación desde la confirmación diagnóstica (IPD), 30 días para el tratamiento primario desde la indicación médica y 30 días para el tratamiento adyuvante desde la indicación.',
      '15 días para la confirmación histológica mediante biopsia percutánea, 30 días para la etapificación tomográfica toracoabdominal y 45 días para el tratamiento quirúrgico o sistémico de primera línea.',
    ],
    correctIndex: 2,
    explanation:
      'El Decreto GES N° 83 garantiza: 1) Etapificación dentro de 45 días desde la confirmación diagnóstica (emisión del IPD por especialista); 2) Tratamiento primario (cirugía, terapia sistémica o radioterapia) dentro de 30 días desde la indicación médica; 3) Tratamiento adyuvante dentro de 30 días desde la indicación; y 4) Primer control de seguimiento dentro de 60 días tras finalizar el tratamiento.',
  },
  {
    num: 3,
    difficulty: 'intermediate',
    tags: ['cáncer renal', 'factores de riesgo', 'tabaquismo', 'subtipos histológicos'],
    question_text:
      'En relación con el tabaquismo como factor de riesgo para el carcinoma de células renales (estudio de Gansler et al. citado en el capítulo), ¿cuál de las siguientes afirmaciones describe con exactitud su magnitud de riesgo y su relación con los subtipos histológicos?',
    options: [
      'Tiene un RR de 1,5 en hombres y 1,2 en mujeres, fumar > 20 cigarrillos/día duplica el riesgo, tras 15 años de cesación cae 15–30% y el subtipo cromófobo tiene la mayor proporción de nunca fumadores (62%).',
      'Presenta un riesgo relativo de 2,8 en hombres y 2,1 en mujeres, fumar > 10 cigarrillos/día triplica el riesgo, tras 25 años de cesación cae 10–15% y el subtipo papilar tiene la mayor proporción de nunca fumadores (68%).',
      'Está presente en el 65% de los casos de CCR, muestra un riesgo relativo idéntico de 2,4 en ambos sexos, requiere 5 años de abstinencia para normalizarse y se asocia selectivamente al carcinoma colector y cromófobo.',
      'Presenta un riesgo relativo de 1,2 en hombres y 1,9 en mujeres, el consumo de > 20 cigarrillos/día cuadruplica el riesgo de variante cromófoba y la mayor proporción de nunca fumadores ocurre en células claras (62%).',
    ],
    correctIndex: 0,
    explanation:
      'El tabaquismo se presenta en el 20–30% de los CCR con un riesgo relativo de 1,5 en hombres y 1,2 en mujeres (duplicándose sobre 20 cigarrillos/día); tras 15 años de cesación el riesgo cae entre 15% y 30%. En el estudio de Gansler et al., el CCR cromófobo tuvo la mayor proporción de nunca fumadores (62%), a diferencia del CCR de células claras y papilar.',
  },
  {
    num: 4,
    difficulty: 'intermediate',
    tags: ['cáncer renal', 'obesidad', 'paradoja de la obesidad', 'pronóstico'],
    question_text:
      '¿En qué consiste el fenómeno clínico descrito como la "paradoja de la obesidad" en los pacientes con carcinoma de células renales y qué mecanismos biológicos explican el rol etiológico inicial del exceso de tejido adiposo?',
    options: [
      'Aunque la obesidad reduce la incidencia inicial de CCR al disminuir la biodisponibilidad de IGF-I libre y estrógenos, en los pacientes ya diagnosticados un IMC elevado duplica la mortalidad específica por cáncer.',
      'La obesidad incrementa el riesgo de desarrollar CCR exclusivamente en tumores cromófobos mediante déficit de adiponectina, pero protege contra la aparición de diferenciación sarcomatoide en tumores localmente avanzados.',
      'El exceso de tejido adiposo visceral promueve tumores benignos como el oncocitoma por estímulo mitocondrial directo, mientras que la baja de peso paraneoplásica actúa como factor protector frente a las metástasis.',
      'Aunque un IMC alto es factor de riesgo para desarrollar CCR (~40%, vía IGF-I, adipocitoquinas y peroxidación lipídica), en pacientes ya diagnosticados se asocia linealmente con mejor sobrevida cáncer-específica.',
    ],
    correctIndex: 3,
    explanation:
      'La obesidad se vincula etiológicamente a cerca del 40% de los CCR mediante elevación de IGF-I libre, hormonas sexuales, adipocitoquinas y peroxidación lipídica. Sin embargo, una vez establecido el diagnóstico (tanto en enfermedad localizada como metastásica), múltiples estudios confirman la "paradoja de la obesidad": un IMC más alto se asocia con mayor supervivencia específica por cáncer (CSM) y global.',
  },
  {
    num: 5,
    difficulty: 'intermediate',
    tags: ['cáncer renal', 'síndromes hereditarios', 'Birt-Hogg-Dubé', 'HLRCC', 'VHL'],
    question_text:
      'Un paciente de 39 años consulta por masas renales bilaterales. Presenta pápulas blanquecinas faciales compatibles con fibrofoliculomas y antecedente de neumotórax espontáneo por quistes pulmonares. ¿Cuál es el síndrome hereditario, el gen mutado y los tumores renales característicos?',
    options: [
      'Síndrome de Birt-Hogg-Dubé por mutación del gen FLCN (17p11.2), asociado a carcinoma renal cromófobo, oncocitoma renal y tumores híbridos oncocíticos-cromófobos.',
      'Leiomiomatosis hereditaria y CCR (HLRCC) por mutación del gen fumarato hidratasa FH (1q42), asociado a carcinoma renal papilar agresivo y angiomiolipomas quísticos.',
      'Enfermedad de Von Hippel-Lindau por mutación del gen VHL (3p25-26), asociado a carcinoma renal de células claras multifocal, feocromocitoma y tumores del saco endolinfático.',
      'Síndrome de esclerosis tuberosa por mutación de los genes TSC1/TSC2 (9q34/16p13), asociado a carcinoma renal cromófobo multifocal, rabdomiomas cardíacos y linfangioleiomiomatosis.',
    ],
    correctIndex: 0,
    explanation:
      'El síndrome de Birt-Hogg-Dubé (BHD), causado por mutación germinal autosómica dominante del gen de la foliculina (FLCN / BHD1 en 17p12q11), se caracteriza por la tríada de fibrofoliculomas cutáneos, quistes pulmonares con neumotórax espontáneo y tumores renales de estirpe distal/intercalada: CCR cromófobo, oncocitoma y tumores híbridos oncocíticos.',
  },
  {
    num: 6,
    difficulty: 'intermediate',
    tags: ['cáncer renal', 'HLRCC', 'fumarato hidratasa', 'c-MET', 'genética'],
    question_text:
      '¿Qué diferencia genética, histopatológica y de conducta clínica distingue al Carcinoma Renal Papilar Hereditario clásico del síndrome de Leiomiomatosis Hereditaria y Carcinoma de Células Renales (HLRCC)?',
    options: [
      'El CCR papilar hereditario se debe a inactivación del gen supresor MET (1q42) originando tumores solitarios muy agresivos, mientras que el HLRCC se debe a activación del protooncogén FH (7q31) originando tumores indolentes.',
      'El CCR papilar hereditario se debe a mutación activadora del protooncogén c-MET (7q31) con tumores papilares clásicos multifocales, mientras que el HLRCC se debe a mutación del gen FH (1q42) con tumores papilares muy agresivos.',
      'Ambos síndromes comparten la trisomía germinal de los cromosomas 7 y 17 como alteración primaria, diferenciándose únicamente en que el HLRCC asocia hemangioblastomas cerebelosos y feocromocitomas bilaterales.',
      'El CCR papilar hereditario exige nefrectomía radical profiláctica inmediata al diagnóstico sin margen para vigilancia, mientras que en el síndrome HLRCC se recomienda vigilancia activa hasta que el tumor alcance los 3 cm.',
    ],
    correctIndex: 1,
    explanation:
      'El CCR papilar hereditario tipo 1 se produce por mutación activadora del protooncogén c-MET en 7q31 (susceptible a vigilancia hasta el umbral de 3 cm), mientras que el HLRCC se produce por mutación del gen fumarato hidratasa (FH) en 1q42, asociando leiomiomas cutáneos y uterinos con un CCR papilar/tubulopapilar solitario sumamente agresivo que exige escisión quirúrgica inmediata con márgenes amplios.',
  },
  {
    num: 7,
    difficulty: 'intermediate',
    tags: ['tumores renales benignos', 'oncocitoma', 'OMS 2022', 'biopsia renal'],
    question_text:
      'Con respecto al oncocitoma renal y los criterios de la Clasificación de la OMS 2022 descritos en el Manual de Urología, ¿cuál de las siguientes afirmaciones es correcta en relación con su origen celular, inmunohistoquímica y diagnóstico por biopsia percutánea?',
    options: [
      'Deriva del epitelio del túbulo contorneado proximal, expresa intensamente CK7, CD10 y vimentina, y la biopsia percutánea con aguja gruesa alcanza una concordancia del 96% con la pieza quirúrgica definitiva.',
      'Deriva de células epitelioides perivasculares del estroma cortical, expresa HMB-45 y Melan-A de forma difusa, y el hallazgo de una cicatriz estrellada central en la TC trifásica descarta un carcinoma renal.',
      'Deriva de las células intercaladas del túbulo colector, presenta tinción CK7 negativa o solo focal, y la OMS 2022 establece que no debe hacerse el diagnóstico definitivo de oncocitoma solo con biopsia por aguja.',
      'Deriva del segmento grueso ascendente del asa de Henle, presenta pérdida difusa de SDHB e INI1, y el estudio de SPECT/TC con 99mTc-Sestamibi resulta característicamente fotopénico por escasez de mitocondrias.',
    ],
    correctIndex: 2,
    explanation:
      'El oncocitoma (5% de los tumores renales) deriva de las células intercaladas del túbulo colector, se compone de oncocitos ricos en mitocondrias (captantes en SPECT/TC con 99mTc-Sestamibi) y es CK7 negativo o focal (<5%). Debido al solapamiento con la variante eosinofílica del CCR cromófobo y tumores híbridos (concordancia biopsia-cirugía de solo 64,6%), la OMS 2022 desaconseja emitir un diagnóstico definitivo de oncocitoma solo con biopsia por aguja.',
  },
  {
    num: 8,
    difficulty: 'intermediate',
    tags: ['angiomiolipoma', 'síndrome de Wünderlich', 'HMB-45', 'esclerosis tuberosa'],
    question_text:
      'Una paciente de 36 años con esclerosis tuberosa ingresa de urgencia por dolor lumbar agudo e inestabilidad hemodinámica, evidenciándose en la TC un hematoma retroperitoneal espontáneo masivo originado en una lesión cortical renal con áreas de -45 UH. ¿Cuál es el diagnóstico, el marcador inmunohistoquímico característico del tumor y el manejo agudo de elección?',
    options: [
      'Síndrome de Stauffer secundario a oncocitoma renal hemorrágico (CK7 positivo y vimentina negativo); el manejo agudo de primera línea es la nefrectomía radical abierta de urgencia por vía transperitoneal.',
      'Síndrome de Guyon secundario a carcinoma renal de células claras quístico (PAX8 y CA-IX positivo); el manejo agudo de primera línea es la nefrectomía parcial laparoscópica inmediata con clampeo en bloque.',
      'Síndrome de Wünderlich secundario a nefroma quístico multilocular (AMACR y CD10 positivo); el manejo agudo de primera línea es la crioablación percutánea de urgencia guiada por tomografía computarizada.',
      'Síndrome de Wünderlich secundario a angiomiolipoma renal (HMB-45 positivo y CK/EMA negativo); el manejo agudo de primera línea es la angioembolización selectiva transarterial preservadora de nefronas.',
    ],
    correctIndex: 3,
    explanation:
      'El angiomiolipoma (PEComa benigno, M:H 4:1, asociado en 50% a esclerosis tuberosa) se diagnostica en TC al identificar grasa macroscópica (< -20 UH) y en inmunohistoquímica por positividad para HMB-45 con negatividad para citoqueratinas (CK) y EMA. Su complicación hemorrágica retroperitoneal espontánea masiva es el síndrome de Wünderlich, cuyo tratamiento de primera línea es la angioembolización selectiva para controlar el sangrado preservando parénquima renal.',
  },
  {
    num: 9,
    difficulty: 'intermediate',
    tags: ['carcinoma de células claras', 'MCNLMP', 'OMS 2022', 'patología'],
    question_text:
      'En la clasificación OMS 2022, ¿qué criterio histopatológico y evolutivo define a la "neoplasia renal quística multilocular de bajo potencial maligno" (MCNLMP) y la distingue de un carcinoma renal de células claras con degeneración quística?',
    options: [
      'Es una lesión exclusivamente quística revestida por células claras de bajo grado (OMS/ISUP 1–2), sin nódulos sólidos expansivos ni necrosis tumoral, con curso 100% indolente sin metástasis reportadas.',
      'Presenta quistes tapizados por células claras de grado nuclear OMS/ISUP 3, con pequeños nódulos expansivos menores de 5 mm en los septos fibrosos y una tasa de recurrencia metastásica inferior al 5%.',
      'Es una lesión quística originada en el túbulo colector distal que expresa CK7 y AMACR de forma difusa, carece de deleción del cromosoma 3p y progresa a carcinoma sarcomatoide en el 15% de los casos.',
      'Corresponde a cualquier tumor renal de células claras menor de 4 cm (cT1a) que presente más de un 50% de componente líquido en la resonancia magnética, independientemente del grosor de sus tabiques.',
    ],
    correctIndex: 0,
    explanation:
      'La neoplasia renal quística multilocular de bajo potencial maligno (MCNLMP, 0,5–2,5% de las neoplasias renales) comparte la deleción 3p/mutación VHL con el CCRcc, pero histológicamente es puramente quística, tapizada por una o pocas capas de células claras de bajo grado (ISUP 1–2) sin agregados nodulares expansivos ni necrosis. Su pronóstico es excelente, sin metástasis ni recidivas descritas tras su resección.',
  },
  {
    num: 10,
    difficulty: 'intermediate',
    tags: ['carcinoma renal papilar', 'OMS 2022', 'inmunohistoquímica', 'citogenética'],
    question_text:
      'Respecto al Carcinoma Renal Papilar (CCRp), ¿cuál es su perfil citogenético e inmunohistoquímico clásico y qué modificación introdujo la clasificación de la OMS 2022 sobre su subclasificación histológica?',
    options: [
      'Se caracteriza por deleción 3p y mutación de TP53, positividad para HMB-45 y negatividad para CK7; la OMS 2022 ratificó la división pronóstica obligatoria en los subtipos Tipo 1 (basofílico) y Tipo 2 (eosinofílico).',
      'Presenta trisomías 7 y 17 con pérdida de Y, positividad para CK7, racemasa (AMACR), CD10 y RCCm; además, la OMS 2022 eliminó la división en Tipo 1 y 2, describiendo el patrón clásico y variantes específicas.',
      'Se caracteriza por pérdidas múltiples de los cromosomas 1, 2, 6, 10, 13 y 17, positividad exclusiva para vimentina y anhidrasa carbónica IX; la OMS 2022 lo reclasificó dentro de los tumores del conducto colector.',
      'Se caracteriza por translocación t(X;17) constante, negatividad para racemasa y comportamiento hipervascular en la fase corticomedular; la OMS 2022 agregó formalmente el subtipo Tipo 3 micropapilar.',
    ],
    correctIndex: 1,
    explanation:
      'El CCR papilar (13–20% de los CCR) es típicamente hipovascular, frecuentemente multifocal/bilateral, presenta trisomía de los cromosomas 7 y 17 con pérdida del cromosoma Y y alteraciones en MET, y expresa CK7 (+), AMACR/P504S (+), CD10 (+) y RCCm (+). En la OMS 2022 se abandonó la subdivisión en Tipo 1 y 2, describiéndose el patrón clásico y nuevas variantes (bifásica alveoloescamosa, polaridad nuclear inversa y tipo Warthin).',
  },
  {
    num: 11,
    difficulty: 'intermediate',
    tags: ['carcinoma renal cromófobo', 'graduación OMS/ISUP', 'pronóstico', 'patología'],
    question_text:
      '¿Cuál de las siguientes características citogenéticas, histopatológicas y pronósticas corresponde al Carcinoma Renal Cromófobo (CCRch) según el Manual de Urología?',
    options: [
      'Representa el 15% de los CCR, presenta células con citoplasma rico en glucógeno sin halo perinuclear, se gradúa obligatoriamente con el sistema OMS/ISUP y tiene una sobrevida global a 5 años del 72%.',
      'Representa el 10% de los CCR, se origina en el túbulo contorneado proximal, presenta mutación inactivante de VHL en el 90% de los casos y es el subtipo con menor frecuencia de transformación sarcomatoide.',
      'Es el 5% de los CCR, muestra células pálidas con halo perinuclear, pérdidas cromosómicas múltiples (1, 2, 6, 10, 13, 17, 21, Y), no se gradúa con el sistema OMS/ISUP y tiene sobrevida global a 5 años de 91%.',
      'Representa el 5% de los CCR, es invariablemente negativo para CK7 y fuertemente positivo para vimentina, y requiere linfadenectomía retroperitoneal ampliada de rutina por su alta tasa de metástasis ganglionares.',
    ],
    correctIndex: 2,
    explanation:
      'El CCR cromófobo (5% de los CCR) muestra células grandes pálidas reticuladas con halo perinuclear y membrana celular prominente, pérdidas cromosómicas múltiples (1, 2, 6, 10, 13, 17, 21, Y) y mutación de TP53 en 27%. Debido a su atipia nuclear constitutiva, no se le debe aplicar la graduación nuclear OMS/ISUP. Es el subtipo con mayor sobrevida global a 5 años (91%) y libre de recurrencia (94,3%).',
  },
  {
    num: 12,
    difficulty: 'intermediate',
    tags: ['graduación nuclear', 'OMS/ISUP', 'diferenciación sarcomatoide', 'rabdoide'],
    question_text:
      'De acuerdo con el sistema de clasificación nuclear de la OMS/ISUP (que sustituyó a la escala de Fuhrman), ¿qué criterios definen exactamente a los Grados 1 a 4 y qué significado tiene la diferenciación sarcomatoide o rabdoide?',
    options: [
      'Los grados 1 a 3 se definen exclusivamente por el diámetro nuclear en micrómetros y la irregularidad de la membrana nuclear, mientras que la diferenciación sarcomatoide constituye un sarcoma mesenquimático primario independiente.',
      'El grado 1 corresponde a ausencia de figuras mitóticas, el grado 2 a menos de 5 mitosis por campo, el grado 3 a necrosis coagulativa focal, y el grado 4 se reserva únicamente para los tumores del conducto colector y medulares.',
      'La graduación nuclear OMS/ISUP se aplica por igual a oncocitomas, carcinomas cromófobos y angiomiolipomas epitelioides, asignando el Grado 3 cuando existe diferenciación rabdoide o sarcomatoide focal menor al 10%.',
      'Los grados 1 a 3 se definen por la prominencia nucleolar (invisible a 400x en G1; visible a 400x pero no a 100x en G2; prominente a 100x en G3), y cualquier diferenciación sarcomatoide o rabdoide asigna Grado 4.',
    ],
    correctIndex: 3,
    explanation:
      'El sistema OMS/ISUP (Tabla 10 del Manual) gradúa los grados 1, 2 y 3 exclusivamente por la visualización y prominencia de los nucléolos a 400x y 100x. El Grado 4 se define por pleomorfismo nuclear extremo, células gigantes multinucleadas y/o la presencia de diferenciación sarcomatoide o rabdoide (que no es un subtipo independiente, sino un patrón de desdiferenciación que puede presentarse en cualquier subtipo de CCR).',
  },
  {
    num: 13,
    difficulty: 'intermediate',
    tags: ['clínica', 'tríada de Guyon', 'varicocele', 'presentación incidental'],
    question_text:
      'En la práctica urológica actual descrita en el capítulo, ¿qué porcentaje de los cánceres renales se diagnostica de forma incidental asintomática, con qué frecuencia se presenta la tríada clásica de Guyon y qué hallazgo escrotal orienta a compromiso venoso retroperitoneal?',
    options: [
      'Más del 60% son incidentales (> 80% detectados por ecografía), la tríada de Guyon ocurre en solo el 9% ("tríada del demasiado tarde") y hasta un 11% puede presentar varicocele de inicio súbito o no reductible en decúbito.',
      'El 35% son hallazgos incidentales, la tríada clásica de Guyon aparece en el 30% de los casos iniciales y la presencia de hidrocele comunicante derecho de aparición brusca sugiere invasión de la vena cava inferior.',
      'El 85% debuta con hematuria macroscópica indolora monosintomática, la tríada de Guyon se observa en el 22% de los pacientes y el varicocele reductible bilateral constituye el síndrome paraneoplásico más frecuente.',
      'El 50% se detecta mediante tomografía de tamizaje poblacional, la tríada de Guyon aparece en el 18% de los tumores T1a y el varicocele agudo ocurre exclusivamente en tumores del polo inferior derecho por compresión ureteral.',
    ],
    correctIndex: 0,
    explanation:
      'Más del 60% de los CCR se detectan hoy incidentalmente (más del 80% de ellos por ecografía). La tríada clásica de Guyon (hematuria, dolor en flanco y masa palpable) se observa en apenas el 9% y suele traducir enfermedad avanzada. El varicocele agudo o no reductible en decúbito (hasta 11%, sobre todo izquierdo porque la vena gonadal izquierda drena en ángulo recto en la vena renal izquierda) sugiere obstrucción por trombo tumoral.',
  },
  {
    num: 14,
    difficulty: 'intermediate',
    tags: ['síndromes paraneoplásicos', 'síndrome de Stauffer', 'IL-6', 'pronóstico'],
    question_text:
      'Un paciente con una masa renal sólida de 8 cm cT2aN0M0 presenta fiebre vespertina, baja de peso, fosfatasas alcalinas al triple del valor normal, hipoalbuminemia y prolongación del tiempo de protrombina, con tomografía trifásica sin lesiones focales hepáticas. ¿Cuál es el diagnóstico, su mediador fisiopatológico y su evolución esperada tras la nefrectomía?',
    options: [
      'Colangitis esclerosante paraneoplásica mediada por factor de necrosis tumoral alfa (TNF-α); no revierte tras la nefrectomía radical y obliga a iniciar quimioterapia citotóxica sistémica antes de plantear la cirugía.',
      'Síndrome de Stauffer mediado por sobreproducción de interleucina-6 (IL-6); remite en el 60–70% de los casos tras la nefrectomía, mientras que su persistencia o reaparición indica tumor viable residual y mal pronóstico.',
      'Amiloidosis hepática secundaria tipo AA mediada por secreción ectópica de eritropoyetina; se resuelve espontáneamente en el 95% de los pacientes a las 48 horas de realizar una angioembolización arterial renal.',
      'Enfermedad micrometastásica hepática difusa productora de péptido relacionado con PTH (PTH-rp); contraindica la nefrectomía radical y exige realizar biopsia hepática percutánea previa al inicio de inmunoterapia.',
    ],
    correctIndex: 1,
    explanation:
      'El síndrome de Stauffer (presente en el 3–20% / 14,4% de los CCR) es una disfunción hepática paraneoplásica NO metastásica mediada por IL-6 (que induce una hepatitis reactiva linfocítica con elevación de FA, hipoalbuminemia y prolongación de TP en 67%, e hiperbilirrubinemia en 20–30%). Tras la nefrectomía se normaliza en el 60–70% de los pacientes; su persistencia postoperatoria indica presencia de tumor viable residual.',
  },
  {
    num: 15,
    difficulty: 'intermediate',
    tags: ['síndromes paraneoplásicos', 'hipercalcemia', 'anemia', 'policitemia', 'frecuencia'],
    question_text:
      'En relación con los síndromes paraneoplásicos endocrinos y hematológicos del carcinoma de células renales (Tabla 12 del Manual), ¿cuál de las siguientes correlaciones fisiopatológicas y de frecuencia clínica es verdadera?',
    options: [
      'La policitemia por secreción ectópica de eritropoyetina es mucho más frecuente (36,3%) que la anemia normocítica, y la hipercalcemia paraneoplásica se acompaña característicamente de niveles séricos muy elevados de PTH intacta.',
      'La hipercalcemia paraneoplásica ocurre en el 45% de los tumores cromófobos en estadio clínico T1a y constituye por sí sola el principal factor pronóstico independiente de mortalidad específica en la enfermedad localizada.',
      'La elevación de la VHS (55,6%), la hipertensión arterial (37,5%) y la anemia normocítica (36,3%, asociada a lactoferrina/ferritina e IL-6) son las más frecuentes, y la hipercalcemia humoral por PTH-rp cursa con PTH y fósforo bajos.',
      'La hipertensión arterial paraneoplásica ocurre en menos del 3% de los pacientes con CCR y se produce exclusivamente por hiperaldosteronismo primario secundario a invasión directa de la corteza suprarrenal ipsilateral.',
    ],
    correctIndex: 2,
    explanation:
      'Según la Tabla 12 del capítulo, las manifestaciones paraneoplásicas más frecuentes son el aumento de la VHS (55,6%), la hipertensión arterial (37,5%, por secreción de renina, compresión parenquimatosa/ureteral o fístula AV) y la anemia normocítica-normocrómica (36,3%, vinculada a lactoferrina, ferritina e IL-6). La policitemia por EPO ectópica ocurre en solo ~3,5%, y la hipercalcemia humoral (4,9–20%) es mediada por PTH-rp o prostaglandinas, cursando con calcio alto pero fósforo y PTH sérica disminuidos.',
  },
  {
    num: 16,
    difficulty: 'intermediate',
    tags: ['imagenología', 'tomografía computarizada', 'unidades Hounsfield', 'realce'],
    question_text:
      'En el estudio de una masa renal mediante tomografía computarizada multidetector (TCMD) multifásica, ¿qué variación en Unidades Hounsfield (UH) tras la administración de contraste intravenoso define un realce sólido significativo sugerente de CCR y qué porcentaje de masas sólidas pequeñas (< 4 cm) operadas resulta ser benigno?',
    options: [
      'Un incremento de atenuación > 5 a 8 UH define realce sólido maligno en la fase corticomedular, y menos del 2% de las masas renales sólidas menores de 4 cm resecadas quirúrgicamente corresponde a patología benigna.',
      'Un incremento de atenuación > 45 a 50 UH es el umbral mínimo para considerar realce tumoral en la fase nefrológica, y cerca del 55% de las masas sólidas menores de 4 cm operadas corresponde a angiomiolipomas ricos en grasa.',
      'Una atenuación basal ≥ 70 UH en la fase sin contraste confirma de inmediato un carcinoma renal papilar, dado que los quistes hemorrágicos o hiperproteicos benignos nunca superan las 30 UH antes del medio de contraste.',
      'Un incremento de atenuación > 15 a 20 UH define realce sólido significativo post-contraste, y aproximadamente el 20% de las masas renales sólidas pequeñas (< 4 cm) hipercaptantes operadas resulta ser benigno en la histología.',
    ],
    correctIndex: 3,
    explanation:
      'En la TCMD multifásica, un aumento de atenuación > 15–20 UH entre la fase sin contraste y la fase nefrológica tras contraste IV indica vascularización sólida compatible con CCR (aunque no distingue con certeza CCR de oncocitoma o AML pobre en grasa). De hecho, ~20% de las masas sólidas pequeñas (< 4 cm) operadas bajo sospecha de CCR resultan ser lesiones benignas (estudio de Kutikov et al.).',
  },
  {
    num: 17,
    difficulty: 'intermediate',
    tags: ['clasificación de Bosniak 2019', 'Bosniak IIF', 'Bosniak III', 'quistes renales'],
    question_text:
      'Según la actualización 2019 de la Clasificación de Bosniak para masas renales quísticas en TC y RM (Figuras 2 y 3 del Manual), ¿qué criterios morfológicos exactos diferencian a un quiste Bosniak IIF de un quiste Bosniak III y cuál es la conducta recomendada en el Bosniak IIF?',
    options: [
      'Bosniak IIF tiene pared/septos lisos de 3 mm o ≥ 4 septos ≤ 2 mm con realce y sigue control por imágenes (6 y 12 meses, luego anual por 5 años); Bosniak III tiene paredes/septos ≥ 4 mm o protrusiones ≤ 3 mm obtusas (~50% malignos).',
      'Bosniak IIF presenta paredes o septos con realce e irregularidades de 4 a 6 mm y requiere biopsia percutánea inmediata; Bosniak III presenta nódulos convexos ≥ 4 mm con márgenes agudos y una probabilidad de malignidad cercana al 90%.',
      'Bosniak IIF incluye únicamente quistes simples hiperatenuantes ≥ 70 UH sin realce que no requieren seguimiento adicional; Bosniak III incluye quistes con 1 a 3 tabiques delgados ≤ 2 mm con calcificación lineal parietal y 10% de malignidad.',
      'Bosniak IIF presenta un riesgo de malignidad del 50% y exige nefrectomía parcial diferida a los 6 meses del diagnóstico; Bosniak III presenta un riesgo de malignidad del 90% y exige nefrectomía radical inmediata sin vigilancia.',
    ],
    correctIndex: 0,
    explanation:
      'La versión Bosniak 2019 objetivó las mediciones: Bosniak IIF tiene pared o septos con engrosamiento liso de 3 mm con realce o ≥ 4 septos delgados (≤ 2 mm) con realce (~10% malignos pero indolentes; seguimiento a los 6 y 12 meses y luego anual por 5 años). Bosniak III presenta paredes o septos engrosados ≥ 4 mm o realce irregular (protrusiones convexas ≤ 3 mm con márgenes obtusos), con ~50% de malignidad.',
  },
  {
    num: 18,
    difficulty: 'intermediate',
    tags: ['clasificación de Bosniak 2019', 'Bosniak IV', 'nódulos', 'protrusiones'],
    question_text:
      'En la Clasificación de Bosniak 2019 (Figura 4 del Manual), ¿cómo se define radiológicamente un "nódulo" con realce que clasifica a una lesión quística en la categoría Bosniak IV (~90% de probabilidad de malignidad) a diferencia de un engrosamiento irregular Bosniak III?',
    options: [
      'Cualquier calcificación nodular parietal mayor de 3 mm de espesor alojada en un tabique interno, independientemente de si presenta o no realce medible tras la administración de contraste intravenoso.',
      'Una protrusión convexa focal con realce que mide ≥ 4 mm cuando forma márgenes obtusos con la pared o tabique, o bien de cualquier tamaño cuando forma márgenes agudos con la pared o tabique.',
      'Una protrusión convexa suave con realce que mide entre 1 y 3 mm formando márgenes obtusos respecto a la pared quística, acompañada de al menos cuatro tabiques internos delgados menores de 2 mm.',
      'Un tabique interno vascularizado completo de 3 mm de espesor que divide la cavidad quística en múltiples lóculos con hiperintensidad heterogénea en la secuencia ponderada en T1 con saturación grasa.',
    ],
    correctIndex: 1,
    explanation:
      'En Bosniak 2019 (Figura 4), la distinción entre irregularidad (Bosniak III) y nódulo sólido (Bosniak IV) depende del tamaño y del ángulo con la pared/septo: si los márgenes son obtusos, ≤ 3 mm es engrosamiento irregular (Bosniak III) y ≥ 4 mm es nódulo (Bosniak IV); en cambio, si la protrusión realzada tiene márgenes agudos (ángulos agudos/pediculados con la pared), se define como nódulo (Bosniak IV) de cualquier tamaño.',
  },
  {
    num: 19,
    difficulty: 'intermediate',
    tags: ['resonancia magnética', 'ccLS', 'CEUS', 'trombo venoso'],
    question_text:
      '¿Qué ventajas diagnósticas específicas aportan la resonancia magnética multiparamétrica (incluyendo el puntaje ccLS) y la ecografía con contraste (CEUS) frente a la tomografía computarizada en la evaluación de masas renales?',
    options: [
      'La RM es inferior a la TC para delimitar el nivel cefálico del trombo en la vena cava inferior, pero el puntaje ccLS permite diagnosticar con 100% de certeza los oncocitomas renales evitando la biopsia y el seguimiento.',
      'La CEUS utiliza microburbujas de excreción tubular renal que están contraindicadas en pacientes con enfermedad renal crónica etapa 4, pero supera a la RM multiparamétrica en la estadificación ganglionar retroperitoneal.',
      'La RM supera a la TC en quistes Bosniak IIF–III (sensibilidad 71% vs. 36%), delimita en T2 el trombo en VCI y usa el score ccLS (1–5) para predecir CCRcc en masas pequeñas, mientras la CEUS destaca en quistes complejos.',
      'El puntaje ccLS (clear cell Likelihood Score) es una escala de 10 puntos exclusiva de la tomografía por emisión de positrones (PET-CT con FDG) que constituye el estándar de oro actual en la etapificación inicial.',
    ],
    correctIndex: 2,
    explanation:
      'La RM multiparamétrica supera a la TC en quistes complejos Bosniak IIF–III (sensibilidad 71% vs. 36%), es el examen de elección (secuencia T2) para definir la extensión cefálica del trombo tumoral en VCI, es segura en embarazo e insuficiencia renal, e incorpora el score ccLS (escala de 5 niveles) para predecir CCRcc en masas pequeñas. La CEUS (ecografía con contraste) logra sensibilidad cercana al 100% y especificidad del 97% en quistes complejos.',
  },
  {
    num: 20,
    difficulty: 'intermediate',
    tags: ['etapificación', 'TC de tórax', 'cintigrama óseo', 'PET-CT'],
    question_text:
      'Respecto a los estudios de imagen para la etapificación a distancia del carcinoma de células renales según la evidencia analizada en el capítulo (Voss et al., Koga et al. y guías EAU), ¿en qué escenario clínico puede omitirse la TC de tórax y cuándo se solicita cintigrama óseo o neuroimagen?',
    options: [
      'La TC de tórax puede omitirse en todos los tumores cT1b y cT2a clínicamente asintomáticos, mientras que el cintigrama óseo con tecnecio-99m es obligatorio de rutina en todo paciente antes de una nefrectomía parcial.',
      'La radiografía de tórax simple posee mayor sensibilidad que la TC de tórax en tumores localmente avanzados cT3a, y la resonancia magnética cerebral debe solicitarse de rutina en todos los pacientes con tumores mayores de 3 cm.',
      'El PET-CT con 18F-FDG posee una sensibilidad del 98% para caracterizar el tumor renal primario y ha reemplazado a la tomografía computarizada multifásica abdominal y torácica en la estadificación preoperatoria inicial.',
      'La TC de tórax puede omitirse en tumores cT1a cN0 sin síntomas sistémicos, anemia ni trombocitosis (< 1% riesgo de metástasis pulmonar), reservándose el cintigrama óseo y la neuroimagen solo si hay síntomas o FA elevada.',
    ],
    correctIndex: 3,
    explanation:
      'Aunque la TC de tórax es el método más sensible para metástasis pulmonares, el modelo validado por Voss et al. demuestra que en tumores cT1a (≤ 4 cm) cN0 sin síntomas sistémicos, anemia ni trombocitosis el riesgo de metástasis pulmonar es < 1%, pudiendo omitirse. Asimismo, el cintigrama óseo y la RM/TC cerebral solo están indicados si hay dolor óseo, síntomas neurológicos o fosfatasa alcalina elevada, y el PET-CT no es estándar por su baja sensibilidad.',
  },
  {
    num: 21,
    difficulty: 'intermediate',
    tags: ['biopsia de masa renal', 'rendimiento diagnóstico', 'indicaciones', 'limitaciones'],
    question_text:
      'Al evaluar el rendimiento diagnóstico y las indicaciones de la Biopsia de Masa Renal (BMR) percutánea con aguja gruesa, ¿cuál de las siguientes afirmaciones refleja fielmente la evidencia expuesta en el Manual de Urología?',
    options: [
      'Tiene sensibilidad de 92%, especificidad de 90% y VPP de 99,8%, pero 10–20% de muestras no diagnósticas y subestima el grado nuclear; se indica previo a ablación, vigilancia activa o terapia sistémica sin cirugía.',
      'Posee una concordancia del 99% para el grado nuclear OMS/ISUP respecto a la pieza operatoria, tiene menos de 1% de muestras no diagnósticas y está indicada de forma obligatoria en todas las lesiones quísticas puras Bosniak III.',
      'Está formalmente contraindicada en pacientes con antecedente de otra neoplasia extrarrenal previa, dado que menos del 0,5% de las masas renales sólidas en pacientes oncológicos corresponden a metástasis secundarias.',
      'Su principal ventaja clínica es descartar con absoluta certeza un carcinoma de alto grado cuando el cilindro informa grado nuclear 1, por lo que reemplaza a la nefrectomía parcial en pacientes jóvenes candidatos a cirugía.',
    ],
    correctIndex: 0,
    explanation:
      'La BMR con aguja gruesa tiene alta precisión para malignidad (sensibilidad 92%, especificidad 90%, VPP 99,8%), pero en un 10–20% resulta no diagnóstica y por heterogeneidad tumoral subestima frecuentemente el grado nuclear (un bajo grado en biopsia no descarta alto grado en la pieza). Se indica previo a ablación térmica, vigilancia activa, sospecha de metástasis renal (que representa el 7–13% en pacientes oncológicos) o antes de terapia sistémica sin cirugía.',
  },
  {
    num: 22,
    difficulty: 'intermediate',
    tags: ['clasificación TNM', 'pT3a', 'pT3b', 'pT3c', 'pT4', 'glándula suprarrenal'],
    question_text:
      'De acuerdo con la Clasificación TNM del carcinoma de células renales (Tabla 14, Guía EAU 2025), ¿cómo se estadifica un tumor que invade la pared de la vena cava inferior a nivel infradiafragmático y cómo se diferencia la invasión suprarrenal T4 de la M1?',
    options: [
      'La invasión directa de la pared de la VCI infradiafragmática se clasifica como pT3b, mientras que cualquier compromiso tumoral de la glándula suprarrenal ipsilateral (contiguo o a distancia) se clasifica como pT3a.',
      'La invasión de la pared de la VCI (a cualquier nivel) o el trombo supradiafragmático es pT3c; la invasión suprarrenal ipsilateral por contigüidad es pT4, mientras que el compromiso suprarrenal no contiguo es M1.',
      'El compromiso de la grasa del seno renal y pelvicalicial se clasifica como pT2b, el trombo limitado a la vena renal principal corresponde a pT3b y el sobrepaso de la fascia de Gerota corresponde a la categoría pT3c.',
      'El trombo en la vena cava infradiafragmática sin invasión parietal se clasifica como pT3a, y la invasión directa por contigüidad de la glándula suprarrenal ipsilateral desde un tumor del polo superior se clasifica como pT3b.',
    ],
    correctIndex: 1,
    explanation:
      'En el sistema TNM (Tabla 14): pT3a incluye invasión de vena renal, grasa perirrenal o grasa del seno renal; pT3b es trombo en VCI infradiafragmática; pT3c es trombo en VCI supradiafragmática O invasión directa de la pared de la VCI (sin importar la altura). El estadio pT4 comprende la invasión más allá de la fascia de Gerota o la invasión por contigüidad directa de la suprarrenal ipsilateral (si el implante suprarrenal no es contiguo, es M1).',
  },
  {
    num: 23,
    difficulty: 'intermediate',
    tags: ['nefrectomía parcial', 'tiempo de isquemia', 'función renal', 'Parekh'],
    question_text:
      'En relación con la nefrectomía parcial y el tiempo de isquemia renal (estudios de Parekh et al., Lee et al. y Simone et al. citados en el capítulo), ¿cuál es la conclusión actual sobre la tolerancia del riñón humano a la isquemia y los determinantes de la función renal postoperatoria?',
    options: [
      'Un tiempo de isquemia caliente superior a 20 minutos produce necrosis cortical irreversible en más del 80% de los riñones humanos, siendo los minutos de clampeo arterial el único predictor de enfermedad renal crónica postoperatoria.',
      'La nefrectomía parcial sin isquemia (técnica off-clamp) ha demostrado duplicar la sobrevida global a 5 años y reducir a cero las complicaciones hemorrágicas en comparación con el clampeo hiliar en tumores cT1b y cT2a.',
      'Aunque se recomienda isquemia caliente < 30 min, estudios prospectivos con biopsias humanas demostraron que el riñón tolera 30–60 min con daño mínimo, dependiendo la función final sobre todo del parénquima preservado.',
      'La aplicación de isquemia fría mediante hipotermia de superficie está formalmente contraindicada en tumores renales complejos porque induce espasmo y trombosis aguda de la arteria renal principal en el 40% de los pacientes.',
    ],
    correctIndex: 2,
    explanation:
      'Si bien el umbral histórico recomendado de isquemia caliente es < 25–30 minutos, el estudio prospectivo de Parekh et al. (con biopsias renales humanas pre, intra y post-isquemia) demostró que el riñón humano tolera 30–60 minutos de isquemia mucho mejor que los modelos porcinos, y que la función renal a largo plazo depende primordialmente de la cantidad y calidad del parénquima renal preservado más que de cada minuto aislado de clampeo.',
  },
  {
    num: 24,
    difficulty: 'intermediate',
    tags: ['nefrometría', 'R.E.N.A.L.', 'P.A.D.U.A.', 'complicaciones quirúrgicas'],
    question_text:
      'Al planificar una nefrectomía parcial utilizando los sistemas nefrométricos R.E.N.A.L. y P.A.D.U.A. (Tabla 16 del Manual), ¿qué rangos de puntaje definen un tumor de alta complejidad anatómica y con qué desenlaces clínicos se correlacionan?',
    options: [
      'Un puntaje ≥ 6 puntos en ambas escalas nefrométricas define alta complejidad anatómica hiliar y contraindica de forma absoluta la realización de una nefrectomía parcial por vía laparoscópica o asistida por robot.',
      'El índice R.E.N.A.L. cuantifica el grado nuclear OMS/ISUP en la biopsia y el nivel de creatinina sérica preoperatoria, mientras que el índice P.A.D.U.A. mide la extensión cefálica del trombo en la vena cava inferior.',
      'Un puntaje de 4 a 6 puntos en la escala R.E.N.A.L. identifica a un tumor 100% endofítico de más de 7 cm en estrecho contacto con el sistema colector que debe manejarse mediante nefrectomía radical de entrada.',
      'Un puntaje ≥ 10 tanto en R.E.N.A.L. (baja 4–6, media 7–9, alta 10–12) como en P.A.D.U.A. (baja 6–7, media 8–9, alta ≥ 10) define alta complejidad y se asocia a mayor tiempo de isquemia caliente y más complicaciones.',
    ],
    correctIndex: 3,
    explanation:
      'Los índices nefrométricos estandarizan la complejidad anatómica tumoral en imágenes preoperatorias: R.E.N.A.L. clasifica en complejidad baja (4–6), moderada (7–9) y alta (10–12), mientras que P.A.D.U.A. clasifica en baja (6–7), intermedia (8–9) y alta (≥ 10). En ambos sistemas, un puntaje ≥ 10 se asocia significativamente con mayor tiempo de isquemia caliente y mayor tasa de complicaciones perioperatorias (Clavien-Dindo).',
  },
  {
    num: 25,
    difficulty: 'intermediate',
    tags: ['nefrectomía parcial', 'márgenes quirúrgicos positivos', 'adrenalectomía', 'EORTC 30881'],
    question_text:
      '¿Cuál es la conducta recomendada ante el hallazgo de un margen quirúrgico positivo en la pieza de una nefrectomía parcial y cuándo están indicadas la adrenalectomía ipsilateral y la linfadenectomía retroperitoneal en la cirugía del CCR?',
    options: [
      'El margen positivo tras nefrectomía parcial tiene 16% de recurrencia local (vs. 3% con R0) y se maneja con vigilancia sin nefrectomía inmediata de rutina; la adrenalectomía y linfadenectomía solo se indican si hay sospecha.',
      'Todo margen quirúrgico positivo tras una nefrectomía parcial exige realizar nefrectomía radical de completación inmediata antes del alta hospitalaria; además, la adrenalectomía ipsilateral es obligatoria en todos los tumores del polo superior.',
      'El margen quirúrgico positivo tras nefrectomía parcial no modifica el riesgo de recurrencia local (3% en ambos grupos), pero obliga a administrar radioterapia externa fraccionada al lecho quirúrgico renal durante 6 semanas.',
      'El ensayo fase III EORTC 30881 demostró que la linfadenectomía retroperitoneal ampliada mejora en un 25% la sobrevida global en tumores cT1–T2 cN0M0, por lo que debe realizarse sistemáticamente junto con la adrenalectomía.',
    ],
    correctIndex: 0,
    explanation:
      'Aunque un margen quirúrgico positivo en nefrectomía parcial eleva la tasa de recurrencia local al 16% (frente a 3% con márgenes negativos), la mayoría de los pacientes no recae, por lo que se recomienda seguimiento estrecho y no nefrectomía de rescate inmediata. Por su parte, la invasión suprarrenal ocurre en solo ~2% (la ubicación en polo superior no la predice si la TC es normal) y el ensayo EORTC 30881 demostró que la linfadenectomía en cN0 no mejora la sobrevida, reservándose para adenopatías clínicamente evidentes.',
  },
  {
    num: 26,
    difficulty: 'intermediate',
    tags: ['vigilancia activa', 'masas renales pequeñas', 'tasa de crecimiento', 'DISSRM'],
    question_text:
      'En el protocolo de Vigilancia Activa para masas renales pequeñas en pacientes añosos o con comorbilidades significativas, ¿cuál es el diámetro tumoral inicial, la tasa media de crecimiento lineal anual observada y el riesgo reportado de progresión metastásica?',
    options: [
      'Se indica en masas de hasta 7 cm (cT1b), las cuales presentan una tasa media de crecimiento lineal de 1,4 cm/año y un riesgo acumulado de progresión a enfermedad metastásica del 12% a los 2 años de seguimiento.',
      'Se indica en masas menores de 3,5 a 4 cm, las cuales exhiben una tasa media de crecimiento lineal de ~0,28 cm/año y una tasa de progresión a enfermedad metastásica de apenas ~1% durante el seguimiento.',
      'Se indica únicamente en lesiones quísticas Bosniak I y II, dado que cualquier masa renal sólida menor de 3 cm presenta un crecimiento exponencial superior a 0,9 cm/año en pacientes mayores de 70 años.',
      'Exige realizar nefrectomía diferida obligatoria a los 12 meses en el 85% de los pacientes ingresados debido a que más de la mitad desarrolla dolor lumbar refractario o hematuria anemizante en el primer año.',
    ],
    correctIndex: 1,
    explanation:
      'En pacientes añosos, frágiles o con alto riesgo quirúrgico portadores de masas renales pequeñas (< 3,5–4 cm, cT1a), la vigilancia activa es una opción segura: el crecimiento lineal promedio es lento (~0,28 cm/año en series prospectivas como el registro DISSRM) y el riesgo de desarrollar metástasis durante el seguimiento con imágenes seriadas es de aproximadamente 1%.',
  },
  {
    num: 27,
    difficulty: 'intermediate',
    tags: ['crioablación', 'radiofrecuencia', 'efecto Joule-Thomson', 'terapias ablativas'],
    question_text:
      'Al comparar los principios biofísicos y técnicos de la Crioablación renal frente a la Ablación por Radiofrecuencia (ARF) en masas corticales pequeñas (≤ 3 cm), ¿cuál de las siguientes diferencias técnicas es correcta?',
    options: [
      'La ARF utiliza el efecto Joule-Thomson con gas argón para enfriar a -40 °C bajo visión ecográfica directa de la bola de hielo, mientras que la crioablación calienta el tejido sobre 105 °C guiada únicamente por impedancia eléctrica.',
      'Ambas técnicas ablativas están indicadas como primera línea en tumores hiliares centrales mayores de 5 cm (cT1b) por su resistencia al efecto de disipación térmica vascular, sin requerir biopsia renal previa al procedimiento.',
      'La crioablación usa el efecto Joule-Thomson requiriendo ≤ -40 °C en ≥ 2 ciclos y extendiendo la bola de hielo 10 mm sobre el borde tumoral bajo visión en tiempo real; la ARF calienta > 60–105 °C guiada por impedancia/termosensores.',
      'La crioablación induce desnaturalización proteica mediante corriente alterna de alta frecuencia sin poder visualizarse en tomografía, mientras que la ARF forma cristales de hielo intracelulares fácilmente delimitables en ecografía.',
    ],
    correctIndex: 2,
    explanation:
      'La crioablación se basa en el efecto Joule-Thomson (expansión de gas argón o nitrógeno líquido en criosondas, llegando a -185,7 °C); para lograr necrosis tumoral completa requiere temperaturas ≤ -40 °C, mínimo 2 ciclos de congelación-descongelación y extender la "bola de hielo" 10 mm por fuera del borde tumoral (visible en tiempo real por eco/TC). La ARF usa corriente alterna (> 60 °C e idealmente > 105 °C), pero las burbujas de vapor impiden el monitoreo visual en tiempo real, guiándose por impedancia o temperatura.',
  },
  {
    num: 28,
    difficulty: 'intermediate',
    tags: ['trombo tumoral', 'vena cava inferior', 'clasificación de Neves-Zincke', 'epidemiología'],
    question_text:
      'Con respecto a la historia natural y características anatomopatológicas del carcinoma de células renales con trombo tumoral venoso (presente en el 4–10% de los casos), ¿cuál es la sobrevida media sin tratamiento quirúrgico y con qué frecuencia se asocia a diferenciación sarcomatoide?',
    options: [
      'Sin cirugía la sobrevida media supera los 36 meses gracias al desarrollo de circulación colateral lumbar y ácigos, observándose diferenciación sarcomatoide en menos del 3% de las piezas quirúrgicas con trombo.',
      'El trombo tumoral venoso alcanza la aurícula derecha en cerca del 25% de todos los cánceres renales diagnosticados, pero su presencia no modifica la sobrevida específica por cáncer respecto a los tumores localizados pT1a.',
      'La anticoagulación oral terapéutica indefinida en monoterapia logra la recanalización completa del trombo tumoral en la vena cava inferior en el 60% de los pacientes, evitando la necesidad de trombectomía quirúrgica.',
      'Sin tratamiento quirúrgico la mediana de sobrevida es de apenas ~8 meses (con mortalidad > 90% al año), y en las piezas de nefrectomía con trombo venoso se identifica diferenciación sarcomatoide hasta en el 58% de los casos.',
    ],
    correctIndex: 3,
    explanation:
      'El CCR se extiende a la vena renal o VCI en el 4–10% de los pacientes (y llega a la aurícula derecha en el 1%). Su evolución natural sin tratamiento quirúrgico es ominosa, con una mediana de sobrevida de ~8 meses (Reese et al.). Además, son tumores biológicamente agresivos que presentan diferenciación sarcomatoide hasta en el 58% de los especímenes quirúrgicos.',
  },
  {
    num: 29,
    difficulty: 'intermediate',
    tags: ['clasificación de Neves-Zincke', 'trombo en VCI', 'maniobra de Pringle', 'cirugía'],
    question_text:
      'Según la clasificación de Neves y Zincke (Clínica Mayo) para la extensión cefálica del trombo tumoral en la vena cava inferior (Figura 7 del Manual), ¿qué define exactamente a los Niveles I, II, III y IV y qué maniobra quirúrgica distingue el abordaje del Nivel III?',
    options: [
      'Nivel I es VCI < 2 cm sobre el ostium renal; Nivel II es > 2 cm pero bajo las venas hepáticas mayores; Nivel III alcanza las venas hepáticas mayores bajo el diafragma (movilización hepática/Pringle); Nivel IV es supradiafragmático.',
      'Nivel I corresponde a compromiso exclusivo de la vena renal; Nivel II es VCI infrarrenal hacia las venas ilíacas; Nivel III es VCI subhepática sin necesidad de movilizar el hígado; y Nivel IV es invasión de la vena porta principal.',
      'Nivel I es extensión en VCI < 2 cm sobre la vena renal; Nivel II supera las venas hepáticas mayores llegando al diafragma; Nivel III invade la aurícula derecha; y Nivel IV corresponde a embolia tumoral en la arteria pulmonar.',
      'Nivel I es invasión microscópica de venas sinusales intrarrenales; Nivel II es trombo en VCI hasta el ostium de las venas lumbares; Nivel III es trombo supradiafragmático operado sin circulación extracorpórea; y Nivel IV es M1.',
    ],
    correctIndex: 0,
    explanation:
      'En la clasificación de Neves-Zincke: Nivel 0 está limitado a la vena renal; Nivel I ingresa a la VCI < 2 cm sobre el ostium renal (cavotomía simple/ordeñamiento); Nivel II sube > 2 cm en VCI pero permanece bajo las venas hepáticas mayores (clampeo subhepático); Nivel III compromete la VCI retrohepática a nivel o por encima de las venas hepáticas mayores pero bajo el diafragma (exigiendo movilización hepática completa y maniobra de Pringle); y Nivel IV supera el diafragma o entra a la aurícula derecha (abordaje toracoabdominal, ETE y CEC).',
  },
  {
    num: 30,
    difficulty: 'intermediate',
    tags: ['embolización arterial renal', 'trombo tumoral', 'neoadyuvancia', 'cirugía'],
    question_text:
      'En el manejo perioperatorio de un paciente con carcinoma renal localmente avanzado y trombo en la vena cava inferior, ¿qué señala la evidencia actual (revisiones sistemáticas de Wright et al. y Gu et al. citadas en el capítulo) sobre la embolización arterial preoperatoria de rutina y la terapia sistémica neoadyuvante?',
    options: [
      'La embolización arterial renal realizada 48 horas antes de la cirugía reduce en un 70% la mortalidad perioperatoria y el sangrado, por lo que es obligatoria en todos los pacientes con trombo Nivel I y II de Neves-Zincke.',
      'La embolización preoperatoria no mejora la sobrevida ni reduce complicaciones (aumentando el síndrome post-embolización), no recomendándose de rutina; además, la terapia neoadyuvante para reducir el trombo sigue siendo experimental.',
      'La administración de sunitinib neoadyuvante durante 6 meses logra la regresión patológica completa del trombo en la vena cava inferior en el 85% de los casos, permitiendo omitir la cavotomía en la cirugía definitiva.',
      'La colocación preoperatoria sistemática de un filtro de vena cava inferior permanente en posición suprarrenal constituye el estándar de oro actual en todos los pacientes con trombo tumoral Nivel III y IV.',
    ],
    correctIndex: 1,
    explanation:
      'El metaanálisis de Wright et al. demostró que la embolización transarterial preoperatoria rutinaria no aporta beneficio en supervivencia ni disminuye de forma consistente el sangrado en manos expertas, reservándose para casos paliativos con hematuria incoercible en pacientes inoperables. Asimismo, aunque existen series y reportes de reducción del tamaño del trombo con TKI/IO neoadyuvante, su indicación aún no es estándar fuera de ensayos clínicos.',
  },
  {
    num: 31,
    difficulty: 'intermediate',
    tags: ['SBRT', 'radioterapia ablativa', 'FASTRACK II', 'pseudoprogresión', 'IROCK'],
    question_text:
      '¿Qué resultados demostró el ensayo prospectivo fase II TROG 15.03 FASTRACK II (y el consorcio IROCK) respecto a la Radioterapia Ablativa Estereotáctica (SBRT) en tumores renales primarios de pacientes médicamente inoperables y qué fenómeno radiológico debe tenerse presente en su seguimiento?',
    options: [
      'Demostró que el CCR primario es radiorresistente incluso a dosis ablativas > 8 Gy por fracción, presentando una tasa de recaída local del 65% al primer año y requerimiento de hemodiálisis en un tercio de los pacientes.',
      'Demostró que la SBRT solo es efectiva en tumores menores de 1,5 cm utilizando esquemas normofraccionados de 35 sesiones de 1,8 Gy, exigiendo nefrectomía de rescate si persiste captación de contraste a los 3 meses.',
      'Logró 100% de control local y de sobrevida cáncer-específica con caída media de TFGe de solo -14,6 mL/min a 2 años; en el seguimiento inicial puede ocurrir "pseudoprogresión" (aumento transitorio o realce persistente).',
      'Demostró una tasa de eventos adversos grado 4–5 del 42% (incluyendo fístulas renoentéricas y estenosis ureteral), motivo por el cual las guías NCCN y EAU contraindicaron su aplicación en pacientes monorrenos.',
    ],
    correctIndex: 2,
    explanation:
      'La SBRT con dosis altas por fracción (> 5 Gy) rompe la radiorresistencia clásica del CCR. En el ensayo multicéntrico fase II FASTRACK II (26 Gy en 1 fracción para tumores ≤ 4 cm o 42 Gy en 3 fracciones para > 4–10 cm), se alcanzó 100% de control local, 100% de sobrevida libre de muerte por cáncer y preservación funcional satisfactoria (-14,6 mL/min). Es crucial conocer la pseudoprogresión para no confundir el edema/inflamación inicial ni el realce residual lento con falla terapéutica.',
  },
  {
    num: 32,
    difficulty: 'intermediate',
    tags: ['SBRT', 'oligometástasis', 'oligoprogresión', 'estudio RAPPORT', 'EA8211 SOAR'],
    question_text:
      'En el escenario del carcinoma renal oligometastásico u oligoprogresivo, ¿qué demostraron los estudios de SBRT secuencial (Tang et al., Cheung et al.) y el ensayo fase II RAPPORT (SBRT a todas las metástasis seguida de pembrolizumab)?',
    options: [
      'En pacientes con oligoprogresión la SBRT obliga a cambiar de inmediato la línea de terapia sistémica por toxicidad sinérgica, y en el estudio RAPPORT la combinación de SBRT con pembrolizumab tuvo un control local inferior al 35%.',
      'El estudio RAPPORT demostró que irradiar una única lesión metastásica con dosis bajas de 2 Gy (buscando efecto abscopal puro como en los ensayos NIVES y RADVAX) logra un 85% de respuestas completas en metástasis cerebrales.',
      'El ensayo fase III EA8211 SOAR ya finalizó su seguimiento a 10 años y demostró que la SBRT secuencial disminuye significativamente la supervivencia global frente al inicio inmediato de quimioterapia con gemcitabina.',
      'La SBRT en oligoprogresión retrasa el cambio de línea sistémica por ~11–12,6 meses; además, el estudio RAPPORT (SBRT 20 Gy x 1 a todas las lesiones + pembrolizumab) logró 92% de control local y 45% de SLP a 2 años.',
    ],
    correctIndex: 3,
    explanation:
      'Mientras los estudios de efecto abscopal irradiando solo 1–2 sitios (NIVES y RADVAX-RCC) mostraron tasas de respuesta similares a la inmunoterapia sola, la ablación de TODAS las lesiones oligometastásicas en el estudio RAPPORT (20 Gy x 1 + pembrolizumab por 8 ciclos) alcanzó un control local del 94% al año y 92% a 2 años, con una SLP a 2 años del 45% (duplicando el 22,3% histórico de pembrolizumab monoterapia en KEYNOTE-427). En oligoprogresión, la SBRT retrasa el cambio de línea sistémica en ~1 año.',
  },
  {
    num: 33,
    difficulty: 'intermediate',
    tags: ['nefrectomía citorreductora', 'estudio CARMENA', 'sunitinib', 'CCRm'],
    question_text:
      '¿Cuál fue el diseño, la conclusión principal y las limitaciones metodológicas más relevantes del ensayo clínico fase III CARMENA respecto al rol de la nefrectomía citorreductora (NC) en el carcinoma renal metastásico?',
    options: [
      'Ensayo de no inferioridad en riesgo MSKCC intermedio/pobre donde sunitinib solo no fue inferior en SG a NC + sunitinib (y fue superior con 2 puntos, HR 0,63), limitado por reclutamiento incompleto y alta carga de riesgo pobre.',
      'Estudio de superioridad con nivolumab + ipilimumab que demostró que la nefrectomía citorreductora inmediata reduce la mortalidad en un 50% en los pacientes de alto riesgo IMDC con metástasis hepáticas y óseas sincrónicas.',
      'Estudio fase III con 1.200 pacientes de riesgo favorable exclusivo que demostró que la nefrectomía citorreductora empeora la supervivencia específica cuando se asocia a metastasectomía de un nódulo pulmonar solitario.',
      'Estudio prospectivo que comparó pazopanib frente a placebo tras nefrectomía radical, concluyendo que la cirugía citorreductora solo beneficia a los pacientes con índice funcional de Karnofsky inferior al 60% y LDH elevada.',
    ],
    correctIndex: 0,
    explanation:
      'El ensayo CARMENA evaluó la no inferioridad de sunitinib en monoterapia frente a NC inmediata seguida de sunitinib en CCRm de riesgo MSKCC intermedio y pobre. Mostró que sunitinib solo no fue inferior en SG (y fue superior en los de riesgo intermedio con 2 puntos, HR 0,63). Sus limitaciones críticas fueron reclutar 450 de 576 pacientes, tener una alta carga de pacientes de riesgo pobre (donde el primario era solo ~60% del volumen tumoral), que 22,5% del brazo NC+sunitinib nunca recibió sunitinib y 17% del brazo sunitinib terminó operándose.',
  },
  {
    num: 34,
    difficulty: 'intermediate',
    tags: ['nefrectomía citorreductora', 'estudio SURTIME', 'NC diferida', 'selección de pacientes'],
    question_text:
      '¿Qué estrategia terapéutica evaluó el ensayo fase III SURTIME en el cáncer renal metastásico y qué perfil de pacientes se considera hoy el mejor candidato para una nefrectomía citorreductora (inmediata o diferida)?',
    options: [
      'Comparó nefrectomía parcial frente a nefrectomía radical en tumores localizados pT1bN0M0, demostrando que la administración preoperatoria de everolimus durante 12 semanas duplica la tasa de preservación nefronal.',
      'Comparó NC inmediata vs. NC diferida tras 3 ciclos de sunitinib (mejor SG con NC diferida, HR 0,57), reservándose hoy la NC para pacientes con buen KPS, riesgo bajo/intermedio (1 punto) y baja carga metastásica.',
      'Demostró que la nefrectomía citorreductora inmediata logra su máximo beneficio de sobrevida en pacientes con 4 o más factores adversos IMDC, metástasis cerebrales múltiples sincrónicas e índice de Karnofsky menor al 70%.',
      'Evaluó el uso de radioterapia estereotáctica al tumor primario antes de iniciar cabozantinib, concluyendo que diferir la cirugía incrementa tres veces la mortalidad perioperatoria sin aportar beneficio en la sobrevida global.',
    ],
    correctIndex: 1,
    explanation:
      'El estudio SURTIME comparó NC inmediata vs. NC diferida (tras 3 ciclos de sunitinib). Si bien cerró precozmente con 99 pacientes y la SLP a 28 semanas fue similar, la intención de tratar favoreció la sobrevida global en el brazo de NC diferida (HR 0,57), ya que iniciar terapia sistémica actúa como "prueba biológica" para evitar operar a pacientes que progresan rápidamente. Hoy los mejores candidatos a NC tienen buen KPS, menor puntaje de riesgo (bajo o intermedio con 1 factor), baja carga metastásica y buena respuesta sistémica (estudios PROBE y NORDIC-SUN en curso con inmunoterapia).',
  },
  {
    num: 35,
    difficulty: 'intermediate',
    tags: ['metastasectomía', 'metástasis pulmonares', 'factores pronósticos', 'CCRm'],
    question_text:
      'En relación con el tratamiento quirúrgico local de las metástasis (metastasectomía) en el carcinoma de células renales metastásico, ¿qué factores clínicos se asocian con una mejor supervivencia tras la resección de metástasis pulmonares?',
    options: [
      'Resección quirúrgica incompleta (citorreducción R2), presencia de más de diez nódulos pulmonares bilaterales, edad mayor de 75 años y compromiso simultáneo de parénquima hepático y esqueleto axial.',
      'Histología con diferenciación rabdoide o sarcomatoide pura, aparición de las metástasis dentro de los primeros 60 días post-nefrectomía e hipercalcemia paraneoplásica refractaria a bifosfonatos.',
      'Resección quirúrgica completa (R0) de la enfermedad metastásica, presencia de metástasis solitaria, edad menor de 60 años, tamaño tumoral pequeño y localización exclusivamente pulmonar.',
      'Realización de lobectomía pulmonar profiláctica combinada con quimioterapia citotóxica basada en cisplatino y gemcitabina antes de abordar quirúrgicamente el tumor renal primario.',
    ],
    correctIndex: 2,
    explanation:
      'Aunque no existen ensayos fase III aleatorizados de metastasectomía frente a observación, múltiples series comparativas demuestran un aumento significativo de la sobrevida global y cáncer-específica cuando se logra la resección completa (R0) de la enfermedad oligometastásica, destacando como factores de buen pronóstico en metástasis pulmonares: resección completa, lesión solitaria, edad < 60 años, menor tamaño tumoral y localización pulmonar única.',
  },
  {
    num: 36,
    difficulty: 'intermediate',
    tags: ['modelos pronósticos', 'IMDC', 'Heng', 'MSKCC', 'Motzer'],
    question_text:
      'Al comparar el modelo pronóstico clásico del MSKCC (criterios de Motzer) con la escala contemporánea del International Metastatic RCC Database Consortium (IMDC o criterios de Heng), ¿qué variables clínicas o de laboratorio fueron modificadas y cuáles son los 6 factores que integran el puntaje IMDC?',
    options: [
      'El modelo IMDC eliminó la calcemia corregida y el índice funcional de Karnofsky del modelo original de Motzer, reemplazándolos por la velocidad de sedimentación (VHS), la proteína C reactiva y la hipoalbuminemia.',
      'El modelo IMDC mantiene los 5 factores idénticos de Motzer (incluyendo la elevación de LDH > 1,5 veces el límite normal) y adiciona como sexto factor la expresión tumoral de PD-L1 ≥ 1% en inmunohistoquímica.',
      'El modelo IMDC clasifica como riesgo favorable a los pacientes con 1 o 2 puntos (sobrevida media de 7,8 meses) y como riesgo alto o pobre a los pacientes con 0 puntos (sobrevida media de 43,2 meses).',
      'El modelo IMDC eliminó la LDH del modelo de Motzer y adicionó neutrofilia y trombocitosis, sumando 6 factores: KPS < 80%, tiempo diagnóstico-tratamiento < 1 año, hemoglobina baja, hipercalcemia, neutrofilia y trombocitosis.',
    ],
    correctIndex: 3,
    explanation:
      'En la transición del modelo MSKCC/Motzer al modelo IMDC/Heng, se removió la LDH y se agregaron dos parámetros inflamatorios del hemograma: neutrofilia y trombocitosis. Así, los 6 factores adversos del IMDC (1 punto cada uno) son: 1) KPS < 80%, 2) Tiempo diagnóstico a terapia sistémica < 1 año, 3) Hb < límite inferior normal, 4) Calcemia corregida > límite superior normal, 5) Neutrófilos > límite superior normal y 6) Plaquetas > límite superior normal. Puntaje 0 = riesgo bajo/favorable (SG 43,2 m); 1–2 = intermedio (SG 22,5 m); ≥ 3 = alto/pobre (SG 7,8 m).',
  },
  {
    num: 37,
    difficulty: 'intermediate',
    tags: ['quimioterapia', 'conductos colectores', 'carcinoma medular', 'terapia sistémica'],
    question_text:
      'De acuerdo con las recomendaciones de la Guía EAU 2025 reproducidas en la Tabla 21 del capítulo, ¿cuál es el rol de la quimioterapia citotóxica convencional en el manejo del carcinoma de células renales metastásico?',
    options: [
      'Es generalmente ineficaz y no debe ofrecerse en el carcinoma renal de células claras, reservándose únicamente como opción terapéutica en pacientes con carcinoma de conductos colectores o carcinoma medular renal.',
      'El esquema citotóxico MVAC o gemcitabina-cisplatino constituye la primera línea de elección en el carcinoma renal de células claras de alto riesgo IMDC cuando el paciente debuta con metástasis hepáticas.',
      'El docetaxel intravenoso asociado a prednisona oral está indicado como terapia de consolidación estándar en todos los pacientes con carcinoma renal cromófobo que progresan tras el uso de sunitinib.',
      'El 5-fluorouracilo combinado con interferón-alfa recombinante sigue siendo el tratamiento estándar de primera línea con mayor tasa de respuestas completas en los pacientes de riesgo favorable del grupo IMDC.',
    ],
    correctIndex: 0,
    explanation:
      'El carcinoma renal de células claras expresa altos niveles de proteínas de resistencia a multidrogas (como la glicoproteína P / MDR-1), por lo que la quimioterapia convencional es ineficaz (Tabla 21, Guía EAU 2025). Solo se considera ofrecer quimioterapia basada en platino/gemcitabina en tumores distales biológicamente emparentados con el urotelio o con déficit de SMARCB1, como el carcinoma de conductos colectores de Bellini y el carcinoma medular renal.',
  },
  {
    num: 38,
    difficulty: 'intermediate',
    tags: ['TKI', 'sunitinib', 'pazopanib', 'estudio COMPARZ', 'estudio PISCES', 'estudio EFFECT'],
    question_text:
      'En relación con los inhibidores de tirosina quinasa (TKI) de primera generación dirigidos contra VEGFR/PDGFR (Sunitinib y Pazopanib), ¿qué demostraron los ensayos clínicos EFFECT, COMPARZ y PISCES citados en el capítulo?',
    options: [
      'El estudio COMPARZ demostró que sunitinib duplica la supervivencia global respecto a pazopanib en primera línea, y el estudio PISCES confirmó que el 70% de los pacientes prefiere sunitinib por su menor tasa de toxicidad.',
      'EFFECT mostró igual SG entre sunitinib 50 mg (4/2) y 37,5 mg continuo; COMPARZ demostró no inferioridad de pazopanib frente a sunitinib; y PISCES evidenció menor toxicidad y preferencia por pazopanib (70% vs. 22%).',
      'El estudio EFFECT demostró que la dosis continua de 37,5 mg de sunitinib erradica por completo la toxicidad hematológica e hipertensiva y triplica la sobrevida libre de progresión frente al esquema intermitente 4/2.',
      'Los estudios fase III COMPARZ y PISCES demostraron que el pazopanib solo es activo en tumores papilares con mutación de c-MET y se encuentra formalmente contraindicado en primera línea en pacientes de riesgo favorable.',
    ],
    correctIndex: 1,
    explanation:
      'El ensayo EFFECT comparó el esquema clásico de sunitinib 50 mg/día (4 semanas de tratamiento / 2 de descanso) vs. 37,5 mg/día continuo, sin diferencias en SG (23,1 vs. 23,5 m) pero con mayor tiempo hasta la progresión con la dosis estándar. Por su parte, el ensayo fase III de no inferioridad COMPARZ demostró eficacia equivalente en SLP y SG entre pazopanib y sunitinib en primera línea, con mejor calidad de vida para pazopanib, lo que fue ratificado en el ensayo cruzado PISCES (preferencia de 70% para pazopanib vs. 22% para sunitinib, p < 0,05).',
  },
  {
    num: 39,
    difficulty: 'intermediate',
    tags: ['cabozantinib', 'estudio METEOR', 'estudio CABOSUN', 'MET', 'AXL'],
    question_text:
      '¿Qué blancos moleculares adicionales al VEGFR inhibe el Cabozantinib (explicando su actividad tras resistencia a otros antiangiogénicos) y qué resultados obtuvo en los ensayos clínicos METEOR y CABOSUN?',
    options: [
      'Inhibe selectivamente las serina/treonina quinasas RAF-1 y B-RAF sin acción sobre receptores tirosina quinasa; en el estudio METEOR fue inferior a everolimus y en el estudio CABOSUN fue inferior a sunitinib.',
      'Inhibe el complejo intracelular mTORC1 y el factor de transcripción HIF-1alfa; en el estudio fase III METEOR demostró beneficio clínico únicamente en pacientes de riesgo favorable sin exposición previa a antiangiogénicos.',
      'Inhibe VEGFR, MET y AXL; en METEOR mejoró la SLP (HR 0,58) y la SG (21,4 vs. 16,5 m) frente a everolimus en segunda línea, y en CABOSUN superó a sunitinib en SLP (8,2 vs. 5,6 m) y respuesta objetiva (46% vs. 18%).',
      'Inhibe exclusivamente los receptores del factor de crecimiento de fibroblastos (FGFR 1 a 4); en el ensayo CABOSUN solo demostró eficacia cuando se administró en combinación intravenosa con interferón-alfa.',
    ],
    correctIndex: 2,
    explanation:
      'Cabozantinib es un potente TKI oral multidiana contra VEGFR, MET y AXL (vías implicadas en la resistencia adquirida al bloqueo de VEGF). En el estudio fase III METEOR (pacientes con CCRcc refractarios a ≥ 1 TKI anti-VEGF), cabozantinib superó a everolimus tanto en SLP (HR 0,58) como en sobrevida global (21,4 vs. 16,5 meses, HR 0,66). En el ensayo fase II Alliance CABOSUN (primera línea en riesgo intermedio y alto), superó a sunitinib en SLP (8,2 vs. 5,6 meses) y respuesta objetiva (46% vs. 18%).',
  },
  {
    num: 40,
    difficulty: 'intermediate',
    tags: ['lenvatinib', 'everolimus', 'axitinib', 'estudio AXIS', 'segunda línea'],
    question_text:
      'Con respecto al uso de Axitinib y de Lenvatinib en pacientes con carcinoma renal metastásico previamente tratados, ¿qué demostraron respectivamente el estudio AXIS y el ensayo aleatorizado de Lenvatinib + Everolimus?',
    options: [
      'En el estudio AXIS el axitinib duplicó la sobrevida global frente a sorafenib en primera línea; por su parte, la combinación de lenvatinib + everolimus resultó significativamente inferior a everolimus en monoterapia.',
      'Ambos medicamentos corresponden a anticuerpos monoclonales humanizados de administración intravenosa mensual que actúan bloqueando selectivamente el ligando PD-L2 en la superficie de las células dendríticas.',
      'El lenvatinib en monoterapia o combinado está contraindicado en pacientes refractarios a inhibidores del VEGF porque carece de actividad sobre los receptores endoteliales VEGFR y sobre la vía de los receptores FGFR.',
      'En AXIS el axitinib (anti-VEGFR 1–3) mejoró la SLP en segunda línea frente a sorafenib sin diferencia en SG; por su parte, lenvatinib (anti-VEGFR/FGFR/RET/KIT) + everolimus prolongó la SLP vs. everolimus (14,6 vs. 5,5 m).',
    ],
    correctIndex: 3,
    explanation:
      'Axitinib es un TKI oral selectivo de segunda generación para VEGFR 1, 2 y 3; en el ensayo AXIS de segunda línea superó a sorafenib en SLP pero sin diferencia estadísticamente significativa en SG. Lenvatinib es un TKI multidiana (VEGFR 1–3, FGFR 1–4, PDGFRα, RET y KIT) que en el estudio fase II aleatorizado 1:1:1 demostró que la combinación Lenvatinib (18 mg) + Everolimus (5 mg) prolongó la mediana de SLP a 14,6 meses frente a 5,5 meses con everolimus solo (p < 0,001).',
  },
  {
    num: 41,
    difficulty: 'intermediate',
    tags: ['belzutifan', 'HIF-2a', 'LITESPARK-005', 'toxicidad', 'anemia', 'hipoxia'],
    question_text:
      '¿Cuál es el mecanismo de acción molecular del Belzutifan, qué demostró en el ensayo fase III LITESPARK-005 y cuáles son sus dos eventos adversos de grado ≥ 3 más característicos derivados de su efecto farmacodinámico?',
    options: [
      'Es un inhibidor oral de HIF-2α; en LITESPARK-005 superó en SLP a everolimus en CCRcc pretratado, siendo sus eventos adversos grado ≥ 3 más frecuentes la anemia (27%) y la hipoxia (16%).',
      'Es un inhibidor irreversible de la enzima fumarato hidratasa; en el estudio LITESPARK-005 superó a sunitinib en primera línea metastásica, siendo sus toxicidades principales la policitemia severa (35%) y la hipertensión maligna.',
      'Es un degradador quimérico del complejo intracelular mTORC2; en el estudio LITESPARK-005 demostró eficacia exclusiva en el carcinoma renal cromófobo, produciendo hipercalcemia severa y síndrome mano-pie en el 60% de los casos.',
      'Es un agonista alostérico directo de la proteína supresora VHL administrado por vía subcutánea; en el estudio LITESPARK-005 reemplazó al pembrolizumab como estándar de adyuvancia en tumores localizados pT3a.',
    ],
    correctIndex: 0,
    explanation:
      'La inactivación de VHL en el CCRcc provoca la acumulación intracelular de HIF-2α. Belzutifan es un inhibidor de molécula pequeña específico contra el factor de transcripción HIF-2α. En el ensayo fase III LITESPARK-005 superó significativamente a everolimus en SLP en pacientes con CCRcc politratados (previo TKI e ICI). Por su inhibición fisiológica de la transcripción de eritropoyetina y de la respuesta ventilatoria a la hipoxia, sus toxicidades grado ≥ 3 distintivas son la anemia (27%) y la hipoxia (16%).',
  },
  {
    num: 42,
    difficulty: 'intermediate',
    tags: ['inmunoterapia', 'CTLA-4', 'PD-1', 'PD-L1', 'ipilimumab', 'nivolumab'],
    question_text:
      'Desde el punto de vista inmunológico (trabajos de James P. Allison y Tasuku Honjo premiados con el Nobel 2018), ¿cómo actúan diferencialmente Ipilimumab y Nivolumab/Pembrolizumab para restaurar la respuesta antitumoral en el carcinoma renal?',
    options: [
      'Ipilimumab bloquea directamente al receptor VEGFR-2 en el endotelio vascular del tumor, mientras que nivolumab y pembrolizumab estimulan la secreción hepática de interleucina-6 para lisar la cápsula tumoral.',
      'Ipilimumab (anti-CTLA-4) bloquea la unión de CTLA-4 con CD80/CD86 activando a los linfocitos T, mientras nivolumab y pembrolizumab bloquean PD-1 (CD279) impidiendo su inactivación por PD-L1/PD-L2.',
      'Ipilimumab es un anticuerpo monoclonal dirigido contra el ligando PD-L1 en los macrófagos, mientras que pembrolizumab bloquea selectivamente al receptor CTLA-4 en los linfocitos B productores de anticuerpos.',
      'Ambos fármacos actúan inhibiendo de forma competitiva la tirosina quinasa intracelular del protooncogén c-MET y del receptor AXL, induciendo apoptosis directa de la célula tumoral sin participación de los linfocitos T.',
    ],
    correctIndex: 1,
    explanation:
      'Los inhibidores de puntos de control inmunitario (checkpoints) desbloquean los frenos fisiológicos de los linfocitos T: Ipilimumab bloquea CTLA-4 (impidiendo su unión inhibitoria a CD80/CD86 en la fase de cebado/activación ganglionar), mientras que Nivolumab y Pembrolizumab bloquean el receptor PD-1 (CD279) en la superficie del linfocito T efector, impidiendo que la expresión tumoral de PD-L1/PD-L2 (mecanismo de resistencia inmune adaptativa) apague la respuesta citotóxica.',
  },
  {
    num: 43,
    difficulty: 'intermediate',
    tags: ['CheckMate-214', 'nivolumab', 'ipilimumab', 'riesgo intermedio y alto'],
    question_text:
      'En el ensayo pivotal fase III CheckMate-214 (Nivolumab 3 mg/kg + Ipilimumab 1 mg/kg cada 3 semanas por 4 dosis, seguido de Nivolumab de mantención, frente a Sunitinib), ¿cuáles fueron los resultados principales en los pacientes con CCR de células claras metastásico de riesgo IMDC intermedio o alto?',
    options: [
      'No hubo diferencia estadísticamente significativa en la supervivencia global ni en la tasa de respuesta objetiva frente a sunitinib, observándose además un deterioro marcado de la calidad de vida en el brazo de inmunoterapia.',
      'El beneficio en supervivencia global y tasa de respuestas completas se restringió exclusivamente a los pacientes de riesgo favorable (0 puntos IMDC) que presentaban metástasis cerebrales sintomáticas al ingreso al estudio.',
      'Mejoró significativamente la sobrevida global (HR 0,63; mediana no alcanzada vs. 26 meses en el corte primario) y la tasa de respuesta objetiva (42% vs. 27%) frente a sunitinib en riesgo intermedio y alto.',
      'La combinación requirió mantener la infusión de ipilimumab cada 2 semanas de manera indefinida durante 5 años para sostener la respuesta, asociándose a una mortalidad tóxica por colitis superior al 25%.',
    ],
    correctIndex: 2,
    explanation:
      'En el estudio fase III CheckMate-214 (1.096 pacientes), dentro de la población objetivo primaria de riesgo IMDC intermedio o alto (847 pacientes), la doble inmunoterapia con nivolumab + ipilimumab superó significativamente a sunitinib en sobrevida global (HR 0,63; IC 95% 0,44–0,82) y en tasa de respuesta objetiva (42% vs. 27%), con mejor perfil de calidad de vida y especial eficacia en tumores con expresión de PD-L1 ≥ 1% y en diferenciación sarcomatoide.',
  },
  {
    num: 44,
    difficulty: 'intermediate',
    tags: ['KEYNOTE-426', 'avelumab', 'axitinib', 'pembrolizumab', 'primera línea'],
    question_text:
      'Al comparar las combinaciones de primera línea que asocian Axitinib con un inhibidor de punto de control inmunitario (Pembrolizumab + Axitinib en el estudio KEYNOTE-426 frente a Avelumab + Axitinib), ¿por qué las guías clínicas prefieren Pembrolizumab + Axitinib?',
    options: [
      'Porque la combinación de avelumab + axitinib produjo un 65% de necrosis hepática inmunomediada fulminante y fue estadísticamente inferior a sunitinib en supervivencia libre de progresión y tasa de respuesta objetiva.',
      'Porque el esquema de pembrolizumab + axitinib solo requiere administrar 2 ciclos de tratamiento en total y carece por completo de eventos adversos de grado 3 o 4 tales como hipertensión arterial, diarrea o elevación de transaminasas.',
      'Porque el avelumab es un inhibidor alostérico del complejo mTOR que antagoniza competitivamente la unión intracelular del axitinib a los receptores VEGFR 1, 2 y 3 en los tumores de células claras.',
      'Porque en KEYNOTE-426 pembrolizumab + axitinib mejoró significativamente tanto la SLP como la SG frente a sunitinib (en todo riesgo IMDC y PD-L1), mientras avelumab + axitinib mejoró la SLP pero no la SG.',
    ],
    correctIndex: 3,
    explanation:
      'En el ensayo fase III KEYNOTE-426 (861 pacientes), pembrolizumab + axitinib mejoró significativamente tanto la SLP como la sobrevida global (SG) frente a sunitinib en todos los grupos de riesgo IMDC y sin importar la expresión de PD-L1. En cambio, aunque avelumab + axitinib mejoró la SLP (15,1 vs. 11,1 meses) y la tasa de respuesta objetiva (59% vs. 36%), no demostró beneficio estadísticamente significativo en sobrevida global en los ensayos aleatorizados, quedando relegado como opción alternativa no preferente.',
  },
  {
    num: 45,
    difficulty: 'intermediate',
    tags: ['primera línea CCRm', 'CLEAR', 'CheckMate-9ER', 'KEYNOTE-426', 'riesgo favorable'],
    question_text:
      'Según las guías clínicas EAU 2025 resumidas en la sección de Manejo de Enfermedad Metastásica (Tabla 22 del Manual), ¿cuáles son los tres regímenes combinados IO/TKI preferidos con nivel de evidencia IA en primera línea para pacientes con CCR de células claras metastásico de Riesgo Favorable (bajo riesgo IMDC)?',
    options: [
      'Pembrolizumab + axitinib (KEYNOTE-426), pembrolizumab + lenvatinib (CLEAR) y nivolumab + cabozantinib (CheckMate-9ER); en asintomáticos de bajo volumen cabe vigilancia activa.',
      'Nivolumab + ipilimumab (CheckMate-214), temsirolimus intravenoso + interferón-alfa y sorafenib oral + bevacizumab; además, en todos los casos es obligatoria la nefrectomía citorreductora previa.',
      'Cabozantinib en monoterapia (estudio CABOSUN), nivolumab en monoterapia (estudio CheckMate-025) y la combinación de belzutifan + everolimus (estudio LITESPARK-005) como estándares de categoría IA.',
      'Savolitinib + durvalumab (estudio SAMETA), avelumab + axitinib (estudio JAVELIN Renal 101) y tivozanib + everolimus (estudio TIVO-3) por su superioridad en supervivencia global en riesgo favorable.',
    ],
    correctIndex: 0,
    explanation:
      'En pacientes con CCRcc metastásico de riesgo favorable (0 puntos IMDC), las tres combinaciones IO/TKI preferidas con evidencia IA son: 1) Pembrolizumab + axitinib (KEYNOTE-426), 2) Pembrolizumab + lenvatinib (CLEAR) y 3) Nivolumab + cabozantinib (CheckMate-9ER). (En riesgo intermedio/alto se suma a estas tres la doble inmunoterapia Nivolumab + ipilimumab del CheckMate-214). Asimismo, en pacientes asintomáticos de bajo volumen y buen pronóstico, la vigilancia activa inicial permite postergar la toxicidad sistémica sin comprometer la sobrevida (evidencia IIA).',
  },
  {
    num: 46,
    difficulty: 'intermediate',
    tags: ['segunda línea CCRm', 'CheckMate-025', 'METEOR', 'TIVO-3', 'secuenciación'],
    question_text:
      'En un paciente con carcinoma renal de células claras metastásico que progresa tras el tratamiento de primera línea, ¿cómo se selecciona la terapia sistémica de segunda línea según si recibió o no inmunoterapia previa?',
    options: [
      'Si progresó a inmunoterapia de primera línea debe cambiarse a otro anticuerpo anti-PD-1 en monoterapia, mientras que si solo recibió un TKI previo está contraindicado administrar nivolumab por resistencia cruzada.',
      'Tras inmunoterapia se prefiere un TKI como cabozantinib (METEOR, IA), tivozanib (TIVO-3) o lenvatinib + everolimus; si no recibió inmunoterapia previa, se indica nivolumab (CheckMate-025, IA) o cabozantinib.',
      'En ambos escenarios clínicos el único tratamiento de segunda línea con nivel de evidencia IA que mejora la supervivencia global frente a cabozantinib es el temsirolimus intravenoso semanal en monoterapia.',
      'Tras progresar a primera línea con nivolumab + ipilimumab los inhibidores de tirosina quinasa pierden toda eficacia clínica, registrando medianas de supervivencia libre de progresión inferiores a las 4 semanas.',
    ],
    correctIndex: 1,
    explanation:
      'La secuenciación en segunda línea depende de la exposición previa: 1) Tras fracaso a regímenes basados en inmunoterapia (estándar actual), se recomienda cambiar a un TKI anti-VEGFR (no a un inhibidor de mTOR solo), prefiriéndose cabozantinib, tivozanib o lenvatinib + everolimus (observándose medianas de SLP de 7–8 meses con TKI post-CheckMate-214); 2) En pacientes tratados en primera línea solo con TKI sin inmunoterapia previa, el ensayo fase III CheckMate-025 demostró beneficio en sobrevida global con nivolumab frente a everolimus (junto a cabozantinib por METEOR).',
  },
  {
    num: 47,
    difficulty: 'intermediate',
    tags: ['CCR no células claras', 'SWOG 1500', 'CALYPSO', 'SAMETA', 'sarcomatoide', 'nivolumab subcutáneo'],
    question_text:
      'Respecto al manejo sistémico de los subtipos de CCR no células claras (papilar), la variante con diferenciación sarcomatoide y las nuevas vías de administración revisadas al final del capítulo, ¿cuál de las siguientes afirmaciones es correcta?',
    options: [
      'En el CCR papilar metastásico el everolimus demostró ser significativamente superior a cabozantinib y sunitinib en el ensayo SWOG 1500, mientras que en el CCR sarcomatoide la inmunoterapia se encuentra contraindicada.',
      'El estudio CALYPSO evaluó sunitinib más interferón-alfa en tumores cromófobos, y la nueva formulación subcutánea de nivolumab solo está aprobada para administrarse mezclada en la misma jeringa junto con ipilimumab.',
      'En no células claras se prefiere cabozantinib (SWOG 1500, IIA) y se estudia savolitinib + durvalumab en papilar MET+ (CALYPSO/SAMETA); en sarcomatoide destaca nivolumab + ipilimumab; y nivolumab SC no se combina con ipilimumab.',
      'En todos los subtipos histológicos no células claras la tasa de respuesta objetiva a la quimioterapia con carboplatino y paclitaxel supera el 80%, por lo que no se emplean inhibidores de tirosina quinasa ni inmunoterapia.',
    ],
    correctIndex: 2,
    explanation:
      'En CCR no células claras (dominado por la variante papilar), cabozantinib es el agente preferido tras demostrar superioridad frente a sunitinib en el ensayo SWOG 1500 (PAPMET), junto con alternativas como sunitinib (ASPEN), pembrolizumab (KEYNOTE-427) y, en tumores papilares impulsados por mutación de MET, la combinación de savolitinib + durvalumab (estudios CALYPSO y fase III SAMETA). En el subgrupo con diferenciación sarcomatoide, nivolumab + ipilimumab logró respuestas profundas y duraderas (CheckMate-214, IA). Finalmente, nivolumab + hialuronidasa subcutáneo fue aprobado como alternativa al nivolumab IV en monoterapia o mantención, pero no debe administrarse combinado con ipilimumab.',
  },
  {
    num: 48,
    difficulty: 'intermediate',
    tags: ['adyuvancia', 'pembrolizumab', 'KEYNOTE-564', 'supervivencia global', 'M1 NED'],
    question_text:
      'En el ensayo fase III KEYNOTE-564 (Choueiri et al., actualización de 2024 con 57,2 meses de seguimiento), que evaluó Pembrolizumab adyuvante (200 mg cada 3 semanas por hasta 17 ciclos / ~1 año) frente a placebo tras nefrectomía en CCR de células claras de riesgo intermedio-alto, alto o M1 sin evidencia de enfermedad (M1 NED), ¿cuál fue el impacto en supervivencia?',
    options: [
      'Mejoró únicamente la supervivencia libre de recurrencia local durante los primeros 12 meses de tratamiento, pero sin impacto estadísticamente significativo en la supervivencia global a 48 meses (HR 0,98; p = 0,85).',
      'Fue suspendido prematuramente por exceso de mortalidad tóxica inmunomediada (8,5% de miocarditis y neumonitis letal), recomendándose en su lugar el uso de sunitinib o pazopanib adyuvante durante 3 años.',
      'Demostró beneficio exclusivo en pacientes con tumores localizados pT1a grado nuclear 1 operados mediante nefrectomía parcial, resultando ineficaz en los subgrupos de tumores pT3, pT4, pN+ o M1 resecados (M1 NED).',
      'Mejoró significativamente la supervivencia libre de enfermedad (HR 0,72) y la supervivencia global (HR 0,62; p = 0,005; SG a 48 meses 91,2% vs. 86,0% con placebo), sin muertes atribuidas al tratamiento.',
    ],
    correctIndex: 3,
    explanation:
      'El estudio fase III KEYNOTE-564 marcó un hito histórico en urooncología al ser el primer ensayo de adyuvancia en cáncer renal en demostrar una mejora significativa en la supervivencia global (reducción del 38% en el riesgo de muerte, HR 0,62; p = 0,005; SG a 48 meses de 91,2% vs. 86,0%), además de mantener el beneficio en supervivencia libre de enfermedad (HR 0,72). Si bien los eventos adversos grado 3–4 fueron mayores con pembrolizumab (18,6% vs. 1,2%), no hubo ninguna muerte atribuida al fármaco.',
  },
  {
    num: 49,
    difficulty: 'intermediate',
    tags: ['enfermedad renal crónica terminal', 'ACKD', 'enfermedad quística adquirida', 'patología'],
    question_text:
      'Respecto al carcinoma de células renales que se desarrolla en pacientes con Enfermedad Renal Crónica Terminal (ERCT) y Enfermedad Quística Renal Adquirida (ACKD) descrito en el capítulo, ¿cuáles son sus características epidemiológicas y clínico-patológicas distintivas?',
    options: [
      'Su incidencia es ≥ 10 veces mayor (~4% en ERCT y mayor en ACKD), suele presentarse en pacientes más jóvenes, ser más frecuentemente multicéntrico y bilateral, y mostrar un curso clínico menos agresivo.',
      'Su riesgo relativo es diez veces menor que en la población general debido a la atrofia tubular terminal, presentándose casi invariablemente como masas solitarias unilaterales altamente metastásicas en mayores de 80 años.',
      'Corresponde en más del 90% de los casos a carcinomas medulares renales con pérdida de SMARCB1 asociados a rasgo drepanocítico que requieren quimioterapia citotóxica profiláctica durante la hemodiálisis.',
      'Se origina exclusivamente en el urotelio de la pelvis renal por litiasis cálcica secundaria al hiperparatiroidismo terciario de la diálisis, expresando de forma difusa uroplaquina III, GATA3 y p63 en la inmunohistoquímica.',
    ],
    correctIndex: 0,
    explanation:
      'Se estima que ~4% de los pacientes con enfermedad renal crónica terminal (ERCT) desarrollan CCR a lo largo de su vida (riesgo ≥ 10 veces superior al de la población general), especialmente cuando desarrollan enfermedad quística renal adquirida (ACKD). A diferencia de los CCR esporádicos, los tumores asociados a ERCT/ACKD tienden a presentarse a menor edad, son frecuentemente múltiples y bilaterales, y muestran un curso clínico comparativamente menos agresivo (posiblemente por su biología particular y la mayor vigilancia ecográfica en diálisis).',
  },
  {
    num: 50,
    difficulty: 'intermediate',
    tags: ['estudio genético', 'Guía EAU 2025', 'edad de corte', 'paneles multigénicos'],
    question_text:
      'Según las recomendaciones de evaluación genética de la Guía EAU 2025 (Tabla 13 del Manual) y el consenso clínico de Bratslavsky et al., ¿en qué perfiles clínicos está indicado realizar estudio genético germinal mediante paneles multigénicos (VHL, MET, FH, FLCN, BAP1, SDHA/B/C/D, TSC1/2, PTEN, MITF) y qué proporción de variantes germinales puede encontrarse en pacientes con CCR avanzado?',
    options: [
      'Solo está indicado cuando existen al menos tres familiares de primer grado fallecidos por cáncer renal de células claras antes de los 35 años, detectándose mutaciones germinales en menos del 0,5% de los casos metastásicos.',
      'Se indica ante inicio precoz, tumores bilaterales/multifocales, historia familiar, subtipos no células claras o estigmas sindrómicos; aunque el CCR hereditario es 4–8% global, en CCRm alcanza hasta 38%.',
      'Se recomienda realizar secuenciación germinal multigénica únicamente en pacientes mayores de 75 años con tumores solitarios cT1a de células claras grado nuclear 1 candidatos a ingresar a protocolos de vigilancia activa.',
      'El estudio genético germinal reemplaza por completo a la biopsia percutánea y a las imágenes transversales, obligando a realizar nefrectomía bilateral profiláctica en todo portador asintomático del gen VHL a los 18 años.',
    ],
    correctIndex: 1,
    explanation:
      'Aunque clásicamente los síndromes hereditarios explican el 4–8% de todos los cánceres renales, estudios contemporáneos muestran que hasta un 38% de los pacientes con CCR metastásico (especialmente en variantes no células claras) portan mutaciones germinales patogénicas. Por ello, la Guía EAU 2025 (Tabla 13) y el consenso de Bratslavsky et al. recomiendan asesoría y paneles multigénicos ante inicio precoz, multifocalidad/bilateralidad, historia familiar o morfologías sugerentes (como déficit de FH, SDH, cromófobo/híbrido o papilar múltiple).',
  },
];

const OPTION_LETTERS = ['a', 'b', 'c', 'd'] as const;

export const RENAL_CANCER_QUESTIONS: Question[] = RAW_RENAL_CANCER_QUESTIONS.map((item) => {
  const numStr = String(item.num).padStart(3, '0');
  const questionId = `q-ren-${numStr}`;
  return {
    id: questionId,
    category_id: 'cat-oncologia',
    question_text: item.question_text,
    difficulty: item.difficulty,
    explanation: item.explanation,
    reference_text: MANUAL_UROLOGIA_RENAL_REF,
    tags: item.tags,
    status: 'published',
    is_demo_content: false,
    created_by: 'admin-demo-01',
    reviewed_by: 'admin-demo-01',
    published_at: '2026-11-11T10:00:00Z',
    created_at: '2026-11-11T10:00:00Z',
    updated_at: '2026-11-11T10:00:00Z',
    options: item.options.map((optText, idx) => ({
      id: `${questionId}-${OPTION_LETTERS[idx]}`,
      question_id: questionId,
      option_text: optText,
      is_correct: idx === item.correctIndex,
      sort_order: idx + 1,
    })),
  };
});

