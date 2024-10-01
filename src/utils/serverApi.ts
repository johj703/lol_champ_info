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
