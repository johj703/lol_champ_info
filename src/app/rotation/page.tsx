"use client";

import Image from "next/image";
import { useState } from "react";

interface Champion {
  id: number;
  name: string;
}

const RotationPage = () => {
  const [champions, setChampions] = useState<Champion[]>([]);

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
