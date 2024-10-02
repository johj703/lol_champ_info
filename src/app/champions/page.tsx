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
