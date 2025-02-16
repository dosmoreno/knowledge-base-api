import { Resource } from './models/resource';
import { Topic } from './models/topic';
import { User } from './models/user';

interface DatabaseTable<T> {
    data: T[];
  }
  
  class InMemoryDatabase {
    private topics: DatabaseTable<Topic> = { data: [] };
    private resources: DatabaseTable<Resource> = { data: [] };
    private users: DatabaseTable<User> = { data: [] };
  
    private generateId(): string {
      return Math.random().toString(36).substr(2, 9); // Generate a random alphanumeric ID
    }
  
    // Generic method to get all records from a table
    public getAll<T>(table: DatabaseTable<T>): T[] {
      return table.data;
    }
  
    // Generic method to find a record by ID
    public getById<T extends { id: string }>(table: DatabaseTable<T>, id: string): T | null {
      return table.data.find(item => item.id === id) || null;
    }
  
    // Generic method to add a new record
    public create<T extends { id?: string }>(table: DatabaseTable<T>, item: T): T {
      const newItem = { ...item, id: item.id || this.generateId() } as T;
      table.data.push(newItem);
      return newItem;
    }
  
    // Generic method to update a record
    public update<T extends { id: string }>(table: DatabaseTable<T>, id: string, updates: Partial<T>): T | null {
      const index = table.data.findIndex(item => item.id === id);
      if (index === -1) return null;
  
      table.data[index] = { ...table.data[index], ...updates };
      return table.data[index];
    }
  
    // Generic method to delete a record
    public delete<T extends { id: string }>(table: DatabaseTable<T>, id: string): boolean {
      const index = table.data.findIndex(item => item.id === id);
      if (index === -1) return false;
  
      table.data.splice(index, 1);
      return true;
    }
  
    // Public API for accessing the tables
    public getTopics(): Topic[] {
      return this.getAll(this.topics);
    }
  
    public getTopicById(id: string): Topic | null {
      return this.getById(this.topics, id);
    }
  
    public createTopic(topic: Topic): Topic {
      return this.create(this.topics, topic);
    }
  
    public updateTopic(id: string, updates: Partial<Topic>): Topic | null {
      return this.update(this.topics, id, updates);
    }
  
    public deleteTopic(id: string): boolean {
      return this.delete(this.topics, id);
    }
  
    public getUsers(): User[] {
      return this.getAll(this.users);
    }
  
    public getUserById(id: string): User | null {
      return this.getById(this.users, id);
    }
  
    public createUser(user: User): User {
      return this.create(this.users, user);
    }
  
    public updateUser(id: string, updates: Partial<User>): User | null {
      return this.update(this.users, id, updates);
    }
  
    public deleteUser(id: string): boolean {
      return this.delete(this.users, id);
    }
  
    public getResources(): Resource[] {
      return this.getAll(this.resources);
    }
  
    public getResourceById(id: string): Resource | null {
      return this.getById(this.resources, id);
    }
  
    public createResource(resource: Resource): Resource {
      return this.create(this.resources, resource);
    }
  
    public updateResource(id: string, updates: Partial<Resource>): Resource | null {
      return this.update(this.resources, id, updates);
    }
  
    public deleteResource(id: string): boolean {
      return this.delete(this.resources, id);
    }
  }
  
  // Export a singleton instance
  const database = new InMemoryDatabase();
  export default database;
  