export interface Diner {
  username: string;
  createdAt: number;
}

export interface DinerPrivate extends Diner {
  email: string;
  points: number;
  referralCode: string;
  referrer: string;
}

export interface DinerWithPassword extends DinerPrivate {
  password: string;
}

export interface Bookmark {
  dusername: string;
  rusername: string;
  createdAt: number;
}
