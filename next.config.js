/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // вместо 'export'
    reactStrictMode: true,
    distDir: 'dist'
};

module.exports = nextConfig;
