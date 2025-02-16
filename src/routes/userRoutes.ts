import { Router } from 'express';
import {
  getUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/userController';

const router = Router();

// Get all users
router.get('/', getUsersController);

// Get a specific user by ID
router.get('/:id', getUserByIdController);

// Create a new user
router.post('/', createUserController);

// Update a user
router.put('/:id', updateUserController);

// Delete a user
router.delete('/:id', deleteUserController);

export const userRoutes = router;
