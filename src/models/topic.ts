// models/topic.ts

export interface Topic {
  id: string;                // Unique identifier for the topic
  name: string;              // The name of the topic
  content: string;           // The content of the topic
  createdAt: Date;           // When the topic was created
  updatedAt: Date;           // When the topic was last updated
  version: number;           // The version number of the topic
  parentTopicId: string | null; // Parent topic ID (null if the topic is a root topic)
  children?: Topic[];        // Subtopics, optional property
}
