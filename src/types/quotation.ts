export interface Quotation {
  id?: string;
  jobId: string;
  specialistId: string;
  specialistName: string;
  price: number; // In Rupees
  currency: 'LKR';
  description: string;
  items: {
    name: string;
    amount: number;
  }[];
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  validUntil: string;
}
