export const MockUserData = {
  userId: '1',
  userToCreate: {
    name: 'User1',
    email: 'User@123.com',
    password: 'User@123',
  },
  user: {
    id: 1,
    name: 'User1',
    email: 'User@123.com',
    password: 'User@123',
    role: 'user',
  },
  updateUserWithPassword: {
    name: 'UserUp',
    email: 'User@up.com',
    password: 'password',
  },
  updateUserWithOutPassword: {
    name: 'UserUp',
    email: 'User@up.com',
  },
  successDeleteResult: {
    raw: [],
    affected: 1,
  },
  failureDeleteResult: {
    raw: [],
    affected: 0,
  },
};
