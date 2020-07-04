import db from '../database';

interface IRequest {
  id: string;
  title: string;
  bookingDate: string;
}

class UpdateOrderService {
  public async execute({ id, title, bookingDate }: IRequest): Promise<any> {
    const document = db.collection('orders');

    const orderBody = {
      title,
      bookingDate,
    };
    const order = await document.doc(id).update(orderBody);

    return order;
  }
}

export default UpdateOrderService;
