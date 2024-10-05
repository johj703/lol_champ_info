"use client";

// import { getChampionRotation } from "@/utils/serverApi";
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
    const fetchChampionRotation = async () => {
      try {
        // console.log(champions);
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/rotation");
        if (!response.ok) {
          const errorBody = await response.text();
          console.error("서버 응답:", response.status, errorBody);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const getChampions = await response.json();
        console.log(getChampions.freeChampionIds);
        // 응답 데이터 확인
        console.log("API 응답: ", getChampions);
        setChampions(getChampions.freeChampionIds);
      } catch (error) {
        console.log("에러 내용:", error);
        // 타입 가드(Type Guard) 사용
        if (error instanceof Error) {
          setError("데이터를 가져오는 중 오류가 발생했습니다." + error.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchChampionRotation();
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
        <p>로테이션 챔피언이 없습니다.</p>
      )}
    </div>
  );
};

export default RotationPage;
