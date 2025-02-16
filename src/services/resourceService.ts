import { Resource } from '../models/resource';

// Mock in-memory database (you can replace this with your actual database logic)
let resources: Resource[] = [];

// Create a new resource
export const createResource = async (topicId: string, data: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>): Promise<Resource> => {
  const newResource: Resource = {
    ...data,
    id: (resources.length + 1).toString(),
    topicId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  resources.push(newResource);
  return newResource;
};

// Get all resources for a topic
export const getResources = async (topicId: string): Promise<Resource[]> => {
  return resources.filter(resource => resource.topicId === topicId);
};

// Get a specific resource by ID
export const getResourceById = async (topicId: string, resourceId: string): Promise<Resource | null> => {
  return resources.find(resource => resource.topicId === topicId && resource.id === resourceId) || null;
};

// Update a resource
export const updateResource = async (topicId: string, resourceId: string, data: Partial<Resource>): Promise<Resource | null> => {
  const resourceIndex = resources.findIndex(resource => resource.topicId === topicId && resource.id === resourceId);
  if (resourceIndex === -1) return null;

  const updatedResource: Resource = {
    ...resources[resourceIndex],
    ...data,
    updatedAt: new Date(),
  };

  resources[resourceIndex] = updatedResource;
  return updatedResource;
};

// Delete a resource
export const deleteResource = async (topicId: string, resourceId: string): Promise<boolean> => {
  const resourceIndex = resources.findIndex(resource => resource.topicId === topicId && resource.id === resourceId);
  if (resourceIndex === -1) return false;

  resources.splice(resourceIndex, 1);
  return true;
};
