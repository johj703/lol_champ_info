"use client";

// import { getChampionRotation } from "@/utils/serverApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchChampionList } from "@/utils/serverApi";
import { Champion } from "@/types/Champion";

const RotationPage = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChampionRotation = async () => {
      try {
        // console.log(champions);
        setLoading(true);

        // 무료 로테이션 챔피언 목록 가져오기
        const rotationResponse = await fetch(
          "http://localhost:3000/api/rotation",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!rotationResponse.ok) {
          throw new Error(`HTTP 오류! 상태: ${rotationResponse.status}`);
        }
        const rotationData = await rotationResponse.json();
        console.log("무료 챔피언 목록: ", rotationData.freeChampionIds);

        // 전체 챔피언 데이터 가져오기
        const championsData: Champion[] = await fetchChampionList();

        // 무료 로테이션 챔피언 ID에 해당하는 챔피언 정보 필터링
        const freeChampions = rotationData.freeChampionIds
          .map((id: number) => {
            const championKey = championsData.find(
              (item) => item.key === id.toString()
            );

            // championKey가 존재하는 경우에만 데이터를 반환
            if (championKey) {
              return championKey;
            } else {
              console.warn(`ID ${id}에 해당하는 챔피언을 찾을 수 없습니다.`);
              // 해당 챔피언을 찾을 수 없는 경우 null 반환
              return null;
            }
          })
          .filter((champion): champion is Champion => champion !== null);

        console.log("무료 챔피언 데이터를 필터링했습니다: ", freeChampions);
        setChampions(freeChampions);
      } catch (error) {
        console.log("데이터를 가져오는 중 에러가 발생했습니다:", error);
        // 타입 가드(Type Guard) 사용
        if (error instanceof Error) {
          setError("데이터를 가져오는 중 오류가 발생했습니다." + error.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
        console.log("데이터 가져오기 완료!");
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
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-4">
        이번 주 무료 챔피언
      </h1>
      {champions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {champions.map((champion) => (
            <div
              key={champion.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
                alt={champion.name}
                width={200}
                height={100}
                className="mb-2 rounded-md"
              />
              <h2 className="text-lg font-bold text-center">{champion.name}</h2>
            </div>
          ))}
        </div>
      ) : (
        <p>로테이션 챔피언이 없습니다.</p>
      )}
    </div>
  );
};

export default RotationPage;
