import { PowerConsumption } from '../entity/PowerConsumption';
import { PowerConsumptionStore } from '../store/PowerConsumptionStore';

const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const router = require('koa-router')();

app.use(cors());
app.use(koaBody());

const store = new PowerConsumptionStore();

router.post('/power-consumption', (ctx: any) => {
    let powerConsumption = PowerConsumption.fromRequest(ctx.request.body);
    store.add(powerConsumption);
    ctx.body = powerConsumption;
  }
);
router.get('/power-consumption', (ctx: any) => {
    ctx.body = store.getAll();
  }
);

app.use(router.routes());

app.listen(3000);
