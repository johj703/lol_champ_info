"use server";

import axios from "axios";
import { Champion, ChampionDetail } from "../types/Champion";

const RIOT_API_KEY = "RGAPI-205439c5-ace5-49fa-821f-88d15ec224a0";
const BASE_URL =
  "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations";

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
    (champion) => ({
      id: champion.id,
      name: champion.name,
      image: champion.image.full,
      title: champion.title,
      blurb: champion.blurb,
    })
  );

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
    console.log(
      "API 요청 중 에러:",
      error.response ? error.response.data : error.message
    );
    throw new Error("API 호출 실패");
  }
}

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

export const getChampionRotation = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        "X-Riot-Token": RIOT_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log(
      "챔피언 로테이션 데이터를 가져오는 중 오류가 발생했습니다.",
      error
    );
    throw error;
  }
};
