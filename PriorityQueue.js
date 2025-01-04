class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(item, priority) {
      this.queue.push({ item, priority });
      this.queue.sort((a, b) => a.priority - b.priority); // Lower priority value = higher priority
    }
  
    dequeue() {
      return this.queue.shift(); // Remove and return the highest-priority item
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  }
  
  module.exports = PriorityQueue;
  