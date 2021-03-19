type PromiseInfo = {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
};
export class Semaphore {
  private count: number;
  private concurrency: number;
  private waitingTasks: PromiseInfo[];
  constructor(concurrency: number) {
    if (concurrency <= 0) {
      throw new Error("Concurrency Should greater then 0!");
    }
    this.count = 0;
    this.concurrency = concurrency;
    this.waitingTasks = [];
  }
  async acquire() {
    if (this.concurrency > this.count) {
      this.count++;
      return;
    } else {
      return new Promise((resolve, reject) => {
        this.waitingTasks.push({ resolve, reject });
      });
    }
  }
  release() {
    this.count--;
    if (this.waitingTasks.length > 0 && this.count < this.concurrency) {
      this.count++;
      let promise = this.waitingTasks.shift()!;
      promise.resolve(null);
    }
  }
}
