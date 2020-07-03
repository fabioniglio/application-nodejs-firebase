import { Router } from 'express';

import CreateOrderService from '../services/CreateOrderService';

const ordersRouter = Router();

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

export default ordersRouter;
