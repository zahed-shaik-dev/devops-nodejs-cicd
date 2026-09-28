const express = require('express');

const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    service: 'devops-cicd-node-api',
    message: 'CI/CD pipeline is running',
    version: process.env.APP_VERSION || 'local'
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.get('/api/info', (_req, res) => {
  res.json({
    environment: process.env.NODE_ENV || 'development',
    commit: process.env.GIT_SHA || 'local',
    hostname: require('os').hostname()
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
