import { Express } from 'express';
import { getAllEstablishments } from '../controllers/foodEstablishmentController';


function router(app: Express) {
    app.get("/", getAllEstablishments)
  }
  
  export default router;