import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // NetlifyでデプロイするためtrailingSlashなどを設定することも可能だが基本exportだけでOK
};

export default nextConfig;
