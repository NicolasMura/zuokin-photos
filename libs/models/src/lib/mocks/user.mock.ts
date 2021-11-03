// import { User } from '../models/user.model';
import { User } from '@zuokin-photos/frontend-tools';


const getDefaults = (): User => ({
  // userId: 1234,
  username: 'bob',
  email: 'bob@marley.ja',
  mobile: '0123456789',
  isAdmin: false,
  created_at: new Date(),
  profile: {
    name: 'Bob',
    gender: 'M',
    location: 'Paris',
    picture: ''
  }
});

export const getUserMock = (brand?: Partial<User>): User => ({
  ...getDefaults(),
  ...brand
});
