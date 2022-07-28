const port = 4400
const app = require('./app.js');
// const logger = require('./config/logger.js');

app.listen(port, () => {
    console.log(`SERVER hosted at localhost:${port}`);
    // logger.error('error')
})