/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
    images: {
        domains: ["localhost"],
        formats: ["image/png", "image/jpeg"],
    },
};
