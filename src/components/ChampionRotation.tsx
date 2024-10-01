import { ChampionRotation } from "@/types/ChampionRotation";
import { useState } from "react";

export default function ChampionRotation() {
  const [rotationData, setRotationData] = useState<ChampionRotation | null>(
    null
  );
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
