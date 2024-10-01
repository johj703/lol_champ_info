import { fetchItemList } from "../../utils/serverApi";

export default async function ItemPage() {
  const items = await fetchItemList();
  return (
    <>
      <h1>아이템 목록</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>가격: {item.gold.total}골드</p>
          </li>
        ))}
      </ul>
    </>
  );
}
