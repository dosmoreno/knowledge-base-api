import { Router } from 'express';
import {
  getTopicsController,
  getTopicByIdController,
  createTopicController,
  updateTopicController,
  deleteTopicController,
  getTopicVersionController,
  findShortestPathController,
} from '../controllers/topicController';

const router = Router();

// Get all topics
router.get('/', getTopicsController);

// Get a specific topic by ID
router.get('/:id', getTopicByIdController);

// Add this route for versioning
router.get('/:id/:version', getTopicVersionController);

// Create a new topic
router.post('/', createTopicController);

// Update a topic (creates a new version)
router.put('/:id', updateTopicController);

// Delete a topic
router.delete('/:id', deleteTopicController);

// New route for finding the shortest path
router.get('/shortest-path/:startId/:endId', findShortestPathController);


export const topicRoutes = router;
