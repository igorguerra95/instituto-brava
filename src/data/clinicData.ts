import heroClinicImg from '../assets/images/hero_clinica_brava_1795527510164.jpg';
import pilatesClinicImg from '../assets/images/especialidade_pilates_clinico_1795527494894.jpg';
import rpgClinicImg from '../assets/images/especialidade_rpg_reabilitacao_1795527496295.jpg';
import directorPortraitImg from '../assets/images/sobre_direcao_clinica_1795527510143.jpg';
import type {
  AcademicCredential,
  ClinicalMetric,
  RecoveryTestimonial,
  SpecialtyItem,
} from '../types';

export const CLINIC_INFO = {
  brandShort: 'Instituto Brava',
  brandFull: 'Instituto Brava Fisioterapia e Pilates',
  address: 'SEU ENDEREÇO AQUI',
  phoneDisplay: '(00) 00000-0000',
  phoneHref: 'tel:+5500000000000',
  whatsappHref:
    'https://wa.me/5500000000000?text=Ol%C3%A1%2C%20gostaria%20de%20entrar%20em%20contato%20para%20agendar%20uma%20avalia%C3%A7%C3%A3o%20no%20Instituto%20Brava%20Fisioterapia%20e%20Pilates.',
  hours: 'Não informado',
  heroImage: heroClinicImg,
  heroImageAlt:
    'Estúdio clínico do Instituto Brava Fisioterapia e Pilates com equipamentos em madeira clara, estofado azul marinho e iluminação natural.',
  directorImage: directorPortraitImg,
  directorImageAlt:
    'Fisioterapeuta responsável técnica do Instituto Brava Fisioterapia e Pilates em ambiente clínico iluminado.',
} as const;

export const CLINICAL_METRICS: ClinicalMetric[] = [
  {
    id: 'experience',
    value: 14,
    suffix: ' anos',
    label: 'De prática clínica',
    detail: 'Atuação contínua em fisioterapia ortopédica, postural e reabilitação funcional.',
  },
  {
    id: 'sessions',
    value: 3800,
    suffix: '+',
    label: 'Atendimentos realizados',
    detail: 'Sessões individuais conduzidas com acompanhamento direto em cada etapa.',
  },
  {
    id: 'duration',
    value: 50,
    suffix: ' min',
    label: 'Por sessão dedicada',
    detail: 'Tempo integral reservado à execução técnica, sem superlotação de agenda.',
  },
  {
    id: 'individualization',
    value: 100,
    suffix: '%',
    label: 'Protocolo individualizado',
    detail: 'Plano terapêutico definido após avaliação biomecânica e funcional completa.',
  },
];

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: 'rpg',
    index: '01.',
    title: 'Reeducação Postural Global (RPG)',
    subtitle: 'Alinhamento das cadeias musculares e descompressão articular.',
    metadata: ['Coluna vertebral', 'Desvios posturais', 'Atendimento individual'],
    description:
      'Intervenção precisa sobre encurtamentos fasciais e assimetrias musculares que originam hérnias discais, escolioses, lombalgias e sobrecargas cervicais.',
    clinicalFocus: 'Indicado para dores recorrentes na coluna, alterações posturais e prevenção de recidivas.',
    image: rpgClinicImg,
    imageAlt:
      'Atendimento individual de Reeducação Postural Global e avaliação clínica em maca terapêutica.',
    spanClass: 'lg:col-span-7',
  },
  {
    id: 'pilates',
    index: '02.',
    title: 'Pilates Clínico em Aparelhos',
    subtitle: 'Controle motor, estabilidade central e força sem sobrecarga.',
    metadata: ['Reformer e Cadillac', 'Estabilização lombar', 'Progressão segura'],
    description:
      'Exercícios conduzidos exclusivamente por fisioterapeutas com ajuste milimétrico de molas e alavancas, respeitando limites articulares e fases de cicatrização.',
    clinicalFocus: 'Indicado para fortalecimento profundo, transição pós-reabilitação e saúde articular contínua.',
    image: pilatesClinicImg,
    imageAlt:
      'Sessão de Pilates clínico supervisionada por fisioterapeuta em aparelho Reformer.',
    spanClass: 'lg:col-span-5',
  },
  {
    id: 'reabilitacao',
    index: '03.',
    title: 'Reabilitação Ortopédica e Pós-Operatória',
    subtitle: 'Retorno progressivo da amplitude, força e autonomia funcional.',
    metadata: ['Joelho e ombro', 'Pós-cirúrgico', 'Critérios objetivos'],
    description:
      'Condução estruturada para reconstruções ligamentares, artroscopias, lesões musculotendíneas e fraturas, com progressão orientada por testes funcionais.',
    clinicalFocus: 'Indicado para recuperação pós-cirúrgica, entorses, tendinopatias e lesões esportivas.',
    spanClass: 'lg:col-span-5',
  },
  {
    id: 'terapia-manual',
    index: '04.',
    title: 'Terapia Manual e Liberação Miofascial',
    subtitle: 'Restauração da mobilidade articular e modulação da dor.',
    metadata: ['Mobilização articular', 'Tecidos moles', 'Alívio direcionado'],
    description:
      'Técnicas manuais específicas para reduzir restrições capsulares, pontos-gatilho e bloqueios mecânicos, preparando o sistema musculoesquelético para o movimento ativo.',
    clinicalFocus: 'Indicado para quadros álgicos agudos, rigidez articular e tensão miofascial persistente.',
    spanClass: 'lg:col-span-7',
  },
];

export const ACADEMIC_CREDENTIALS: AcademicCredential[] = [
  {
    year: '2012',
    title: 'Graduação em Fisioterapia',
    institution: 'Formação universitária integral com ênfase em biomecânica clínica e cinesiologia.',
  },
  {
    year: '2015',
    title: 'Especialização Internacional em RPG (Método Souchard)',
    institution: 'Capacitação clínica em cadeias musculares, equilíbrio tônico e patologias da coluna.',
  },
  {
    year: '2018',
    title: 'Pós-Graduação em Fisioterapia Ortopédica e Traumatológica',
    institution: 'Aprofundamento em reabilitação pós-operatória e raciocínio clínico baseado em evidências.',
  },
  {
    year: '2021',
    title: 'Formação Avançada em Pilates Clínico Terapêutico',
    institution: 'Aplicação biomecânica de aparelhos para estabilidade segmentar e longevidade motora.',
  },
];

export const RECOVERY_TESTIMONIALS: RecoveryTestimonial[] = [
  {
    id: 'mariana',
    patientName: 'Mariana Alencar Vasconcelos',
    clinicalContext: 'Lombalgia por protrusão discal · RPG e Pilates Clínico',
    duration: '16 semanas de acompanhamento',
    beforeSummary: 'Limitação severa ao permanecer sentada e irradiação dolorosa recorrente.',
    outcomeSummary: 'Retorno integral à rotina de trabalho e caminhadas diárias sem dor.',
    quote:
      'A avaliação inicial explicou exatamente a origem mecânica da minha dor. Com sessões de RPG seguidas pela transição ao Pilates clínico, recuperei estabilidade e confiança para me movimentar.',
  },
  {
    id: 'henrique',
    patientName: 'Henrique Tavares Nogueira',
    clinicalContext: 'Pós-operatório de LCA no joelho direito · Reabilitação Ortopédica',
    duration: '5 meses de protocolo progressivo',
    beforeSummary: 'Déficit acentuado de extensão articular e insegurança na descarga de peso.',
    outcomeSummary: 'Amplitude completa restaurada e retorno seguro à prática esportiva recreativa.',
    quote:
      'Cada etapa da reabilitação foi conduzida com metas claras e acompanhamento próximo. Nunca houve pressa nem exercícios genéricos; cada avanço foi medido com rigor técnico.',
  },
  {
    id: 'beatriz',
    patientName: 'Beatriz Sampaio Ferreira',
    clinicalContext: 'Cervicalgia crônica e sobrecarga escapular · Terapia Manual e RPG',
    duration: '10 semanas de tratamento',
    beforeSummary: 'Rigidez cervical matinal frequente e cefaleias tensionais semanais.',
    outcomeSummary: 'Mobilidade cervical recuperada e redução expressiva dos episódios de dor.',
    quote:
      'O ambiente sereno e o atendimento individualizado fazem toda a diferença. Hoje compreendo minha postura e mantenho os ganhos obtidos com sessões regulares de Pilates.',
  },
];
