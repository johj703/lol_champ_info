import { fetchChampionDetail } from "@/utils/serverApi";

interface Props {
  params: {
    championId: string;
  };
}

export default async function ChampionDetailPage({ params }: Props) {
  const championDetail = await fetchChampionDetail(params.championId);
  return (
    <>
      <h1>{championDetail.name}</h1>
      <p>{championDetail.title}</p>
      <p>{championDetail.blurb}</p>
    </>
  );
}
