const ssri = require('ssri')
// postcss的integrity
const aIntegrity = 'sha512-83RJJ95IfQlH9xuw1X7jpvJKJXpEdtzfI32q4Gf1M1tDLrfK+i1kN+kQXvSKUCvYckqG2gDnAtk/kO9IrzxfqA=='
const sri = ssri.parse(aIntegrity, { single: true })
console.log('postcss的LICENSE的hard link地址:' + sri.hexDigest())