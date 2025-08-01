const logStore = JSON.parse(localStorage.getItem('logs')) || [];

export const log = (type, message, meta = {}) => {
  const entry = {
    type,
    message,
    meta,
    timestamp: new Date().toISOString(),
  };
  logStore.push(entry);
  localStorage.setItem('logs', JSON.stringify(logStore));
};

export const getLogs = () => logStore;
