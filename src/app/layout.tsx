import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokédex",
  description: "포켓몬 도감가보자구",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className=" bg-[#f8f5f2] bg-no-repeat bg-top-right bg-[url('/img/pokeball.png')] bg-[length:25%] font-ramche">
        {children}
      </body>
    </html>
  );
}
