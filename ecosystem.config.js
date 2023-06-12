module.exports = {
  apps: [
    {
      name: 'frontend',
      exec_mode: 'cluster',
      instances: '2',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
