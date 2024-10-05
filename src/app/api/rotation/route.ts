import { NextResponse } from "next/server";

const RIOT_API_URL =
  "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations";

export async function GET() {
  // 환경변수에서 API 키 가져오기
  const apiKey = process.env.RIOT_API_KEY;

  // API 키가 없는 경우 에러 반환
  if (!apiKey) {
    return NextResponse.json(
      { message: "API 키를 찾을 수 없습니다." },
      { status: 500 }
    );
  }

  try {
    // Riot API 호출
    const response = await fetch(RIOT_API_URL, {
      headers: {
        // API 키를 헤더에 포함
        "X-Riot-Token": apiKey,
      },
    });

    // 응답이 실패한 경우 에러 반환
    if (!response.ok) {
      return NextResponse.json(
        { message: "Riot Games API에서 데이터를 가져오는데 실패 했습니다." },
        { status: response.status }
      );
    }

    // 응답 데이터를 JSON으로 반환
    const data = await response.json();
    console.log(data);
    // 데이터 응답
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // 예외 발생 시 에러 처리
    return NextResponse.json(
      { message: "데이터를 가져오는 동안 오류가 발생했습니다.", error },
      { status: 500 }
    );
  }
}
