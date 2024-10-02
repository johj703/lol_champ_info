import { fetchChampionList } from "@/utils/serverApi";
import { Champion } from "@/types/Champion";
import Image from "next/image";

// ISR 렌더링 방식으로 하우레 한 번 페이지를 재검증하도록 설정
export const revalidate = 86400;

const ChampionListPage = async () => {
  // 챔피언 목록 데이터를 가지고 오기
  const champions: Champion[] = await fetchChampionList();
  return (
    <div>
      <h1>챔피언 목록</h1>
      <ul className="champion-list">
        {champions.map((champion) => (
          <div key={champion.id} className="champion-card">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
              alt={champion.name}
              width={120}
              height={120}
            />
            <p>{champion.name}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ChampionListPage;
