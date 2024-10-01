export interface Champion {
  id: string;
  name: string;
  title: string;
  blurb: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface ChampionDetail extends Champion {
  lore: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  partype: string[];
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    attackdamage: number;
    armor: number;
  };
}
