const Store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(`examwise:${key}`)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) { localStorage.setItem(`examwise:${key}`, JSON.stringify(value)); },
  remove(key) { localStorage.removeItem(`examwise:${key}`); },
  addAttempt(attempt) {
    const attempts = this.get("attempts", []);
    attempts.unshift(attempt);
    this.set("attempts", attempts.slice(0, 50));
  }
};