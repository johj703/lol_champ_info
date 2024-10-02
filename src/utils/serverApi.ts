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

// Champion 타입 정읭
export interface Champion {
  id: string;
  name: string;
  image: {
    full: string;
  };
}

// champion 정보를 포함하는 객체
interface ChampionData {
  data: Record<string, Champion>;
}

// Champion 목록 가져오기 함수
export const fetchChampionList = async (): Promise<Champion[]> => {
  const versionRes = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const versions = await versionRes.json();
  const latestVersion = versions[0];

  const championRes = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`
  );
  const championData = await championRes.json();

  return Object.values(championData.data).map((champion) => {
    const champ = champion as Champion;
    return {
      id: champ.id,
      name: champ.name,
      image: champ.image,
    };
  });
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

// Item 타입 정의
export interface Item {
  id: string;
  name: string;
  gold: {
    base: number;
    total: number;
  };
  description: string;
}

export const fetchItemList = async (): Promise<Item[]> => {
  const versionRes = await fetch(
    `https://ddragon.leagueoflegends.com/api/versions.json`
  );
  const versions = await versionRes.json();
  // 가장 최신 버전을 가지고 오기
  const latestVersion = versions[0];

  const itemsRes = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/item.json`
  );
  const itemsData = await itemsRes.json();

  // 데이터를 Item 타입의 배열로 변환해서 반환
  return Object.values(itemsData.data).map((item: any) => ({
    id: item.id,
    name: item.name,
    gold: item.gold,
    description: item.description,
  }));
};
