/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'res.cloudinary.com',
				port: '',
				pathname: '/dvilumget/image/**',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
				pathname: '/dvilumget/image/**',
			},
		],
	},
};

module.exports = nextConfig;
