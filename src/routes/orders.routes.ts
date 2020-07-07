import { Router } from 'express';

import db from '../database';

import CreateOrderService from '../services/CreateOrderService';
import UpdateOrderService from '../services/UpdateOrderService';

const ordersRouter = Router();

ordersRouter.get('/', async (request, response) => {
  const data: FirebaseFirestore.DocumentData[] = [];

  const snapshot = await db.collection('orders').where('uid', '>', '').get();
  if (snapshot.empty) {
    console.log('No such document!');
  } else {
    snapshot.forEach(doc => {
      data.push(doc.data());
    });
  }
  console.log(data);
  return response.json(data);
});

ordersRouter.get('/:orderId', async (request, response) => {
  const { orderId } = request.params;

  const document = db.collection('orders');
  const orderRef = document.doc(orderId);
  const doc = await orderRef.get();

  console.log(doc.data());
  return response.json(doc.data());
});

ordersRouter.post('/', async (request, response) => {
  const { title, bookingDate, address, customer } = request.body;

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
    uid: orderId,
    title,
    bookingDate,
  });

  return response.json(orderUpdated);
});

export default ordersRouter;
