import { Semaphore } from "../src/index";

test("error", () => {
  expect(() => {
    new Semaphore(-1);
  }).toThrow("Concurrency Should greater then 0!");
  expect(() => {
    new Semaphore(0);
  }).toThrow("Concurrency Should greater then 0!");
});

test("base concurrency", async () => {
  async function task(s: Semaphore) {
    await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
    s.release();
  }
  const s = new Semaphore(1);
  const start = performance.now();
  const tasks = new Array<Promise<void>>();
  for (let i = 0; i < 2; i++) {
    await s.acquire();
    tasks.push(task(s));
  }
  await Promise.all(tasks);
  const end = performance.now();
  expect(end - start).toBeGreaterThan(2000);
});

test("useless concurrency", async () => {
  async function task(s: Semaphore) {
    await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
    s.release();
  }
  const s = new Semaphore(10);
  const start = performance.now();
  const tasks = new Array<Promise<void>>();
  for (let i = 0; i < 5; i++) {
    await s.acquire();
    tasks.push(task(s));
  }
  await Promise.all(tasks);
  const end = performance.now();
  expect(end - start).toBeLessThan(2000);
});

test("concurrency", async () => {
  async function task(s: Semaphore) {
    await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
    s.release();
  }
  const s = new Semaphore(10);
  const start = performance.now();
  const tasks = new Array<Promise<void>>();
  for (let i = 0; i < 40; i++) {
    await s.acquire();
    tasks.push(task(s));
  }
  await Promise.all(tasks);
  const end = performance.now();
  expect(end - start).toBeGreaterThan(4000);
});
