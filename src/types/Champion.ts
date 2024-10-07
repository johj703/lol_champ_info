export interface Champion {
  id: string;
  name: string;
  title: string;
  image: ChampionImage;
  blurb: string;
  key: string;
  type: string;
  version: string;
}

export interface ChampionData {
  data: Record<string, Champion>;
}

export interface ChampionDetail extends Champion {
  key: string;
  title: string;
  blurb: string;
  lore: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  type: string;
  version: string;
}

interface ChampionImage {
  full: string;
}
