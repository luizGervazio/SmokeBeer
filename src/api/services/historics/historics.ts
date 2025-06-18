import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode"; // ✅ certo
import api from "../../api";

interface DecodedToken {
  name: string;
}

export async function getHisoricy() {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("Token não encontrado");

  const decoded = jwtDecode<DecodedToken>(token);
  const username = decoded.name;

  const response = await api.get(`/order/name/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export function calculateTotalSpent(
  purchases: Array<{ totalPrice: string }>
): number {
  return purchases.reduce((acc, purchase) => {
    const price = parseFloat(purchase.totalPrice);
    return acc + (isNaN(price) ? 0 : price);
  }, 0);
}