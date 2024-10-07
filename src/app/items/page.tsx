import Image from "next/image";
import { fetchItemList } from "../../utils/serverApi";
import { Item } from "@/types/Item";

const ItemPage = async () => {
  // 서버에서 데이터 가지고 오기
  const result = await fetchItemList();

  const version = result.versions;
  const items: Item[] = result.items;
  console.log("items", items);
  return (
    <>
      <h1>아이템 목록</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
              alt={item.name}
              width={200}
              height={100}
            />
            <h2>{item.name}</h2>
            <p>가격: {item.gold.total}골드</p>
            <p>팔 때: {item.gold.sell}골드</p>
            <p>{item.plaintext}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ItemPage;
