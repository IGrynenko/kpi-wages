const config = {
    user: 'Web',
    password: 'P@$$w0rd',
    database: 'kpi_wages_db',
    server: 'DESKTOP-2E7EPOE\\SQLEXPRESS',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      trustServerCertificate: true
    },
    port: '1433'
};

module.exports = config;