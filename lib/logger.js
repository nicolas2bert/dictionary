const logLevel = 'warn';
const logLevels = ['error', 'warn', 'info'];

module.exports = (level, message) => {
    if (logLevels.indexOf(logLevel) >= logLevels.indexOf(level)) {
        /* eslint no-console: ["error", { allow: ["log"] }] */
        console.log(level, JSON.stringify(message));
    }
};
