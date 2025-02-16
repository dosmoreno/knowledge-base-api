import { Topic } from '../models/topic';
import { findShortestPath } from '../utils/pathFinder';

let topics: Topic[] = [];

// Create a new topic
export const createTopic = async (data: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'version'>): Promise<Topic> => {
  const newTopic: Topic = {
    ...data,
    id: (topics.length + 1).toString(), // Simple ID generation
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    parentTopicId: data.parentTopicId || null,
  };
  topics.push(newTopic);
  return newTopic;
};

// Get all topics
export const getTopics = async (): Promise<Topic[]> => {
  return topics;
};

// Get a specific topic by ID (latest version)
export const getTopicById = async (id: string): Promise<Topic | null> => {
  const topic = topics.find(topic => topic.id === id);
  if (!topic) return null;

  // Find all subtopics that have the current topic as their parent
  const subtopics = topics.filter(t => t.parentTopicId === id);

  // Recursively fetch subtopics for each subtopic
  const subtopicsWithChildren = await Promise.all(
    subtopics.map(async (subtopic) => {
      const children = await getTopicById(subtopic.id); // Recursively get subtopics
      return { ...subtopic, children: children ? [children] : [] }; // Add children to the subtopic
    })
  );

  // Return the topic along with its subtopics and their children
  return { ...topic, children: subtopicsWithChildren };
};

// Get a specific version of a topic
export const getTopicVersionById = async (id: string, version: number): Promise<Topic | null> => {
  return topics.find(topic => topic.id === id && topic.version === version) || null;
};

// Update a topic (creates a new version without overwriting the old one)
export const updateTopic = async (id: string, data: Partial<Topic>): Promise<Topic | null> => {
  const topicIndex = topics.findIndex(topic => topic.id === id);
  if (topicIndex === -1) return null;

  const updatedTopic: Topic = {
    ...topics[topicIndex],
    ...data,
    updatedAt: new Date(),
    version: topics[topicIndex].version + 1,
    id: `${id}`,
  };

  topics.push(updatedTopic);
  return updatedTopic;
};

// Delete a topic (removes all versions)
export const deleteTopic = async (id: string): Promise<boolean> => {
  const topicIndex = topics.findIndex(topic => topic.id === id);
  if (topicIndex === -1) return false;

  topics = topics.filter(topic => !topic.id.startsWith(id)); // Delete all versions
  return true;
};

export const findShortestPathBetweenTopics = (startId: string, endId: string): string[] => {
  return findShortestPath(topics, startId, endId); // Call the findShortestPath function
};