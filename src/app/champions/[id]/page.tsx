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
    </div>
  );
};

export default ChampionDetailPage;
