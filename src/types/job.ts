export type JobStatus =
  | 'consultation_pending'
  | 'consultation_started'
  | 'quotation_pending'
  | 'quotation_submitted'
  | 'quotation_accepted'
  | 'job_started'
  | 'job_completed'
  | 'cancelled'
  | 'posted'
  | 'picked_up'
  | 'analysis'
  | 'quotation'
  | 'materials'
  | 'started'
  | 'qa'
  | 'complete';

export interface TimelineEntry {
  status: JobStatus;
  updatedAt: string;
  completedAt: string | null;
  isActive: boolean;
  notes?: string;
}

export interface Job {
  id?: string;
  customerId: string;
  customerName: string;
  contractorId: string | null;
  contractorName: string | null;
  description: string;
  location: string;
  nature?: 'home' | 'commercial' | 'industrial';
  status: JobStatus;
  timelineDisplayStatus?: string;
  currentSpecialist?: string | null;
  currentTeamMembers?: string[]; // Hidden from frontend as requested
  connectionStatus?: 'online' | 'offline';
  quotationId?: string | null;
  isStreaming?: boolean;
  createdAt: string;
  updatedAt?: string;
  timeline?: TimelineEntry[];
  title?: string;
  clientName?: string;
  specialistName?: string;
  muxPlaybackId?: string;
}

export const JOB_STATUS_LABELS: Record<string, string> = {
  consultation_pending: 'Consultation Pending',
  consultation_started: 'Consultation Started',
  quotation_pending: 'Quotation Pending',
  quotation_submitted: 'Quotation Submitted',
  quotation_accepted: 'Quotation Accepted',
  job_started: 'Job Started',
  job_completed: 'Job Completed',
  cancelled: 'Cancelled',
  posted: 'Job posted',
  picked_up: 'Job picked up',
  analysis: 'Analysis',
  quotation: 'Quotation provided',
  materials: 'Materials purchased',
  started: 'Job started',
  qa: 'Quality assurance',
  complete: 'Job complete',
};

export const JOB_STATUS_ORDER: JobStatus[] = [
  'consultation_pending',
  'consultation_started',
  'quotation_pending',
  'quotation_submitted',
  'quotation_accepted',
  'job_started',
  'job_completed',
  'posted',
  'picked_up',
  'analysis',
  'quotation',
  'materials',
  'started',
  'qa',
  'complete',
];
