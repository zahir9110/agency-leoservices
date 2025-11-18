module.exports = {
  apps: [{
    name: 'agency-leo-services',
    script: './server/server.js',
    
    // Cluster mode avec plusieurs instances
    instances: 2,
    exec_mode: 'cluster',
    
    // Environnement
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    
    // Auto-restart options
    watch: false,
    max_memory_restart: '500M',
    
    // Logging
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Restart strategy
    exp_backoff_restart_delay: 100,
    max_restarts: 10,
    min_uptime: '10s',
    
    // Source map support
    source_map_support: true,
    
    // Advanced features
    kill_timeout: 5000,
    listen_timeout: 3000,
    shutdown_with_message: true,
    
    // PM2+ monitoring (optionnel)
    // pmx: true,
    // instances_log_file: './logs/pm2-instances.log',
  }]
};
