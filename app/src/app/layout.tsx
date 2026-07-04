import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ['400', '700'], variable: '--font-noto' });

export const metadata: Metadata = {
  title: "店長ブログ HTMLジェネレーター",
  description: "複数画像・キープボタン対応 / Cloudinaryアップロード機能付き",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJP.variable}`}>
        {children}
      </body>
    </html>
  );
}
