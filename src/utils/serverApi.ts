import axios from "axios";
import { Champion, ChampionDetail } from "../types/Champion";

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

// Champion 타입 정의
export interface Champion {
  id: string;
  name: string;
  image: {
    full: string;
  };
}

// Champion 목록 가져오기 함수
export async function fetchChampionList(): Promise<Champion[]> {
  const versionResponse = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const versions = await versionResponse.json();
  const latestVersion = versions[0];
  const championResponse = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`
  );
  const championData = await championResponse.json();

  // 챔피언 데이터를 champion 타입으로 Mapping!
  const champions: Champion[] = Object.values(championData.data).map(
    (champion: any) => ({
      id: champion.id,
      name: champion.name,
      image: champion.image.full,
      title: champion.title,
      blurb: champion.blurb,
    })
  );

  return champions;
}

export const fetchChampionDetail = async (
  id: string
): Promise<ChampionDetail> => {
  const response = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/12.22.1/data/ko_KR/champion/${id}.json`
  );
  const championData = response.data.data[id];
  return {
    id: championData.id,
    name: championData.name,
    title: championData.title,
    image: championData.image.full,
    blurb: championData.blurb,
    lore: championData.lore,
    allytips: championData.allytips,
    enemytips: championData.enemytips,
    tags: championData.tags,
  };
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
