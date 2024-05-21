import { Request, Response } from "express";
import FoodEstablishment from "../models/foodEstablishment";


const getAllEstablishments = async (req: Request, res: Response) => {
    try {
        let establishments = await FoodEstablishment.findAll({});
        res.status(200).send(establishments);
    } catch (error) {
        console.error("Error fetching establishments:", error);
        res.status(500).send("Internal server error");
    }
}

export { getAllEstablishments };