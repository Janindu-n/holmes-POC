export type UserRole = 'client' | 'specialist';

export type Specialty = 'Electricity' | 'Water' | 'Plumbing' | 'Maintenance' | 'General';

export const SPECIALTIES: Specialty[] = ['Electricity', 'Water', 'Plumbing', 'Maintenance', 'General'];

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  specialty?: Specialty;
  createdAt: string;
  photoURL?: string;
  phoneNumber?: string;
  address?: string;
}
