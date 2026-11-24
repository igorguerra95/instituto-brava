export type SpecialtyId =
  | 'rpg'
  | 'pilates'
  | 'reabilitacao'
  | 'terapia-manual';

export interface SpecialtyItem {
  id: SpecialtyId;
  index: string;
  title: string;
  subtitle: string;
  metadata: string[];
  description: string;
  clinicalFocus: string;
  image?: string;
  imageAlt?: string;
  spanClass: string;
}

export interface ClinicalMetric {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  detail: string;
}

export interface AcademicCredential {
  year: string;
  title: string;
  institution: string;
}

export interface RecoveryTestimonial {
  id: string;
  patientName: string;
  clinicalContext: string;
  duration: string;
  beforeSummary: string;
  outcomeSummary: string;
  quote: string;
}

export type PreferredPeriod = 'Manhã' | 'Tarde' | 'Indiferente';

export interface AppointmentRequest {
  fullName: string;
  phone: string;
  email: string;
  specialty: SpecialtyId;
  preferredPeriod: PreferredPeriod;
  notes: string;
}
