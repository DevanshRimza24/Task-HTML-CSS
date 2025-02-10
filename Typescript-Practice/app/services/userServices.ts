import { getAllUsersFromRepo, saveUserToRepo } from '../repository/userRepository';
// import { User } from '../types/user';

export interface User {
    id: number;
    name: string;
    email: string;
  }
  
export const getUsers = (): User[] => {
 const data = getAllUsersFromRepo()
 console.log(data)
  return getAllUsersFromRepo();
};

export const createUser = (user: User): User => {
  return saveUserToRepo(user);
};
