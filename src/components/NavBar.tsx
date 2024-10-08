import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white">
      <ul className="container mx-auto flex justify-between items-center py-4">
        <li>
          <Link href="/">홈</Link>
        </li>
        <div className="flex space-x-10">
          <li>
            <Link href="/champions">챔피언 목록</Link>
          </li>
          <li>
            <Link href="/items">아이템 목록</Link>
          </li>
          <li>
            <Link href="/rotation">로테이션 정보</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
