import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Category, CategoryName } from "../entities/Category";

export const categoryRepository: Repository<Category> = dataSource.getRepository(Category);

export default {
    create: async (categoryName: CategoryName, categoryImage: string): Promise<Category> => {
        let newCategory = new Category();
        newCategory.categoryName = categoryName;
        newCategory.categoryImage = categoryImage;
        return await categoryRepository.save(newCategory);
    },

    getOne: async (categoryName: CategoryName): Promise<Category> => {
        return await categoryRepository.findOneByOrFail({ categoryName });
    },

    getAll: async (): Promise<Category[]> => {
        return await categoryRepository.find();
    },
}