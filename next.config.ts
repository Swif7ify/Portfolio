import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	allowedDevOrigins: ["192.168.1.79"],
};

export default nextConfig;
