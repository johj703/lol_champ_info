import { fetchChampionList } from "@/utils/serverApi";

export default async function ChampionsPage() {
  const championList = await fetchChampionList();

  return (
    <>
      <h1>챔피언 목록</h1>
      <ul>
        {Object.keys(championList).map((championId) => (
          <li key={championId}>
            <a href={`/champions/${championId}`}>
              {championList[championId].name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
