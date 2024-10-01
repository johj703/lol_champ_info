export const fetchVersion = async (): Promise<string> => {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  if (!response.ok) {
    throw new Error("버전 정보를 가져오는 데 실패했습니다.");
  }
  const versions: string[] = await response.json();
  // 최신 버전 반환
  return versions[0];
};

export const fetchChampionList = async (): Promise<any> => {
  const version = await fetchVersion();
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
  );
  if (!response.ok) {
    throw new Error("챔피언 목록을 가져오는 데 실패했습니다.");
  }
  const data = await response.json();
  return data.data;
};

export const fetchChampionDetail = async (championId: string): Promise<any> => {
  const version = await fetchVersion();
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion/${championId}.json`
  );
  if (!response.ok) {
    throw new Error(`${championId}의 상세 정보를 가져오는 데 실패했습니다.`);
  }
  const data = await response.json();
  // 챔피언 상세 정보 반환
  return data.data[championId];
};
