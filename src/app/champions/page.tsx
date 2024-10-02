import { Champion, fetchChampionList } from "@/utils/serverApi";
import Image from "next/image";
import Link from "next/link";

interface ChampionListPageProps {
  champions: Champion[];
}

const ChampionListPage: React.FC<ChampionListPageProps> = ({ champions }) => {
  return (
    <div>
      <h1>챔피언 목록</h1>
      <div>
        {champions.map((champion) => (
          <Link key={champion.id} href={`/champions/${champion.id}`}>
            <a>
              <div>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
                  alt={champion.name}
                  width={120}
                  height={120}
                />
                <h2>{champion.name}</h2>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChampionListPage;

// ISR을 사용해서 데이터 가지고 오기
export async function getStaticProps() {
  const champions = await fetchChampionList();

  return {
    props: {
      champions,
    },
    // 하루에 한 번씩(86400초) 재검증하도록 revalidate를 86400초로 설정
    revalidate: 86400,
  };
}
