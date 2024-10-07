import { ChampionDetail } from "@/types/Champion";
import { fetchChampionDetail } from "@/utils/serverApi";
import Image from "next/image";

interface ChampionDetailPageProps {
  params: {
    championId: string;
  };
}

const ChampionDetailPage = async ({ params }: ChampionDetailPageProps) => {
  const champion: ChampionDetail = await fetchChampionDetail(params.id);
  return (
    <div className="bg-gray-900 text-gray-200 p-4 rounded-lg shadow-lg">
      <h1 className="text-red-500 text-2xl font-bold">{champion.name}</h1>
      <h2 className="text-gray-400 font-semibold">{champion.title}</h2>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${champion.image}`}
        alt={champion.name}
        width={400}
        height={400}
        className="rounded-lg mb-4 border-2 border-none"
      />

      <p className="text-blue-900">{champion.blurb}</p>

      {/* 추가 정보 렌더링 */}
      <section className="text-gray-200 mt-4">
        <h3 className="text-yellow-500 font-semibold">Lore</h3>
        <p>{champion.lore}</p>

        <h3 className="text-yellow-500 font-semibold">Ally Tips</h3>
        <ul>
          {champion.allytips.map((tip, index) => (
            <li key={index} className="list-disc list-inside ml-4">
              {tip}
            </li>
          ))}
        </ul>

        <h3 className="text-yellow-500 font-semibold">Enemy Tips</h3>
        <ul>
          {champion.enemytips.map((tip, index) => (
            <li key={index} className="list-disc list-inside ml-4">
              {tip}
            </li>
          ))}
        </ul>

        <h3 className="text-yellow-500 font-semibold">Tags</h3>
        <p>{champion.tags.join(", ")}</p>
      </section>
    </div>
  );
};

export default ChampionDetailPage;
