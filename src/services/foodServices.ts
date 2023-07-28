import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Food } from "../entities/Food";
import { reptileRepository } from "./reptileServices";
import { categoryRepository } from "./categoryServices";
import { CreateFoodInput } from "../inputs/CreateFoodInput";

export const foodRepository: Repository<Food> = dataSource.getRepository(Food);

const FOOD_IS = "Nourriture "

enum PredatorFood {
    ALIVE = "vivante",
    FROZEN = "surgelée",
}

enum PreyFood {
    WET = "humide",
    PREY = "pour proies",
}

export default {
    create: async (food: CreateFoodInput, foodPicture: string): Promise<Food> => {
        const newFood = new Food();
        newFood.foodName = food.foodName;
        newFood.foodCategory = food.foodCategory;
        newFood.foodPrice = food.foodPrice;
        newFood.foodPicture = foodPicture;
        return await foodRepository.save(newFood);
      },
    
    getAll: async (): Promise<Food[]> => {
        return await foodRepository.find();
    },

    getFoodByFilter: async (filter: string): Promise<Food[]> => {
        if (filter === "proies") {
            return await foodRepository.find({
                where: [
                    { foodCategory: FOOD_IS + PreyFood.WET },
                    { foodCategory: FOOD_IS + PreyFood.PREY },
                ]  
            })
        }

        if (filter === "reptiles") {
            return await foodRepository.find({
                where: [
                    { foodCategory: FOOD_IS + PredatorFood.ALIVE },
                    { foodCategory: FOOD_IS + PredatorFood.FROZEN },
                ]  
            })
        }
        return await foodRepository.find();
    },
}