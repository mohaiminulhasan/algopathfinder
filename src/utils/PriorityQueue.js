export class PriorityQueue {
  constructor() {
    this.items = []
  }

  isEmpty() {
    return this.items.length === 0;
  }

  enqueue(item) {
    if (this.isEmpty()) {
      this.items.push(item);
    } else {
      let added = false;
      for (let i = 0; i < this.items.length; i++) {
        if (item[1] < this.items[i][1]) {
          this.items.splice(i, 0, item);
          added = true;
          break;
        }
      }
      if (!added) {
        this.items.push(item);
      }
    }
  }

  dequeue() {
    return this.items.shift()[0];
  }

  peek() {
    return this.items[0];
  }

  size() {
    return this.items.length;
  }

  toString() {
    return `[${this.items.toString()}]`;
  }
}