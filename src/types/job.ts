export type JobStatus =
  | 'consultation_pending'
  | 'consultation_started'
  | 'quotation_pending'
  | 'quotation_submitted'
  | 'quotation_accepted'
  | 'job_started'
  | 'job_completed'
  | 'cancelled';

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
  nature: 'home' | 'commercial' | 'industrial';
  status: JobStatus;
  timelineDisplayStatus: string;
  currentSpecialist: string | null;
  currentTeamMembers: string[]; // Hidden from frontend as requested
  connectionStatus: 'online' | 'offline';
  quotationId: string | null;
  isStreaming?: boolean;
  createdAt: string;
  timeline: TimelineEntry[];
}
