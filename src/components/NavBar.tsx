import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="container mx-auto flex space-x-4">
        <li>
          <Link href="/">홈</Link>
        </li>
        <li>
          <Link href="/champions">챔피언 목록</Link>
        </li>
        <li>
          <Link href="/items">아이템 목록</Link>
        </li>
        <li>
          <Link href="/rotation">로테이션 정보</Link>
        </li>
      </ul>
    </nav>
  );
}
