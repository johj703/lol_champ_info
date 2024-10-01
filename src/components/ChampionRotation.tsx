import { ChampionRotation } from "@/types/ChampionRotation";
import { useEffect, useState } from "react";

export default function ChampionRotation() {
  const [rotationData, setRotationData] = useState<ChampionRotation | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API 호출 함수
    const fetchChampionRotation = async () => {
      try {
        // 로컬 API 엔드포인트 호출
        const response = await fetch("/api/rotation");
        if (!response.ok) {
          // 응답이 실패한 경우 오류 발생
          throw new Error("챔피언 로테이션 데이터를 가져오는데 실패했습니다.");
        }
        const data: ChampionRotation = await response.json();
        setRotationData(data);
      } catch (err: any) {
        setError(err.message || "알 수 없는 오류가 발생했습니다.");
      } finally {
        // 데이터를 모두 불러온 후 로딩 상태를 false로 변경
        setLoading(false);
      }
    };
    // 컴포넌트가 렌더링 될 때 API 호출 실행
    fetchChampionRotation();
  }, []);

  return (
    <div>
      <h1>무료 챔피언 로테이션</h1>
      <ul>
        {rotationData?.freeChampionIds.map((id) => (
          <li key={id}>Champion ID: {id}</li>
        ))}
      </ul>
    </div>
  );
}
