# Dynamic Knowledge Base System

## Overview
This project is a RESTful API for a dynamic knowledge base system, built using **Node.js**, **Express**, and **TypeScript**. The system allows managing interconnected topics with version control, user roles and permissions, and the ability to retrieve topics and resources efficiently. The project implements advanced object-oriented principles, design patterns like **Factory**, **Strategy**, and **Composite**, and includes various business logic features.

## Features
- **Topic Management**: CRUD operations for topics, including version control for updates and hierarchical relationships.
- **Resource Management**: Association of resources (links, documents, etc.) with topics.
- **User Roles & Permissions**: Admin, Editor, and Viewer roles with different levels of access.
- **Version Control**: Topics maintain versions, and users can retrieve any specific version.
- **Complex Algorithms**: Shortest path finder for topic hierarchy.
- **Design Patterns**: Implemented **Factory**, **Strategy**, and **Composite** design patterns.

## Requirements
- **Node.js** (v16+)
- **npm** (or **yarn**)
- **TypeScript**

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/knowledge-base-system.git
   cd knowledge-base-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   npm run dev
   ```

   The server will start on port `3000` by default. You can change the port by setting the `PORT` environment variable.

## API Endpoints

### Topics
- **Create a Topic** (POST `/topics`)
  - Request body:
    ```json
    {
      "name": "Topic Name",
      "content": "Topic Content",
      "parentTopicId": "optional-parent-id"
    }
    ```

- **Get All Topics** (GET `/topics`)

- **Get Topic by ID** (GET `/topics/:id`)

- **Get Topic Version** (GET `/topics/:id/:version`)
  
- **Update a Topic** (PUT `/topics/:id`)
  - Request body:
    ```json
    {
      "name": "Updated Topic Name",
      "content": "Updated Content"
    }
    ```

- **Delete a Topic** (DELETE `/topics/:id`)

- **Find Shortest Path Between Topics** (GET `/topics/shortest-path/:startId/:endId`)

### Resources
- **Create a Resource for a Topic** (POST `/resources/:topicId`)
  - Request body:
    ```json
    {
      "url": "http://example.com/resource",
      "description": "Description of the resource",
      "type": "article"
    }
    ```

- **Get All Resources for a Topic** (GET `/resources/:topicId`)

- **Get Specific Resource by ID** (GET `/resources/:topicId/:resourceId`)

- **Update a Resource** (PUT `/resources/:topicId/:resourceId`)
  - Request body:
    ```json
    {
      "url": "http://example.com/updated-resource",
      "description": "Updated description",
      "type": "pdf"
    }
    ```

- **Delete a Resource** (DELETE `/resources/:topicId/:resourceId`)

### Users
- **Create a User** (POST `/users`)
  - Request body:
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "role": "Admin" // or "Editor" or "Viewer"
    }
    ```

- **Get All Users** (GET `/users`)

- **Get a Specific User by ID** (GET `/users/:id`)

- **Update a User** (PUT `/users/:id`)
  - Request body:
    ```json
    {
      "name": "Updated User Name",
      "email": "updated-email@example.com",
      "role": "Editor"
    }
    ```

- **Delete a User** (DELETE `/users/:id`)


## Business Logic
- **Topic Version Control**: When a topic is updated, a new version is created while keeping the previous versions intact. Users can retrieve any version.
- **Recursive Topic Retrieval**: A topic and all its subtopics can be retrieved recursively.
- **Shortest Path Algorithm**: Finds the shortest path between two topics in the topic hierarchy.

## Design Patterns Used
1. **Factory**: Used to create new versions of topics.
2. **Composite**: Applied to manage hierarchical topic structures.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- ExpressJS for building the REST API.
- TypeScript for type safety.
- Design patterns for structuring the application.