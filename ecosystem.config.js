module.exports = {
    apps : [{
      name   : "monitorsms",
      script : "./server.js",
      instances: 0,
      exec_mode: "cluster",
      watch: true,
      merge_logs: true,
      
    }]
  }
  