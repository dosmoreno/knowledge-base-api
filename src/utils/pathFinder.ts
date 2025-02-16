import { Topic } from '../models/topic';

interface TopicNode {
  topic: Topic;
  parent?: TopicNode;
}

export function findShortestPath(topics: Topic[], startId: string, endId: string): string[] {
  const visited: Set<string> = new Set();
  const queue: TopicNode[] = [{ topic: topics.find(topic => topic.id === startId)! }];
  visited.add(startId);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    const currentTopic = currentNode.topic;

    // If we found the destination
    if (currentTopic.id === endId) {
      const path: string[] = [];
      let node: TopicNode | undefined = currentNode;
      while (node) {
        path.unshift(node.topic.id);
        node = node.parent;
      }
      return path;
    }

    // Traverse through child topics
    const childTopics = topics.filter(topic => topic.parentTopicId === currentTopic.id);
    for (const childTopic of childTopics) {
      if (!visited.has(childTopic.id)) {
        visited.add(childTopic.id);
        queue.push({ topic: childTopic, parent: currentNode });
      }
    }
  }

  return []; // Return empty if no path found
}
