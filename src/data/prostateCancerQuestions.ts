import { Question } from '../types/domain';

const MANUAL_UROLOGIA_CAP_REF =
  'Manual de Urología — Sociedad Chilena de Urología: Capítulo Cáncer de Próstata (https://manualurologia.cl/cancer-de-prostata/)';

interface RawProstateQuestion {
  num: number;
  difficulty: 'basic' | 'intermediate';
  tags: string[];
  question_text: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

const RAW_PROSTATE_CANCER_QUESTIONS: RawProstateQuestion[] = [
  // ==================== NIVEL BÁSICO (1 a 30) ====================
  {
    num: 1,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'epidemiología', 'Chile', 'incidencia', 'mortalidad'],
    question_text:
      'Según las estadísticas epidemiológicas en Chile reportadas en el Manual de Urología, ¿qué lugar ocupa el cáncer de próstata (CaP) en incidencia y mortalidad por cáncer en la población masculina?',
    options: [
      'Es el segundo cáncer más frecuente en hombres y la primera causa de muerte por cáncer.',
      'Es el cáncer más frecuente en hombres (16% de los nuevos casos) y la cuarta causa de muerte por cáncer en el país.',
      'Es el tercer cáncer más frecuente después de pulmón y estómago, y la segunda causa de muerte por cáncer.',
      'Es el cáncer más frecuente en hombres, pero representa menos del 2% de las muertes oncológicas masculinas.',
    ],
    correctIndex: 1,
    explanation:
      'En Chile, el cáncer de próstata es la neoplasia maligna más frecuente en hombres, con una incidencia estimada de 62,3 por 100.000 hombres (16% del total de nuevos casos de cáncer). En cuanto a mortalidad, se estiman 15,1 muertes por 100.000 hombres (8,6% de los fallecimientos oncológicos), posicionándose como la cuarta causa de muerte por cáncer después de pulmón, estómago y colon.',
  },
  {
    num: 2,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'epidemiología', 'Chile', 'mortalidad', 'tendencias'],
    question_text:
      '¿Cómo ha evolucionado la tasa ajustada de mortalidad por cáncer de próstata en Chile en las últimas dos décadas y cómo se compara con la de países con índice de desarrollo humano muy alto?',
    options: [
      'Ha aumentado de forma exponencial desde 1998 y es tres veces menor que en países desarrollados.',
      'Ha mostrado una disminución significativa y sostenida a partir de 1998, aunque la mortalidad en Chile sigue siendo mayor (15,2 vs. 9,1 por 100.000) que el promedio de países con índice de desarrollo humano muy alto.',
      'Se ha mantenido completamente invariable desde 1955 hasta la actualidad.',
      'Ha disminuido solo en hombres menores de 45 años, aumentando en los mayores de 70 años.',
    ],
    correctIndex: 1,
    explanation:
      'A partir de 1998 se evidenció en Chile un descenso sostenido en la tasa ajustada de mortalidad por CaP en todos los grupos etarios. No obstante, aunque la incidencia en Chile es comparable a la de países con índice de desarrollo humano muy alto, su mortalidad sigue siendo significativamente mayor (15,2 vs. 9,1 por 100.000), situándose entre las más altas de América Latina y la OCDE por causas probablemente multifactoriales.',
  },
  {
    num: 3,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'factores de riesgo', 'edad', 'epidemiología'],
    question_text:
      '¿Cuál es el factor de riesgo individual más importante para el desarrollo de cáncer de próstata y en qué grupo etario se alcanza la mayor tasa de diagnóstico clínico según datos del SEER?',
    options: [
      'El tabaquismo crónico; la mayor tasa de diagnóstico ocurre entre los 35 y 45 años.',
      'La edad avanzada; es extremadamente infrecuente antes de los 40 años y alcanza su tasa más alta de diagnóstico entre los 65 y 74 años.',
      'El consumo de carnes blancas; la mayor tasa de diagnóstico ocurre antes de los 50 años.',
      'La prostatitis bacteriana aguda; la tasa de diagnóstico disminuye progresivamente a partir de los 50 años.',
    ],
    correctIndex: 1,
    explanation:
      'La edad es el factor de riesgo más importante. Estudios de autopsia muestran una prevalencia incidental que sube del 5% en <30 años al 59% en >79 años. Clínicamente, es extremadamente infrecuente en menores de 40 años, sube entre los 40-64 años (126 por 100.000) y alcanza su máximo entre los 65 y 74 años (744 por 100.000 hombres).',
  },
  {
    num: 4,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'factores de riesgo', 'raza', 'ascendencia genética'],
    question_text:
      'Respecto a la relación entre raza/ascendencia y el cáncer de próstata, ¿qué señala la evidencia actual reportada en el Manual de Urología?',
    options: [
      'Los hombres afrodescendientes tienen menor incidencia de cáncer de próstata, pero peor respuesta biológica intrínseca a la radioterapia.',
      'Los hombres negros tienen mayor probabilidad de ser diagnosticados (1,7 veces) y morir (2,1 veces) por CaP en EE. UU., pero cuando son diagnosticados en igual grado y estadio y reciben acceso y tratamiento equitativos, sus resultados clínicos son equivalentes a los de hombres blancos.',
      'La ascendencia asiática presenta el mayor riesgo mundial de cáncer de próstata letal.',
      'Las diferencias de mortalidad según raza se mantienen idénticas incluso al igualar el estadio, grado y acceso al tratamiento.',
    ],
    correctIndex: 1,
    explanation:
      'Aunque los hombres con ascendencia del noroeste del África subsahariana tienen mayor riesgo genético de desarrollar la enfermedad (1,7 veces más diagnósticos y 2,1 veces más mortalidad en registros generales de EE. UU.), numerosos estudios demuestran que a igual grado, igual estadio y acceso equitativo al tratamiento, los resultados clínicos oncológicos son equivalentes entre hombres negros y blancos.',
  },
  {
    num: 5,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'historia familiar', 'heredabilidad', 'factores de riesgo'],
    question_text:
      '¿Cómo influye el antecedente familiar de primer grado (padre o hermano con cáncer de próstata) y cuál es la heredabilidad genética estimada de esta neoplasia?',
    options: [
      'No modifica el riesgo individual, ya que la heredabilidad del CaP es menor al 5%.',
      'Hijos y hermanos de hombres con CaP presentan un riesgo aproximadamente 2,5 veces mayor de ser diagnosticados, y el CaP tiene una alta heredabilidad genética estimada en un 58%.',
      'Solo el antecedente de cáncer de pulmón en el padre aumenta el riesgo de cáncer de próstata.',
      'El antecedente familiar aumenta el riesgo 15 veces, pero únicamente para tumores benignos de la zona transicional.',
    ],
    correctIndex: 1,
    explanation:
      'El cáncer de próstata es uno de los tumores con mayor componente hereditario, con una heredabilidad estimada del 58%. Tener un hijo o hermano afectado aumenta el riesgo cerca de 2,5 veces, y también influyen la edad temprana al diagnóstico del familiar, la presencia de enfermedad de alto grado/metastásica y antecedentes familiares de cáncer de mama u ovario.',
  },
  {
    num: 6,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'genética', 'BRCA2', 'HOXB13', 'síndrome de Lynch'],
    question_text:
      '¿Cuáles son los genes cuyas mutaciones germinales se asocian con mayor fuerza a predisposición hereditaria al cáncer de próstata?',
    options: [
      'VHL y MET',
      'HOXB13 y BRCA2 (además de otros genes de reparación del ADN como BRCA1, ATM, CHEK2 y genes del síndrome de Lynch).',
      'RB1 y WT1',
      'APC y KRAS exclusivamente',
    ],
    correctIndex: 1,
    explanation:
      'Las mutaciones en HOXB13 y BRCA2 son las más asociadas a predisposición hereditaria al CaP. Asimismo, mutaciones en genes de reparación del ADN (BRCA1, ATM, CHEK2) y genes reparadores de desajustes del síndrome de Lynch (MLH1, MSH6) se asocian con un mayor riesgo, especialmente de formas agresivas y metastásicas.',
  },
  {
    num: 7,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'estilo de vida', 'dieta', 'ejercicio', 'obesidad'],
    question_text:
      'En relación con los factores dietéticos, la obesidad y el ejercicio físico en el cáncer de próstata, ¿cuál de las siguientes afirmaciones es correcta?',
    options: [
      'El ejercicio físico vigoroso aumenta la mortalidad específica por cáncer de próstata al elevar la testosterona.',
      'Las dietas basadas en plantas y la actividad física se asocian a menor riesgo o menor mortalidad específica por CaP, mientras que la obesidad y el síndrome metabólico se asocian a un mayor riesgo de enfermedad agresiva.',
      'El consumo elevado de proteínas lácteas y grasas trans tiene un potente efecto protector demostrado contra el cáncer de próstata agresivo.',
      'La obesidad disminuye el riesgo de cáncer de próstata de alto grado en un 60%.',
    ],
    correctIndex: 1,
    explanation:
      'Las dietas vegetarianas/basadas en plantas y alimentos ricos en fitoestrógenos (soja, legumbres) se asocian a menor riesgo, mientras que dietas proinflamatorias, hiperinsulinémicas, ricas en grasas trans y lácteos se vinculan a mayor riesgo o mortalidad. El síndrome metabólico y la obesidad se asocian a mayor riesgo de CaP agresivo, en tanto que la actividad física se asocia con menor mortalidad específica por CaP y mayor sobrevida libre de enfermedad.',
  },
  {
    num: 8,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'tabaquismo', 'testosterona', 'eyaculación'],
    question_text:
      'Respecto al rol del tabaquismo, la terapia de reemplazo con testosterona y la frecuencia eyaculatoria en el cáncer de próstata, ¿qué indica la evidencia del Manual de Urología?',
    options: [
      'Los fumadores tienen mayor riesgo de morir por CaP; la terapia de reemplazo con testosterona en hombres con hipogonadismo no aumenta el riesgo de desarrollar CaP; y una mayor frecuencia eyaculatoria se ha descrito como factor protector.',
      'Los fumadores tienen una mortalidad 50% menor por CaP que los no fumadores.',
      'La terapia de reemplazo con testosterona en hipogonadismo triplica la incidencia de cáncer de próstata en el primer año.',
      'Una mayor frecuencia eyaculatoria duplica el riesgo de adenocarcinoma acinar.',
    ],
    correctIndex: 0,
    explanation:
      'Aunque los estudios observacionales muestran menor frecuencia de diagnóstico en fumadores (probablemente por menor participación en tamizaje), los fumadores tienen mayor riesgo de morir por CaP. Por otra parte, niveles séricos altos de andrógenos o la terapia de reemplazo con testosterona en hipogonádicos no aumentan el riesgo de desarrollar CaP. Finalmente, tanto una mayor frecuencia eyaculatoria como el estar casado o en pareja se han descrito como factores protectores.',
  },
  {
    num: 9,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'quimioprevención', 'inhibidores 5-alfa reductasa', 'finasteride', 'dutasteride'],
    question_text:
      '¿Qué efecto demostraron los inhibidores de la 5-alfa reductasa (finasteride y dutasteride) en los estudios de quimioprevención del cáncer de próstata?',
    options: [
      'Reducen el riesgo general de diagnóstico de CaP en aproximadamente un 30%, pero se asociaron a mayor detección de tumores de alto grado y no demostraron beneficio en prevenir cánceres letales en poblaciones bajo tamizaje.',
      'Erradican el 100% de los tumores de alto grado (Gleason 8 a 10), por lo que se indican de rutina a todos los hombres sanos desde los 40 años.',
      'Aumentan un 50% la incidencia de cánceres de bajo grado (ISUP 1).',
      'No tienen ningún efecto sobre la glándula prostática ni sobre la incidencia de cáncer.',
    ],
    correctIndex: 0,
    explanation:
      'Existe evidencia robusta de que finasteride y dutasteride reducen el riesgo general de CaP en cerca de un 30%; sin embargo, se asociaron con un mayor riesgo de detección de tumores de alto grado y ausencia de beneficio en la prevención de cánceres letales en poblaciones con screening regular, razón por la cual no se utilizan como quimioprevención poblacional estándar.',
  },
  {
    num: 10,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'histología', 'adenocarcinoma acinar'],
    question_text:
      '¿Qué porcentaje de los cánceres de próstata corresponde al adenocarcinoma acinar convencional según la clasificación de la OMS?',
    options: [
      'Alrededor del 40%',
      'Entre el 60% y el 65%',
      'Más del 90%',
      'Menos del 15%',
    ],
    correctIndex: 2,
    explanation:
      'Más del 90% de los cánceres de próstata corresponden a adenocarcinoma acinar convencional. El porcentaje restante incluye variantes acinares (pseudohiperplásico, microquístico, foamy-cell, mucinoso, células en anillo de sello, sarcomatoide) y tipos no acinares (adenocarcinoma ductal, urotelial, escamoso, células basales y tumores neuroendocrinos).',
  },
  {
    num: 11,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'anatomía zonal', 'zona periférica', 'zona de transición'],
    question_text:
      '¿En qué zona anatómica de la próstata se origina la gran mayoría (70–75%) de los cánceres de próstata y cómo se compara su comportamiento biológico con los tumores originados en la zona de transición (20–25%)?',
    options: [
      'Se originan en un 70–75% en la zona de transición (ZT), siendo mucho más agresivos que los de la zona periférica.',
      'Se originan en un 70–75% en la zona periférica (ZP), los cuales tienden a ser más agresivos que los de la zona de transición (ZT), que suelen tener menor grado de Gleason y mejor pronóstico tras cirugía.',
      'Se originan en un 75% en la zona central (ZC), alrededor de los conductos eyaculadores.',
      'Se distribuyen en partes iguales (33%) entre zona periférica, central y transicional, sin diferencias biológicas.',
    ],
    correctIndex: 1,
    explanation:
      'El 70–75% de los CaP se origina en la zona periférica (ZP), el 20–25% en la zona de transición (ZT) y solo el 5% en la zona central (ZC). Los tumores de la ZP tienden a ser más agresivos (mayor frecuencia de patrón cribiforme, fusión TMPRSS2-ERG y pérdida de PTEN), mientras que los de la ZT suelen tener menor grado de Gleason, menor extensión extracapsular y mejor pronóstico, aunque su localización anterior puede dificultar su detección al simular hiperplasia nodular.',
  },
  {
    num: 12,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'Gleason', 'anatomía patológica'],
    question_text:
      '¿En qué se basa el sistema de graduación histológica de Gleason para clasificar el adenocarcinoma de próstata?',
    options: [
      'En el conteo del número de mitosis por campo de mayor aumento y el porcentaje de necrosis tumoral.',
      'En la arquitectura y el grado de diferenciación glandular observado en la biopsia, sumando la puntuación de los dos patrones arquitecturales predominantes.',
      'En el tamaño macroscópico del tumor medido en centímetros en la resonancia magnética.',
      'En el nivel sérico de APE dividido por el peso del paciente.',
    ],
    correctIndex: 1,
    explanation:
      'Propuesto por Donald Gleason en la década de 1960, el sistema clasifica el adenocarcinoma prostático según la arquitectura glandular y el grado de diferenciación, asignando un patrón (actualmente de 3 a 5 en biopsias) a los dos componentes predominantes cuya suma conforma el puntaje de Gleason (de 6 a 10).',
  },
  {
    num: 13,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'ISUP', 'Gleason', 'grupos de grado'],
    question_text:
      'En la clasificación actual de la International Society of Urological Pathology (ISUP), ¿a qué puntaje de Gleason corresponde el Grupo de Grado ISUP 1 y cuál es su relevancia clínica?',
    options: [
      'Corresponde a Gleason 6 (3+3); representa el grupo de mejor pronóstico, con riesgo nulo de metástasis ganglionares o a distancia cuando es Gleason 3 puro confirmado en prostatectomía.',
      'Corresponde a Gleason 7 (3+4); presenta un 25% de riesgo de metástasis óseas al diagnóstico.',
      'Corresponde a Gleason 2 (1+1); solo se diagnostica en punciones transperineales.',
      'Corresponde a Gleason 8 (4+4); requiere quimioterapia citotóxica de primera línea.',
    ],
    correctIndex: 0,
    explanation:
      'En las reformas de la ISUP (2005 y 2014) se eliminaron los patrones 1 y 2 en biopsias y se crearon 5 Grupos de Grado (del 1 al 5) para facilitar la comunicación clínica: ISUP 1 = Gleason 6 (3+3), ISUP 2 = Gleason 7 (3+4), ISUP 3 = Gleason 7 (4+3), ISUP 4 = Gleason 8, e ISUP 5 = Gleason 9–10. El patrón Gleason 3 puro (ISUP 1) carece de las alteraciones moleculares invasivas del patrón 4 y se asocia a excelente pronóstico.',
  },
  {
    num: 14,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'APE', 'fisiología', 'licuefacción seminal'],
    question_text:
      '¿Qué es el Antígeno Prostático Específico (APE) y cuál es su función biológica normal en el líquido seminal?',
    options: [
      'Es una hormona esteroidal producida por las células de Leydig que madura los espermatozoides.',
      'Es una enzima (serina proteasa) secretada por las células epiteliales prostáticas cuya función es lisar las seminogelinas para permitir la licuefacción del semen.',
      'Es un anticuerpo secretado por el urotelio vesical para prevenir infecciones ascendentes.',
      'Es una proteína estructural exclusiva de las células malignas que no existe en hombres sanos.',
    ],
    correctIndex: 1,
    explanation:
      'El APE es una enzima secretada por el epitelio prostático hacia el lumen ductal, donde lisa las seminogelinas del coágulo seminal permitiendo la licuefacción del semen. Normalmente solo una mínima fracción pasa a la circulación sanguínea, donde circula tanto libre como unido a proteínas.',
  },
  {
    num: 15,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'APE', 'causas de elevación', 'especificidad'],
    question_text:
      '¿Por qué se afirma que el APE es un marcador "órgano-específico pero no enfermedad-específico"?',
    options: [
      'Porque también se produce en grandes cantidades en el hígado, el colon y el páncreas.',
      'Porque es producido prácticamente solo por la próstata, pero puede elevarse tanto en el cáncer como en condiciones benignas (hiperplasia prostática benigna, prostatitis/infecciones urinarias, eyaculación reciente, instrumentalización urológica o trauma).',
      'Porque solo se eleva en presencia de infecciones urinarias y nunca en el cáncer de próstata.',
      'Porque su valor depende únicamente de la función de filtración glomerular renal.',
    ],
    correctIndex: 1,
    explanation:
      'Aunque el APE es específico del tejido prostático, carece de especificidad para cáncer: afecciones benignas como la HPB, inflamación/infección (prostatitis), retención urinaria, instrumentación de la vía urinaria, trauma o eyaculación pueden elevar sus niveles plasmáticos.',
  },
  {
    num: 16,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'APE', 'puntos de corte', 'sensibilidad', 'especificidad'],
    question_text:
      'Dado que el APE es un parámetro continuo sin un valor único que separe perfectamente a sanos de enfermos, ¿qué ocurre al disminuir el punto de corte del APE (por ejemplo, de 4 ng/mL a 3 ng/mL) en la pesquisa diagnóstica?',
    options: [
      'Aumenta la sensibilidad para detectar cáncer, pero disminuye la especificidad, incrementando los falsos positivos y el número de estudios o biopsias adicionales.',
      'Aumenta la especificidad al 100% y elimina por completo los falsos positivos.',
      'Disminuye tanto la sensibilidad como la especificidad del examen.',
      'Permite distinguir con certeza absoluta entre tumores ISUP 1 e ISUP 5 sin necesidad de biopsia.',
    ],
    correctIndex: 0,
    explanation:
      'La elección de un umbral de APE implica equilibrar sensibilidad y especificidad: bajar el punto de corte (de 4 ng/mL, que tenía sensibilidad ~20% y especificidad ~93%, a 3 ng/mL usado en el estudio europeo ERSPC, con sensibilidad ~32% y especificidad ~85%) permite detectar más cánceres, pero reduce la especificidad y aumenta los falsos positivos.',
  },
  {
    num: 17,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'APE', 'inhibidores 5-alfa reductasa', 'finasteride', 'dutasteride'],
    question_text:
      'Si un paciente lleva más de 6 meses en tratamiento con finasteride o dutasteride por hiperplasia prostática benigna, ¿cómo se ven afectados su APE total y su porcentaje de APE libre?',
    options: [
      'El APE total disminuye en aproximadamente un 50% (por lo que debe corregirse al interpretarlo), mientras que el porcentaje de APE libre (% APE libre) no se altera y puede utilizarse normalmente.',
      'El APE total se multiplica por dos y el porcentaje de APE libre cae a cero.',
      'Ni el APE total ni el APE libre sufren modificaciones con estos medicamentos.',
      'El APE total no cambia, pero el porcentaje de APE libre se reduce en un 80%.',
    ],
    correctIndex: 0,
    explanation:
      'Como la producción de APE es andrógeno-dependiente, los inhibidores de la 5-alfa reductasa reducen el APE sérico total en cerca de un 50%. En cambio, dado que el APE total y el APE libre disminuyen en igual proporción, la relación porcentual (% APE libre) se mantiene inalterada.',
  },
  {
    num: 18,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'APE', 'variabilidad biológica', 'repetición del examen'],
    question_text:
      'Un hombre asintomático de 58 años presenta por primera vez un APE de 4,8 ng/mL con tacto rectal normal. ¿Por qué las guías recomiendan repetir el APE en el mismo laboratorio tras unas semanas (6 a 8 semanas) antes de indicar una biopsia?',
    options: [
      'Porque el APE tiene una variación biológica intraindividual de ±15% (y hasta 7% entre distintos ensayos), y en cerca del 20% de los hombres con APE entre 4 y 10 ng/mL el valor vuelve a <3 ng/mL al repetirlo a las 8 semanas.',
      'Porque el APE tarda 8 semanas en activarse dentro del tubo de ensayo.',
      'Porque ninguna aseguradora autoriza una resonancia magnética sin 5 mediciones previas de APE.',
      'Porque repetir el APE reemplaza la necesidad de biopsia incluso si sube a 25 ng/mL.',
    ],
    correctIndex: 0,
    explanation:
      'Nunca debe tomarse una decisión invasiva con un único valor aislado de APE levemente elevado. En estudios como ProtecT y Stockholm3, repetir el APE en condiciones estandarizadas y en el mismo laboratorio permitió evitar entre un 17% y 20% de biopsias innecesarias, ya que los pacientes cuyo APE desciende significativamente tienen un riesgo mucho menor de cáncer clínicamente significativo.',
  },
  {
    num: 19,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'APE libre', 'interpretación', 'diagnóstico'],
    question_text:
      'En la evaluación complementaria de un paciente con elevación moderada del APE total, ¿qué sugiere un porcentaje de APE libre inferior al 10% frente a uno superior al 25%?',
    options: [
      'Un % de APE libre <10% se asocia con mayor probabilidad de cáncer de próstata, mientras que un valor >25% suele relacionarse con histología benigna.',
      'Un % de APE libre >25% confirma metástasis óseas osteoblásticas.',
      'Un % de APE libre <10% indica hiperplasia benigna pura y descarta malignidad.',
      'El % de APE libre solo sirve para evaluar la respuesta a la radioterapia externa.',
    ],
    correctIndex: 0,
    explanation:
      'En pacientes con cáncer de próstata, una mayor proporción del APE circula complejado a proteínas plasmáticas (como antiquimotripsina), reduciendo la fracción libre. Por ello, valores de APE libre <10% orientan a mayor probabilidad de malignidad y valores >25% orientan a patología prostática benigna.',
  },
  {
    num: 20,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'screening', 'tamizaje', 'ERSPC', 'USPSTF'],
    question_text:
      '¿Cuál es el estado actual del tamizaje (screening) de cáncer de próstata en guías internacionales (como USPSTF 2018) y en Chile?',
    options: [
      'Existe una prohibición absoluta mundial de solicitar APE en hombres asintomáticos de cualquier edad.',
      'No existe una política de tamizaje poblacional masivo obligatorio, pero se recomienda una decisión individualizada y compartida (informando riesgos y beneficios, especialmente entre los 55 y 69 años), apoyada en herramientas como la RNMmp y la vigilancia activa que han reducido el sobrediagnóstico y el sobretratamiento.',
      'En Chile es obligatorio por ley realizar biopsia prostática anual a todos los hombres mayores de 40 años.',
      'El estudio europeo ERSPC demostró a 21 años que el tamizaje con APE aumenta la mortalidad por cáncer de próstata.',
    ],
    correctIndex: 1,
    explanation:
      'Aunque inicialmente el uso indiscriminado del APE generó sobrediagnóstico y sobretratamiento (llevando a la USPSTF en 2012 a desaconsejarlo), el seguimiento a largo plazo del estudio europeo ERSPC demostró una reducción significativa de la mortalidad específica por CaP (hasta 51% a 21 años en algunos centros, con NNS de 570). En 2018 la USPSTF actualizó su postura hacia una decisión compartida e individualizada en hombres de 55 a 69 años, mitigando los riesgos gracias a la RNMmp pre-biopsia y a la vigilancia activa.',
  },
  {
    num: 21,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'resonancia magnética', 'RNMmp', 'PI-RADS'],
    question_text:
      '¿Cuál es el rol principal de la Resonancia Magnética multiparamétrica (RNMmp) de próstata informada mediante el sistema PI-RADS antes de la primera biopsia?',
    options: [
      'Detectar lesiones sospechosas de cáncer clínicamente significativo para guiar biopsias dirigidas y evitar biopsias innecesarias que sobrediagnostiquen tumores indolentes.',
      'Reemplazar definitivamente a la biopsia prostática para iniciar quimioterapia sin confirmación histológica.',
      'Medir exclusivamente el residuo postmiccional vesical.',
      'Evaluar únicamente la presencia de metástasis cerebrales y pulmonares.',
    ],
    correctIndex: 0,
    explanation:
      'Respaldada por ensayos como PROMIS y PRECISION y recomendada con Nivel 1 de evidencia por las guías EAU y NCCN antes de la primera biopsia, la RNMmp evaluada con el sistema PI-RADS mejora la detección de cánceres clínicamente significativos (ISUP ≥2) guiando la biopsia hacia las lesiones sospechosas y reduciendo en ~28–30% las biopsias innecesarias.',
  },
  {
    num: 22,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'TNM', 'estadificación', 'categoría T'],
    question_text:
      'En la clasificación clínica TNM del cáncer de próstata, ¿qué diferencia fundamental existe entre las categorías T1, T2, T3 y T4?',
    options: [
      'T1 es un tumor clínicamente inaparente (no palpable ni visible por imágenes); T2 es un tumor confinado dentro de la próstata; T3 se extiende a través de la cápsula prostática (o invade vesículas seminales); y T4 está fijo o invade estructuras adyacentes distintas a las vesículas seminales.',
      'T1 mide menos de 1 cm, T2 mide 2 cm, T3 mide 3 cm y T4 mide más de 4 cm independientemente de la cápsula.',
      'T1 afecta un lóbulo, T2 afecta ambos lóbulos, T3 afecta ganglios regionales y T4 corresponde a metástasis óseas.',
      'T1 y T2 son tumores benignos (HPB), mientras que T3 y T4 son adenocarcinomas.',
    ],
    correctIndex: 0,
    explanation:
      'El estadio T evalúa la extensión anatómica del tumor primario: T1 (no palpable ni visible por imágenes, ej. T1a/T1b incidental en RTU o T1c por biopsia por APE elevado), T2 (confinado a la próstata: T2a ≤ mitad de un lóbulo, T2b > mitad de un lóbulo, T2c ambos lóbulos), T3 (supera la cápsula: T3a extensión extracapsular, T3b invasión de vesículas seminales) y T4 (invade cuello vesical, esfínter externo, recto, músculos elevadores o pared pélvica).',
  },
  {
    num: 23,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'TNM', 'metástasis', 'N1', 'M1'],
    question_text:
      'En el sistema TNM para cáncer de próstata, ¿qué significan las categorías N1 y M1b?',
    options: [
      'N1 es invasión de un nervio cavernoso y M1b es invasión de la base prostática.',
      'N1 indica metástasis en ganglio(s) linfático(s) regional(es) pélvicos, y M1b indica metástasis a distancia en hueso(s).',
      'N1 es metástasis en ganglios mediastínicos y M1b es metástasis hepática.',
      'N1 es ausencia de metástasis ganglionar y M1b es metástasis en ganglios no regionales.',
    ],
    correctIndex: 1,
    explanation:
      'En la clasificación TNM: N0 es ausencia de metástasis ganglionar regional y N1 es metástasis en ganglios linfáticos regionales (pélvicos). Para metástasis a distancia (M1), se subdivide en: M1a (ganglios linfáticos no regionales), M1b (huesos, el sitio metastásico más frecuente en CaP) y M1c (otros sitios o vísceras con o sin enfermedad ósea).',
  },
  {
    num: 24,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'cáncer clínicamente significativo', 'historia natural', 'ISUP 1'],
    question_text:
      '¿Por qué no todos los hombres diagnosticados con cáncer de próstata localizado requieren tratamiento radical inmediato (cirugía o radioterapia)?',
    options: [
      'Porque el cáncer de próstata localizado es 100% resistente a la cirugía y a la radioterapia.',
      'Porque muchos tumores (especialmente los ISUP 1 / Gleason 6 de bajo volumen) tienen una historia natural indolente y un crecimiento muy lento, de modo que muchos pacientes —en especial aquellos con comorbilidades o expectativa de vida limitada— fallecerán por otras causas sin que el tumor genere síntomas ni metástasis.',
      'Porque los tumores prostáticos desaparecen espontáneamente en el 80% de los casos a los 6 meses del diagnóstico.',
      'Porque solo se operan los pacientes que ya presentan metástasis óseas múltiples.',
    ],
    correctIndex: 1,
    explanation:
      'El cáncer de próstata tiene habitualmente una evolución lenta y existe una amplia reserva de tumores clínicamente insignificantes (como el ISUP 1 de bajo volumen, cuyo riesgo de metástasis es virtualmente nulo). Por ello, someter a todos los pacientes a tratamientos radicales genera sobretratamiento y secuelas funcionales (incontinencia, disfunción eréctil) sin beneficio en supervivencia.',
  },
  {
    num: 25,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'vigilancia activa', 'objetivo', 'bajo riesgo'],
    question_text:
      '¿Cuál es el objetivo principal de la Vigilancia Activa en pacientes con cáncer de próstata localizado de bajo riesgo?',
    options: [
      'Abandonar todo control médico hasta que el paciente presente dolor óseo por metástasis.',
      'Monitorear de forma estructurada el curso de un tumor indolente para evitar o diferir los efectos adversos del sobretratamiento, indicando un tratamiento curativo (cirugía o radioterapia) solo si se documenta progresión de la enfermedad.',
      'Administrar quimioterapia oral en dosis bajas de por vida para evitar la cirugía.',
      'Realizar resecciones transuretrales de próstata cada 6 meses para vaciar la glándula.',
    ],
    correctIndex: 1,
    explanation:
      'La vigilancia activa es el estándar de manejo para el CaP de muy bajo y bajo riesgo en pacientes con buena expectativa de vida (>10 años). Permite preservar la calidad de vida (función urinaria y sexual) manteniendo una ventana de curabilidad segura mediante controles periódicos de APE, tacto rectal, RNMmp y biopsias de seguimiento.',
  },
  {
    num: 26,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'prostatectomía radical', 'vías de abordaje', 'cirugía'],
    question_text:
      '¿Qué estructuras anatómicas se extirpan de forma estándar en una prostatectomía radical con intención curativa y cuáles son sus vías de abordaje actuales?',
    options: [
      'Se extirpa únicamente el lóbulo prostático donde salió positiva la biopsia mediante cistoscopía transuretral.',
      'Se extirpa la glándula prostática completa junto con las vesículas seminales (y linfadenectomía pélvica según indicación), pudiendo realizarse por vía abierta (retropúbica o perineal), laparoscópica o asistida por robot (RARP).',
      'Se extirpan la próstata, la vejiga urinaria completa y ambos testículos en todos los casos.',
      'Se extirpa solo la zona de transición prostática dejando intacta la zona periférica y las vesículas seminales.',
    ],
    correctIndex: 1,
    explanation:
      'La prostatectomía radical consiste en la extirpación en bloque de la próstata y las vesículas seminales con posterior anastomosis vesicouretral. Hoy el abordaje asistido por robot (RARP) ofrece ventajas perioperatorias sobre la vía abierta (menor sangrado, menor tasa de transfusión, menor estadía hospitalaria y recuperación más rápida de la continencia) y acorta la curva de aprendizaje respecto a la laparoscopía convencional.',
  },
  {
    num: 27,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'radioterapia', 'EBRT', 'braquiterapia'],
    question_text:
      '¿Cuáles son las dos modalidades principales de radioterapia con intención curativa empleadas en el cáncer de próstata localizado?',
    options: [
      'Radioterapia externa conformacional guiada por imágenes (EBRT) y Braquiterapia (implante intersticial de fuentes radiactivas de baja o alta tasa de dosis).',
      'Radioterapia corporal total (hemicuerpo) y terapia con yodo radiactivo (I-131).',
      'Instilación intravesical de BCG y radioterapia profiláctica craneal.',
      'Ultrasonido focalizado de alta intensidad (HIFU) y crioterapia prostática, que utilizan radiación gamma.',
    ],
    correctIndex: 0,
    explanation:
      'La radioterapia curativa en CaP comprende la Radioterapia Primaria Externa (EBRT) —actualmente administrada con técnicas de alta precisión y esquemas hipofraccionados— y la Braquiterapia (de baja tasa de dosis [LDR] como monoterapia en bajo riesgo o combinada con EBRT en riesgo intermedio, o de alta tasa de dosis [HDR]).',
  },
  {
    num: 28,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'APE postoperatorio', 'prostatectomía radical', 'seguimiento'],
    question_text:
      'Tras una prostatectomía radical exitosa por un cáncer de próstata confinado al órgano, ¿qué comportamiento se espera del nivel sérico de APE y en cuánto tiempo?',
    options: [
      'Debe estabilizarse alrededor de 2,0 ng/mL a los 6 meses de la cirugía.',
      'Debe descender a valores indetectables dentro de las 6 a 8 semanas posteriores a la cirugía.',
      'Debe aumentar al doble durante el primer año por cicatrización del cuello vesical.',
      'No se modifica respecto al valor preoperatorio porque las glándulas bulbouretrales siguen produciendo APE.',
    ],
    correctIndex: 1,
    explanation:
      'Al extirpar por completo la glándula prostática y las vesículas seminales, y considerando la vida media plasmática del APE, se espera que el APE descienda a niveles indetectables dentro de las 6 a 8 semanas postoperatorias. Si permanece detectable en ese período temprano, se denomina persistencia de APE; si alcanza un nadir indetectable y luego vuelve a subir ≥0,2 ng/mL en dos mediciones, se denomina recurrencia (o recidiva) bioquímica.',
  },
  {
    num: 29,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'terapia de deprivación androgénica', 'TDA', 'castración'],
    question_text:
      '¿En qué se fundamenta la Terapia de Deprivación Androgénica (TDA o bloqueo hormonal) en el cáncer de próstata avanzado y cuáles son los dos métodos principales para lograr la castración?',
    options: [
      'Desde los estudios de Huggins y Hodges se sabe que el cáncer de próstata depende de los andrógenos para su crecimiento; la castración puede lograrse de forma quirúrgica (orquiectomía bilateral) o médica (agonistas LHRH o antagonistas GnRH), siendo ambas igualmente efectivas.',
      'Consiste en administrar altas dosis de testosterona exógena; solo puede lograrse mediante suprarrenalectomía bilateral.',
      'La castración médica con agonistas LHRH es cinco veces menos efectiva que la orquiectomía quirúrgica para bajar la testosterona.',
      'Se basa en bloquear los receptores de estrógenos en el riñón mediante tamoxifeno.',
    ],
    correctIndex: 0,
    explanation:
      'La deprivación androgénica es la piedra angular del tratamiento sistémico del CaP avanzado al reducir la activación del receptor de andrógenos. Tanto la castración quirúrgica (orquiectomía bilateral total o subalbugínea) como la castración médica (agonistas LHRH o antagonistas LHRH/GnRH) tienen eficacia equivalente para alcanzar niveles de testosterona de castración (<50 ng/dL, idealmente <20 ng/dL).',
  },
  {
    num: 30,
    difficulty: 'basic',
    tags: ['cáncer de próstata', 'salud ósea', 'TDA', 'efectos adversos', 'calcio y vitamina D'],
    question_text:
      '¿Cuál es uno de los efectos colaterales sistémicos más importantes de la Terapia de Deprivación Androgénica (TDA) prolongada sobre el sistema musculoesquelético y qué medidas básicas se recomiendan en todos los pacientes bajo TDA?',
    options: [
      'Produce hiperostosis cortical difusa; se recomienda restringir totalmente el calcio de la dieta.',
      'Produce pérdida acelerada de masa mineral ósea (osteopenia/osteoporosis) y mayor riesgo de fracturas; se recomienda evaluar con densitometría ósea/FRAX e indicar suplementación con calcio (1000–1200 mg/día), vitamina D3 y ejercicio con carga en todos los pacientes.',
      'Provoca calcificación de los ligamentos pélvicos; se indica reposo absoluto en cama.',
      'Solo afecta a los huesos del cráneo y no requiere suplementación ni monitoreo densitométrico.',
    ],
    correctIndex: 1,
    explanation:
      'El hipogonadismo inducido por la TDA acelera la resorción ósea e incrementa el riesgo de fracturas. Por ello, las guías NCCN recomiendan densitometría ósea basal (y cada 1–2 años), cálculo de riesgo con FRAX, modificaciones del estilo de vida (ejercicio con carga, suspender tabaco y alcohol) y suplementación universal con calcio (1000–1200 mg/día) y vitamina D3 (meta >30 ng/mL), agregando antirresortivos (denosumab o ácido zoledrónico) cuando el riesgo de fractura es elevado.',
  },

  // ==================== NIVEL INTERMEDIO (31 a 60) ====================
  {
    num: 31,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'genética', 'puntajes de riesgo poligénico', 'PRS', 'SNPs'],
    question_text:
      'En relación con los polimorfismos genéticos de un solo nucleótido (SNPs) y los Puntajes de Riesgo Poligénico (PRS, Polygenic Risk Scores) en cáncer de próstata, ¿por qué las guías clínicas actuales no recomiendan su uso rutinario como marcador pronóstico?',
    options: [
      'Porque no se ha identificado ningún SNP asociado a la incidencia de cáncer de próstata en humanos.',
      'Porque aunque un PRS elevado (basado en hasta 269 SNPs validados) predice un mayor riesgo de desarrollar CaP incidente, no permite distinguir entre enfermedad indolente y enfermedad agresiva.',
      'Porque los SNPs solo se expresan en tumores neuroendocrinos de células pequeñas.',
      'Porque el PRS solo tiene validez en hombres menores de 25 años.',
    ],
    correctIndex: 1,
    explanation:
      'Estudios genómicos multiétnicos han validado 269 SNPs que combinados en un PRS impactan significativamente en el riesgo de presentar CaP incidente. Sin embargo, dado que el PRS se asocia al riesgo de CaP independientemente de su grado y no discrimina entre cánceres indolentes y agresivos/letales, carece de utilidad pronóstica y no se recomienda en las guías clínicas actuales.',
  },
  {
    num: 32,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'histología', 'variantes histológicas', 'ductal', 'neuroendocrino', 'mucinoso'],
    question_text:
      'Al comparar las variantes histológicas menos frecuentes del cáncer de próstata (adenocarcinoma ductal, carcinoma neuroendocrino de células pequeñas y carcinoma mucinoso), ¿cuál de las siguientes afirmaciones es correcta según el Manual de Urología?',
    options: [
      'El carcinoma mucinoso (definido por ≥25% del tumor con lagos de mucina extracelular) es la variante más letal de todas y nunca responde a la prostatectomía radical.',
      'El adenocarcinoma ductal y el carcinoma neuroendocrino de células pequeñas son variantes clínica y biológicamente agresivas con peor pronóstico (tratándose el de células pequeñas con quimioterapia similar al pulmonar), mientras que estudios contemporáneos muestran que el carcinoma mucinoso tras prostatectomía radical no es más agresivo que el adenocarcinoma acinar convencional.',
      'El carcinoma de células pequeñas secreta grandes cantidades de APE (>500 ng/mL en todos los casos) y tiene un curso indolente susceptible de vigilancia activa.',
      'El adenocarcinoma ductal se origina en el urotelio vesical y se trata únicamente con BCG intravesical.',
    ],
    correctIndex: 1,
    explanation:
      'El adenocarcinoma ductal (segunda variante más común tras el acinar, con células columnares altas en patrones cribiformes/papilares) y el carcinoma neuroendocrino de células pequeñas tienen comportamiento agresivo y mal pronóstico (este último responde a esquemas de quimioterapia basados en platino similares al de pulmón). En cambio, el carcinoma mucinoso (<0,3% de los casos, ≥25% de mucina extracelular), pese a que antiguamente se creía agresivo, hoy se sabe que tras prostatectomía radical tiene un pronóstico igual o incluso más favorable que el acinar convencional.',
  },
  {
    num: 33,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'inmunohistoquímica', 'AMACR', 'p63', 'CK5/6', 'NKX3.1'],
    question_text:
      'En el estudio inmunohistoquímico de una biopsia prostática con glándulas atípicas sospechosos de malignidad o en la confirmación del origen prostático de una metástasis poco diferenciada, ¿qué rol cumplen los marcadores p63, CK5/6, AMACR (P504S) y NKX3.1?',
    options: [
      'p63 y CK5/6 marcan las células basales (presentes en glándulas benignas y ausentes en el adenocarcinoma); AMACR (racemasa) se sobreexpresa en el adenocarcinoma; y NKX3.1 es un marcador nuclear altamente específico de origen prostático útil incluso en metástasis.',
      'p63 y CK5/6 son positivos en el 100% de los adenocarcinomas metastásicos, mientras que AMACR solo tiñe el estroma benigno.',
      'NKX3.1 es un marcador exclusivo de carcinoma urotelial de vejiga que permite descartar cáncer de próstata.',
      'En tumores prostáticos de alto grado el APE tisular siempre aumenta su intensidad inmunohistoquímica al 100%, haciendo innecesario el uso de NKX3.1.',
    ],
    correctIndex: 0,
    explanation:
      'La ausencia de la capa de células basales es un sello histológico del adenocarcinoma prostático, demostrada por la negatividad de p63 y CK5/6 (positivos en glándulas benignas). En contrapartida, la racemasa (AMACR/P504S) es positiva en el citoplasma de las células malignas. Como el APE y la PAP pueden disminuir su expresión en tumores indiferenciados, el factor de transcripción nuclear NKX3.1 destaca por su alta especificidad para confirmar origen prostático en metástasis.',
  },
  {
    num: 34,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'densidad de APE', 'd-APE', 'volumen prostático', 'diagnóstico'],
    question_text:
      'Un paciente de 62 años presenta un APE total de 5,4 ng/mL y una próstata cuyo volumen medido por resonancia magnética es de 30 cc. ¿Cuál es su densidad de APE (d-APE), cómo se interpreta según el punto de corte estándar y qué ventaja aporta la RNM frente a la ecografía para este cálculo?',
    options: [
      'Su d-APE es 0,18 ng/mL/cc; al superar el umbral de 0,15 ng/mL/cc se asocia a mayor riesgo de cáncer clínicamente significativo. Además, la RNM es el método más preciso para estimar el volumen prostático (la ecografía transrectal tiende a subestimarlo ~8% y la transabdominal a sobrestimarlo ~10%).',
      'Su d-APE es 0,05 ng/mL/cc; indica una probabilidad menor al 4% de cáncer clínicamente significativo.',
      'Su d-APE es 5,56 ng/mL/cc; la ecografía transabdominal es más exacta que la RNM para medir el volumen prostático.',
      'Su d-APE es 0,18 ng/mL/cc, valor que descarta malignidad porque el umbral de sospecha es ≥ 0,75 ng/mL/cc.',
    ],
    correctIndex: 0,
    explanation:
      'La densidad de APE se calcula dividiendo el APE sérico por el volumen prostático (d-APE = 5,4 / 30 = 0,18 ng/mL/cc). Dado que el tejido maligno libera ~10 veces más APE por unidad de volumen que el tejido hiperplásico benigno, una d-APE ≥ 0,15 ng/mL/cc (o >0,10–0,15) orienta a mayor riesgo de cáncer clínicamente significativo (ISUP ≥2), mientras que valores <0,09 se asocian a un riesgo muy bajo (~4%).',
  },
  {
    num: 35,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'biomarcadores', 'PHI', '4Kscore', 'PCA3', 'SelectMDx', 'ConfirmMDx'],
    question_text:
      'Respecto a los biomarcadores diagnósticos modernos utilizados para mejorar la selección de pacientes candidatos a biopsia o re-biopsia prostática, ¿cuál de las siguientes asociaciones entre el test, la muestra biológica donde se mide y su composición es correcta?',
    options: [
      'PHI y 4Kscore se miden en sangre (combinando isoformas de APE como APE total, libre, [-2]proAPE o calicreína humana 2 [hK2]); PCA3, SelectMDx y ExoDx se miden en orina; y ConfirmMDx se evalúa en tejido prostático de una biopsia previa negativa buscando hipermetilación epigenética (APC, RASSF1, GSTP1).',
      'PCA3 y SelectMDx se miden en líquido cefalorraquídeo, mientras que PHI y 4Kscore requieren tejido fresco de prostatectomía radical.',
      'ConfirmMDx es un examen de sangre que mide niveles de testosterona libre y hormona luteinizante.',
      'El test Stockholm3 se realiza exclusivamente en muestras de semen post-vasectomía.',
    ],
    correctIndex: 0,
    explanation:
      'Los biomarcadores diagnósticos se dividen según su matriz biológica: en sangre se miden PHI (APE total, libre y [-2]proAPE), 4Kscore (APE total, libre, intacto y hK2), Stockholm3 y Proclarix; en orina se miden PCA3 (ARN largo no codificante post-masaje prostático), TMPRSS2-ERG (MiPS), ExoDx y SelectMDx (ARNm de HOXC6 y DLX1); y en tejido de biopsia previa negativa se mide ConfirmMDx (metilación de APC, RASSF1 y GSTP1, con VPN del 96%).',
  },
  {
    num: 36,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'biomarcadores pronósticos', 'Decipher', 'Prolaris', 'Oncotype DX', 'ProMark'],
    question_text:
      '¿Cuál es la utilidad clínica de las pruebas tisulares Decipher, Prolaris, Oncotype DX y ProMark en el cáncer de próstata localizado, y qué diferencia técnica distingue a ProMark de las otras tres?',
    options: [
      'Son pruebas pronósticas en tejido prostático que estratifican de forma independiente el riesgo de progresión, metástasis o mortalidad específica para guiar decisiones entre vigilancia activa versus tratamiento activo (o radioterapia adyuvante post-prostatectomía); mientras Decipher (22 genes), Prolaris (31 genes del ciclo celular) y Oncotype DX (17 genes) son pruebas genómicas basadas en ARN, ProMark es un test proteómico que cuantifica 8 proteínas por inmunofluorescencia.',
      'Son pruebas en orina utilizadas para diagnosticar infección por virus del papiloma humano (VPH) en la próstata.',
      'Decipher y Prolaris solo sirven para elegir la dosis de docetaxel en pacientes con metástasis cerebrales.',
      'ProMark analiza el ADN mitocondrial en sangre periférica, mientras que Decipher mide niveles urinarios de APE.',
    ],
    correctIndex: 0,
    explanation:
      'Estos cuatro paneles tisulares aportan información pronóstica independiente de las variables clínicas clásicas (APE, Gleason, estadio T): Decipher (expresión de 22 genes, muy útil para decidir vigilancia activa o terapia adyuvante tras prostatectomía), Prolaris (score CCP de proliferación del ciclo celular basado en 31 genes + 15 de control), Oncotype DX (17 genes, entrega un Genomic Prostate Score de 0 a 100) y ProMark (que a diferencia de los tests de ARN evalúa directamente la expresión de 8 proteínas asociadas a agresividad tumoral).',
  },
  {
    num: 37,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'biomarcadores predictivos', 'AR-V7', 'PTEN', 'PARP', 'pembrolizumab'],
    question_text:
      'En pacientes con cáncer de próstata metastásico resistente a la castración (CPRCm), ¿qué implicancia terapéutica tiene detectar en sangre la variante del receptor de andrógenos AR-V7 o detectar en el tumor la pérdida del gen supresor PTEN?',
    options: [
      'La presencia de AR-V7 (variante truncada que carece del dominio de unión a ligando y se activa constitutivamente) se asocia a resistencia primaria a terapias hormonales de segunda generación como enzalutamida y abiraterona; por su parte, la pérdida de PTEN (presente en 40–50% de los CPRCm) activa la vía PI3K/AKT/mTOR, se asocia a mal pronóstico y puede responder a inhibidores de AKT como capivasertib.',
      'La presencia de AR-V7 garantiza una respuesta completa del 100% al tratamiento con abiraterona o enzalutamida.',
      'La pérdida de PTEN inactiva la vía PI3K/AKT y hace que el tumor regrese espontáneamente sin tratamiento.',
      'AR-V7 es el marcador que define la indicación de vigilancia activa en tumores T1c.',
    ],
    correctIndex: 0,
    explanation:
      'En enfermedad avanzada: 1) AR-V7 carece del dominio de unión al ligando y permanece activo de forma independiente de andrógenos, confiriendo resistencia a enzalutamida y abiraterona; 2) mutaciones en genes HRR (BRCA1/2, ATM, PALB2, CHEK2, CDK12) predicen sensibilidad a inhibidores de PARP; 3) alteraciones MMR / MSI-H (<5%) predicen respuesta a pembrolizumab; y 4) la pérdida de PTEN activa la vía PI3K/AKT/mTOR y puede beneficiarse de inhibidores de AKT como capivasertib.',
  },
  {
    num: 38,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'screening', 'PLCO', 'ERSPC', 'evidencia clínica'],
    question_text:
      'Cuando se evaluó el impacto del screening con APE en la mortalidad por cáncer de próstata mediante los dos grandes ensayos aleatorizados —el estudio estadounidense PLCO y el estudio europeo ERSPC—, ¿por qué arrojaron resultados inicialmente discordantes y qué demostró el ERSPC a largo plazo?',
    options: [
      'El estudio PLCO no mostró reducción de mortalidad porque tuvo un alto nivel de "contaminación" (hombres del grupo control que igualmente se realizaron APE fuera del protocolo); en cambio, el ERSPC sí demostró una reducción significativa de la mortalidad específica por CaP (20% a los 9 años, llegando hasta un 51% a los 21 años en algunos centros y reduciendo el número necesario a tamizar [NNS] a 570).',
      'El estudio PLCO demostró una reducción del 80% en la mortalidad al primer año, mientras que el ERSPC fue suspendido por toxicidad del examen de sangre.',
      'Ambos estudios demostraron que el tamizaje no detecta ningún caso adicional de cáncer de próstata.',
      'El ERSPC incluyó únicamente hombres mayores de 85 años con metástasis óseas previas.',
    ],
    correctIndex: 0,
    explanation:
      'El ensayo PLCO en EE. UU. no logró demostrar beneficio en mortalidad debido a la masiva contaminación del brazo control (hombres asignados a "no tamizaje" que igualmente se hicieron APE). El ERSPC europeo, con mucho menor contaminación, confirmó que el beneficio del tamizaje aumenta con el tiempo de seguimiento, alcanzando a los 21 años un NNS de 570 hombres para evitar una muerte por CaP (cifra más favorable que la del tamizaje mamográfico en cáncer de mama).',
  },
  {
    num: 39,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'RNMmp', 'secuencias', 'RNMbp', 'PI-RADS'],
    question_text:
      'En relación con las secuencias técnicas de la Resonancia Magnética de próstata (T2, difusión DWI/ADC y perfusión dinámica con gadolinio DCE) y la variante biparamétrica (RNMbp), ¿cuál de las siguientes afirmaciones es correcta?',
    options: [
      'En las imágenes ponderadas en difusión, los tumores prostáticos malignos restringen el movimiento de agua, luciendo hipointensos en el mapa ADC e hiperintensos en DWI de valores b altos; por su parte, la RNM biparamétrica (RNMbp) omite la secuencia con gadolinio (DCE), reduciendo tiempos (15–20 min vs. 30–45 min) y costos con rendimiento global similar, aunque la secuencia DCE es útil para caracterizar lesiones equívocas.',
      'La RNM biparamétrica omite la secuencia anatómica T2 y utiliza únicamente gadolinio endovenoso en doble dosis.',
      'Las lesiones malignas muestran ausencia de restricción en difusión, viéndose hiperintensas brillantes en el mapa ADC.',
      'La secuencia T2 no permite distinguir la anatomía zonal de la próstata.',
    ],
    correctIndex: 0,
    explanation:
      'La secuencia T2 define la anatomía zonal y la morfología; la difusión (DWI/ADC) evalúa la restricción del movimiento de agua (alta señal en DWI de b alto y baja señal/hipointensidad en el mapa ADC en tumores malignos); y la perfusión (DCE) detecta captación precoz de contraste por neoangiogénesis. Omitir el DCE en la RNMbp acorta el examen y evita el gadolinio, manteniendo un alto rendimiento diagnóstico.',
  },
  {
    num: 40,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'RNMmp', 'PROMIS', 'PRECISION', 'PI-RADS'],
    question_text:
      'Según los metaanálisis y ensayos diagnósticos como PROMIS y PRECISION citados en el Manual de Urología, ¿cuál es el impacto clínico de utilizar un umbral de PI-RADS ≥ 3 versus PI-RADS ≥ 4 para indicar biopsia prostática, y cuál es la prevalencia aproximada de cáncer clínicamente significativo (ISUP ≥ 2) en cada categoría?',
    options: [
      'La prevalencia de CaP ISUP ≥ 2 es de ~6% en PI-RADS 1–2, ~16% en PI-RADS 3 y ~62% en PI-RADS 4–5; aplicar un umbral de biopsia en PI-RADS ≥ 3 evita el 30% de las biopsias dejando de pesquisar un 11% de cánceres ISUP ≥ 2, mientras que subir el umbral a PI-RADS ≥ 4 evita el 59% de las biopsias pero a costa de perder hasta el 28% de los cánceres ISUP ≥ 2.',
      'La prevalencia de CaP ISUP ≥ 2 en PI-RADS 1–2 es del 85% y en PI-RADS 5 es del 10%.',
      'Biopsiar solo lesiones PI-RADS ≥ 4 detecta el 100% de los cánceres ISUP ≥ 2 sin omitir ningún caso.',
      'El estudio PROMIS demostró que la ecografía transrectal a ciegas es el doble de sensible que la RNMmp.',
    ],
    correctIndex: 0,
    explanation:
      'En el estudio PROMIS, la estrategia de RNMmp previa permitió detectar el 93% de los cánceres clínicamente significativos reduciendo un 28% las biopsias innecesarias. El valor predictivo negativo (VPN) de PI-RADS 1–2 es cercano al 90,8% (prevalencia de ISUP ≥ 2 de solo 6%). Elevar el umbral de biopsia de PI-RADS ≥ 3 a PI-RADS ≥ 4 ahorra muchas más biopsias (59% vs. 30%), pero deja sin diagnosticar una proporción importante de tumores ISUP ≥ 2 (28% vs. 11%).',
  },
  {
    num: 41,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'TNM', 'estadificación', 'UICC', 'AJCC', 'miTNM'],
    question_text:
      'En relación con las reglas de estadificación clínica TNM del cáncer de próstata, ¿qué particularidad existe respecto a la invasión del ápice prostático o de la cápsula sin perforarla, y qué diferencia metodológica hay entre la 8.ª edición de la UICC y la del AJCC para definir el estadio clínico T (cT)?',
    options: [
      'La invasión al ápice prostático o a la cápsula prostática (sin atravesarla) se clasifica como T2 y no como T3; además, mientras la UICC (2017) permite determinar el estadio cT por examen físico o por imágenes (e incorpora la nomenclatura miTNM para PET-PSMA), la clasificación del AJCC establece que el estadio cT se determina únicamente mediante el examen físico (tacto rectal).',
      'Cualquier contacto microscópico con el ápice prostático se clasifica automáticamente como T4 por invasión del esfínter externo.',
      'Tanto la UICC como el AJCC prohíben el uso del tacto rectal para la clasificación TNM.',
      'Un tumor detectado por biopsia en ambos lóbulos pero no palpable ni visible por imágenes se clasifica como cT2c y nunca como cT1c.',
    ],
    correctIndex: 0,
    explanation:
      'Dos notas clave del sistema TNM son fundamentales: 1) un tumor hallado en uno o ambos lóbulos por biopsia con aguja, pero que no es palpable ni visible confiablemente por imágenes, se clasifica como T1c (no T2); y 2) la invasión del ápex o de la cápsula prostática sin superarla hacia el tejido periprostático se clasifica como T2, reservándose T3a para la extensión extracapsular verdadera y T3b para la invasión de vesículas seminales. Asimismo, la UICC acepta imágenes (y el sistema molecular miTNM para PET-PSMA), mientras que el AJCC restringe el cT al tacto rectal.',
  },
  {
    num: 42,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'estratificación de riesgo', 'EAU', 'NCCN', 'CPG', 'riesgo intermedio'],
    question_text:
      'En las clasificaciones actuales de riesgo para cáncer de próstata localizado (NCCN 2025, EAU 2025, AUA y Cambridge Prognostic Groups [CPG]), ¿qué criterios distinguen al grupo de Riesgo Intermedio Desfavorable del Riesgo Intermedio Favorable?',
    options: [
      'El riesgo intermedio desfavorable se define por la presencia de ISUP 3 (Gleason 4+3), o bien por presentar ≥ 50% de cilindros positivos en la biopsia o la combinación de múltiples factores de riesgo intermedio (como ISUP 2 asociado a APE 10–20 ng/mL o estadio cT2b–c).',
      'El riesgo intermedio desfavorable incluye únicamente pacientes con APE > 40 ng/mL y estadio cT4.',
      'El riesgo intermedio favorable incluye a todos los tumores ISUP 3 (Gleason 4+3) siempre que el APE sea menor a 20 ng/mL.',
      'No existe subdivisión del riesgo intermedio en ninguna guía urológica actual.',
    ],
    correctIndex: 0,
    explanation:
      'Subdividir el riesgo intermedio es fundamental: el Riesgo Intermedio Favorable (o CPG 2) tiene un único factor de riesgo intermedio, ISUP 1 o 2 (Gleason 3+4) y <50% de cilindros positivos; en cambio, el Riesgo Intermedio Desfavorable (o CPG 3) presenta ISUP 3 (Gleason 4+3), ≥50% de cilindros positivos, o la suma de 2 o 3 factores de riesgo intermedio (ej. ISUP 2 + APE 10–20 ng/mL). A diferencia del favorable, el intermedio desfavorable requiere etapificación con PET-CT PSMA y hormonoterapia asociada si va a radioterapia.',
  },
  {
    num: 43,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'nomogramas', 'Partin', 'Han', 'Kattan', 'CAPRA', 'Briganti'],
    question_text:
      'Respecto a los nomogramas clínicos utilizados para individualizar la predicción de riesgo en cáncer de próstata (tablas de Partin, tablas de Han, Kattan, UCSF-CAPRA y nomograma de Briganti), ¿cuál es la utilidad específica del nomograma de Briganti (actualizado en 2023) antes de una prostatectomía radical?',
    options: [
      'Predecir el riesgo de compromiso metastásico en ganglios linfáticos pélvicos (integrando APE, estadio clínico, hallazgos de la RNMmp, grado ISUP y detalles de la biopsia dirigida/sistemática) para decidir la indicación de una linfadenectomía pélvica extendida.',
      'Predecir el riesgo de desarrollar hiperplasia prostática benigna a los 10 años en pacientes sin cáncer.',
      'Calcular la dosis exacta de lutecio-177 en pacientes resistentes a la castración.',
      'Evaluar únicamente la probabilidad de recuperar la función eréctil tras radioterapia externa.',
    ],
    correctIndex: 0,
    explanation:
      'Mientras las tablas de Partin predicen el estadio patológico preoperatorio (usando APE, Gleason y cT), las tablas de Han y nomogramas postoperatorios de Kattan predicen recurrencia bioquímica tras la cirugía, y UCSF-CAPRA estratifica el riesgo global, el nomograma de Briganti es la herramienta validada más utilizada para estimar la probabilidad de invasión ganglionar linfática pélvica preoperatoria y decidir si se justifica realizar una linfadenectomía pélvica extendida (ePLND).',
  },
  {
    num: 44,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'biología tumoral', 'ProtecT', 'SPCG-4', 'PIVOT'],
    question_text:
      'Al comparar los tres grandes ensayos aleatorizados sobre el manejo del cáncer de próstata localizado (SPCG-4, PIVOT y ProtecT), ¿por qué SPCG-4 y PIVOT mostraron una reducción significativa de la mortalidad global y específica con la prostatectomía radical frente a la observación, mientras que en ProtecT la mortalidad específica a 15 años fue igual de baja (~2–3%) entre cirugía, radioterapia y vigilancia activa?',
    options: [
      'Porque los pacientes de SPCG-4 fueron reclutados en la era pre-APE (diagnosticados clínicamente, sin sesgo de lead time) y manejados con observación paliativa (watchful waiting), mientras que los pacientes de ProtecT fueron detectados mediante tamizaje poblacional con APE (77% de bajo riesgo, con alto sesgo de adelanto diagnóstico o lead time) y comparados contra vigilancia activa estructurada con transición a tratamiento curativo si progresaban; además, en ninguno de los tres estudios la cirugía demostró beneficio en supervivencia para el subgrupo con ISUP 1.',
      'Porque en el estudio ProtecT la cirugía fue realizada sin anestesia y sin extirpar la próstata completa.',
      'Porque en el estudio SPCG-4 todos los pacientes tenían metástasis viscerales hepáticas al momento de operarse.',
      'Porque la radioterapia utilizada en SPCG-4 fue superior a la cirugía robótica.',
    ],
    correctIndex: 0,
    explanation:
      'La diferencia radica en el método de reclutamiento y el sesgo de adelanto diagnóstico (lead time): en SPCG-4 los tumores eran palpables/clínicos (sin tamizaje con APE), donde la cirugía redujo significativamente la mortalidad y las metástasis. En PIVOT el beneficio se concentró en enfermedad de mayor riesgo. En ProtecT (pacientes de tamizaje con APE, 77% bajo riesgo), a 15 años la sobrevida cáncer-específica fue ~97–98% en las tres ramas, aunque la vigilancia activa tuvo el doble de metástasis (9,4% vs. ~4,7–5,0%). Un hallazgo crucial es que ninguno de estos ensayos demostró beneficio en supervivencia al operar tumores ISUP 1.',
  },
  {
    num: 45,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'prostatectomía robótica', 'RARP', 'linfadenectomía pélvica', 'ePLND'],
    question_text:
      'Respecto a la técnica quirúrgica de la prostatectomía radical asistida por robot (RARP) y el rol actual de la linfadenectomía pélvica extendida (ePLND) según las guías EAU desde 2024, ¿cuál de las siguientes afirmaciones es correcta?',
    options: [
      'La RARP reduce el sangrado intraoperatorio, las transfusiones, la estadía hospitalaria y acelera la recuperación de la continencia frente a la cirugía abierta; por su parte, la ePLND aporta información de estadificación pero no ha demostrado beneficio claro en supervivencia ni en recurrencia bioquímica en ensayos aleatorizados y aumenta la morbilidad (linfedema ~13,7%, linfoceles, TVP), por lo que si se decide realizar debe ser extendida e individualizada mediante nomogramas y PET-PSMA.',
      'La linfadenectomía pélvica limitada (solo fosa obturatriz) cura al 90% de los pacientes con metástasis óseas sin producir complicaciones.',
      'La cirugía abierta retropúbica tiene menor sangrado y menor tasa de transfusión que la cirugía robótica en todos los metaanálisis.',
      'Un PET-CT PSMA negativo descarta el 100% de las micrometástasis ganglionares menores de 2 mm.',
    ],
    correctIndex: 0,
    explanation:
      'Los metaanálisis confirman las ventajas perioperatorias y de recuperación funcional temprana de la RARP. En cuanto a la ePLND, aunque es el mejor método de estadificación ganglionar, los ensayos aleatorizados no han demostrado que mejore la sobrevida ni la sobrevida libre de recurrencia bioquímica (NNT de 395 para lograr un APE indetectable a 4 años) y se asocia a hasta un 20% de complicaciones (linfoceles, linfedema, eventos tromboembólicos). Por ello, las guías EAU recomiendan individualizar su indicación y, de efectuarse, realizar siempre una disección extendida.',
  },
  {
    num: 46,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'vigilancia activa', 'cohortes', 'Johns Hopkins', 'Sunnybrook', 'criterios de Epstein'],
    question_text:
      '¿Cuáles son los resultados oncológicos a largo plazo (10 a 15 años) reportados por las grandes cohortes prospectivas de Vigilancia Activa (como Johns Hopkins, Sunnybrook/Toronto, Canary PASS y Göteborg-1) y qué diferencia de elegibilidad existió clásicamente entre el protocolo de Johns Hopkins y el de Toronto?',
    options: [
      'Las cohortes muestran de forma consistente una mortalidad específica por CaP muy baja (≤ 0,1% a 1,5% a 10–15 años), tasas de metástasis inferiores al 2%, y que entre el 40% y el 55% de los pacientes permanecen libres de tratamiento a los 10–15 años; el protocolo de Johns Hopkins fue muy restrictivo (limitado a muy bajo riesgo según criterios de Epstein: ISUP 1, cT1c, d-APE <0,15, ≤2 cilindros con ≤50% de cáncer), mientras que el grupo de Toronto amplió la inclusión a casos seleccionados de riesgo intermedio favorable (ISUP 2 de bajo volumen).',
      'En la cohorte de Johns Hopkins la mortalidad por cáncer de próstata a los 10 años fue del 45%.',
      'La progresión histológica de un tumor Gleason 3 puro a Gleason 4 o 5 ocurre en el 80% de los pacientes durante el primer año de vigilancia.',
      'Los pacientes en vigilancia activa presentan peor función urinaria y sexual que los sometidos a prostatectomía radical inmediata.',
    ],
    correctIndex: 0,
    explanation:
      'Las grandes cohortes (Johns Hopkins con 99,9% de sobrevida específica a 15 años; Sunnybrook de Klotz con 94,3% a 15 años; Canary PASS con 0,1% de mortalidad a 10 años) confirman que la vigilancia activa es extraordinariamente segura. El riesgo de desdiferenciación real de un Gleason 3 puro a patrón 4 o 5 no supera el 1–2% anual. Hoy se acepta que además de los pacientes de muy bajo y bajo riesgo (ISUP 1), pueden incluirse pacientes muy bien seleccionados de riesgo intermedio favorable (ISUP 2 con bajo porcentaje de patrón 4, bajo volumen y ausencia de arquitectura cribiforme o intraductal).',
  },
  {
    num: 47,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'radioterapia externa', 'hipofraccionamiento', 'bloqueo hormonal', 'braquiterapia'],
    question_text:
      'En el tratamiento con Radioterapia Primaria Externa (EBRT) y Braquiterapia del cáncer de próstata localizado, ¿qué establecen las guías actuales respecto a los volúmenes de irradiación, el hipofraccionamiento, la duración del bloqueo hormonal concomitante y las contraindicaciones relativas de la braquiterapia?',
    options: [
      'En bajo riesgo se irradia solo la próstata sin bloqueo hormonal; en riesgo intermedio se asocian 6 meses de hormonoterapia y en alto riesgo 24 meses (considerando irradiación profiláctica ganglionar pélvica en alto riesgo); los esquemas hipofraccionados (ej. 20 fracciones en 4 semanas o 5 fracciones en 1–2 semanas) tienen eficacia equivalente a los esquemas prolongados; y la braquiterapia LDR tiene mayor dificultad técnica y toxicidad en próstatas muy grandes o muy pequeñas, con síntomas obstructivos severos o con RTU de próstata previa.',
      'En pacientes de bajo riesgo es obligatorio irradiar toda la cadena ganglionar retroperitoneal y asociar 36 meses de hormonoterapia.',
      'La braquiterapia de baja tasa (LDR) como monoterapia es el tratamiento de elección para tumores T4 con invasión rectal y próstatas mayores de 120 gramos con retención urinaria.',
      'El hipofraccionamiento ha sido abandonado por tener el triple de recurrencia bioquímica que los esquemas de 40 sesiones.',
    ],
    correctIndex: 0,
    explanation:
      'El escalamiento de dosis con radioterapia guiada por imágenes e hipofraccionamiento moderado (20 fracciones) o extremo (SBRT en 5 fracciones) ofrece control oncológico equivalente con mucho menor carga de tratamiento. El bloqueo hormonal concomitante no se indica en bajo riesgo, dura 6 meses en riesgo intermedio y 24 meses en alto riesgo. La braquiterapia de baja tasa (LDR) como monoterapia se indica en bajo riesgo de bajo volumen, o combinada con EBRT (o como boost con HDR) en riesgo intermedio/alto, debiendo evitarse en pacientes con síntomas obstructivos importantes o antecedente de RTU prostática.',
  },
  {
    num: 48,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'PET-CT PSMA', 'ProPSMA', 'PRIMARY', 'falsos positivos'],
    question_text:
      'Respecto al rendimiento diagnóstico y las indicaciones del PET-CT con PSMA en el cáncer de próstata según el Manual de Urología (estudios Jeet et al., ProPSMA, PRIMARY y Woo et al.), ¿cuál de las siguientes afirmaciones es correcta?',
    options: [
      'En el metaanálisis con confirmación histopatológica, para metástasis linfonodales tiene una alta especificidad (~96%) pero sensibilidad moderada (~57%); en recidiva bioquímica post-prostatectomía su tasa de positividad depende del nivel de APE (50–60% con APE 0,2–0,5 ng/mL, 85% con APE 0,5–2,0 ng/mL y ~100% con APE >2 ng/mL); en el estudio PRIMARY combinar RNM + PET-PSMA subió el VPN de 72% a 91%; y las captaciones óseas aisladas en las costillas (sin otras lesiones, con APE <10 y SUVmax bajo) son muy probablemente falsos positivos benignos.',
      'El 60% de los cánceres de próstata clínicamente significativos son completamente negativos para expresión de PSMA en el tumor primario.',
      'La sensibilidad del PET-CT PSMA en recidiva bioquímica es del 100% cuando el APE es de 0,01 ng/mL y disminuye a medida que el APE se duplica más rápido.',
      'El estudio ProPSMA demostró que el cintigrama óseo convencional con tecnecio-99m es más sensible y específico que el PET-CT PSMA en pacientes de alto riesgo.',
    ],
    correctIndex: 0,
    explanation:
      'En el subanálisis del estudio ProPSMA, solo el 3,3% de los cánceres clínicamente significativos fueron negativos para PSMA en el tumor primario, y el PET-CT PSMA demostró cambiar la conducta terapéutica en la etapificación inicial de pacientes de riesgo intermedio desfavorable, alto y muy alto. En el estudio PRIMARY, un 100% de los pacientes con lesión PI-RADS 4–5 y SUVmax > 9 tuvieron cáncer clínicamente significativo. Finalmente, ante el hallazgo frecuente de focos hipercaptantes exclusivamente costales, el estudio de Woo et al. demostró que en ausencia de lesiones en otros sitios, con SUVmax ≤ 2,5, APE <10 ng/mL y sin esclerosis en la TC, casi siempre corresponden a falsos positivos benignos.',
  },
  {
    num: 49,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'recidiva bioquímica', 'post-prostatectomía', 'márgenes quirúrgicos', 'EAU'],
    question_text:
      'En un paciente operado de prostatectomía radical que desarrolla una Recidiva Bioquímica (APE ≥ 0,2 ng/mL confirmado), ¿cómo clasifica la guía de la EAU la recidiva en Bajo Riesgo versus Alto Riesgo, y qué relación pronóstica describió Budäus entre el estadio patológico (pT2 vs. pT3) y el estado de los márgenes quirúrgicos?',
    options: [
      'La EAU define RBQ de Bajo Riesgo cuando se cumplen ambos: tiempo de doblaje de APE (PSADT) > 1 año Y grado patológico ISUP 1 a 3 (basta que el PSADT sea < 1 año o que sea ISUP 4–5 para ser de Alto Riesgo); respecto a los márgenes, un margen quirúrgico positivo aumenta por sí solo la probabilidad de recidiva entre 12% y 18%, observándose que un tumor pT3 con márgenes negativos tiene menor probabilidad de recidiva bioquímica que un pT2 con márgenes positivos.',
      'La EAU define RBQ de Bajo Riesgo cuando el PSADT es menor a 3 meses y el tumor es ISUP 5.',
      'Un margen quirúrgico positivo en un tumor pT2 garantiza que nunca habrá recidiva bioquímica.',
      'El ascenso lento y tardío del APE por remanente glandular benigno en el lecho quirúrgico tiene un 95% de mortalidad a los 2 años.',
    ],
    correctIndex: 0,
    explanation:
      'En la pieza de prostatectomía radical, los principales predictores de recidiva son el grado ISUP/Gleason, márgenes quirúrgicos positivos, invasión de vesículas seminales (pT3b), extensión extraprostática (pT3a) y compromiso ganglionar (pN1). Budäus demostró el peso crítico de la calidad técnica del margen quirúrgico: un pT3 con márgenes negativos (R0) recidiva menos que un pT2 con márgenes positivos (R1). Una vez ocurrida la RBQ, el predictor más sólido de mortalidad por cáncer es un PSADT < 10–12 meses.',
  },
  {
    num: 50,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'radioterapia post-prostatectomía', 'adyuvante', 'salvataje precoz'],
    question_text:
      'Respecto a la Radioterapia posterior a la prostatectomía radical (Radioterapia Adyuvante vs. Radioterapia de Rescate/Salvataje Precoz), ¿cuál es la recomendación actual basada en la evidencia y a partir de qué nivel de APE se sugiere iniciar el rescate precoz?',
    options: [
      'Hoy se prefiere mayoritariamente el ofrecimiento de radioterapia de salvataje precoz ante un APE que se vuelve detectable y en ascenso en dos mediciones (iniciando idealmente con APE > 0,1 ng/mL sin esperar a que supere 0,2 ng/mL ni mucho menos 2,0 ng/mL), reservando la radioterapia adyuvante (dentro del primer año una vez recuperada la continencia) solo para pacientes jóvenes sin comorbilidades con múltiples características patológicas muy adversas (pT3b, Gleason 8–10, márgenes positivos).',
      'La radioterapia de rescate solo debe iniciarse cuando el APE supera los 10 ng/mL y aparecen metástasis óseas en el cintigrama.',
      'La radioterapia adyuvante debe aplicarse a las 48 horas de la cirugía antes de retirar la sonda Foley en todos los pacientes pT2 R0.',
      'Agregar bloqueo hormonal a la radioterapia de rescate está absolutamente contraindicado en pacientes con APE elevado.',
    ],
    correctIndex: 0,
    explanation:
      'Los estudios modernos respaldan el rescate precoz (con APE en ascenso desde >0,1 ng/mL), ya que como demostró Stephenson, mientras menor sea el APE al momento de iniciar la radioterapia de salvataje, mayor es la probabilidad de control bioquímico y sobrevida libre de progresión. Además, esquemas hipofraccionados postoperatorios (como 51 Gy en 17 fracciones) han demostrado eficacia equivalente a los 64–72 Gy clásicos con baja toxicidad, y dos ensayos aleatorizados demostraron beneficio en sobrevida al asociar bloqueo hormonal al rescate.',
  },
  {
    num: 51,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'recidiva bioquímica post-radioterapia', 'criterios de Phoenix', 'rebote de APE'],
    question_text:
      'Durante el seguimiento de un paciente tratado con Radioterapia Primaria con intención curativa, ¿cómo se define la Recidiva Bioquímica según el consenso de Phoenix (ASTRO/RTOG), cómo se diferencia del fenómeno de "rebote de APE" (PSA bounce), y qué paso es indispensable antes de indicar una terapia local de rescate?',
    options: [
      'El criterio de Phoenix define la recidiva bioquímica como un alza de ≥ 2 ng/mL por sobre el nadir de APE alcanzado post-radioterapia; el "rebote de APE" es un ascenso benigno y transitorio de 0,1 a 0,5 ng/mL (atribuido a prostatitis actínica focal) que luego desciende a su basal y se asocia a menor tasa de recidiva; y antes de indicar cualquier terapia local de rescate en pacientes con expectativa de vida >10 años es obligatorio reetapificar (PET-CT PSMA + RNM) y confirmar histológicamente mediante biopsia prostática la presencia de cáncer viable sin metástasis.',
      'El criterio de Phoenix define recidiva como cualquier APE > 0,2 ng/mL a las 4 semanas de terminada la radioterapia.',
      'El "rebote de APE" indica metástasis hepáticas fulminantes y obliga a iniciar docetaxel de urgencia sin biopsia.',
      'En la recidiva post-radioterapia está contraindicado biopsiar la próstata antes de realizar una prostatectomía radical de rescate.',
    ],
    correctIndex: 0,
    explanation:
      'A diferencia de la cirugía, tras la radioterapia queda tejido prostático remanente productor de APE. Por ello se emplea el criterio de Phoenix (nadir + 2 ng/mL). La EAU clasifica esta RBQ post-RT en bajo riesgo (intervalo a RBQ >18 meses e ISUP 1–3) o alto riesgo (intervalo ≤18 meses o ISUP 4–5). Si el paciente tiene expectativa de vida >10 años y se plantea rescate local (prostatectomía de rescate, braquiterapia HDR/LDR, SBRT o crioterapia), es indispensable descartar metástasis con PET-CT PSMA, evaluar localmente con RNM y confirmar el tumor viable con biopsia prostática.',
  },
  {
    num: 52,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'linfadenectomía de rescate', 'radioterapia pélvica', 'recidiva ganglionar'],
    question_text:
      'En pacientes con recidiva bioquímica tras tratamiento primario a quienes un PET-CT PSMA les detecta recurrencia exclusiva en ganglios linfáticos pelvianos, ¿qué muestra la evidencia actual (revisión sistemática de Yang et al. y guías EAU/NCCN) al comparar la linfadenectomía de rescate frente a la radioterapia pélvica de rescate?',
    options: [
      'La radioterapia a pelvis demostró mejor control bioquímico (74,8% vs. 53,8%) y menor mortalidad cáncer-específica (1,3% vs. 6,5%) que la linfadenectomía de rescate, por lo que la linfadenectomía de rescate aún se considera de carácter experimental y reservada solo para casos muy seleccionados de baja carga nodal.',
      'La linfadenectomía de rescate logra un 100% de curación definitiva sin complicaciones quirúrgicas.',
      'Ambas terapias están prohibidas cuando el PET-CT PSMA es positivo en la pelvis.',
      'La linfadenectomía de rescate tiene menor tasa de linfoceles e íleo que la vigilancia pasiva.',
    ],
    correctIndex: 0,
    explanation:
      'Aunque el PET-CT PSMA impulsó el interés por extirpar quirúrgicamente las recidivas ganglionares pélvicas (salvage LND), la evidencia disponible es de baja calidad y favorable a la radioterapia pélvica (control bioquímico 74,8% vs. 53,8%; mortalidad específica 1,3% vs. 6,5% en la revisión de 2.576 pacientes de Yang et al.). Por ello, las guías NCCN y EAU consideran que la linfadenectomía de rescate solo debe plantearse en pacientes altamente seleccionados (baja carga nodal, APE bajo) e idealmente en contexto experimental.',
  },
  {
    num: 53,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'localmente avanzado', 'T3-T4', 'N+', 'STAMPEDE', 'abiraterona'],
    question_text:
      '¿Cómo se define operativamente el "cáncer de próstata localmente avanzado" (estadios III y IVa) y cuál es el tratamiento estándar recomendado por las guías EAU y NCCN para los pacientes cT3–T4 N0 M0 y para los pacientes con compromiso ganglionar regional (cN1 M0)?',
    options: [
      'Agrupa los estadios T3–4 N0 M0 (III) y T1–4 N1 M0 (IVa); en T3–T4 N0 M0 se recomienda Radioterapia + Hormonoterapia por 2 a 3 años (agregando Abiraterona por 2 años según el brazo G del estudio STAMPEDE si tiene ≥2 factores de alto riesgo: T3–T4, Gleason ≥8 y APE >40 ng/mL); y en pacientes N1 M0 el estándar es Radioterapia a próstata y pelvis + Hormonoterapia combinada (TDA + Abiraterona), siendo la prostatectomía radical + ePLND una opción dentro de un enfoque multimodal en casos seleccionados.',
      'Se trata únicamente con vigilancia activa o monoterapia con finasteride por 6 meses.',
      'En tumores cT3–T4 la prostatectomía radical sola sin radioterapia ni hormonoterapia logra un 98% de curación sin recidiva a 10 años.',
      'En pacientes N1 M0 jóvenes está contraindicado irradiar la pelvis o usar abiraterona.',
    ],
    correctIndex: 0,
    explanation:
      'Los tumores localmente avanzados (cT3–T4 o cN1) tienen alto riesgo de progresión y mortalidad si no se tratan activamente, y la cirugía como monoterapia suele ser insuficiente (>60% de recidiva bioquímica a 5 años en pT3 operados solos). Basado en la evidencia del brazo G del estudio STAMPEDE, el estándar combina Radioterapia externa (próstata ± pelvis) + TDA prolongada (2–3 años) + Abiraterona (con prednisona) por 2 años en pacientes N1 o en N0 con al menos dos criterios de muy alto riesgo (T3–T4, Gleason ≥8, APE >40 ng/mL).',
  },
  {
    num: 54,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'terapias sistémicas', 'ARPI', 'abiraterona', 'enzalutamida', 'darolutamida', 'apalutamida'],
    question_text:
      'Dentro de la clasificación de las terapias hormonales y los Inhibidores de la Vía del Receptor de Andrógenos (ARPI) propuesta por las guías clínicas, ¿cuál es la diferencia de mecanismo de acción entre la Abiraterona y fármacos de tercera generación como Enzalutamida, Apalutamida y Darolutamida?',
    options: [
      'La Abiraterona es un inhibidor de la síntesis de andrógenos (bloquea la enzima CYP17 y requiere asociarse a prednisona), mientras que Enzalutamida, Apalutamida y Darolutamida son bloqueadores directos de tercera generación del receptor de andrógenos (a diferencia de los de primera/segunda generación como flutamida o bicalutamida y los esteroidales como ciproterona).',
      'La Abiraterona es un taxano citotóxico antimicrotúbulos, y la Enzalutamida es un agonista LHRH hipofisario.',
      'La Darolutamida y la Apalutamida son radiofármacos emisores de partículas alfa que se unen al hueso.',
      'Todos son antibióticos macrólidos que inhiben la 5-alfa reductasa prostática.',
    ],
    correctIndex: 0,
    explanation:
      'Las terapias dirigidas al eje androgénico más allá de la TDA clásica se agrupan como ARPI (Androgen Receptor Pathway Inhibitors): 1) Inhibidores de la síntesis de andrógenos como la Abiraterona (inhibe la esteroidogénesis suprarrenal, testicular e intratumoral; se administra con prednisona para evitar el exceso mineralocorticoide), y 2) Bloqueadores del receptor de andrógenos de 3.ª generación como Apalutamida, Enzalutamida y Darolutamida.',
  },
  {
    num: 55,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'TDA continua vs intermitente', 'efecto flare', 'nivel de castración'],
    question_text:
      'Respecto a la administración de la Terapia de Deprivación Androgénica (TDA): 1) ¿Qué demostró el estudio de Hussain et al. al comparar hormonoterapia continua versus intermitente en enfermedad metastásica?, y 2) ¿Cómo se previene el fenómeno de llamarada (flare) al iniciar agonistas LHRH en pacientes con metástasis de alta carga?',
    options: [
      'La hormonoterapia continua demostró ser superior a la intermitente en pacientes con CaP metastásico; y dado que los agonistas LHRH producen un alza inicial transitoria de testosterona que puede desencadenar compresión medular o retención urinaria en pacientes con alta carga tumoral, las guías NCCN recomiendan asociar un antiandrógeno (como bicalutamida o flutamida) por 7 o más días al inicio de la terapia.',
      'La hormonoterapia intermitente consiste en suspender la TDA cuando el APE supera los 100 ng/mL y reiniciarla cuando baja a 0,1 ng/mL.',
      'El fenómeno flare es exclusivo de la orquiectomía bilateral quirúrgica y se previene con prednisona.',
      'El nivel deseable de testosterona plasmática para definir sensibilidad a la castración es > 250 ng/dL.',
    ],
    correctIndex: 0,
    explanation:
      'En el estudio de Hussain et al., la TDA continua fue superior a la intermitente en CaP metastásico (cuando se usa esquema intermitente en casos seleccionados, se suspende tras 6–9 meses si el APE está <4 ng/mL sin progresión clínica, y se reinicia si el APE sube >15–20 ng/mL). Por otro lado, los agonistas LHRH estimulan inicialmente los receptores hipofisarios elevando la LH y la testosterona antes de desensibilizarlos; en pacientes con metástasis vertebrales que soportan peso o gran masa prostática, este flare se bloquea administrando bicalutamida o flutamida durante ≥7 días.',
  },
  {
    num: 56,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'CPHSm', 'CHAARTED', 'PEACE-1', 'ARASENS', 'dobletes', 'tripletes'],
    question_text:
      'En el Cáncer de Próstata Metastásico Hormonosensible (CPHSm), ¿cómo define el estudio CHAARTED la enfermedad de "Alta Carga" (High Volume) frente a la de "Baja Carga" en imágenes convencionales, y cuál es la recomendación terapéutica actual para cada grupo según los estudios PEACE-1, ARASENS, LATITUDE, STAMPEDE, ARCHES, ENZAMET y TITAN?',
    options: [
      'Alta carga se define por la presencia de ≥ 4 lesiones metastásicas óseas (con al menos una fuera del esqueleto axial: columna/pelvis) y/o metástasis viscerales, mientras que baja carga son ≤ 3 lesiones óseas axiales sin metástasis viscerales; hoy ya no es aceptable usar TDA sola: en alta carga el mayor beneficio en sobrevida global lo otorgan los tripletes (TDA + Docetaxel + Abiraterona [PEACE-1] o Darolutamida [ARASENS], categoría 1) o dobletes con ARPI si no es apto para quimioterapia, y en baja carga se recomiendan los dobletes de TDA + ARPI (Abiraterona, Enzalutamida o Apalutamida).',
      'Alta carga se define únicamente por un APE > 10 ng/mL sin importar el número ni localización de las metástasis, y se trata con TDA como monoterapia exclusiva.',
      'En el estudio CHAARTED, agregar Docetaxel a la TDA solo benefició a los pacientes sin metástasis (M0) y perjudicó a los de alta carga.',
      'Los estudios PEACE-1 y ARASENS demostraron que combinar tres fármacos reduce la sobrevida global a la mitad frente al placebo.',
    ],
    correctIndex: 0,
    explanation:
      'En el manejo moderno del CPHSm la monoterapia con TDA quedó obsoleta salvo contraindicación: en Alta Carga (criterios CHAARTED: ≥4 lesiones óseas con ≥1 extra-axial o metástasis viscerales) los metaanálisis en red confirman que la triple terapia (TDA + Docetaxel + Darolutamida [ARASENS] o TDA + Docetaxel + Abiraterona [PEACE-1]) ofrece el máximo beneficio en sobrevida global; mientras que en Baja Carga (o pacientes no candidatos a docetaxel) el estándar es la doble terapia (TDA + ARPI) validada por LATITUDE/STAMPEDE-G (Abiraterona), ARCHES/ENZAMET (Enzalutamida) y TITAN (Apalutamida).',
  },
  {
    num: 57,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'CPRCnm', 'PROSPER', 'SPARTAN', 'ARAMIS', 'PSADT'],
    question_text:
      '¿Cómo se define el Cáncer de Próstata Resistente a la Castración No Metastásico (CPRCnm), en qué subgrupo de pacientes está indicado intensificar el tratamiento según su cinética de APE, y cuáles son los tres ensayos clínicos pivotales que validaron su manejo?',
    options: [
      'Se define por progresión bioquímica (alza de APE) con testosterona en rango de castración (<50 ng/dL) y ausencia de metástasis visibles en imágenes convencionales (TAC y cintigrama óseo); en pacientes de alto riesgo con tiempo de doblaje de APE (tdAPE / PSADT) ≤ 10 meses, los ensayos PROSPER (Enzalutamida), SPARTAN (Apalutamida) y ARAMIS (Darolutamida) demostraron que asociar un ARPI a la TDA prolonga significativamente la sobrevida libre de metástasis y la sobrevida global.',
      'Se define por la presencia de más de 10 metástasis óseas con testosterona normal (>400 ng/dL); se trata suspendiendo la TDA.',
      'Los estudios PROSPER, SPARTAN y ARAMIS evaluaron el uso de radioterapia craneal profiláctica en pacientes con PSADT > 5 años.',
      'En pacientes con CPRCnm y tdAPE > 24 meses asintomáticos con corta expectativa de vida es obligatorio administrar triple quimioterapia endovenosa.',
    ],
    correctIndex: 0,
    explanation:
      'En el CPRCnm, el tiempo de doblaje del APE (tdAPE < 10 meses) es el principal predictor de desarrollo rápido de metástasis y muerte por cáncer. En este grupo de alto riesgo, agregar Enzalutamida (PROSPER, HR 0,29), Apalutamida (SPARTAN, HR 0,28) o Darolutamida (ARAMIS, HR 0,41) a la TDA reduce drásticamente el riesgo de metástasis o muerte. En cambio, si el tdAPE es >10 meses en pacientes asintomáticos o con expectativa de vida limitada, mantener la TDA sola y monitorizar es una opción razonable.',
  },
  {
    num: 58,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'CPRCm', 'secuenciación', 'docetaxel', 'cabazitaxel', 'CARD', 'TROPIC'],
    question_text:
      'En el Cáncer de Próstata Resistente a la Castración Metastásico (CPRCm), ¿por qué la elección de la primera y segunda línea depende de los tratamientos recibidos previamente en etapas hormonosensibles, y qué demostró el estudio CARD en pacientes que ya progresaron tanto a Docetaxel como a un ARPI (abiraterona o enzalutamida)?',
    options: [
      'Porque existe resistencia cruzada entre distintos ARPIs; por ello, si un paciente ya recibió un ARPI previo debe cambiar de mecanismo de acción (a Docetaxel, o un inhibidor PARP si tiene mutación BRCA), y si ya progresó tanto a Docetaxel como a un ARPI, el estudio CARD demostró que tratar en tercera línea con Cabazitaxel mejora significativamente la sobrevida global frente a rotar a un segundo ARPI (13,6 vs. 11,0 meses, HR 0,64).',
      'El estudio CARD demostró que cambiar de Abiraterona a Enzalutamida cura al 90% de los pacientes que fallaron a Docetaxel, siendo superior al Cabazitaxel.',
      'En el estudio TAX-327, la mitoxantrona demostró ser muy superior al docetaxel cada 3 semanas en sobrevida global.',
      'Al diagnosticarse el CPRCm debe suspenderse definitivamente la TDA antes de iniciar docetaxel o cabazitaxel.',
    ],
    correctIndex: 0,
    explanation:
      'En el CPRCm siempre se mantiene la TDA de base y la secuencia depende de la exposición previa: 1) Virgen a QT y a ARPI: Abiraterona (COU-AA-302), Enzalutamida (PREVAIL/TERRAIN) o Docetaxel cada 3 semanas + prednisona (TAX-327 / SWOG 99-16); 2) QT previa, virgen a ARPI: Abiraterona (COU-AA-301), Enzalutamida (AFFIRM) o Cabazitaxel (TROPIC); 3) ARPI previo, virgen a QT: Docetaxel, o Inhibidor PARP (Olaparib [PROfound] / Rucaparib [TRITON3]) si porta mutación BRCA1/2; y 4) Expuesto previamente a ARPI y a Docetaxel: el ensayo CARD probó que Cabazitaxel es significativamente superior en sobrevida global a administrar un segundo ARPI secuencial.',
  },
  {
    num: 59,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'radiofármacos', 'teragnóstica', 'Lutecio-177', 'VISION', 'Radio-223', 'ALSYMPCA'],
    question_text:
      'Dentro de los radiofármacos utilizados en el manejo del CPRCm, ¿cuál es el mecanismo y la indicación validada del Lutecio-177-PSMA (estudio VISION) frente al Radio-223 (estudio ALSYMPCA)?',
    options: [
      'El Lutecio-177-PSMA es un radiofármaco teragnóstico que se une al PSMA de las células tumorales dañando su ADN, y demostró en el estudio VISION mejorar la sobrevida global (15,4 vs. 11,3 meses) en pacientes con CPRCm previamente tratados con ARPI y quimioterapia que presentan lesiones positivas en el PET-CT PSMA; por su parte, el Radio-223 (estudio ALSYMPCA) está indicado en pacientes con metástasis óseas sintomáticas sin metástasis viscerales ni adenopatías > 3 cm, mejorando la sobrevida global y retrasando eventos esqueléticos.',
      'El Radio-223 está indicado específicamente para tratar metástasis hepáticas y pulmonares masivas en pacientes sin metástasis óseas.',
      'El Lutecio-177-PSMA solo funciona en pacientes cuyo PET-CT PSMA sea completamente negativo.',
      'El estudio ERA-223 demostró que combinar Radio-223 con Abiraterona sin agentes antirresortivos elimina por completo el riesgo de fracturas óseas.',
    ],
    correctIndex: 0,
    explanation:
      'Ambos radiofármacos mejoran la sobrevida global en CPRCm pero tienen blancos distintos: el Lu-177-PSMA (estudio VISION) requiere confirmar captación tumoral previa mediante PET-CT PSMA y puede actuar tanto en lesiones óseas como ganglionares o viscerales en pacientes post-ARPI y post-taxanos. En cambio, el Radio-223 (estudio ALSYMPCA) es un calcio-mimético emisor alfa selectivo para hueso, indicado en metástasis óseas sintomáticas sin enfermedad visceral ni adenopatías >3 cm, exigiendo asociar agentes antirresortivos cuando se combina con terapias hormonales potentes por el riesgo de fracturas.',
  },
  {
    num: 60,
    difficulty: 'intermediate',
    tags: ['cáncer de próstata', 'genética', 'germinal vs somático', 'HRR', 'MSI-H', 'salud ósea', 'osteonecrosis mandibular'],
    question_text:
      'Según las guías NCCN 2025 citadas en el Manual de Urología, ¿a qué pacientes con cáncer de próstata se recomienda realizar estudio genético germinal (hereditario) y somático (tumoral), y qué precaución clínica es indispensable antes de iniciar denosumab o ácido zoledrónico en alta dosis para prevenir eventos esqueléticos graves (SRE) en el CPRCm con metástasis óseas?',
    options: [
      'Se recomienda estudio germinal multigénico (en sangre o saliva, con asesoría genética) en todos los pacientes con enfermedad metastásica, regional (N+) o localizada de alto/muy alto riesgo (así como en <60 años, histología ductal/intraductal/neuroendocrina o antecedentes familiares de riesgo), y estudio somático (en tejido metastásico o biopsia líquida ctDNA durante progresión) en todo paciente metastásico para detectar mutaciones HRR (BRCA1/2, ATM, PALB2), MSI-H/dMMR o TMB ≥ 10 mut/Mb; finalmente, antes de iniciar denosumab o ácido zoledrónico es fundamental realizar una evaluación dental previa por el riesgo de osteonecrosis mandibular.',
      'El estudio somático debe tomarse únicamente cuando el APE es indetectable (<0,01 ng/mL), ya que su sensibilidad es máxima cuando no hay actividad tumoral.',
      'El estudio germinal solo detecta mutaciones adquiridas exclusivamente por el tumor que no pueden heredarse a los hijos.',
      'El denosumab y el ácido zoledrónico no requieren suplementación de calcio ni revisión odontológica previa.',
    ],
    correctIndex: 0,
    explanation:
      'El análisis germinal (sangre/saliva) identifica mutaciones heredables en todas las células del cuerpo (BRCA1, BRCA2, ATM, CHEK2, PALB2, HOXB13, MLH1, MSH2, MSH6, PMS2) con impacto terapéutico y para asesoría genética familiar. El análisis somático (biopsia de metástasis o ADN tumoral circulante [ctDNA], tomado durante progresión porque con APE indetectable cae su sensibilidad) detecta mutaciones adquiridas en el tumor para indicar inhibidores PARP o inmunoterapia con pembrolizumab. En cuanto a la salud ósea en CPRCm con metástasis óseas, antes de indicar denosumab o ácido zoledrónico en alta dosis (siempre junto a calcio y vitamina D) es indispensable una evaluación odontológica previa para prevenir la osteonecrosis mandibular.',
  },
];

const OPTION_LETTERS = ['a', 'b', 'c', 'd'] as const;

export const PROSTATE_CANCER_QUESTIONS: Question[] = RAW_PROSTATE_CANCER_QUESTIONS.map((item) => {
  const numStr = String(item.num).padStart(3, '0');
  const questionId = `q-cap-${numStr}`;
  return {
    id: questionId,
    category_id: 'cat-oncologia',
    question_text: item.question_text,
    difficulty: item.difficulty,
    explanation: item.explanation,
    reference_text: MANUAL_UROLOGIA_CAP_REF,
    tags: item.tags,
    status: 'published',
    is_demo_content: false,
    created_by: 'admin-demo-01',
    reviewed_by: 'admin-demo-01',
    published_at: '2026-11-10T10:00:00Z',
    created_at: '2026-11-10T10:00:00Z',
    updated_at: '2026-11-10T10:00:00Z',
    options: item.options.map((optText, idx) => ({
      id: `${questionId}-${OPTION_LETTERS[idx]}`,
      question_id: questionId,
      option_text: optText,
      is_correct: idx === item.correctIndex,
      sort_order: idx + 1,
    })),
  };
});
