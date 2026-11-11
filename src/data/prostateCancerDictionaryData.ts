import {
  UrologyTerm,
  UrologyTermAlias,
  UrologyTermTag,
  UrologyTermReference,
  UrologyTermRelation,
  TermAliasType,
} from '../types/domain';

const SEED_DATE = '2026-11-10T10:00:00.000Z';

interface RawProstateDictionaryEntry {
  id: string;
  term: string;
  slug: string;
  category_id: string;
  short_definition: string;
  full_definition: string;
  aliases: Array<{ alias: string; alias_type: TermAliasType }>;
  tags: string[];
  related_term_ids: string[];
}

const RAW_PROSTATE_DICTIONARY_ENTRIES: RawProstateDictionaryEntry[] = [
  {
    id: 'uterm-30',
    term: 'Cáncer de próstata',
    slug: 'cancer-de-prostata',
    category_id: 'ucat-06',
    short_definition:
      'Neoplasia maligna originada en el epitelio glandular prostático (>90% adenocarcinoma acinar convencional), siendo el cáncer más frecuente en hombres en Chile y a nivel mundial.',
    full_definition:
      'En Chile, el cáncer de próstata (CaP) ocupa el primer lugar en incidencia masculina (62,3 por 100.000 hombres; 16% de los nuevos casos de cáncer) y constituye la cuarta causa de muerte oncológica en varones tras pulmón, estómago y colon. Sus principales factores de riesgo no modificables son la edad avanzada, la ascendencia genética africana subsahariana y la historia familiar de primer grado (que aumenta el riesgo ~2,5 veces, con una heredabilidad estimada del 58%, destacando mutaciones en BRCA2 y HOXB13). Cerca del 70–75% se origina en la zona periférica (ZP), el 20–25% en la zona de transición (ZT) y el 5% en la zona central (ZC).',
    aliases: [
      { alias: 'CaP', alias_type: 'abbreviation' },
      { alias: 'Adenocarcinoma de próstata', alias_type: 'synonym' },
      { alias: 'Adenocarcinoma acinar prostático', alias_type: 'alternative_name' },
      { alias: 'Carcinoma prostático', alias_type: 'synonym' },
    ],
    tags: ['oncología', 'próstata', 'adenocarcinoma', 'zona periférica', 'epidemiología'],
    related_term_ids: ['uterm-04', 'uterm-18', 'uterm-31', 'uterm-32', 'uterm-37', 'uterm-39'],
  },
  {
    id: 'uterm-31',
    term: 'Sistema de Gleason y Grupos de Grado ISUP',
    slug: 'sistema-de-gleason-isup',
    category_id: 'ucat-06',
    short_definition:
      'Sistema de clasificación histopatológica del adenocarcinoma de próstata basado en la arquitectura y diferenciación glandular, estratificado en 5 Grupos de Grado (ISUP 1 a 5).',
    full_definition:
      'Propuesto por Donald Gleason en la década de 1960 y actualizado por la International Society of Urological Pathology (ISUP) en 2005 y 2014. Suma los dos patrones arquitecturales predominantes en la biopsia (eliminándose los patrones 1 y 2 en biopsias contemporáneas) para conformar 5 Grupos de Grado con correlación pronóstica directa: ISUP 1 (Gleason 6 = 3+3, tumor bien diferenciado con riesgo nulo de metástasis cuando es patrón 3 puro en pieza operatoria), ISUP 2 (Gleason 7 = 3+4, pronóstico intermedio favorable), ISUP 3 (Gleason 7 = 4+3, intermedio desfavorable), ISUP 4 (Gleason 8 = 4+4, 3+5 o 5+3) e ISUP 5 (Gleason 9–10).',
    aliases: [
      { alias: 'ISUP', alias_type: 'abbreviation' },
      { alias: 'Score de Gleason', alias_type: 'synonym' },
      { alias: 'Puntaje de Gleason', alias_type: 'synonym' },
      { alias: 'Grupos de Grado ISUP', alias_type: 'alternative_name' },
    ],
    tags: ['anatomía patológica', 'biopsia', 'pronóstico', 'Gleason', 'ISUP'],
    related_term_ids: ['uterm-30', 'uterm-37', 'uterm-38', 'uterm-52'],
  },
  {
    id: 'uterm-32',
    term: 'Densidad de APE',
    slug: 'densidad-de-ape',
    category_id: 'ucat-07',
    short_definition:
      'Cociente entre el valor sérico del Antígeno Prostático Específico total (ng/mL) y el volumen prostático (cc), utilizado para discriminar elevaciones por hiperplasia benigna frente a cáncer clínicamente significativo.',
    full_definition:
      'Su fundamento biológico radica en que el adenocarcinoma prostático libera aproximadamente diez veces más APE hacia la circulación por unidad de volumen tisular que el tejido hiperplásico benigno. El punto de corte clásico es ≥ 0,15 ng/mL/cc (o > 0,10–0,15 ng/mL/cc), por encima del cual aumenta significativamente la probabilidad de cáncer clínicamente significativo (ISUP ≥ 2), mientras que valores < 0,09 ng/mL/cc se asocian a un riesgo muy bajo (~4%). La resonancia magnética es el método más exacto para estimar el volumen prostático requerido en su cálculo.',
    aliases: [
      { alias: 'd-APE', alias_type: 'abbreviation' },
      { alias: 'PSAD', alias_type: 'abbreviation' },
      { alias: 'Densidad de PSA', alias_type: 'synonym' },
    ],
    tags: ['biomarcadores', 'APE', 'volumen prostático', 'diagnóstico', 'PI-RADS 3'],
    related_term_ids: ['uterm-18', 'uterm-04', 'uterm-30', 'uterm-33', 'uterm-35'],
  },
  {
    id: 'uterm-33',
    term: 'Porcentaje de APE libre',
    slug: 'porcentaje-de-ape-libre',
    category_id: 'ucat-07',
    short_definition:
      'Relación porcentual entre la fracción de APE que circula libre en el plasma y el APE total, empleada como marcador complementario en la sospecha diagnóstica de cáncer de próstata.',
    full_definition:
      'En la circulación sanguínea el APE se encuentra mayoritariamente unido a proteínas inhibidoras de proteasas (como la alfa-1-antiquimotripsina) y en menor proporción en forma libre. En pacientes con cáncer de próstata disminuye la proporción de APE libre: valores inferiores al 10% se asocian con alta probabilidad de malignidad, mientras que valores superiores al 25% suelen orientar a patología benigna (HPB). A diferencia del APE total (que cae ~50%), el porcentaje de APE libre no se altera con el uso de inhibidores de la 5-alfa reductasa (finasteride o dutasteride).',
    aliases: [
      { alias: '% APE libre', alias_type: 'abbreviation' },
      { alias: 'f/t PSA', alias_type: 'abbreviation' },
      { alias: 'Relación APE libre/total', alias_type: 'synonym' },
    ],
    tags: ['biomarcadores', 'APE', 'diagnóstico', '5-alfa reductasa'],
    related_term_ids: ['uterm-18', 'uterm-32', 'uterm-30', 'uterm-11'],
  },
  {
    id: 'uterm-34',
    term: 'Tiempo de doblaje de APE',
    slug: 'tiempo-de-doblaje-de-ape',
    category_id: 'ucat-06',
    short_definition:
      'Parámetro cinético que mide el número de meses que tarda en duplicarse exponencialmente el valor sérico del APE, siendo el predictor pronóstico más sólido en la recidiva bioquímica y en el cáncer resistente a la castración.',
    full_definition:
      'A diferencia de la velocidad de APE pretratamiento (de utilidad clínica limitada), el tiempo de doblaje de APE (PSADT o tdAPE) posterior al tratamiento primario o durante la privación androgénica posee un altísimo valor pronóstico. Tras una prostatectomía radical con recidiva bioquímica, un PSADT < 10–12 meses define recidiva de alto riesgo y predice mortalidad cáncer-específica. Asimismo, en el cáncer de próstata resistente a la castración no metastásico (CPRCnm), un tdAPE ≤ 10 meses identifica a los pacientes de alto riesgo que requieren intensificación con un ARPI (enzalutamida, apalutamida o darolutamida).',
    aliases: [
      { alias: 'PSADT', alias_type: 'abbreviation' },
      { alias: 'tdAPE', alias_type: 'abbreviation' },
      { alias: 'APEDT', alias_type: 'abbreviation' },
      { alias: 'Tiempo de duplicación de PSA', alias_type: 'synonym' },
    ],
    tags: ['cinética de APE', 'pronóstico', 'recidiva bioquímica', 'CPRCnm'],
    related_term_ids: ['uterm-18', 'uterm-41', 'uterm-47', 'uterm-36'],
  },
  {
    id: 'uterm-35',
    term: 'Resonancia magnética multiparamétrica de próstata y sistema PI-RADS',
    slug: 'resonancia-magnetica-multiparametrica-pirads',
    category_id: 'ucat-11',
    short_definition:
      'Estudio de imagen estándar previo a la biopsia prostática que combina secuencias anatómicas (T2) y funcionales (difusión DWI/ADC y perfusión DCE), estandarizado mediante la escala PI-RADS del 1 al 5.',
    full_definition:
      'La RNMmp permite detectar lesiones sospechosas de cáncer clínicamente significativo (ISUP ≥ 2), guiar biopsias dirigidas por fusión y evaluar la extensión local (extensión extracapsular, invasión de vesículas seminales o ápex). En difusión, los tumores malignos restringen el movimiento de agua mostrándose hipointensos en el mapa ADC e hiperintensos en DWI de alto valor b. El sistema PI-RADS (ACR/ESUR) categoriza la probabilidad de cáncer clínicamente significativo: PI-RADS 1–2 (~6% de prevalencia de ISUP ≥ 2; VPN >90%), PI-RADS 3 (~16%, lesión equívoca) y PI-RADS 4–5 (~62%, alta probabilidad). La variante biparamétrica (RNMbp) omite el contraste con gadolinio (DCE), reduciendo el tiempo de examen a 15–20 minutos con rendimiento similar.',
    aliases: [
      { alias: 'RNMmp', alias_type: 'abbreviation' },
      { alias: 'PI-RADS', alias_type: 'abbreviation' },
      { alias: 'RMmp de próstata', alias_type: 'abbreviation' },
      { alias: 'RNMbp', alias_type: 'abbreviation' },
    ],
    tags: ['imagenología', 'PI-RADS', 'difusión ADC', 'biopsia dirigida', 'estadificación'],
    related_term_ids: ['uterm-30', 'uterm-32', 'uterm-36', 'uterm-38'],
  },
  {
    id: 'uterm-36',
    term: 'PET-CT con PSMA',
    slug: 'pet-ct-psma',
    category_id: 'ucat-11',
    short_definition:
      'Técnica híbrida de medicina nuclear y tomografía que utiliza radioligandos dirigidos al Antígeno de Membrana Específico de la Próstata (PSMA), con sensibilidad y especificidad superiores a las imágenes convencionales.',
    full_definition:
      'Respaldado por estudios como ProPSMA y PRIMARY, el PET-CT PSMA está indicado en: 1) Etapificación inicial de cánceres de riesgo intermedio desfavorable, alto y muy alto candidatos a tratamiento curativo; 2) Estudio de la recidiva bioquímica post-cirugía o radioterapia (con tasas de positividad de 50–60% ya con APE 0,2–0,5 ng/mL, 85% con APE 0,5–2,0 ng/mL y ~100% con APE >2 ng/mL); 3) Reetapificación en progresión metastásica o ante hallazgos equívocos en cintigrama óseo/TAC; y 4) Selección de candidatos a terapia teragnóstica con 177Lutecio-PSMA. Las captaciones óseas exclusivamente costales aisladas (sin otras lesiones y con SUVmax bajo) suelen corresponder a falsos positivos benignos.',
    aliases: [
      { alias: 'PET-PSMA', alias_type: 'abbreviation' },
      { alias: 'PSMA PET/CT', alias_type: 'abbreviation' },
      { alias: 'miTNM', alias_type: 'alternative_name' },
    ],
    tags: ['medicina nuclear', 'PSMA', 'etapificación', 'recidiva bioquímica', 'ProPSMA'],
    related_term_ids: ['uterm-30', 'uterm-35', 'uterm-41', 'uterm-49'],
  },
  {
    id: 'uterm-37',
    term: 'Vigilancia activa en cáncer de próstata',
    slug: 'vigilancia-activa-cancer-de-prostata',
    category_id: 'ucat-06',
    short_definition:
      'Estrategia de manejo estructurado con intención curativa diferida para pacientes con cáncer de próstata localizado de bajo riesgo y buena expectativa de vida, orientada a evitar el sobretratamiento.',
    full_definition:
      'A diferencia de la observación o espera vigilante (watchful waiting, de carácter paliativo en pacientes con expectativa de vida limitada), la vigilancia activa (VA) monitoriza estrechamente tumores indolentes para indicar cirugía o radioterapia curativa solo si ocurre progresión biológica. Sus criterios clásicos de inclusión (D’Amico bajo riesgo / Epstein muy bajo riesgo) comprenden ISUP 1, estadio cT1c–T2a, APE < 10 ng/mL, densidad de APE < 0,15 ng/mL/cc y bajo volumen en cilindros (pudiendo extenderse a casos seleccionados ISUP 2 de bajo volumen sin patrón cribiforme/intraductal). El seguimiento incluye APE cada 3–6 meses, tacto rectal anual, RNMmp y biopsia confirmatoria al año y luego cada 2–3 años. Cohortes a 10–15 años (Johns Hopkins, Sunnybrook, Canary PASS, ProtecT) demuestran una mortalidad específica ≤ 1,5% y preservación superior de la continencia y función sexual.',
    aliases: [
      { alias: 'VA', alias_type: 'abbreviation' },
      { alias: 'Active Surveillance', alias_type: 'synonym' },
      { alias: 'Seguimiento activo', alias_type: 'synonym' },
    ],
    tags: ['vigilancia activa', 'bajo riesgo', 'sobretratamiento', 'criterios de Epstein', 'calidad de vida'],
    related_term_ids: ['uterm-30', 'uterm-31', 'uterm-32', 'uterm-35', 'uterm-38'],
  },
  {
    id: 'uterm-38',
    term: 'Prostatectomía radical',
    slug: 'prostatectomia-radical',
    category_id: 'ucat-11',
    short_definition:
      'Intervención quirúrgica con intención curativa que consiste en la extirpación completa de la glándula prostática y las vesículas seminales, con posterior anastomosis vesicouretral.',
    full_definition:
      'Indicada en el cáncer de próstata clínicamente localizado y como parte del manejo multimodal en casos seleccionados localmente avanzados, en pacientes con expectativa de vida > 10 años. Ensayos como SPCG-4 y PIVOT demostraron beneficio en supervivencia específica y global en tumores de riesgo intermedio y alto (sin beneficio en supervivencia para ISUP 1). El abordaje asistido por robot (RARP) ha demostrado menor sangrado, menor tasa de transfusión, menor estadía hospitalaria y recuperación más rápida de la continencia frente a la cirugía abierta. Sus principales secuelas funcionales a informar son la incontinencia urinaria (recuperándose la continencia total en el 70–90% al año; <5% severa) y la disfunción eréctil.',
    aliases: [
      { alias: 'PR', alias_type: 'abbreviation' },
      { alias: 'RARP', alias_type: 'abbreviation' },
      { alias: 'Prostatectomía radical robótica', alias_type: 'alternative_name' },
    ],
    tags: ['cirugía urológica', 'robótica', 'continencia', 'bandeletas neurovasculares', 'tratamiento curativo'],
    related_term_ids: ['uterm-30', 'uterm-04', 'uterm-39', 'uterm-41', 'uterm-10'],
  },
  {
    id: 'uterm-39',
    term: 'Linfadenectomía pélvica extendida y Nomograma de Briganti',
    slug: 'linfadenectomia-pelvica-extendida-briganti',
    category_id: 'ucat-11',
    short_definition:
      'Disección quirúrgica de las cadenas ganglionares linfáticas pélvicas durante la prostatectomía radical con fines de estadificación nodal, cuya indicación se individualiza mediante nomogramas como el de Briganti.',
    full_definition:
      'Aunque la linfadenectomía pélvica extendida (ePLND) es el método más sensible para detectar metástasis ganglionares microscópicas (pN1), los ensayos aleatorizados no han demostrado que mejore la supervivencia ni reduzca la recurrencia bioquímica, asociándose además a mayor morbilidad quirúrgica (linfoceles, linfedema en ~13,7%, eventos tromboembólicos). Desde 2024 las guías EAU recomiendan individualizar su indicación combinando el PET-CT PSMA y nomogramas validados como el de Briganti (actualizado en 2023, que integra APE, estadio clínico, RNMmp, grado ISUP y porcentaje de cilindros positivos). En caso de indicarse, siempre debe realizarse con plantilla extendida.',
    aliases: [
      { alias: 'ePLND', alias_type: 'abbreviation' },
      { alias: 'Nomograma de Briganti', alias_type: 'alternative_name' },
      { alias: 'Tablas de Partin', alias_type: 'alternative_name' },
    ],
    tags: ['estadificación ganglionar', 'cirugía', 'nomogramas', 'Briganti', 'linfedema'],
    related_term_ids: ['uterm-38', 'uterm-36', 'uterm-30'],
  },
  {
    id: 'uterm-40',
    term: 'Radioterapia externa hipofraccionada y Braquiterapia prostática',
    slug: 'radioterapia-externa-braquiterapia-prostata',
    category_id: 'ucat-11',
    short_definition:
      'Modalidades de tratamiento radiante con intención curativa en el cáncer de próstata localizado o localmente avanzado, administradas mediante haces externos guiados por imagen (EBRT/SBRT) o implantes intersticiales (LDR/HDR).',
    full_definition:
      'La radioterapia externa moderna (EBRT) utiliza esquemas de hipofraccionamiento moderado (p. ej., 20 fracciones en 4 semanas) o extremo/estereotáxico (SBRT en 5 fracciones) con eficacia oncológica equivalente a los esquemas convencionales largos. Según el grupo de riesgo, se irradia solo la próstata sin bloqueo hormonal en bajo riesgo; se asocian 6 meses de terapia de deprivación androgénica (TDA) en riesgo intermedio; y se indican 24 a 36 meses de TDA (más irradiación ganglionar pélvica profiláctica y abiraterona si cumple criterios STAMPEDE) en alto riesgo o localmente avanzado. La braquiterapia (de baja tasa LDR o alta tasa HDR) se emplea como monoterapia en bajo riesgo de bajo volumen o como sobreimpresión (boost) combinada con EBRT en riesgo intermedio/alto.',
    aliases: [
      { alias: 'EBRT', alias_type: 'abbreviation' },
      { alias: 'SBRT prostática', alias_type: 'abbreviation' },
      { alias: 'Braquiterapia LDR / HDR', alias_type: 'alternative_name' },
    ],
    tags: ['radioterapia', 'braquiterapia', 'hipofraccionamiento', 'tratamiento curativo'],
    related_term_ids: ['uterm-30', 'uterm-42', 'uterm-43', 'uterm-38'],
  },
  {
    id: 'uterm-41',
    term: 'Recidiva bioquímica post-prostatectomía y Radioterapia de salvataje precoz',
    slug: 'recidiva-bioquimica-post-prostatectomia',
    category_id: 'ucat-06',
    short_definition:
      'Reaparición de niveles detectables de APE (clásicamente ≥ 0,2 ng/mL en dos mediciones consecutivas) tras haber alcanzado un nadir indetectable luego de una prostatectomía radical.',
    full_definition:
      'Tras la prostatectomía radical el APE debe volverse indetectable en 6 a 8 semanas. Si posteriormente asciende, la EAU estratifica la recidiva bioquímica (RBQ) en Bajo Riesgo (PSADT > 1 año e ISUP 1–3) y Alto Riesgo (PSADT < 1 año o ISUP 4–5). En la pieza operatoria, Budäus demostró que un tumor pT3 con márgenes negativos tiene menor probabilidad de recidiva que un pT2 con márgenes positivos. El estándar terapéutico actual ante el ascenso del APE postoperatorio es la radioterapia de rescate o salvataje precoz iniciada idealmente cuando el APE supera 0,1 ng/mL en ascenso (sin esperar a 0,2 ng/mL), previa reetapificación con PET-CT PSMA.',
    aliases: [
      { alias: 'RBQ post-cirugía', alias_type: 'abbreviation' },
      { alias: 'BCR', alias_type: 'abbreviation' },
      { alias: 'Radioterapia de rescate precoz', alias_type: 'alternative_name' },
    ],
    tags: ['recidiva bioquímica', 'prostatectomía', 'márgenes quirúrgicos', 'radioterapia de rescate'],
    related_term_ids: ['uterm-38', 'uterm-34', 'uterm-36', 'uterm-42'],
  },
  {
    id: 'uterm-42',
    term: 'Criterio de Phoenix y Rebote de APE post-radioterapia',
    slug: 'criterio-de-phoenix-rebote-de-ape',
    category_id: 'ucat-06',
    short_definition:
      'Consenso internacional (ASTRO/RTOG 2005) que define la recidiva bioquímica tras radioterapia primaria como un ascenso del APE de ≥ 2 ng/mL por sobre el nadir alcanzado.',
    full_definition:
      'Luego de la radioterapia primaria persiste tejido prostático remanente capaz de producir APE. Por ello, la recidiva bioquímica se define por el criterio de Phoenix (nadir + 2 ng/mL), clasificándose según la EAU en bajo riesgo (intervalo > 18 meses e ISUP 1–3) o alto riesgo (intervalo ≤ 18 meses o ISUP 4–5). No debe confundirse con el "rebote de APE" (PSA bounce), que es un alza transitoria benigna de 0,1 a 0,5 ng/mL secundaria a prostatitis actínica focal que luego regresa al basal y se asocia a mejor pronóstico. Antes de indicar cualquier rescate local post-radioterapia (prostatectomía, braquiterapia, SBRT o crioterapia de rescate) es obligatorio reetapificar con PET-CT PSMA + RNM y confirmar histológicamente el tumor viable mediante biopsia prostática.',
    aliases: [
      { alias: 'Criterios de Phoenix', alias_type: 'synonym' },
      { alias: 'PSA bounce', alias_type: 'alternative_name' },
      { alias: 'Rebote de APE', alias_type: 'alternative_name' },
    ],
    tags: ['radioterapia', 'recidiva bioquímica', 'criterio de Phoenix', 'biopsia de rescate'],
    related_term_ids: ['uterm-40', 'uterm-41', 'uterm-18', 'uterm-36'],
  },
  {
    id: 'uterm-43',
    term: 'Terapia de deprivación androgénica y fenómeno de llamarada (Flare)',
    slug: 'terapia-de-deprivacion-androgenica-flare',
    category_id: 'ucat-12',
    short_definition:
      'Tratamiento sistémico hormonal que suprime los niveles de testosterona hasta rango de castración (<50 ng/dL, idealmente <20 ng/dL) o bloquea el receptor androgénico para inhibir el crecimiento del cáncer de próstata.',
    full_definition:
      'Descrita originalmente por Huggins y Hodges, la castración puede lograrse por vía quirúrgica (orquiectomía bilateral) o médica (agonistas LHRH como leuprolide, goserelina y triptorelina, o antagonistas GnRH), con eficacia oncológica equivalente. En enfermedad metastásica la modalidad continua es superior a la intermitente. Al iniciar agonistas LHRH se produce una estimulación hipofisaria transitoria que eleva la testosterona durante la primera semana (fenómeno de llamarada o flare), lo que en pacientes con alta carga metastásica ósea o gran masa prostática puede desencadenar compresión medular aguda o retención urinaria; por ello se previene asociando un antiandrógeno (bicalutamida o flutamida) durante ≥ 7 días al inicio.',
    aliases: [
      { alias: 'TDA', alias_type: 'abbreviation' },
      { alias: 'ADT', alias_type: 'abbreviation' },
      { alias: 'Bloqueo hormonal', alias_type: 'synonym' },
      { alias: 'Fenómeno flare', alias_type: 'alternative_name' },
    ],
    tags: ['hormonoterapia', 'castración', 'agonistas LHRH', 'testosterona', 'flare'],
    related_term_ids: ['uterm-30', 'uterm-44', 'uterm-45', 'uterm-51'],
  },
  {
    id: 'uterm-44',
    term: 'Inhibidores de la vía del receptor de andrógenos (ARPI)',
    slug: 'inhibidores-via-receptor-androgenos-arpi',
    category_id: 'ucat-12',
    short_definition:
      'Fármacos hormonales de nueva generación que bloquean la síntesis extragonadal/intratumoral de andrógenos (Abiraterona) o inhiben potentemente el receptor de andrógenos (Enzalutamida, Apalutamida, Darolutamida).',
    full_definition:
      'Los ARPI (Androgen Receptor Pathway Inhibitors) han revolucionado el manejo del cáncer de próstata avanzado al combinarse con la TDA clásica. Se dividen en dos clases farmacológicas: 1) Inhibidores de la síntesis de andrógenos: Abiraterona (inhibidor selectivo de la enzima CYP17A1 que bloquea la síntesis de andrógenos en testículo, glándula suprarrenal y tejido tumoral; requiere administrarse junto con prednisona para prevenir el exceso mineralocorticoide); y 2) Bloqueadores competitivos de tercera generación del receptor de andrógenos: Enzalutamida, Apalutamida y Darolutamida, que impiden la unión de andrógenos, la translocación nuclear del receptor y su unión al ADN.',
    aliases: [
      { alias: 'ARPI', alias_type: 'abbreviation' },
      { alias: 'Abiraterona', alias_type: 'alternative_name' },
      { alias: 'Enzalutamida', alias_type: 'alternative_name' },
      { alias: 'Apalutamida / Darolutamida', alias_type: 'alternative_name' },
    ],
    tags: ['farmacología oncológica', 'ARPI', 'abiraterona', 'enzalutamida', 'darolutamida', 'apalutamida'],
    related_term_ids: ['uterm-43', 'uterm-45', 'uterm-47', 'uterm-48'],
  },
  {
    id: 'uterm-45',
    term: 'Cáncer de próstata metastásico hormonosensible y Criterios CHAARTED',
    slug: 'cancer-prostata-metastasico-hormonosensible-chaarted',
    category_id: 'ucat-06',
    short_definition:
      'Fase metastásica del cáncer de próstata que aún responde a la privación androgénica, estratificada según su volumen tumoral (alta vs. baja carga de CHAARTED) para recibir terapia combinada en dobletes o tripletes.',
    full_definition:
      'Las metástasis pueden presentarse al diagnóstico (sincrónicas o de novo) o tras fallar un tratamiento local (metacrónicas). El estudio CHAARTED definió en imágenes convencionales la "Alta Carga" (High Volume) por la presencia de ≥ 4 metástasis óseas (con al menos una fuera del esqueleto axial: columna o pelvis) y/o metástasis viscerales, siendo "Baja Carga" la ausencia de estos criterios. Hoy la TDA como monoterapia es insuficiente: en Alta Carga el mayor beneficio en sobrevida global lo otorgan los tripletes (TDA + Docetaxel + Darolutamida [ARASENS] o Abiraterona [PEACE-1]), mientras que en Baja Carga o pacientes no aptos para quimioterapia el estándar son los dobletes de TDA + ARPI (validados por LATITUDE, STAMPEDE-G, ARCHES, ENZAMET y TITAN).',
    aliases: [
      { alias: 'CPHSm', alias_type: 'abbreviation' },
      { alias: 'mHSPC', alias_type: 'abbreviation' },
      { alias: 'Criterios CHAARTED', alias_type: 'alternative_name' },
    ],
    tags: ['metástasis', 'CHAARTED', 'PEACE-1', 'ARASENS', 'dobletes y tripletes'],
    related_term_ids: ['uterm-30', 'uterm-43', 'uterm-44', 'uterm-46', 'uterm-48'],
  },
  {
    id: 'uterm-46',
    term: 'Cáncer de próstata resistente a la castración',
    slug: 'cancer-de-prostata-resistente-a-la-castracion',
    category_id: 'ucat-06',
    short_definition:
      'Progresión bioquímica, radiológica o clínica del cáncer de próstata a pesar de mantener niveles plasmáticos de testosterona en rango de castración (< 50 ng/dL, idealmente < 20 ng/dL).',
    full_definition:
      'Representa la etapa evolutiva avanzada tras el escape a la deprivación androgénica inicial; sin embargo, es obligatorio mantener la TDA de base de forma indefinida para continuar suprimiendo las poblaciones clonales que permanecen sensibles a andrógenos. Se divide operativamente en CPRC no metastásico (CPRCnm, sin lesiones en imágenes convencionales) y CPRC metastásico (CPRCm). En el CPRCm la secuencia terapéutica depende de los fármacos recibidos previamente (existiendo resistencia cruzada entre distintos ARPIs), incluyendo taxanos (Docetaxel, Cabazitaxel), ARPIs, inhibidores de PARP en mutaciones HRR/BRCA, inmunoterapia (pembrolizumab en MSI-H) y radiofármacos (177Lu-PSMA y 223Radio).',
    aliases: [
      { alias: 'CPRC', alias_type: 'abbreviation' },
      { alias: 'CRPC', alias_type: 'abbreviation' },
      { alias: 'CPRCm / mCRPC', alias_type: 'abbreviation' },
    ],
    tags: ['resistencia a la castración', 'CPRC', 'progresión', 'secuenciación terapéutica'],
    related_term_ids: ['uterm-43', 'uterm-44', 'uterm-47', 'uterm-48', 'uterm-49', 'uterm-50'],
  },
  {
    id: 'uterm-47',
    term: 'Cáncer de próstata resistente a la castración no metastásico (CPRCnm)',
    slug: 'cprc-no-metastasico',
    category_id: 'ucat-06',
    short_definition:
      'Elevación progresiva del APE con testosterona en nivel de castración (<50 ng/dL) y ausencia de metástasis detectables en imágenes convencionales (TAC y cintigrama óseo).',
    full_definition:
      'En los pacientes con CPRCnm el principal factor pronóstico de evolución rápida a metástasis y muerte por cáncer es un tiempo de doblaje de APE (tdAPE / PSADT) ≤ 10 meses. En este subgrupo de alto riesgo, tres ensayos clínicos fase III pivotales —PROSPER (TDA + Enzalutamida), SPARTAN (TDA + Apalutamida) y ARAMIS (TDA + Darolutamida)— demostraron un beneficio contundente tanto en sobrevida libre de metástasis como en sobrevida global. En pacientes con tdAPE > 10 meses asintomáticos puede mantenerse la TDA sola bajo monitoreo periódico según el consenso RADAR.',
    aliases: [
      { alias: 'CPRCnm', alias_type: 'abbreviation' },
      { alias: 'nmCRPC', alias_type: 'abbreviation' },
      { alias: 'PROSPER / SPARTAN / ARAMIS', alias_type: 'alternative_name' },
    ],
    tags: ['CPRCnm', 'PSADT', 'PROSPER', 'SPARTAN', 'ARAMIS'],
    related_term_ids: ['uterm-46', 'uterm-34', 'uterm-44', 'uterm-36'],
  },
  {
    id: 'uterm-48',
    term: 'Quimioterapia con Taxanos (Docetaxel y Cabazitaxel)',
    slug: 'quimioterapia-taxanos-docetaxel-cabazitaxel',
    category_id: 'ucat-12',
    short_definition:
      'Agentes citotóxicos estabilizadores de microtúbulos que constituyen la base de la quimioterapia con beneficio demostrado en sobrevida global en el cáncer de próstata metastásico.',
    full_definition:
      'El Docetaxel (administrado cada 3 semanas junto con prednisona) demostró por primera vez mejorar la supervivencia global en el CPRCm en los estudios TAX-327 y SWOG 99-16, y posteriormente demostró gran beneficio en el escenario hormonosensible de alta carga (CHAARTED, STAMPEDE-C y tripletes PEACE-1 / ARASENS). Por su parte, el Cabazitaxel es un taxano de segunda generación diseñado para superar la resistencia a docetaxel: el estudio TROPIC validó su beneficio en segunda línea post-docetaxel, y el estudio CARD demostró su clara superioridad en sobrevida global en tercera línea (tras progresar a docetaxel y a un ARPI) frente a utilizar un segundo ARPI secuencial.',
    aliases: [
      { alias: 'Docetaxel', alias_type: 'alternative_name' },
      { alias: 'Cabazitaxel', alias_type: 'alternative_name' },
      { alias: 'Estudio CARD / TAX-327', alias_type: 'alternative_name' },
    ],
    tags: ['quimioterapia', 'taxanos', 'docetaxel', 'cabazitaxel', 'estudio CARD'],
    related_term_ids: ['uterm-45', 'uterm-46', 'uterm-44'],
  },
  {
    id: 'uterm-49',
    term: 'Teragnóstica y Radiofármacos (177Lutecio-PSMA y 223Radio)',
    slug: 'teragnostica-radiofarmacos-lutecio-177-radio-223',
    category_id: 'ucat-12',
    short_definition:
      'Terapias sistémicas con radionúclidos dirigidos que emiten radiación citotóxica selectiva sobre las lesiones metastásicas del cáncer de próstata resistente a la castración.',
    full_definition:
      'Comprende dos radiofármacos con beneficio demostrado en supervivencia global en el CPRCm: 1) 177Lutecio-PSMA-617 (vipivotide tetraxetan): agente teragnóstico emisor beta que se une específicamente al PSMA celular dañando el ADN tumoral; el estudio fase III VISION demostró que prolonga la sobrevida global (15,4 vs. 11,3 meses) en pacientes con CPRCm pretratados con al menos un ARPI y quimioterapia con taxanos que presentan lesiones PSMA-positivas en el PET-CT. 2) Dicloruro de 223Radio: emisor de partículas alfa calcio-mimético con afinidad por la matriz ósea osteoblástica; el estudio ALSYMPCA demostró que mejora la sobrevida global y retrasa eventos esqueléticos en pacientes con metástasis óseas sintomáticas sin metástasis viscerales ni adenopatías > 3 cm (requiriendo asociar agentes antirresortivos óseos cuando se combina con terapias hormonales potentes).',
    aliases: [
      { alias: '177Lu-PSMA', alias_type: 'abbreviation' },
      { alias: 'Radio-223', alias_type: 'alternative_name' },
      { alias: 'Teragnóstica', alias_type: 'synonym' },
      { alias: 'Estudios VISION y ALSYMPCA', alias_type: 'alternative_name' },
    ],
    tags: ['radiofármacos', 'teragnóstica', 'Lutecio-177', 'Radio-223', 'VISION', 'ALSYMPCA'],
    related_term_ids: ['uterm-36', 'uterm-46', 'uterm-51'],
  },
  {
    id: 'uterm-50',
    term: 'Biomarcadores genómicos y Terapias dirigidas (BRCA, HRR, AR-V7 y PTEN)',
    slug: 'biomarcadores-genomicos-brca-hrr-arv7-pten',
    category_id: 'ucat-06',
    short_definition:
      'Conjunto de pruebas moleculares en sangre, orina o tejido que guían el diagnóstico, la estratificación pronóstica y la medicina de precisión en el cáncer de próstata.',
    full_definition:
      'Se clasifican en tres niveles clínicos: 1) Diagnósticos (pre-biopsia o re-biopsia): en sangre (PHI, 4Kscore, Stockholm3, Proclarix), en orina (PCA3, SelectMDx, ExoDx, TMPRSS2-ERG [MiPS]) y en tejido negativo previo (ConfirmMDx, que evalúa metilación de APC, RASSF1 y GSTP1). 2) Pronósticos en tejido localizado: paneles de ARN (Decipher de 22 genes, Prolaris de 31 genes del ciclo celular, Oncotype DX de 17 genes) y proteómicos (ProMark de 8 proteínas) para decidir entre vigilancia activa o tratamiento radical/adyuvante. 3) Predictivos para elección de tratamiento en CPRCm (mediante testeo germinal en sangre/saliva y somático en tumor o ctDNA): las mutaciones en genes de reparación por recombinación homóloga (HRR, especialmente BRCA1/2, ATM y PALB2) predicen respuesta a inhibidores de PARP (olaparib, rucaparib, talazoparib, niraparib); la deficiencia MMR o inestabilidad microsatelital (MSI-H) responde a pembrolizumab; la variante de corte y empalme AR-V7 confiere resistencia primaria a abiraterona y enzalutamida; y la pérdida de PTEN activa la vía PI3K/AKT pudiendo responder a capivasertib.',
    aliases: [
      { alias: 'BRCA1 / BRCA2', alias_type: 'abbreviation' },
      { alias: 'Inhibidores PARP', alias_type: 'alternative_name' },
      { alias: 'Decipher / Prolaris / Oncotype DX', alias_type: 'alternative_name' },
      { alias: 'AR-V7', alias_type: 'abbreviation' },
    ],
    tags: ['genética', 'BRCA2', 'inhibidores PARP', 'Decipher', 'AR-V7', 'biopsia líquida ctDNA'],
    related_term_ids: ['uterm-30', 'uterm-46', 'uterm-44'],
  },
  {
    id: 'uterm-51',
    term: 'Salud ósea y prevención de eventos esqueléticos en cáncer de próstata',
    slug: 'salud-osea-eventos-esqueleticos-cancer-prostata',
    category_id: 'ucat-12',
    short_definition:
      'Estrategia integral de evaluación densitométrica, suplementación y terapia antirresortiva para prevenir la osteoporosis inducida por TDA y los eventos esqueléticos graves en presencia de metástasis óseas.',
    full_definition:
      'La terapia de deprivación androgénica (TDA) acelera la pérdida de masa mineral ósea y aumenta el riesgo de fracturas fragilizantes. En todo paciente que inicia TDA se recomienda evaluación basal con densitometría ósea y score FRAX, ejercicio con carga, suspensión de tabaco/alcohol y suplementación universal con calcio (1000–1200 mg/día) y vitamina D3 (meta sérica > 30 ng/mL), indicando agentes antirresortivos cuando el riesgo de fractura es alto. En pacientes con CPRCm y metástasis óseas, se administra Denosumab (anticuerpo monoclonal anti-RANKL) o Ácido Zoledrónico (bifosfonato potente) en dosis oncológicas para prevenir eventos relacionados con el esqueleto (SRE: fractura patológica, compresión medular o necesidad de cirugía/radioterapia ósea). Antes de iniciar denosumab o ácido zoledrónico es obligatoria una evaluación odontológica preventiva por el riesgo de osteonecrosis mandibular.',
    aliases: [
      { alias: 'SRE', alias_type: 'abbreviation' },
      { alias: 'Denosumab / Ácido zoledrónico', alias_type: 'alternative_name' },
      { alias: 'Osteonecrosis mandibular', alias_type: 'alternative_name' },
    ],
    tags: ['salud ósea', 'denosumab', 'ácido zoledrónico', 'osteoporosis', 'osteonecrosis mandibular'],
    related_term_ids: ['uterm-43', 'uterm-46', 'uterm-49'],
  },
  {
    id: 'uterm-52',
    term: 'Inmunohistoquímica prostática (AMACR, NKX3.1, p63 y CK5/6)',
    slug: 'inmunohistoquimica-prostatica-amacr-nkx3-1-p63',
    category_id: 'ucat-06',
    short_definition:
      'Panel de marcadores inmunohistoquímicos empleados en biopsias prostáticas para confirmar focos de adenocarcinoma (sobreexpresión de AMACR y ausencia de capa basal p63/CK5/6) o verificar el origen prostático de una metástasis (NKX3.1).',
    full_definition:
      'En focos glandulares pequeños o atípicos de difícil interpretación morfológica en hematoxilina-eosina, la inmunohistoquímica permite demostrar el sello diagnóstico del adenocarcinoma acinar: la pérdida completa de la capa de células basales (negatividad para los marcadores basales p63 y citoqueratina de alto peso molecular CK5/6, que son positivos en glándulas benignas) asociada a la sobreexpresión citoplasmática de racemasa (AMACR / P504S). Por otro lado, dado que la expresión tisular de APE y PAP puede disminuir en carcinomas poco diferenciados o metastásicos, el factor de transcripción nuclear NKX3.1 constituye el marcador más sensible y específico para confirmar el origen prostático de una neoplasia metastásica.',
    aliases: [
      { alias: 'AMACR / P504S', alias_type: 'abbreviation' },
      { alias: 'Racemasa', alias_type: 'synonym' },
      { alias: 'NKX3.1', alias_type: 'abbreviation' },
      { alias: 'p63 y CK5/6', alias_type: 'abbreviation' },
    ],
    tags: ['inmunohistoquímica', 'anatomía patológica', 'racemasa AMACR', 'NKX3.1', 'células basales'],
    related_term_ids: ['uterm-30', 'uterm-31', 'uterm-04'],
  },
];

export const PROSTATE_CANCER_DICTIONARY_TERMS: UrologyTerm[] = RAW_PROSTATE_DICTIONARY_ENTRIES.map(
  (entry) => ({
    id: entry.id,
    term: entry.term,
    slug: entry.slug,
    short_definition: entry.short_definition,
    full_definition: entry.full_definition,
    category_id: entry.category_id,
    image_url: null,
    editorial_status: 'published',
    is_demo_pending_review: false,
    created_by: 'admin-demo-01',
    reviewed_by: 'admin-demo-01',
    published_at: SEED_DATE,
    created_at: SEED_DATE,
    updated_at: SEED_DATE,
  })
);

export const PROSTATE_CANCER_DICTIONARY_ALIASES: UrologyTermAlias[] = [];
export const PROSTATE_CANCER_DICTIONARY_TAGS: UrologyTermTag[] = [];
export const PROSTATE_CANCER_DICTIONARY_REFERENCES: UrologyTermReference[] = [];
export const PROSTATE_CANCER_DICTIONARY_RELATIONS: UrologyTermRelation[] = [];

let aliasCounter = 100;
let tagCounter = 100;
let refCounter = 100;
let relCounter = 100;

for (const entry of RAW_PROSTATE_DICTIONARY_ENTRIES) {
  for (const al of entry.aliases) {
    PROSTATE_CANCER_DICTIONARY_ALIASES.push({
      id: `ualias-${aliasCounter++}`,
      term_id: entry.id,
      alias: al.alias,
      alias_type: al.alias_type,
    });
  }

  for (const tg of entry.tags) {
    PROSTATE_CANCER_DICTIONARY_TAGS.push({
      id: `utag-${tagCounter++}`,
      term_id: entry.id,
      tag: tg,
    });
  }

  PROSTATE_CANCER_DICTIONARY_REFERENCES.push({
    id: `uref-${refCounter++}`,
    term_id: entry.id,
    reference_title: 'Manual de Urología — Capítulo Cáncer de Próstata',
    authors: 'Sociedad Chilena de Urología',
    publication_year: 2025,
    source_name: 'Manual de Urología (manualurologia.cl)',
    url: 'https://manualurologia.cl/cancer-de-prostata/',
    accessed_at: '2026-11-10',
  });

  for (const relTargetId of entry.related_term_ids) {
    PROSTATE_CANCER_DICTIONARY_RELATIONS.push({
      id: `urel-${relCounter++}`,
      term_id: entry.id,
      related_term_id: relTargetId,
      relation_type: 'related',
      created_at: SEED_DATE,
    });
  }
}
