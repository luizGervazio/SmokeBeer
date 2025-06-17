import  api  from '../../api';

export async function getWines() {
  const { data } = await api.get('/wines');
  return data;
}

export function EditWine(id: number, wine: any) {
  return api.put(`/wines/${id}`, wine);
}

export function CreateWine(wine: any) {
  return api.post('/wines', wine);
}

export function DeleteWineAPI(id: number) {
  return api.delete(`/wines/${id}`);
}