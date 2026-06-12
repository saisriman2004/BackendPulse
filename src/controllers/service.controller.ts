import { Request, Response } from "express";
import axios from "axios";

type Service = {
  id: number;
  name: string;
  url: string;
  expectedStatus: number;
  createdAt: string;
};

type CheckResult = {
    serviceId: number;
    status: "UP" | "DOWN";
    statusCode: number | null;
    expectedStatus: number;
    responseTime: number;
    checkedAt: string;
  };

const services: Service[] = [
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
const checks: CheckResult[] = [];

export const getServices = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    count: services.length,
    data: services
  });
};

export const createService = (req: Request, res: Response) => {
  const { name, url, expectedStatus } = req.body;

  if (!name || !url) {
    return res.status(400).json({
      success: false,
      message: "Please provide name and url"
    });
  }

  const newService: Service = {
    id: services.length + 1,
    name,
    url,
    expectedStatus: expectedStatus || 200,
    createdAt: new Date().toISOString()
  };

  services.push(newService);

  res.status(201).json({
    success: true,
    message: "Service created successfully",
    data: newService
  });
};


export const getServiceById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
  
    const service = services.find((service) => service.id === id);
  
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }
  
    res.status(200).json({
      success: true,
      data: service
    });
  };
  export const updateService = (req: Request, res: Response) => {
    const id = Number(req.params.id);
  
    const service = services.find((service) => service.id === id);
  
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }
  
    const { name, url, expectedStatus } = req.body;
  
    if (name !== undefined) {
      service.name = name;
    }
  
    if (url !== undefined) {
      service.url = url;
    }
  
    if (expectedStatus !== undefined) {
      service.expectedStatus = expectedStatus;
    }
  
    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service
    });
  };

  export const deleteService = (req: Request, res: Response) => {
    const id = Number(req.params.id);
  
    const serviceIndex = services.findIndex((service) => service.id === id);
  
    if (serviceIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }
  
    const deletedService = services.splice(serviceIndex, 1);
  
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: deletedService[0]
    });
  };

  export const checkService = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
  
    const serviceIndex = services.findIndex((service) => service.id === id);
  
    if (serviceIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }
  
    const service = services[serviceIndex];
  
    const startTime = Date.now();
  
    try {
      const response = await axios.get(service.url, {
        validateStatus: () => true
      });
  
      const responseTime = Date.now() - startTime;
  
      const isUp = response.status === service.expectedStatus;
  
      const checkResult: CheckResult = {
        serviceId: service.id,
        status: isUp ? "UP" : "DOWN",
        statusCode: response.status,
        expectedStatus: service.expectedStatus,
        responseTime,
        checkedAt: new Date().toISOString()
      };
  
      checks.push(checkResult);
  
      res.status(200).json({
        success: true,
        message: "Service checked successfully",
        data: checkResult
      });
    } catch (error) {
      const responseTime = Date.now() - startTime;
  
      const checkResult: CheckResult = {
        serviceId: service.id,
        status: "DOWN",
        statusCode: null,
        expectedStatus: service.expectedStatus,
        responseTime,
        checkedAt: new Date().toISOString()
      };
  
      checks.push(checkResult);
  
      res.status(200).json({
        success: true,
        message: "Service checked successfully",
        data: checkResult
      });
    }
  };