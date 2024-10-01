export interface ChampionRotation {
  // 로테이션 챔피언 ID 목록
  freeChampionIds: number[];
  // 신규 플레이어 전용 로테이션 챔피언 ID 목록
  freeChampionIdsForNewPlayers: number[];
  // 신규 플레이어 레벨 한도
  maxNewPlayerLevel: number;
}
