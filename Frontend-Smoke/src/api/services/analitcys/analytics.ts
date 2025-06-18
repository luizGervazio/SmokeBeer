import api from "../../api";

export async function SumAndCount() {
  const { data } = await api.get("/order/sum");
  console.log(data)
  return data;
}

export async function getTablesData() {
    const { data } = await api.get("/order")
    return data;
}