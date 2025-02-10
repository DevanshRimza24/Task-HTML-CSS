// import { User } from '../types/user';

export interface User {
    id: number;
    name: string;
    email: string;
  }
  
let users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// console.log(users);
export const getAllUsersFromRepo = (): User[] => {
    console.log("aasjahsjka")
  return users;
};

export const saveUserToRepo = (user: User): User => {
  const newUser = { ...user, id: users.length + 1 };
  users.push(newUser);
  return newUser;
};
