/** @type {import('next').NextConfig} */

const path = require('path')

module.exports = {
  trailingSlash: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: false
}
