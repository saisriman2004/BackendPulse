import { Request, Response } from "express";

const services = [
  {
    id: 1,
    name: "Portfolio API",
    url: "https://portfolio-api.com/health",
    expectedStatus: 200,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Metaverse API",
    url: "https://metaverse-api.com/health",
    expectedStatus: 200,
    createdAt: new Date().toISOString()
  }
];

export const getServices = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    count: services.length,
    data: services
  });
};