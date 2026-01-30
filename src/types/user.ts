export type UserRole = 'client' | 'specialist';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  photoURL?: string;
  phoneNumber?: string;
  address?: string;
}
