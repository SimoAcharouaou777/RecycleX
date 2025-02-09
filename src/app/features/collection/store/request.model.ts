export interface Request {
  userEmail: string;
  wastes: { type: string; weight: number }[];
  address: string;
  date: string;
  timeSlot: string;
  notes: string;
  status?: 'PENDING' | 'Occupied' | 'In Progress' | 'Validated' | 'Rejected';
  isEditing?: boolean;
}
