if (process.env.NODE_ENV === 'production') //환경변수로, 개발중이면 development / 배포 이후에는 production
{
    module.exports = require('./prod')
}   
else
{
    module.exports = require('./dev')
}