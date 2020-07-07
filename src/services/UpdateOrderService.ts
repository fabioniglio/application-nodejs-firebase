import db from '../database';

interface IRequest {
  uid: string;
  title: string;
  bookingDate: string;
}

class UpdateOrderService {
  public async execute({ uid, title, bookingDate }: IRequest): Promise<any> {
    const document = db.collection('orders');

    const orderBody = {
      title,
      bookingDate,
    };
    const order = await document.doc(uid).update(orderBody);

    return order;
  }
}

export default UpdateOrderService;
