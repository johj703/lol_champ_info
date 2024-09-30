import Navbar from "./NavBar";

export const metadata = {
  title: "League Of Legend Info",
  description: "League Of Legend 정보 앱 입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header>
          <Navbar />
        </header>
        <main className="container mx-auto mt-4">{children}</main>
      </body>
    </html>
  );
}
