import { Router } from 'express';

import db from '../database';

import CreateOrderService from '../services/CreateOrderService';
import UpdateOrderService from '../services/UpdateOrderService';

const ordersRouter = Router();

ordersRouter.get('/', async (request, response) => {
  const data: FirebaseFirestore.DocumentData[] = [];

  const snapshot = await db.collection('orders').get();
  if (snapshot.empty) {
    console.log('No such document!');
  } else {
    snapshot.forEach(doc => {
      data.push(doc.data());
      console.log(doc.id, '=>', doc.data());
    });
  }

  return response.json(data);
});

ordersRouter.post('/', async (request, response) => {
  const { title, bookingDate, address, customer } = request.body;
  console.log(request.body);
  const createOrder = new CreateOrderService();

  const order = await createOrder.execute({
    title,
    bookingDate,
    address,
    customer,
  });

  return response.json(order);
});

ordersRouter.put('/:orderId', async (request, response) => {
  const { orderId } = request.params;

  const { title, bookingDate } = request.body;

  const updateOrder = new UpdateOrderService();

  const orderUpdated = await updateOrder.execute({
    id: orderId,
    title,
    bookingDate,
  });

  return response.json(orderUpdated);
});

export default ordersRouter;
