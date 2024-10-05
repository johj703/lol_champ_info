"use client";

import { getChampionRotation } from "@/utils/serverApi";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Champion {
  id: number;
  name: string;
}

const RotationPage = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChampionRotation();
        // API의 챔피언 리스트 형식에 맞게 수정
        setChampions(data.freeChampionIds);
        setLoading(false);
      } catch (error) {
        setError("챔피언 로테이션 데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>챔피언 로테이션</h1>
      <ul>
        {champions.map((champion) => (
          <li key={champion.id}>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
              alt={champion.name}
              width={120}
              height={120}
            />
            <p>{champion.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RotationPage;
