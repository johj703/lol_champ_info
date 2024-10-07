import { fetchItemList, Item } from "../../utils/serverApi";

const ItemPage = async () => {
  // 서버에서 데이터 가지고 오기
  const items: Item[] = await fetchItemList();
  return (
    <>
      <h1>아이템 목록</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.plaintext}</p>
            <p>가격: {item.gold.total}골드</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ItemPage;
