import { Router } from 'express';
import {
  getResourcesController,
  getResourceByIdController,
  createResourceController,
  updateResourceController,
  deleteResourceController,
} from '../controllers/resourceController';

const router = Router();

// Get all resources for a topic
router.get('/:topicId', getResourcesController);

// Get a specific resource by ID
router.get('/:topicId/:resourceId', getResourceByIdController);

// Create a new resource for a topic
router.post('/:topicId', createResourceController);

// Update a resource
router.put('/:topicId/:resourceId', updateResourceController);

// Delete a resource
router.delete('/:topicId/:resourceId', deleteResourceController);

export const resourceRoutes = router;
