export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  photos: string[];
  rate: number;
  status: 'IN' | 'OUT';
  verified: {
    email: boolean;
    phone: boolean;
  };
  createdAt: Date;
}

export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
}