import { Request, Response } from 'express';
import {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  getTopicVersionById,
  findShortestPathBetweenTopics, // Import the function
} from '../services/topicService';

export const getTopicsController = async (req: Request, res: Response) => {
  try {
    const topics = await getTopics();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving topics', error });
  }
};

export const getTopicByIdController = async (req: Request, res: Response) => {
  try {
    const topic = await getTopicById(req.params.id);
    if (topic) {
      res.json(topic);
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving topic', error });
  }
};

export const createTopicController = async (req: Request, res: Response) => {
  try {
    const newTopic = await createTopic(req.body);
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ message: 'Error creating topic', error });
  }
};

export const updateTopicController = async (req: Request, res: Response) => {
  try {
    const updatedTopic = await updateTopic(req.params.id, req.body);
    if (updatedTopic) {
      res.json(updatedTopic);
    } else {
      res.status(404).json({ message: 'Topic not found or could not be updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating topic', error });
  }
};

export const deleteTopicController = async (req: Request, res: Response) => {
  try {
    const success = await deleteTopic(req.params.id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting topic', error });
  }
};

export const getTopicVersionController = async (req: Request, res: Response) => {
  const { id, version } = req.params;

  try {
    const topic = await getTopicVersionById(id, parseInt(version, 10)); // Parse version to integer
    if (topic) {
      res.json(topic);
    } else {
      res.status(404).json({ message: `Topic version ${version} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving topic version', error });
  }
};

// New controller function to find the shortest path
export const findShortestPathController = async (req: Request, res: Response) => {
  const { startId, endId } = req.params;

  try {
    // Call the service method to find the shortest path
    const path = findShortestPathBetweenTopics(startId, endId);

    if (path.length === 0) {
      res.status(404).json({ message: 'No path found between topics' });
    } else {
      res.json({ path }); // Return the path in the response
    }
  } catch (error) {
    res.status(500).json({ message: 'Error finding shortest path', error });
  }
};
