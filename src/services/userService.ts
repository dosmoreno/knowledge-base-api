import { User } from '../models/user';

// Mock in-memory database (you can replace this with your actual database logic)
let users: User[] = [];

// Create a new user
export const createUser = async (data: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  const newUser: User = {
    ...data,
    id: (users.length + 1).toString(),
    createdAt: new Date(),
  };
  users.push(newUser);
  return newUser;
};

// Get all users
export const getUsers = async (): Promise<User[]> => {
  return users;
};

// Get a specific user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  return users.find(user => user.id === id) || null;
};

// Update a user
export const updateUser = async (id: string, data: Partial<User>): Promise<User | null> => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;

  const updatedUser: User = {
    ...users[userIndex],
    ...data,
  };

  users[userIndex] = updatedUser;
  return updatedUser;
};

// Delete a user
export const deleteUser = async (id: string): Promise<boolean> => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return false;

  users.splice(userIndex, 1);
  return true;
};
