import {Router} from "express";
import {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
  } from "../controllers/service.controller";
const router = Router();
router.get("/",getServices);
router.post("/", createService);
router.get("/:id",getServiceById)
router.patch("/:id", updateService);
router.delete("/:id", deleteService);

export default router;