import {Router} from "express";
import {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService,
    checkService
  } from "../controllers/service.controller";
const router = Router();
router.get("/",getServices);
router.post("/", createService);
router.get("/:id",getServiceById)
router.patch("/:id", updateService);
router.delete("/:id", deleteService);
router.post("/:id/check", checkService);

export default router;