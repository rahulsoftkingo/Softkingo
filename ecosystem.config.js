module.exports = {
  apps: [{
    name: 'softkingo',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/softkingo',
    env: {
      PORT: 3000,
      NODE_ENV: 'production'
    },
    instances: 1,
    exec_mode: 'fork'
  }]
};
