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
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-4">아이템 목록</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
              alt={item.name}
              width={200}
              height={100}
              className="mb-2 rounded-md"
            />
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p className="text-gray-400">가격: {item.gold.total}골드</p>
            <p className="text-gray-400">팔 때: {item.gold.sell}골드</p>
            <p className="text-gray-300">{item.plaintext}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemPage;
