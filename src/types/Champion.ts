export interface Champion {
  id: string;
  name: string;
  image: string;
}

export interface ChampionDetail extends Champion {
  title: string;
  blurb: string;
  lore: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
}
