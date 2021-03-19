# jsemaphore

[![Coverage Status](https://coveralls.io/repos/github/Jannchie/jsemaphore/badge.svg?branch=main)](https://coveralls.io/github/Jannchie/jsemaphore?branch=main) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Jannchie/jsemaphore.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Jannchie/jsemaphore/context:javascript)

## Usage

``` ts
// Simulate tasks that take 1 second
async function task(s: Semaphore) {
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
  s.release();
}
// Concurrency = 10
const s = new Semaphore(10);

const tasks = new Array<Promise<void>>();

// For total 40 tasks
for (let i = 0; i < 40; i++) {
  await s.acquire();
  tasks.push(task(s));
}

await Promise.all(tasks); // The total cost time is about 4 seconds
```
