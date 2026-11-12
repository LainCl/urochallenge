import {
  UrologyTerm,
  UrologyTermAlias,
  UrologyTermTag,
  UrologyTermReference,
  UrologyTermRelation,
  TermAliasType,
} from '../types/domain';

const SEED_DATE = '2026-11-11T10:00:00.000Z';

interface RawRenalDictionaryEntry {
  id: string;
  term: string;
  slug: string;
  category_id: string;
  short_definition: string;
  full_definition: string;
  image_url: string | null;
  gallery_urls?: Array<{ url: string; caption: string }>;
  aliases: Array<{ alias: string; alias_type: TermAliasType }>;
  tags: string[];
  related_term_ids: string[];
}

const RAW_RENAL_DICTIONARY_ENTRIES: RawRenalDictionaryEntry[] = [
  {
    id: 'uterm-53',
    term: 'Carcinoma de células renales y epidemiología en Chile',
    slug: 'carcinoma-de-celulas-renales',
    category_id: 'ucat-06',
    short_definition:
      'Neoplasia maligna originada en el epitelio tubular renal (CIE-10 C64) que representa el 90% de todos los tumores malignos del riñón y el 2–3% de las neoplasias del adulto.',
    full_definition:
      'El cáncer renal parenquimatoso (codificado como C64 en la CIE-10, excluyendo la pelvis renal) presenta una relación hombre:mujer de 2:1 y una edad media de diagnóstico entre los 60 y 70 años. En Chile, según datos del DEIS (2021), la tasa cruda de incidencia general es de 4,9 por 100.000 habitantes, pero supera los 40 por 100.000 habitantes en varones mayores de 65 años. En proyecciones nacionales hacia 2035 (Inzunza et al.), es uno de los tumores urológicos con mayor incremento proyectado de Años de Vida Potencialmente Perdidos (AVPP: 34.570 en hombres y 17.720 en mujeres). Sus principales factores de riesgo modificables son el tabaquismo (presente en 20–30% de los casos; fumar >20 cigarrillos/día duplica el riesgo y el cese por >15 años lo reduce en 15–30%), la obesidad (~40%, mediada por resistencia a la insulina, IGF-I y adipocitoquinas) y la hipertensión arterial.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-1.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-1.png',
        caption: 'Clasificación CIE-10 C64: Tumor maligno del riñón, excepto de la pelvis renal.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-2.png',
        caption: 'Tabla 1: Tasa cruda de incidencia en mayores de 65 años en Chile (DEIS MINSAL).',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-3.jpeg',
        caption: 'Tabla 3: Tasas de defunciones por cáncer renal por 100.000 habitantes en Chile.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-4.jpeg',
        caption: 'Tabla 4: Evolución histórica de las tasas de mortalidad por cáncer renal (DEIS).',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-5.jpeg',
        caption: 'Tabla 5: Distribución por sexo y grupo etario de defunciones por tumor renal.',
      },
    ],
    aliases: [
      { alias: 'CCR', alias_type: 'abbreviation' },
      { alias: 'RCC', alias_type: 'abbreviation' },
      { alias: 'C64', alias_type: 'abbreviation' },
      { alias: 'Adenocarcinoma renal', alias_type: 'synonym' },
      { alias: 'Hipernefroma', alias_type: 'alternative_name' },
      { alias: 'Tumor de Grawitz', alias_type: 'alternative_name' },
    ],
    tags: ['oncología', 'riñón', 'epidemiología', 'CIE-10 C64', 'tabaquismo', 'obesidad'],
    related_term_ids: ['uterm-05', 'uterm-54', 'uterm-55', 'uterm-58', 'uterm-62', 'uterm-66'],
  },
  {
    id: 'uterm-54',
    term: 'Garantías Explícitas en Salud (GES N° 83) en cáncer renal',
    slug: 'ges-83-cancer-renal',
    category_id: 'ucat-06',
    short_definition:
      'Régimen legal chileno (incorporado por el Decreto N° 22 de 2019) que garantiza acceso, oportunidad y protección financiera para el diagnóstico, etapificación y tratamiento del cáncer renal en personas de 15 años o más.',
    full_definition:
      'El Problema de Salud GES N° 83 cubre a todo beneficiario de 15 años y más con sospecha o confirmación diagnóstica de cáncer renal (excluyendo pelvis renal). Sus garantías legales de oportunidad establecen: 1) Etapificación dentro de 45 días desde la confirmación diagnóstica o emisión del Informe de Proceso Diagnóstico (IPD) por especialista; 2) Tratamiento primario (cirugía radical o parcial, terapia sistémica o radioterapia) dentro de 30 días desde la indicación médica; 3) Tratamiento adyuvante dentro de 30 días desde la indicación; y 4) Primer control de seguimiento dentro de 60 días tras finalizar el tratamiento. La protección financiera establece copago 0% para Fonasa A y B, 10% para Fonasa C y 20% para Fonasa D e Isapres.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-6.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-6.png',
        caption: 'Figura 1: Flujo y entidades que realizan las atenciones asociadas a la Garantía GES N° 83.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-8.png',
        caption: 'Tabla 7: Casos ingresados al Problema de Salud GES N° 83 en Chile.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-9.png',
        caption: 'Tabla 8: Coberturas financieras y prestaciones garantizadas en GES N° 83.',
      },
    ],
    aliases: [
      { alias: 'GES 83', alias_type: 'abbreviation' },
      { alias: 'AUGE 83', alias_type: 'abbreviation' },
      { alias: 'IPD cáncer renal', alias_type: 'alternative_name' },
    ],
    tags: ['GES', 'salud pública', 'Chile', 'oportunidad', 'IPD', 'cáncer renal'],
    related_term_ids: ['uterm-53', 'uterm-66', 'uterm-68', 'uterm-75'],
  },
  {
    id: 'uterm-55',
    term: 'Clasificación histológica OMS 2022 de los tumores renales',
    slug: 'clasificacion-oms-2022-tumores-renales',
    category_id: 'ucat-06',
    short_definition:
      'Quinta edición de la clasificación de la Organización Mundial de la Salud (2022) que agrupa las neoplasias renales según su morfología, inmunohistoquímica y alteraciones moleculares definitorias.',
    full_definition:
      'La actualización OMS 2022 introdujo cambios estructurales clave en la patología renal: 1) Eliminó la subdivisión clásica del carcinoma renal papilar en Tipo 1 y Tipo 2, reconociendo un patrón clásico (antiguo tipo 1) y variantes morfológicas (bifásica alveoloescamosa, polaridad nuclear inversa y tipo Warthin), reclasificando muchos antiguos tipo 2 dentro de tumores definidos molecularmente; 2) Creó la categoría formal de "Tumores renales definidos molecularmente", incluyendo el CCR con deficiencia de fumarato hidratasa (FH), CCR con deficiencia de succinato deshidrogenasa (SDH), CCR con reordenamiento TFE3 o TFEB, CCR con mutación ELOC y carcinoma medular renal con deficiencia de SMARCB1 (INI1); y 3) Estableció que el diagnóstico definitivo de oncocitoma no debe realizarse únicamente con biopsia por aguja gruesa debido al solapamiento con tumores oncocíticos híbridos y CCR cromófobo eosinofílico.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-10.jpeg',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-10.jpeg',
        caption: 'Tabla 9a: Clasificación OMS 2022 — Tumores de células claras, papilares y oncocíticos/cromófobos.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-11.jpeg',
        caption: 'Tabla 9b: Clasificación OMS 2022 — Tumores de conductos colectores y definidos molecularmente.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-12.jpeg',
        caption: 'Tabla 9c: Características inmunohistoquímicas y moleculares de los subtipos de CCR.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-13.jpeg',
        caption: 'Tabla 9d: Tumores mesenquimáticos, metanéfricos y mixtos (Guía EAU 2025).',
      },
    ],
    aliases: [
      { alias: 'OMS 2022 renal', alias_type: 'abbreviation' },
      { alias: 'WHO 2022 renal tumors', alias_type: 'alternative_name' },
    ],
    tags: ['anatomía patológica', 'OMS 2022', 'inmunohistoquímica', 'patología molecular'],
    related_term_ids: ['uterm-53', 'uterm-56', 'uterm-57', 'uterm-58', 'uterm-59', 'uterm-60'],
  },
  {
    id: 'uterm-56',
    term: 'Oncocitoma renal',
    slug: 'oncocitoma-renal',
    category_id: 'ucat-06',
    short_definition:
      'Neoplasia epitelial renal benigna más frecuente (~5% de todos los tumores renales sólidos), originada en las células intercaladas del túbulo colector cortical.',
    full_definition:
      'Se presenta con una relación hombre:mujer de 2:1 y puede ser bilateral o multifocal en el 4–13% de los casos (especialmente en el síndrome de Birt-Hogg-Dubé o en la oncocitomatosis renal). Macroscópicamente es un tumor bien circunscrito de color café caoba con una cicatriz estrellada central fibrosa hasta en un tercio de los casos; en la angiografía clásica muestra un patrón en "radios de rueda" y anillo lúcido, aunque ni la cicatriz central ni la fase de lavado en TC permiten diferenciarlo con certeza de un CCR. Histológicamente se compone de nidos de células grandes intensamente eosinofílicas ricas en mitocondrias (oncocitos), siendo típicamente negativo o solo focalmente positivo para CK7. El SPECT/TC con 99mTc-Sestamibi ayuda a discriminarlo por su alta avidez mitocondrial. La OMS 2022 advierte que no se debe emitir un diagnóstico definitivo de oncocitoma solo con biopsia por aguja (concordancia quirúrgica de apenas 64,6%).',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-10.jpeg',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-10.jpeg',
        caption: 'Tabla 9: Tumores oncocíticos y cromófobos en la Clasificación OMS 2022.',
      },
    ],
    aliases: [
      { alias: 'Adenoma oncocítico renal', alias_type: 'synonym' },
      { alias: 'Neoplasia oncocítica renal', alias_type: 'alternative_name' },
    ],
    tags: ['tumor benigno', 'oncocitos', 'cicatriz estrellada', 'CK7', 'Sestamibi', 'Birt-Hogg-Dubé'],
    related_term_ids: ['uterm-55', 'uterm-59', 'uterm-61', 'uterm-65'],
  },
  {
    id: 'uterm-57',
    term: 'Angiomiolipoma renal y síndrome de Wünderlich',
    slug: 'angiomiolipoma-renal-sindrome-wunderlich',
    category_id: 'ucat-06',
    short_definition:
      'Neoplasia mesenquimática benigna clonal perteneciente a la familia de los PEComas, compuesta por tejido adiposo maduro, músculo liso fusiforme y vasos sanguíneos dismórficos de pared delgada.',
    full_definition:
      'El angiomiolipoma (AML) predomina en mujeres (relación M:H de 4:1) y cerca del 50% se asocia a esclerosis tuberosa (mutaciones en TSC1 o TSC2), casos en los que suele ser bilateral, múltiple y de aparición más temprana. En inmunohistoquímica expresa característicamente marcadores melanocíticos como HMB-45 (+) y Melan-A (+), siendo negativo para citoqueratinas (CK) y EMA. En la tomografía computarizada sin contraste, la presencia de atenuación grasa macroscópica menor a -20 UH es diagnóstica, aunque existe un subgrupo de AML "pobres en grasa" o epitelioides que simulan un CCR. Su complicación más temida es la rotura aneurismática con hemorragia retroperitoneal espontánea masiva no traumática (síndrome de Wünderlich), cuyo tratamiento de primera línea en urgencia es la angioembolización selectiva transarterial preservadora de nefronas.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-13.jpeg',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-13.jpeg',
        caption: 'Tabla 9d: Tumores mesenquimáticos renales (incluyendo angiomiolipoma y PEComas) en OMS 2022.',
      },
    ],
    aliases: [
      { alias: 'AML', alias_type: 'abbreviation' },
      { alias: 'PEComa renal', alias_type: 'synonym' },
      { alias: 'Síndrome de Wünderlich', alias_type: 'alternative_name' },
    ],
    tags: ['tumor benigno', 'HMB-45', 'esclerosis tuberosa', 'síndrome de Wünderlich', 'embolización'],
    related_term_ids: ['uterm-05', 'uterm-55', 'uterm-61'],
  },
  {
    id: 'uterm-58',
    term: 'Carcinoma renal de células claras',
    slug: 'carcinoma-renal-de-celulas-claras',
    category_id: 'ucat-06',
    short_definition:
      'Subtipo histológico más frecuente del carcinoma de células renales (~70% de los casos), originado en el epitelio del túbulo contorneado proximal y caracterizado por la inactivación bialélica del gen VHL en 3p25.',
    full_definition:
      'Macroscópicamente se presenta como una masa cortical bien delimitada de color amarillo brillante o anaranjado debido al alto contenido intracitoplasmático de lípidos y glucógeno, frecuentemente con focos hemorrágicos, quísticos o necróticos y una densa red capilar sinusoidal (tumor hipervascular). Genéticamente se define por la pérdida del brazo corto del cromosoma 3 (deleción 3p) y la inactivación del gen supresor Von Hippel-Lindau (VHL), lo que impide la degradación de los factores inducibles por hipoxia (HIF-1α y HIF-2α) y desencadena la sobreexpresión de VEGF y PDGF. En inmunohistoquímica es positivo para vimentina, PAX8, anhidrasa carbónica IX (CA-IX), CD10 y citoqueratinas de bajo peso molecular. Tiene peor pronóstico etapa por etapa que las variantes papilar y cromófoba (sobrevida global a 5 años del 81% en enfermedad no metastásica). Debe diferenciarse de la neoplasia renal quística multilocular de bajo potencial maligno (MCNLMP), variante puramente quística sin nódulos expansivos que tiene un curso 100% indolente.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-10.jpeg',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-10.jpeg',
        caption: 'Tabla 9a: Tumores renales de células claras (CCRcc y MCNLMP) según OMS 2022.',
      },
    ],
    aliases: [
      { alias: 'CCRcc', alias_type: 'abbreviation' },
      { alias: 'ccRCC', alias_type: 'abbreviation' },
      { alias: 'MCNLMP', alias_type: 'abbreviation' },
      { alias: 'Adenocarcinoma renal de células claras', alias_type: 'synonym' },
    ],
    tags: ['células claras', 'gen VHL', 'deleción 3p', 'HIF-2a', 'VEGF', 'túbulo proximal'],
    related_term_ids: ['uterm-53', 'uterm-55', 'uterm-59', 'uterm-60', 'uterm-61', 'uterm-74'],
  },
  {
    id: 'uterm-59',
    term: 'Carcinoma renal papilar y carcinoma renal cromófobo',
    slug: 'carcinoma-renal-papilar-y-cromofobo',
    category_id: 'ucat-06',
    short_definition:
      'Segundo (13–20%) y tercer (5%) subtipos más frecuentes de carcinoma de células renales, con perfiles citogenéticos, inmunohistoquímicos y pronósticos diferenciados respecto al carcinoma de células claras.',
    full_definition:
      '1) Carcinoma Renal Papilar (CCRp): derivado del túbulo contorneado proximal, se caracteriza por mayor frecuencia de multifocalidad y bilateralidad, comportamiento hipovascular en angiografía/TC, trisomías de los cromosomas 7 y 17, pérdida del cromosoma Y y mutaciones activadoras del protooncogén c-MET. En inmunohistoquímica expresa CK7 (+), racemasa AMACR/P504S (+), CD10 (+) y RCCm (+). La OMS 2022 eliminó la división en Tipo 1 y Tipo 2, describiendo el patrón clásico y variantes como la bifásica alveoloescamosa, la de polaridad nuclear inversa y la tipo Warthin. Su sobrevida global a 5 años en enfermedad localizada alcanza ~82%.\n2) Carcinoma Renal Cromófobo (CCRch): derivado de las células intercaladas del túbulo colector cortical (5% de los CCR), presenta células pálidas reticuladas con halo perinuclear característico y membrana celular prominente ("aspecto vegetal") o variante eosinofílica. Muestra pérdidas cromosómicas múltiples (1, 2, 6, 10, 13, 17, 21 e Y) y mutaciones en TP53 (27%). Es el subtipo con mayor proporción de pacientes nunca fumadores (62%), no debe graduarse con el sistema nuclear OMS/ISUP debido a su atipia nuclear innata, y posee el mejor pronóstico entre los CCR (sobrevida global a 5 años del 91% y libre de recurrencia del 94,3%).',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-12.jpeg',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-12.jpeg',
        caption: 'Tabla 9c: Características morfológicas, genéticas e inmunohistoquímicas de CCR papilar y cromófobo.',
      },
    ],
    aliases: [
      { alias: 'CCRp', alias_type: 'abbreviation' },
      { alias: 'CCRch', alias_type: 'abbreviation' },
      { alias: 'pRCC', alias_type: 'abbreviation' },
      { alias: 'chRCC', alias_type: 'abbreviation' },
    ],
    tags: ['papilar', 'cromófobo', 'trisomía 7 y 17', 'c-MET', 'halo perinuclear', 'CK7', 'racemasa'],
    related_term_ids: ['uterm-53', 'uterm-55', 'uterm-56', 'uterm-58', 'uterm-60', 'uterm-61'],
  },
  {
    id: 'uterm-60',
    term: 'Sistema de graduación nuclear OMS/ISUP y diferenciación sarcomatoide',
    slug: 'graduacion-nuclear-oms-isup-sarcomatoide',
    category_id: 'ucat-06',
    short_definition:
      'Escala histopatológica pronóstica de 4 grados (que reemplazó al clásico sistema de Fuhrman) basada en la prominencia nucleolar en los grados 1–3 y en el pleomorfismo extremo o diferenciación sarcomatoide/rabdoide en el grado 4.',
    full_definition:
      'El sistema de graduación nuclear de la OMS/ISUP está validado para el carcinoma renal de células claras y el carcinoma renal papilar (no debiendo aplicarse al carcinoma cromófobo): Grado 1 (nucléolos ausentes o inconspicuos y basófilos a 400x), Grado 2 (nucléolos conspicuos y eosinófilos a 400x, visibles pero no prominentes a 100x), Grado 3 (nucléolos conspicuos y eosinófilos claramente visibles a 100x) y Grado 4 (pleomorfismo nuclear extremo, células gigantes multinucleadas y/o presencia de diferenciación sarcomatoide o rabdoide). La diferenciación sarcomatoide no constituye un subtipo histológico independiente, sino una vía final común de desdiferenciación de alto grado que puede surgir en cualquier subtipo de CCR (presente hasta en el 58% de los tumores con trombo venoso cavo); confiere mal pronóstico frente a antiangiogénicos pero alta sensibilidad a la doble inmunoterapia con nivolumab + ipilimumab.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-14.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-14.png',
        caption: 'Tabla 10: Clasificación nuclear ISUP/WHO (Grados 1 a 4) para el carcinoma de células renales.',
      },
    ],
    aliases: [
      { alias: 'Grado OMS/ISUP', alias_type: 'abbreviation' },
      { alias: 'Grado de Fuhrman', alias_type: 'alternative_name' },
      { alias: 'CCR sarcomatoide', alias_type: 'alternative_name' },
      { alias: 'Diferenciación rabdoide', alias_type: 'alternative_name' },
    ],
    tags: ['graduación nuclear', 'ISUP', 'Fuhrman', 'sarcomatoide', 'rabdoide', 'pronóstico'],
    related_term_ids: ['uterm-55', 'uterm-58', 'uterm-59', 'uterm-75'],
  },
  {
    id: 'uterm-61',
    term: 'Síndromes hereditarios de cáncer renal (VHL, HLRCC, Birt-Hogg-Dubé y c-MET)',
    slug: 'sindromes-hereditarios-cancer-renal',
    category_id: 'ucat-06',
    short_definition:
      'Conjunto de síndromes genéticos autosómicos dominantes que representan el 4–8% de todos los cánceres renales (y hasta el 38% de variantes germinales en pacientes con enfermedad metastásica), caracterizados por aparición precoz, multifocalidad y bilateralidad.',
    full_definition:
      'Los principales síndromes hereditarios incluyen:\n1) Enfermedad de Von Hippel-Lindau (gen supresor VHL en 3p25-26): predispone a CCR de células claras multifocal/bilateral, hemangioblastomas del SNC, angiomas retinianos y feocromocitoma;\n2) CCR Papilar Hereditario (mutación activadora del protooncogén c-MET en 7q31): produce múltiples CCR papilares de patrón clásico;\n3) Leiomiomatosis Hereditaria y CCR (HLRCC, mutación del gen fumarato hidratasa FH en 1q42): asocia leiomiomas cutáneos y uterinos con un CCR papilar/tubulopapilar solitario altamente agresivo que requiere resección quirúrgica inmediata con margen amplio (sin vigilancia activa);\n4) Síndrome de Birt-Hogg-Dubé (gen FLCN/foliculina en 17p11.2): cursa con fibrofoliculomas cutáneos, quistes pulmonares con neumotórax espontáneo y tumores renales cromófobos, oncocitomas o tumores híbridos oncocíticos-cromófobos;\n5) Complejo Esclerosis Tuberosa (TSC1/TSC2): angiomiolipomas múltiples y CCR.\nLas guías EAU 2025 recomiendan estudio genético germinal en pacientes ≤ 46 años, tumores bilaterales/multifocales, historia familiar o histologías específicas.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-18.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-18.png',
        caption: 'Tabla 13: Recomendaciones para el estudio genético en sospecha de CCR hereditario (Guía EAU 2025).',
      },
    ],
    aliases: [
      { alias: 'VHL', alias_type: 'abbreviation' },
      { alias: 'HLRCC', alias_type: 'abbreviation' },
      { alias: 'BHD', alias_type: 'abbreviation' },
      { alias: 'Síndrome de Von Hippel-Lindau', alias_type: 'synonym' },
      { alias: 'Síndrome de Birt-Hogg-Dubé', alias_type: 'synonym' },
    ],
    tags: ['genética', 'VHL', 'fumarato hidratasa', 'Birt-Hogg-Dubé', 'FLCN', 'c-MET', 'belzutifan'],
    related_term_ids: ['uterm-53', 'uterm-55', 'uterm-56', 'uterm-57', 'uterm-58', 'uterm-74'],
  },
  {
    id: 'uterm-62',
    term: 'Tríada clásica de Guyon y síndromes paraneoplásicos del cáncer renal',
    slug: 'triada-de-guyon-y-sindromes-paraneoplasicos',
    category_id: 'ucat-03',
    short_definition:
      'Manifestaciones clínicas locales y sistémicas del carcinoma de células renales, históricamente apodado "el tumor del internista" por presentar síndromes paraneoplásicos en el 20% de los pacientes al diagnóstico y hasta en el 40% durante su evolución.',
    full_definition:
      'Actualmente más del 60% de los CCR se diagnostican de forma incidental asintomática (>80% mediante ecografía abdominal). La tríada clásica de Guyon (hematuria macroscópica, dolor en flanco y masa abdominal palpable) se presenta hoy en solo el 9% de los casos y se denomina la "tríada del demasiado tarde" por asociarse a enfermedad localmente avanzada o metastásica. Al examen físico destaca el varicocele de aparición súbita o que no colapsa en decúbito supino (hasta en 11%), especialmente izquierdo por drenaje de la vena gonadal en la vena renal izquierda obstruida por trombo. Entre los síndromes paraneoplásicos (Tabla 12 del Manual) destacan: elevación de VHS (55,6%), hipertensión arterial (37,5%, por secreción de renina, compresión parenquimatosa o fístula arteriovenosa), anemia normocítica-normocrómica (36,3%, mediada por lactoferrina, ferritina e IL-6), caquexia/baja de peso (34,5%), fiebre prolongada (17,2%, mediada por IL-6), síndrome de Stauffer (14,4%), hipercalcemia (4,9–20%, por péptido relacionado con PTH [PTH-rp] con PTH sérica suprimida, o por prostaglandinas osteolíticas) y policitemia/eritrocitosis (3,5%, por producción ectópica de eritropoyetina).',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-1.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-1.png',
        caption: 'Representación clínica del tumor maligno del parénquima renal (CIE-10 C64).',
      },
    ],
    aliases: [
      { alias: 'Tríada de Guyon', alias_type: 'synonym' },
      { alias: 'SPN en cáncer renal', alias_type: 'abbreviation' },
      { alias: 'Tumor del internista', alias_type: 'alternative_name' },
    ],
    tags: ['semiología', 'tríada de Guyon', 'paraneoplásico', 'IL-6', 'hipercalcemia', 'policitemia', 'varicocele'],
    related_term_ids: ['uterm-07', 'uterm-53', 'uterm-63', 'uterm-70'],
  },
  {
    id: 'uterm-63',
    term: 'Síndrome de Stauffer',
    slug: 'sindrome-de-stauffer',
    category_id: 'ucat-03',
    short_definition:
      'Síndrome paraneoplásico clásico del carcinoma de células renales (presente en el 3–20% de los casos) caracterizado por disfunción hepática colestásica reversible en ausencia de metástasis hepáticas.',
    full_definition:
      'Fisiopatológicamente se atribuye a la sobreproducción tumoral de citoquinas proinflamatorias, fundamentalmente interleucina-6 (IL-6), que induce una hepatitis reactiva inespecífica con infiltrado linfocitario sin obstrucción biliar ni implantes tumorales hepáticos. En el laboratorio se manifiesta por elevación de fosfatasas alcalinas, prolongación del tiempo de protrombina e hipoalbuminemia (presentes en el 67% de los casos), junto con hiperbilirrubinemia e incremento de transaminasas en el 20–30%. Suele asociarse a fiebre, baja de peso y peor pronóstico inicial. Tras la nefrectomía del tumor primario, las pruebas hepáticas se normalizan en el 60–70% de los pacientes (con sobrevida >88% al año en quienes remiten); por el contrario, la persistencia o reaparición de la disfunción hepática postoperatoria traduce enfermedad residual viable o recaída tumoral.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-18.png',
    aliases: [
      { alias: 'Hepatopatía paraneoplásica de Stauffer', alias_type: 'synonym' },
      { alias: 'Colestasis paraneoplásica anictérica', alias_type: 'alternative_name' },
    ],
    tags: ['síndrome de Stauffer', 'paraneoplásico', 'disfunción hepática', 'fosfatasa alcalina', 'IL-6'],
    related_term_ids: ['uterm-53', 'uterm-62', 'uterm-68'],
  },
  {
    id: 'uterm-64',
    term: 'Clasificación de Bosniak 2019 de masas renales quísticas',
    slug: 'clasificacion-de-bosniak-2019',
    category_id: 'ucat-11',
    short_definition:
      'Sistema radiológico estandarizado (actualizado en 2019 para TC y RM) que estratifica las masas renales quísticas en cinco categorías (I, II, IIF, III y IV) según su morfología parietal, septos y realce post-contraste para estimar el riesgo de malignidad.',
    full_definition:
      'En tomografía computarizada multifásica, un incremento de atenuación sólido > 15–20 UH tras contraste intravenoso define realce significativo. La actualización de Bosniak 2019 precisa:\n• Bosniak I: quiste simple benigno con pared lisa bien definida ≤ 2 mm, fluido homogéneo (-9 a 20 UH), sin septos ni calcificaciones (~0% malignidad; no requiere seguimiento).\n• Bosniak II: quiste mínimamente complejo benigno (6 subtipos en TC: 1–3 septos delgados ≤ 2 mm, calcificaciones, o quistes homogéneamente hiperatenuantes ≥ 70 UH en TC sin contraste; ~0% malignidad; no requiere seguimiento).\n• Bosniak IIF ("Follow-up"): quiste con engrosamiento liso mínimo (3 mm) de pared o septos con realce, o ≥ 4 septos delgados (≤ 2 mm) con realce (~10% malignos, mayoritariamente indolentes; requiere seguimiento por imágenes a los 6 y 12 meses y luego anual por 5 años).\n• Bosniak III: paredes o septos engrosados (≥ 4 mm) o irregulares (protrusiones convexas ≤ 3 mm con márgenes obtusos) con realce (~50% malignos; considerar nefrectomía parcial o vigilancia en casos seleccionados).\n• Bosniak IV: presencia de uno o más nódulos sólidos realzados (protrusión convexa ≥ 4 mm con márgenes obtusos, o de cualquier tamaño si presenta márgenes agudos con la pared/septo) (~90% malignos; indicación de tratamiento quirúrgico activo).',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-15.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-15.png',
        caption: 'Figura 2: Clasificación de Bosniak 2019 — Visión general de las categorías I a IV.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-16.png',
        caption: 'Figura 3: Clasificación de Bosniak 2019 — Medición milimétrica de paredes y tabiques.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-17.png',
        caption: 'Figura 4: Clasificación de Bosniak 2019 — Diferenciación entre protrusiones irregulares (márgenes obtusos ≤3 mm) y nódulos (≥4 mm o márgenes agudos).',
      },
    ],
    aliases: [
      { alias: 'Bosniak', alias_type: 'abbreviation' },
      { alias: 'Bosniak 2019', alias_type: 'abbreviation' },
      { alias: 'Bosniak IIF', alias_type: 'alternative_name' },
    ],
    tags: ['imagenología', 'quiste renal', 'Bosniak', 'tomografía', 'resonancia magnética'],
    related_term_ids: ['uterm-05', 'uterm-53', 'uterm-58', 'uterm-65', 'uterm-68'],
  },
  {
    id: 'uterm-65',
    term: 'Biopsia de masa renal y puntaje de probabilidad de células claras (ccLS)',
    slug: 'biopsia-de-masa-renal-y-ccls',
    category_id: 'ucat-11',
    short_definition:
      'Herramientas diagnósticas preterapéuticas (histológica percutánea e imagenológica por RM multiparamétrica) destinadas a caracterizar masas renales pequeñas o indeterminadas y evitar sobretratamiento quirúrgico de lesiones benignas.',
    full_definition:
      'Dado que aproximadamente el 20% de las masas renales sólidas pequeñas (< 4 cm) resecadas quirúrgicamente resultan ser benignas (oncocitoma o angiomiolipoma pobre en grasa), existen dos estrategias complementarias:\n1) Puntaje ccLS (clear cell Likelihood Score) en RM multiparamétrica: escala estandarizada de 1 a 5 puntos que evalúa la probabilidad de que una masa renal pequeña corresponda a un CCR de células claras. La RM supera además a la TC en la caracterización de quistes complejos Bosniak IIF–III (sensibilidad 71% vs 36%) y en la delimitación del trombo en VCI.\n2) Biopsia de Masa Renal (BMR) percutánea con aguja gruesa (core biopsy): posee una sensibilidad del 92%, especificidad del 90% y valor predictivo positivo del 99,8%, aunque presenta un 10–20% de muestras no diagnósticas y tiende a subestimar el grado nuclear OMS/ISUP por heterogeneidad tumoral. Está formalmente indicada antes de terapias ablativas térmicas, previo a iniciar vigilancia activa en masas pequeñas, ante sospecha de linfoma, absceso o metástasis renal secundaria (7–13% de pacientes con otro primario oncológico) y antes de iniciar terapia sistémica en enfermedad irresecable o metastásica.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-24.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-24.png',
        caption: 'Figura 5: Evaluación inicial y rol de la biopsia renal en el algoritmo NCCN de masas renales.',
      },
    ],
    aliases: [
      { alias: 'BMR', alias_type: 'abbreviation' },
      { alias: 'ccLS', alias_type: 'abbreviation' },
      { alias: 'Clear cell Likelihood Score', alias_type: 'synonym' },
      { alias: 'CEUS renal', alias_type: 'alternative_name' },
    ],
    tags: ['biopsia renal', 'ccLS', 'resonancia magnética', 'masas renales pequeñas', 'CEUS'],
    related_term_ids: ['uterm-56', 'uterm-58', 'uterm-64', 'uterm-69'],
  },
  {
    id: 'uterm-66',
    term: 'Clasificación TNM y estadificación del cáncer renal',
    slug: 'clasificacion-tnm-cancer-renal',
    category_id: 'ucat-06',
    short_definition:
      'Sistema anatómico internacional de estadificación del carcinoma de células renales basado en el tamaño y extensión local/venosa del tumor primario (T), el compromiso ganglionar regional (N) y las metástasis a distancia (M).',
    full_definition:
      'En la clasificación TNM vigente (Guía EAU 2025):\n• T1: tumor limitado al riñón ≤ 7 cm (T1a ≤ 4 cm; T1b > 4 cm y ≤ 7 cm).\n• T2: tumor limitado al riñón > 7 cm (T2a > 7 cm y ≤ 10 cm; T2b > 10 cm).\n• T3: extensión a venas mayores o tejidos perirrenales sin sobrepasar la fascia de Gerota ni invadir la glándula suprarrenal ipsilateral: T3a (invade vena renal principal o sus ramas segmentarias, grasa perirrenal o grasa del seno renal/sistema pielocalicial), T3b (trombo tumoral en vena cava inferior infradiafragmática) y T3c (trombo en vena cava inferior supradiafragmática o invasión directa de la pared de la vena cava independientemente de la altura del trombo).\n• T4: invasión más allá de la fascia de Gerota o invasión por contigüidad directa de la glándula suprarrenal ipsilateral (la metástasis suprarrenal no contigua o contralateral se clasifica como M1).\nEn la etapificación a distancia, la TC de tórax es el estándar, pero puede omitirse de forma segura en tumores incidentales cT1a cN0 sin síntomas sistémicos, anemia ni trombocitosis (<1% de riesgo de metástasis pulmonar).',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-19.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-19.png',
        caption: 'Tabla 14a: Clasificación TNM del cáncer renal — Categorías T1 y T2 (Guía EAU 2025).',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-20.png',
        caption: 'Tabla 14b: Clasificación TNM — Categorías localmente avanzadas T3a, T3b, T3c y T4.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-21.png',
        caption: 'Tabla 14c: Clasificación TNM — Ganglios linfáticos regionales (N) y metástasis (M).',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-22.png',
        caption: 'Tabla 14d: Agrupación pronóstica por estadios TNM (Estadios I a IV, Guía EAU 2025).',
      },
    ],
    aliases: [
      { alias: 'TNM renal', alias_type: 'abbreviation' },
      { alias: 'Fascia de Gerota', alias_type: 'alternative_name' },
    ],
    tags: ['TNM', 'estadificación', 'fascia de Gerota', 'seno renal', 'vena cava', 'EAU 2025'],
    related_term_ids: ['uterm-53', 'uterm-67', 'uterm-68', 'uterm-70'],
  },
  {
    id: 'uterm-67',
    term: 'Índices nefrométricos R.E.N.A.L. y P.A.D.U.A.',
    slug: 'indices-nefrometricos-renal-y-padua',
    category_id: 'ucat-11',
    short_definition:
      'Sistemas cuantitativos preoperatorios basados en imágenes transversales (TC o RM) que estandarizan la complejidad anatómica de un tumor renal candidato a nefrectomía parcial y predicen el tiempo de isquemia y el riesgo de complicaciones quirúrgicas.',
    full_definition:
      'Ambos índices evalúan de forma objetiva la geometría tumoral:\n1) R.E.N.A.L. Nephrometry Score: acrónimo de Radius (diámetro máximo: ≤4 cm [1 pt], >4 a <7 cm [2 pts], ≥7 cm [3 pts]), Exophytic/endophytic (≥50% exofítico [1 pt], <50% exofítico [2 pts], 100% endofítico [3 pts]), Nearness to collecting system/sinus (≥7 mm [1 pt], >4 a <7 mm [2 pts], ≤4 mm [3 pts]), Anterior/Posterior (sufijo a, p o x) y Location relative to polar lines (1 a 3 pts, más sufijo "h" si contacta vasos hiliares principales). Clasifica la complejidad en baja (4–6 puntos), moderada (7–9 puntos) y alta (10–12 puntos).\n2) Clasificación P.A.D.U.A. (Preoperative Aspects and Dimensions Used for an Anatomical classification): integra ubicación polar, localización respecto al borde lateral/medial, relación con el seno renal, relación con el sistema colector, porcentaje exofítico y diámetro tumoral. Estratifica la complejidad en baja (6–7 puntos), intermedia (8–9 puntos) y alta (≥ 10 puntos). Un puntaje alto en cualquiera de las dos escalas se correlaciona significativamente con mayor tiempo de isquemia caliente y mayor tasa de complicaciones Clavien-Dindo.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-27.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-27.png',
        caption: 'Tabla 16: Evaluación preoperatoria e índices nefrométricos R.E.N.A.L. y P.A.D.U.A.',
      },
    ],
    aliases: [
      { alias: 'R.E.N.A.L. score', alias_type: 'abbreviation' },
      { alias: 'P.A.D.U.A. score', alias_type: 'abbreviation' },
      { alias: 'Nefrometría renal', alias_type: 'synonym' },
    ],
    tags: ['nefrometría', 'R.E.N.A.L.', 'P.A.D.U.A.', 'nefrectomía parcial', 'planificación quirúrgica'],
    related_term_ids: ['uterm-66', 'uterm-68', 'uterm-69'],
  },
  {
    id: 'uterm-68',
    term: 'Nefrectomía parcial, tiempo de isquemia y nefrectomía radical',
    slug: 'nefrectomia-parcial-y-radical-cancer-renal',
    category_id: 'ucat-12',
    short_definition:
      'Pilares del tratamiento quirúrgico con intención curativa del carcinoma de células renales localizado y localmente avanzado.',
    full_definition:
      '• Nefrectomía Parcial (NP / cirugía conservadora de nefronas): es el tratamiento estándar de elección para todos los tumores cT1a (≤ 4 cm) y cT1b (> 4 a ≤ 7 cm) técnicamente factibles, así como en indicaciones imperativas (riñón único anatómico o funcional, tumores bilaterales, síndrome hereditario o enfermedad renal crónica preexistente), logrando igual control oncológico que la nefrectomía radical con menor deterioro de la tasa de filtración glomerular y menor mortalidad cardiovascular. Clásicamente se recomienda mantener el tiempo de isquemia caliente bajo 25–30 minutos, aunque estudios prospectivos con biopsias renales intraoperatorias (Parekh et al.) demostraron que el parénquima renal humano tolera períodos de clampeo de 30–60 minutos con cambios estructurales mínimos y que el volumen de parénquima sano preservado es el determinante principal de la función renal final. La presencia de un margen quirúrgico positivo tras NP conlleva un 16% de recurrencia local (vs. 3% con margen negativo) y se maneja primariamente con vigilancia estrecha, no con nefrectomía inmediata de rutina.\n• Nefrectomía Radical (NR): indicada en tumores cT2 (> 7 cm) o masas centrales complejas no susceptibles de NP. La adrenalectomía ipsilateral y la linfadenectomía retroperitoneal ampliada (ensayo EORTC 30881) NO deben realizarse de rutina si las imágenes preoperatorias y la exploración intraoperatoria son negativas (la invasión suprarrenal ocurre en solo ~2% y la ubicación en polo superior por sí sola no la predice).',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-29.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-29.png',
        caption: 'Tabla 18: Recomendaciones sobre el tratamiento quirúrgico del CCR localizado (Guía EAU 2025).',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-24.png',
        caption: 'Figura 5a: Algoritmo terapéutico NCCN para cáncer renal localizado (Estadios I–III).',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-25.png',
        caption: 'Figura 5b: Principios de tratamiento primario y seguimiento en estadios I–III (NCCN).',
      },
    ],
    aliases: [
      { alias: 'NP', alias_type: 'abbreviation' },
      { alias: 'NR', alias_type: 'abbreviation' },
      { alias: 'NSS', alias_type: 'abbreviation' },
      { alias: 'Cirugía conservadora de nefronas', alias_type: 'synonym' },
    ],
    tags: ['nefrectomía parcial', 'nefrectomía radical', 'isquemia caliente', 'EORTC 30881', 'margen quirúrgico'],
    related_term_ids: ['uterm-53', 'uterm-66', 'uterm-67', 'uterm-69', 'uterm-76'],
  },
  {
    id: 'uterm-69',
    term: 'Terapias ablativas térmicas renales (crioablación y radiofrecuencia)',
    slug: 'terapias-ablativas-termicas-crioablacion-radiofrecuencia',
    category_id: 'ucat-12',
    short_definition:
      'Técnicas mínimamente invasivas destructoras de tejido in situ (percutáneas o laparoscópicas) indicadas como alternativa a la cirugía o junto a vigilancia activa en masas renales corticales pequeñas (≤ 3 cm, cT1a) en pacientes añosos, frágiles o con síndromes hereditarios.',
    full_definition:
      'Exigen la realización obligatoria de una biopsia de masa renal previa al procedimiento para confirmar histología. Se distinguen dos tecnologías principales:\n1) Crioablación renal: utiliza el efecto físico de Joule-Thomson (expansión rápida de gas argón o nitrógeno líquido en criosondas ultrafinas) para enfriar el tejido hasta -185,7 °C. Para lograr necrosis coagulativa completa y ruptura de membranas por cristales de hielo se requiere alcanzar temperaturas tisulares ≤ -40 °C durante al menos dos ciclos de congelación-descongelación, extendiendo visualmente la "bola de hielo" (iceball) 10 mm más allá del margen tumoral bajo monitoreo ecográfico o tomográfico en tiempo real.\n2) Ablación por Radiofrecuencia (ARF): aplica corriente eléctrica alterna de alta frecuencia que genera calor por fricción iónica (> 60 °C e idealmente > 105 °C), produciendo desnaturalización proteica y necrosis coagulativa. A diferencia de la crioablación, la aparición de burbujas de vapor impide visualizar el margen de ablación en tiempo real en ecografía, por lo que el control del procedimiento se basa en sensores de impedancia eléctrica o temperatura. Ambas técnicas muestran menor eficacia en tumores > 3–4 cm (cT1b) o de localización hiliar central por el efecto de disipación térmica vascular ("heat/cold sink effect").',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-28.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-28.png',
        caption: 'Tabla 17: Recomendaciones sobre vigilancia activa y terapias ablativas térmicas (Guía EAU 2025).',
      },
    ],
    aliases: [
      { alias: 'ARF renal', alias_type: 'abbreviation' },
      { alias: 'RFA renal', alias_type: 'abbreviation' },
      { alias: 'Crioablación renal', alias_type: 'synonym' },
      { alias: 'Efecto Joule-Thomson', alias_type: 'alternative_name' },
    ],
    tags: ['crioablación', 'radiofrecuencia', 'efecto Joule-Thomson', 'masas renales pequeñas', 'vigilancia activa'],
    related_term_ids: ['uterm-65', 'uterm-67', 'uterm-68', 'uterm-71'],
  },
  {
    id: 'uterm-70',
    term: 'Trombo tumoral en vena cava inferior y clasificación de Neves-Zincke',
    slug: 'trombo-tumoral-vci-clasificacion-neves-zincke',
    category_id: 'ucat-12',
    short_definition:
      'Extensión intravascular del carcinoma de células renales hacia la vena renal y la vena cava inferior (presente en el 4–10% de los casos y hasta en aurícula derecha en el 1%), estratificada quirúrgicamente en cinco niveles (0 a IV) por la clasificación de la Clínica Mayo (Neves y Zincke).',
    full_definition:
      'Sin tratamiento quirúrgico, el CCR con trombo venoso tiene una mediana de sobrevida de apenas ~8 meses, mientras que la nefrectomía radical con trombectomía en ausencia de metástasis logra sobrevidas a 5 años del 40–65%. La resonancia magnética (secuencias T2) es la modalidad de elección para definir el límite cefálico del trombo y la invasión de la pared caval. La clasificación de Neves y Zincke determina la estrategia de control vascular:\n• Nivel 0: trombo limitado a la vena renal -> ligadura directa de la vena renal.\n• Nivel I: trombo que ingresa a la VCI pero se extiende < 2 cm por sobre el ostium de la vena renal -> ordeñamiento caudal del trombo hacia la vena renal o pinzamiento lateral parcial (Satinsky) con cavotomía simple.\n• Nivel II: trombo en VCI > 2 cm sobre el ostium renal, pero por debajo de las venas hepáticas mayores -> control y clampeo de VCI infrarrenal, vena renal contralateral, venas lumbares y VCI subhepática.\n• Nivel III: trombo en VCI infradiafragmática que alcanza o supera el nivel de las venas hepáticas mayores -> requiere movilización hepática completa ("piggyback"), maniobra de Pringle (clampeo del pedículo hepático) y control de VCI suprahepática/diafragmática.\n• Nivel IV: trombo que sobrepasa el diafragma (VCI supradiafragmática o aurícula derecha) -> abordaje toracoabdominal/esternotomía con ecocardiografía transesofágica (ETE) y circulación extracorpórea (CEC) cardiopulmonar.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-30.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-30.png',
        caption: 'Figura 7: Clasificación de Neves y Zincke (Niveles 0 a IV) para la extensión del trombo tumoral en VCI.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/C23_Fig-8-800x476.png',
        caption: 'Figura 8: Algoritmo de manejo quirúrgico del CCR localmente avanzado con trombo venoso (Guía EAU 2025).',
      },
    ],
    aliases: [
      { alias: 'Neves-Zincke', alias_type: 'abbreviation' },
      { alias: 'Clasificación de la Clínica Mayo', alias_type: 'synonym' },
      { alias: 'Trombectomía de vena cava inferior', alias_type: 'alternative_name' },
    ],
    tags: ['trombo tumoral', 'vena cava inferior', 'Neves-Zincke', 'maniobra de Pringle', 'pT3b', 'pT3c'],
    related_term_ids: ['uterm-60', 'uterm-62', 'uterm-66', 'uterm-68'],
  },
  {
    id: 'uterm-71',
    term: 'Radioterapia ablativa estereotáctica (SBRT) en cáncer renal primario y oligometastásico',
    slug: 'radioterapia-ablativa-estereotactica-sbrt-renal',
    category_id: 'ucat-06',
    short_definition:
      'Modalidad de radioterapia externa de alta precisión hipofraccionada (dosis > 5 Gy por fracción en 1 a 5 sesiones) que supera la histórica radiorresistencia del carcinoma renal al inducir daño endotelial microvascular y muerte celular inmunogénica.',
    full_definition:
      'Aunque el CCR es resistente a la radioterapia convencional fraccionada (1,8–2 Gy), las dosis ablativas de la SBRT (SABR) logran tasas de control local cercanas al 97–100%. Sus tres escenarios clínicos validados son:\n1) Tumor renal primario en pacientes médicamente inoperables: respaldado por el consorcio internacional IROCK y el ensayo prospectivo fase II TROG 15.03 FASTRACK II (26 Gy en 1 fracción para tumores ≤ 4 cm o 42 Gy en 3 fracciones para tumores > 4 a 10 cm), que demostró 100% de control local, 100% de sobrevida cáncer-específica y una caída media de TFGe de solo -14,6 mL/min a los 2 años. En el seguimiento radiológico debe reconocerse la "pseudoprogresión" (aumento transitorio del tamaño tumoral o persistencia del realce por inflamación los primeros meses).\n2) Enfermedad oligoprogresiva o metástasis de bajo volumen (oligometástasis): permite erradicar clones resistentes y postergar el inicio o el cambio de línea de terapia sistémica en ~11 a 12,6 meses (estudios de Cheung, Hannan y Tang; ensayo fase III EA8211 SOAR en curso).\n3) Combinación con inmunoterapia: evaluada en los estudios fase II NIVES, RADVAX-RCC y especialmente RAPPORT (SBRT 20 Gy x 1 a todas las lesiones oligometastásicas seguida de 8 ciclos de pembrolizumab, logrando control local a 2 años del 92% y SLP a 2 años del 45%).',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-32.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-32.png',
        caption: 'Figura 9: Rol de la radioterapia ablativa estereotáctica (SBRT) en las guías NCCN 2024.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-33.png',
        caption: 'Figura 10: Metaanálisis de Da Silva sobre eficacia y seguridad de SBRT en CCR.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-34.png',
        caption: 'Figura 11: SBRT secuencial en CCR oligometastásico libre de terapia sistémica (Tang et al.).',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-35.png',
        caption: 'Figura 12: Estudio RAPPORT — Duración de respuesta tras SBRT + pembrolizumab en CCR oligometastásico.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-36.png',
        caption: 'Figura 13: Estudio RAPPORT — Supervivencia libre de progresión a 1 y 2 años (60% y 45%).',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-37.png',
        caption: 'Figura 14: Esquema del ensayo fase III EA8211 SOAR de SBRT secuencial vs. terapia sistémica.',
      },
    ],
    aliases: [
      { alias: 'SBRT', alias_type: 'abbreviation' },
      { alias: 'SABR', alias_type: 'abbreviation' },
      { alias: 'FASTRACK II', alias_type: 'alternative_name' },
      { alias: 'Estudio RAPPORT', alias_type: 'alternative_name' },
    ],
    tags: ['SBRT', 'radioterapia', 'FASTRACK II', 'RAPPORT', 'oligometástasis', 'pseudoprogresión'],
    related_term_ids: ['uterm-53', 'uterm-69', 'uterm-72', 'uterm-75'],
  },
  {
    id: 'uterm-72',
    term: 'Nefrectomía citorreductora (estudios CARMENA y SURTIME)',
    slug: 'nefrectomia-citorreductora-carmena-surtime',
    category_id: 'ucat-12',
    short_definition:
      'Resección quirúrgica del tumor renal primario en presencia de enfermedad metastásica sincrónica, cuyo paradigma cambió tras los ensayos fase III CARMENA y SURTIME hacia una selección individualizada según riesgo IMDC y respuesta a terapia sistémica.',
    full_definition:
      'Históricamente respaldada en la era de las citoquinas (interferón-alfa; estudios de Flanigan y Mickisch) bajo la hipótesis de eliminar el "sumidero inmunológico" o "nave nodriza" productora de factores de crecimiento, la nefrectomía citorreductora (NC) de entrada dejó de ser estándar universal tras dos ensayos clave:\n1) Estudio CARMENA (fase III de no inferioridad): comparó sunitinib en monoterapia frente a NC inmediata seguida de sunitinib en pacientes con CCRm de riesgo MSKCC intermedio o alto (pobre). Demostró que sunitinib solo no fue inferior en sobrevida global (e incluso superior en el subgrupo con 2 factores de riesgo, HR 0,63), estableciendo que los pacientes de riesgo alto o con gran volumen metastásico extra-renal deben iniciar terapia sistémica inmediata sin NC de entrada.\n2) Estudio SURTIME (fase III): comparó NC inmediata seguida de sunitinib frente a NC diferida tras 3 ciclos iniciales de sunitinib. Aunque la SLP a 28 semanas fue similar, la NC diferida mostró una mejor sobrevida global (HR 0,57) al permitir identificar y excluir de la cirugía a los pacientes con progresión sistémica rápida refractaria.\nActualmente, la NC inmediata se reserva para pacientes con buen estado funcional (ECOG/KPS), riesgo IMDC favorable o intermedio (1 punto) con baja carga metastásica o requerimiento paliativo local (hematuria incoercible, dolor), mientras que la NC diferida se ofrece a pacientes de riesgo intermedio con excelente respuesta en los sitios metastásicos tras inmunoterapia combinada.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-26.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-26.png',
        caption: 'Figura 6: Algoritmo terapéutico NCCN para cáncer renal en estadio IV y selección para nefrectomía citorreductora.',
      },
    ],
    aliases: [
      { alias: 'NC', alias_type: 'abbreviation' },
      { alias: 'CARMENA', alias_type: 'abbreviation' },
      { alias: 'SURTIME', alias_type: 'abbreviation' },
      { alias: 'Nefrectomía citoreductiva', alias_type: 'synonym' },
    ],
    tags: ['nefrectomía citorreductora', 'CARMENA', 'SURTIME', 'metastasectomía', 'estadio IV'],
    related_term_ids: ['uterm-68', 'uterm-71', 'uterm-73', 'uterm-74', 'uterm-75'],
  },
  {
    id: 'uterm-73',
    term: 'Modelos pronósticos IMDC (Heng) y MSKCC (Motzer) en cáncer renal metastásico',
    slug: 'modelos-pronosticos-imdc-heng-y-mskcc-motzer',
    category_id: 'ucat-06',
    short_definition:
      'Escalas clínicas y de laboratorio validadas para estratificar a los pacientes con carcinoma renal metastásico en grupos de riesgo favorable (0 puntos), intermedio (1–2 puntos) y alto/desfavorable (≥ 3 puntos), guiando la elección de la terapia sistémica de primera línea.',
    full_definition:
      'El modelo original del Memorial Sloan Kettering Cancer Center (MSKCC o criterios de Motzer, desarrollado en la era de las citoquinas) utilizaba 5 factores (KPS < 80%, tiempo del diagnóstico al tratamiento < 1 año, hemoglobina < límite inferior normal, calcio corregido > límite superior normal y LDH > 1,5 veces el límite normal). En la era de las terapias dirigidas y la inmunoterapia fue perfeccionado por el modelo del International Metastatic RCC Database Consortium (IMDC o criterios de Heng), que eliminó la LDH y añadió dos marcadores inflamatorios hematológicos, totalizando 6 factores adversos (1 punto cada uno):\n1) Índice de Karnofsky (KPS) < 80%;\n2) Tiempo desde el diagnóstico hasta el inicio de la terapia sistémica < 1 año;\n3) Hemoglobina < límite inferior normal (< 12 g/dL);\n4) Calcemia corregida > límite superior normal (> 10,2 mg/dL);\n5) Recuento de neutrófilos > límite superior normal (neutrofilia);\n6) Recuento de plaquetas > límite superior normal (trombocitosis).\nSegún el puntaje total se clasifica en: Riesgo Favorable/Bajo (0 factores; mediana de SG clásica 43,2 meses), Riesgo Intermedio (1–2 factores; SG 22,5 meses) y Riesgo Alto/Pobre (3–6 factores; SG 7,8 meses). La quimioterapia citotóxica convencional es ineficaz en el CCR de células claras y solo se considera en carcinoma de conductos colectores o medular.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-38.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-38.png',
        caption: 'Tabla 20: Modelos pronósticos IMDC y MSKCC en cáncer renal metastásico (Guía EAU 2025).',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-39.png',
        caption: 'Tabla 21: Recomendación sobre la no utilización de quimioterapia convencional en CCR (Guía EAU 2025).',
      },
    ],
    aliases: [
      { alias: 'IMDC', alias_type: 'abbreviation' },
      { alias: 'MSKCC', alias_type: 'abbreviation' },
      { alias: 'Criterios de Heng', alias_type: 'synonym' },
      { alias: 'Criterios de Motzer', alias_type: 'synonym' },
    ],
    tags: ['IMDC', 'MSKCC', 'Heng', 'Motzer', 'pronóstico', 'Karnofsky', 'trombocitosis', 'neutrofilia'],
    related_term_ids: ['uterm-53', 'uterm-72', 'uterm-74', 'uterm-75'],
  },
  {
    id: 'uterm-74',
    term: 'Terapias dirigidas antiangiogénicas (TKI, inhibidores mTOR y Belzutifan)',
    slug: 'terapias-dirigidas-tki-mtor-belzutifan',
    category_id: 'ucat-06',
    short_definition:
      'Fármacos dirigidos contra las vías moleculares activadas por la pérdida de VHL en el carcinoma renal (inhibidores de tirosina quinasa del receptor de VEGF/MET/AXL, inhibidores de mTOR e inhibidores directos del factor de transcripción HIF-2α).',
    full_definition:
      'Se agrupan en tres familias farmacológicas:\n1) Inhibidores de Tirosina Quinasa (TKI): bloquean la señalización intracelular de VEGFR y otros receptores angiogénicos. Incluyen TKI de primera generación como Sunitinib y Pazopanib (no inferiores entre sí en sobrevida en el estudio fase III COMPARZ, pero con menor toxicidad y mayor preferencia de los pacientes por pazopanib en el estudio PISCES), Axitinib (inhibidor selectivo de VEGFR 1–3 evaluado en segunda línea en el estudio AXIS), Cabozantinib (inhibidor multidiana de VEGFR, MET y AXL que demostró superioridad en sobrevida global sobre everolimus en segunda línea en el estudio METEOR, superioridad en SLP sobre sunitinib en riesgo intermedio/alto en CABOSUN, y es el estándar preferido en CCR papilar según el estudio SWOG 1500 PAPMET) y Lenvatinib (inhibidor de VEGFR 1–3, FGFR 1–4, PDGFRα, RET y KIT).\n2) Inhibidores de mTOR (Temsirolimus y Everolimus): bloquean el complejo mTOR intracelular; actualmente relegados a líneas posteriores o en combinación con lenvatinib.\n3) Inhibidores de moléculas pequeñas de HIF-2α (Belzutifan): bloquea directamente el factor de transcripción HIF-2α acumulado por inactivación de VHL. En el ensayo fase III LITESPARK-005 demostró superioridad en SLP frente a everolimus en pacientes con CCRcc politratados; sus efectos adversos grado ≥ 3 característicos son la anemia (27%, por inhibición de EPO) y la hipoxia (16%).',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-40.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-40.png',
        caption: 'Figura 15: Estudio fase III COMPARZ — Supervivencia libre de progresión de pazopanib frente a sunitinib.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-41.png',
        caption: 'Figura 16: Supervivencia libre de progresión de lenvatinib + everolimus frente a lenvatinib o everolimus en monoterapia.',
      },
    ],
    aliases: [
      { alias: 'TKI', alias_type: 'abbreviation' },
      { alias: 'Belzutifan', alias_type: 'alternative_name' },
      { alias: 'Cabozantinib', alias_type: 'alternative_name' },
      { alias: 'Sunitinib y Pazopanib', alias_type: 'alternative_name' },
    ],
    tags: ['TKI', 'antiangiogénicos', 'cabozantinib', 'belzutifan', 'LITESPARK-005', 'METEOR', 'COMPARZ', 'mTOR'],
    related_term_ids: ['uterm-58', 'uterm-61', 'uterm-72', 'uterm-73', 'uterm-75'],
  },
  {
    id: 'uterm-75',
    term: 'Inmunoterapia de puntos de control (anti-PD-1/PD-L1 y anti-CTLA-4) en cáncer renal metastásico',
    slug: 'inmunoterapia-checkpoints-cancer-renal-metastasico',
    category_id: 'ucat-06',
    short_definition:
      'Estándar terapéutico contemporáneo de primera línea para el carcinoma renal metastásico basado en anticuerpos monoclonales que bloquean los receptores coinhibidores de los linfocitos T (PD-1, PD-L1 y CTLA-4), administrados como doble inmunoterapia (IO/IO) o en combinación con un TKI antiangiogénico (IO/TKI).',
    full_definition:
      'Los inhibidores de puntos de control inmunitario (checkpoints) restauran la actividad citotóxica antitumoral de los linfocitos T (descubrimiento premiado con el Nobel 2018 a James Allison por CTLA-4 y Tasuku Honjo por PD-1). La elección de primera línea en CCR de células claras metastásico se guía por la estratificación IMDC (Guía EAU 2025):\n• En Riesgo Favorable (0 factores): se prefieren las combinaciones IO/TKI que demostraron beneficio en sobrevida global frente a sunitinib en toda la población: Pembrolizumab + Axitinib (estudio KEYNOTE-426), Pembrolizumab + Lenvatinib (estudio CLEAR) o Nivolumab + Cabozantinib (estudio CheckMate-9ER). (La combinación Avelumab + Axitinib mejoró SLP pero no demostró beneficio significativo en SG).\n• En Riesgo Intermedio o Alto (≥ 1 factor): son estándares de primera línea tanto la doble inmunoterapia IO/IO con Nivolumab (anti-PD-1) + Ipilimumab (anti-CTLA-4) (estudio CheckMate-214, que redujo la mortalidad en 37% [HR 0,63] en riesgo intermedio/alto y es especialmente eficaz en tumores con diferenciación sarcomatoide) como las tres combinaciones IO/TKI (CLEAR, CheckMate-9ER y KEYNOTE-426).\n• En segunda línea tras progresión a inmunoterapia se indica un TKI antiangiogénico (preferentemente cabozantinib), mientras que en pacientes tratados inicialmente solo con TKI el estudio CheckMate-025 validó nivolumab en monoterapia frente a everolimus. En histología papilar con mutación MET destacan cabozantinib (SWOG 1500) y combinaciones con savolitinib + durvalumab (estudios CALYPSO y SAMETA).',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-45.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-45.png',
        caption: 'Tabla 22: Algoritmo de primera y segunda línea en CCR metastásico según riesgo IMDC (Guía EAU 2025).',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-42.png',
        caption: 'Figura 17: Mecanismo de acción del bloqueo de CTLA-4 (ipilimumab) que promueve la activación linfocitaria T.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-43.png',
        caption: 'Figura 18: Mecanismo de acción del bloqueo de PD-1/PD-L1 (nivolumab/pembrolizumab) en la sinapsis tumoral.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/imagen-que-contiene-texto-mapa-descripcion-gener.jpeg',
        caption: 'Figura 19: El Ciclo de Inmunidad al Cáncer (The Cancer-Immunity Cycle) y dianas inmunoterapéuticas.',
      },
    ],
    aliases: [
      { alias: 'ICI', alias_type: 'abbreviation' },
      { alias: 'CheckMate-214', alias_type: 'alternative_name' },
      { alias: 'KEYNOTE-426', alias_type: 'alternative_name' },
      { alias: 'CheckMate-9ER y CLEAR', alias_type: 'alternative_name' },
    ],
    tags: ['inmunoterapia', 'PD-1', 'CTLA-4', 'nivolumab', 'ipilimumab', 'pembrolizumab', 'CheckMate-214', 'KEYNOTE-426', 'CLEAR', 'CheckMate-9ER'],
    related_term_ids: ['uterm-53', 'uterm-60', 'uterm-72', 'uterm-73', 'uterm-74', 'uterm-76'],
  },
  {
    id: 'uterm-76',
    term: 'Inmunoterapia adyuvante con pembrolizumab (estudio KEYNOTE-564)',
    slug: 'inmunoterapia-adyuvante-pembrolizumab-keynote-564',
    category_id: 'ucat-06',
    short_definition:
      'Primera terapia sistémica adyuvante post-nefrectomía que demostró un beneficio estadísticamente significativo tanto en supervivencia libre de enfermedad como en supervivencia global en pacientes con carcinoma renal de células claras con riesgo intermedio-alto o alto de recurrencia.',
    full_definition:
      'En el ensayo clínico fase III, doble ciego y controlado con placebo KEYNOTE-564 (Choueiri et al., actualización de supervivencia global publicada en 2024 con mediana de seguimiento de 57,2 meses), 994 pacientes con CCR de células claras operados con márgenes libres y riesgo intermedio-alto (pT2 grado 4 o sarcomatoide, pT3 cualquier grado N0 M0) o alto (pT4 N0 M0, cualquier pT N+ M0, o estado M1 sin evidencia de enfermedad [M1 NED] tras metastasectomía completa ≤ 1 año desde la nefrectomía) fueron aleatorizados a recibir pembrolizumab intravenoso (200 mg cada 3 semanas hasta por 17 ciclos, ~1 año) frente a placebo. Pembrolizumab redujo el riesgo de recurrencia o muerte en un 28% (HR 0,72; IC 95% 0,59–0,87) y redujo significativamente el riesgo de muerte (supervivencia global HR 0,62; IC 95% 0,44–0,87; p = 0,005), con una sobrevida global estimada a los 48 meses del 91,2% frente al 86,0% con placebo.',
    image_url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-43.png',
    gallery_urls: [
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-43.png',
        caption: 'Figura 18: Bloqueo del receptor PD-1 por pembrolizumab para prevenir el escape inmune tumoral.',
      },
      {
        url: 'https://manualurologia.cl/wp-content/uploads/2025/10/word-image-2651-29.png',
        caption: 'Tabla 18: Recomendaciones de cirugía y manejo adyuvante en CCR localizado de alto riesgo (Guía EAU 2025).',
      },
    ],
    aliases: [
      { alias: 'KEYNOTE-564', alias_type: 'abbreviation' },
      { alias: 'Pembrolizumab adyuvante renal', alias_type: 'synonym' },
      { alias: 'M1 NED', alias_type: 'alternative_name' },
    ],
    tags: ['adyuvancia', 'pembrolizumab', 'KEYNOTE-564', 'supervivencia global', 'M1 NED'],
    related_term_ids: ['uterm-54', 'uterm-58', 'uterm-66', 'uterm-68', 'uterm-75'],
  },
];

export const RENAL_CANCER_DICTIONARY_TERMS: UrologyTerm[] = RAW_RENAL_DICTIONARY_ENTRIES.map(
  (entry) => ({
    id: entry.id,
    term: entry.term,
    slug: entry.slug,
    short_definition: entry.short_definition,
    full_definition: entry.full_definition,
    category_id: entry.category_id,
    image_url: entry.image_url,
    gallery_urls: entry.gallery_urls,
    editorial_status: 'published',
    is_demo_pending_review: false,
    created_by: 'admin-demo-01',
    reviewed_by: 'admin-demo-01',
    published_at: SEED_DATE,
    created_at: SEED_DATE,
    updated_at: SEED_DATE,
  })
);

export const RENAL_CANCER_DICTIONARY_ALIASES: UrologyTermAlias[] = [];
export const RENAL_CANCER_DICTIONARY_TAGS: UrologyTermTag[] = [];
export const RENAL_CANCER_DICTIONARY_REFERENCES: UrologyTermReference[] = [];
export const RENAL_CANCER_DICTIONARY_RELATIONS: UrologyTermRelation[] = [];

let aliasCounter = 300;
let tagCounter = 300;
let refCounter = 300;
let relCounter = 300;

for (const entry of RAW_RENAL_DICTIONARY_ENTRIES) {
  for (const al of entry.aliases) {
    RENAL_CANCER_DICTIONARY_ALIASES.push({
      id: `ualias-${aliasCounter++}`,
      term_id: entry.id,
      alias: al.alias,
      alias_type: al.alias_type,
    });
  }

  for (const tg of entry.tags) {
    RENAL_CANCER_DICTIONARY_TAGS.push({
      id: `utag-${tagCounter++}`,
      term_id: entry.id,
      tag: tg,
    });
  }

  RENAL_CANCER_DICTIONARY_REFERENCES.push({
    id: `uref-${refCounter++}`,
    term_id: entry.id,
    reference_title: 'Manual de Urología — Capítulo Tumores Renales',
    authors: 'Sociedad Chilena de Urología',
    publication_year: 2025,
    source_name: 'Manual de Urología (manualurologia.cl)',
    url: 'https://manualurologia.cl/tumores-renales/',
    accessed_at: '2026-11-11',
  });

  for (const relTargetId of entry.related_term_ids) {
    RENAL_CANCER_DICTIONARY_RELATIONS.push({
      id: `urel-${relCounter++}`,
      term_id: entry.id,
      related_term_id: relTargetId,
      relation_type: 'related',
      created_at: SEED_DATE,
    });
  }
}
