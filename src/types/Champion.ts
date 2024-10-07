export interface Champion {
  id: string;
  name: string;
  title: string;
  image: string;
  key: string;
}

export interface ChampionDetail extends Champion {
  key: string;
  title: string;
  blurb: string;
  lore: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
}
