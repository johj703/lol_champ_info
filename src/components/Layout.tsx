import Navbar from "./Navbar";

export const metadata = {
  title: "League Of Legend Info",
  description: "League Of Legend 정보 앱 입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
