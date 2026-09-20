import type { NextConfig } from "next";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgPage = repo?.endsWith(".github.io");
const inferredBasePath = process.env.GITHUB_ACTIONS && repo && !isUserOrOrgPage ? `/${repo}` : "";
const basePath = process.env.PAGES_BASE_PATH ?? inferredBasePath;

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
