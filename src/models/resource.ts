// models/resource.ts

export interface Resource {
    id: string;                // Unique identifier for the resource
    topicId: string;           // The ID of the associated topic
    url: string;               // The URL to the external resource
    description: string;       // A brief description of the resource
    type: 'video' | 'article' | 'pdf'; // The type of the resource (video, article, pdf, etc.)
    createdAt: Date;           // When the resource was created
    updatedAt: Date;           // When the resource was last updated
  }
  