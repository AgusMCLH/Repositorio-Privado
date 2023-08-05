export default class ProductToAddToCartDTO {
  constructor(req = null) {
    this.c_id = req.params.cid;
    this.p_id = req.params.pid;
    this.req = req;
  }
}
