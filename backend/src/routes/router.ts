import { Express } from 'express';
import { createEstablishment, deleteEstablishment, getAllEstablishment } from '../controllers/foodEstablishmentController';


function router(app: Express) {
  // food establishment routes
  app.get("/getEstablishments", getAllEstablishment);
  app.post('/createEstablishment', createEstablishment);
  app.patch('/editEstablishment', deleteEstablishment);
  app.delete('/deleteEstablishment/:establishmentId', deleteEstablishment);

}

export default router;