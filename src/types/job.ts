export type JobStatus =
  | 'posted'
  | 'picked_up'
  | 'analysis'
  | 'quotation'
  | 'materials'
  | 'started'
  | 'qa'
  | 'complete';

export interface Job {
  id: string;
  title: string;
  status: JobStatus;
  location: string;
  clientName: string;
  specialistName?: string;
  createdAt: string;
  updatedAt: string;
  muxPlaybackId?: string;
  isStreaming?: boolean;
}

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
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
  'posted',
  'picked_up',
  'analysis',
  'quotation',
  'materials',
  'started',
  'qa',
  'complete',
];
