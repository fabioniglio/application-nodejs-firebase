import { uuid } from 'uuidv4';
import db from '../database';

interface IRequest {
  title: string;
  bookingDate: string;
  address: {
    city: string;
    country: string;
    street: string;
    zip: string;
  };
  customer: {
    email: string;
    name: string;
    phone: string;
  };
}

class CreateOrderService {
  public async execute({
    title,
    bookingDate,
    address,
    customer,
  }: IRequest): Promise<any> {
    const document = db.collection('orders');

    const orderBody = {
      uid: uuid(),
      title,
      bookingDate,
      address,
      customer,
    };
    const order = await document.doc(orderBody.uid).set(orderBody);

    return order;
  }
}

export default CreateOrderService;
