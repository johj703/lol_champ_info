import { ChampionDetail } from "@/types/Champion";
import { fetchChampionDetail } from "@/utils/serverApi";

interface ChampionDetailPageProps {
  params: {
    championId: string;
  };
}

const ChampionDetailPage = async ({ params }: ChampionDetailPageProps) => {
  const champion: ChampionDetail = await fetchChampionDetail(params.id);
  return (
    <div>
      <h1>{champion.name}</h1>
      <h2>{champion.title}</h2>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${champion.image}`}
        alt={champion.name}
        width={400}
        height={400}
        className="rounded-lg mb-4"
      />

      <p>{champion.blurb}</p>

      {/* 추가 정보 렌더링 */}
      <section>
        <h3>Lore</h3>
        <p>{champion.lore}</p>

        <h3>Ally Tips</h3>
        <ul>
          {champion.allytips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>

        <h3>Enemy Tips</h3>
        <ul>
          {champion.enemytips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>

        <h3>Tags</h3>
        <p>{champion.tags.join(", ")}</p>
      </section>
    </div>
  );
};

export default ChampionDetailPage;
