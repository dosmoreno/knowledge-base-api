import { Request, Response } from 'express';
import {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} from '../services/resourceService';

export const getResourcesController = async (req: Request, res: Response) => {
  try {
    const resources = await getResources(req.params.topicId);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving resources', error });
  }
};

export const getResourceByIdController = async (req: Request, res: Response) => {
  try {
    const resource = await getResourceById(req.params.topicId, req.params.resourceId);
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving resource', error });
  }
};

export const createResourceController = async (req: Request, res: Response) => {
  try {
    const newResource = await createResource(req.params.topicId, req.body);
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource', error });
  }
};

export const updateResourceController = async (req: Request, res: Response) => {
  try {
    const updatedResource = await updateResource(req.params.topicId, req.params.resourceId, req.body);
    if (updatedResource) {
      res.json(updatedResource);
    } else {
      res.status(404).json({ message: 'Resource not found or could not be updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating resource', error });
  }
};

export const deleteResourceController = async (req: Request, res: Response) => {
  try {
    const success = await deleteResource(req.params.topicId, req.params.resourceId);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error });
  }
};
