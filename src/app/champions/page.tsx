import { fetchChampionList } from "@/utils/serverApi";
import { Champion } from "@/types/Champion";
import Image from "next/image";
import Link from "next/link";

// ISR 렌더링 방식으로 하루에 한 번 페이지를 재검증하도록 설정
export const revalidate = 86400;

const ChampionListPage = async () => {
  // 챔피언 목록 데이터를 가지고 오기
  const champions: Champion[] = await fetchChampionList();
  return (
    <div>
      <h1 className="text-red-500 font-bold text-xl mb-5">챔피언 목록</h1>
      <div className="grid grid-cols-4 gap-4">
        {champions.map((champion) => (
          <div
            key={champion.id}
            className="border bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center"
          >
            <Link href={`/champions/${champion.id}`} className="champion-card">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                alt={champion.name}
                width={120}
                height={120}
              />
              <div className="items-center justify-center">
                <p className="text-red-500">{champion.name}</p>
                <p className="text-gray-500">{champion.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionListPage;
