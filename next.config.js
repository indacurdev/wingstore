/** @type {import('next').NextConfig} */

const path = require('path')

module.exports = {
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true
}
