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
    FlatHPPoolMod?: number;
    FlatMPPoolMod?: number;
    FlatArmorMod?: number;
    FlatPhysicalDamageMod?: number;
  };
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
