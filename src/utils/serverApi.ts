"use server";

import axios from "axios";
import { Champion } from "../types/Champion";
import { Item } from "@/types/Item";

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
// export interface Champion {
//   id: string;
//   name: string;
//   image: {
//     full: string;
//   };
// }

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

  const championType: Champion[] = Object.values(championData.data);
  console.log(championType);

  // 챔피언 데이터를 champion 타입으로 Mapping!
  const champions: Champion[] = championType.map((champion) => ({
    id: champion.id,
    name: champion.name,
    image: champion.image,
    title: champion.title,
    blurb: champion.blurb,
    key: champion.key,
  }));

  return champions;
}

export async function fetchChampionDetail(id: string) {
  try {
    // 버전 정보 가져오기
    const versionResponse = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    // 최신 버전은 배열의 첫 번째 요소
    const latestVersion = versionResponse.data[0];

    // 챔피언 정보 기져오기
    const url = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion/${id}.json`;
    const response = await axios.get(url, {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY,
      },
    });

    // 챔피언 데이터 추출
    const championData = response.data.data[id];

    // 방어 코드 추가: 챔피언 데이터를 찾지 못한 경우 에러 처리
    if (!championData) {
      throw new Error(`챔피언 정보를 찾을 수 없습니다: ${id}`);
    }

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
  } catch (error) {
    console.log("API 요청 중 에러:", error);
    throw new Error("API 호출 실패");
  }
}

export const fetchItemList = async () => {
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
  // console.log(itemsData);
  const items: Item[] = Object.values(itemsData.data);

  // 데이터를 Item 타입의 배열로 변환해서 반환
  return { items: items, versions: versions[0] };
};

export async function getChampionRotation(): Promise<Champion[]> {
  // 무료 로테이션 챔피언 목록 가져오기
  const rotationResponse = await fetch("http://localhost:3000/api/rotation", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!rotationResponse.ok) {
    throw new Error(`HTTP 오류! 상태: ${rotationResponse.status}`);
  }

  const rotationData = await rotationResponse.json();
  console.log("무료 챔피언 목록: ", rotationData.freeChampionIds);

  // 전체 챔피언 데이터 가져오기
  const championsData: Champion[] = await fetchChampionList();

  // 무료 로테이션 챔피언 ID에 해당하는 챔피언 정보 필터링
  const freeChampions = rotationData.freeChampionIds
    .map((id: number): Champion | null => {
      const championKey = championsData.find(
        (item) => item.key === id.toString()
      );

      return championKey || null; // championKey가 없으면 null 반환
    })
    .filter(
      (champion: Champion | null): champion is Champion => champion !== null
    );

  return freeChampions;
}
