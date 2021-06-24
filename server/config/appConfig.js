// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const appConfig ={
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),
    /**
     * main HOST DOMAIN
     */
    domain: process.env.APP_DOMAIN,
    /**
     * microsoft project deployed region
     */
    serviceRegion: process.env.SERVICE_REGION,
    /**
    * Microsoft account subscription key
     */
    subscriptionKey: process.env.SUBSCRIPTION_KEY,
    /**
     * API config
     */
    APIURL: process.env.APIURL,
};
module.exports = appConfig
