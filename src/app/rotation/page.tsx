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
        // API로부터 받은 데이터를 확인
        console.log("API 응답 데이터: ", data);
        setChampions(data);
        setLoading(false);
      } catch (error) {
        console.error("챔피언 로테이션 데이터를 가져오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>로딩 중 입니다.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {champions.length > 0 ? (
        champions.map((champion) => (
          <div key={champion.id}>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
              alt={champion.name}
              width={400}
              height={200}
            />
            <h2>{champion.name}</h2>
          </div>
        ))
      ) : (
        <p>챔피언 데이터를 불러오는 중입니다.</p>
      )}
    </div>
  );
};

export default RotationPage;
