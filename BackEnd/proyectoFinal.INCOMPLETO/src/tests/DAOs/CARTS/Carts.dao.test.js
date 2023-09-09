import { cartDAO } from '../../../DAO/Mongo/cart.DAO.js';
import Assert from 'assert';
import { logger } from '../../../middleware/logger.middleware.js';
import chai from 'chai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './src/config/.env' });
logger.info(`\n<<Mongo Test URL>>: ${process.env.MongoURL_Test}\n`);
logger.info('<<Carts DAO Test>>: Starting tests...\n');

await mongoose.connect(process.env.MongoURL_Test);

const assert = Assert.strict;

describe('Carts DAO', () => {
  before(async function () {
    mongoose.connection.collections.carts.drop().then((cart) => {
      done();
    });
  });
  it('should add a cart', async function () {
    cartDAO.addCart().then((cart) => {
      assert.equal(cart.products.length, 0);
      expect(cart.cartId).to.be.ok;
      done();
    });
  });
});
