import { Request, Response } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../services/userService';

// Create a new user
export const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, role } = req.body;

    // Validate input
    if (!name || !email || !role) {
      res.status(400).json({ message: 'Name, email, and role are required.' });
    }

    // Create the user using the service
    const newUser = await createUser({ name, email, role });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get all users
export const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get a specific user by ID
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    // Get user by ID using the service
    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ message: `User with ID ${userId} not found.` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update a user by ID
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const { name, email, role } = req.body;

    // Validate input
    if (!name && !email && !role) {
      res.status(400).json({ message: 'At least one of name, email, or role must be provided.' });
    }

    // Update the user using the service
    const updatedUser = await updateUser(userId, { name, email, role });
    if (!updatedUser) {
      res.status(404).json({ message: `User with ID ${userId} not found.` });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user by ID
export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    // Delete the user using the service
    const deleted = await deleteUser(userId);
    if (!deleted) {
      res.status(404).json({ message: `User with ID ${userId} not found.` });
    }

    res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
