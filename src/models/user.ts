// models/user.ts

export interface User {
    id: string;                // Unique identifier for the user
    name: string;              // The user's name
    email: string;             // The user's email (must be unique)
    role: 'Admin' | 'Editor' | 'Viewer'; // The user's role (Admin, Editor, Viewer)
    createdAt: Date;           // When the user was created
  }
  