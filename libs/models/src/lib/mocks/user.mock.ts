// import { User } from '../models/user.model';
import { User } from '@zuokin-photos/frontend-tools';


const getDefaults = (): User => ({
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
  },
  _id: '61b7c23244fe418be6001a6b'
});

export const getUserMock = (brand?: Partial<User>): User => ({
  ...getDefaults(),
  ...brand
});
