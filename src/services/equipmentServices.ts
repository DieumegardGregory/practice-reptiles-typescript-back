import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Equipment } from "../entities/Equipment";
import { CreateEquipmentInput } from "../inputs/CreateEquipmentInput";

export const equipmentRepository: Repository<Equipment> = dataSource.getRepository(Equipment);

export default {
    create: async (equipment: CreateEquipmentInput, equipmentPicture: string): Promise<Equipment> => {
        const newEquipment = new Equipment();
        newEquipment.equipmentName = equipment.equipmentName;
        newEquipment.equipmentDescription = equipment.equipmentDescription;
        newEquipment.equipmentDetails = equipment.equipmentDetails;
        newEquipment.equipmentPrice = equipment.equipmentPrice;
        newEquipment.equipmentPicture = equipmentPicture;
        return await equipmentRepository.save(newEquipment);
      },
    getAll: async (): Promise<Equipment[]> => {
        return await equipmentRepository.find();
    },
}