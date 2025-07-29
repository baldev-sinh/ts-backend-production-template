import app from './app'
import config from './config/config'
import logger from './util/logger'

const server = app.listen(config.PORT)

;(() => {
    try {
        // Database Connection

        // Log meta data
        logger.info(`APPLICATION_STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (error) {
        logger.error(`APPLICATION_ERROR`, { meta: error })

        server.close((err) => {
            if (err) {
                logger.error(`APPLICATION_ERROR`, { meta: error })
            }

            process.exit(1)
        })
    }
})()
