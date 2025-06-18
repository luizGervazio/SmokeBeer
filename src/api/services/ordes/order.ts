import  api  from '../../api';


export function NewOrder(order: any) {
  return api.post('/order', order);
}