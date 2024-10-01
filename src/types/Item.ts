export interface Item {
  id: number;
  name: string;
  description: string;
  gold: {
    base: number;
    total: number;
    sell: number;
    purchasable: boolean;
  };
  stats: {
    // 체력 증가
    FlatHPPoolMod?: number;
    // 마나 증가
    FlatMPPoolMod?: number;
    // 방어력 증가
    FlatArmorMod?: number;
    // 공격력 증기
    FlatPhysicalDamageMod?: number;
  };
  image: {
    // 이미지 파일명
    full: string;
    // 스프라이트 파일명
    sprite: string;
    // 이미지 그룹
    group: string;
    // 스프라이트 x 위치
    x: number;
    // 스프라이트 y 위치
    y: number;
    // 스프라이트 너비
    w: number;
    // 스프라이트 높이
    h: number;
  };
}
