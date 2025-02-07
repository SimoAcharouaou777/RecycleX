export interface Request {
  userEmail: string;
  wasteTypes: string[];
  photos: string[];
  weight: number;
  address: string;
  date: string;
  timeSlot: string;
  notes: string;
  status?: 'PENDING' | 'Busy' | 'In Progress' | 'Validated' | 'Rejected';
  isEditing?: boolean;
}
