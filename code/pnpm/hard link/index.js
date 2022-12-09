const ssri = require('ssri')
const aIntegrity = 'sha512-1111222233334444'
const sri = ssri.parse(aIntegrity, { single: true })
console.log('hard link地址:' + sri.hexDigest())