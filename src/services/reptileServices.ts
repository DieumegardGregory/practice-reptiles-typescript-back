import { Repository } from "typeorm";
import { Reptile } from "../entities/Reptile";
import { dataSource } from "../tools/utils";
import { Family } from "../entities/Family";
import { familyRepository } from "./familyServices";

export const reptileRepository: Repository<Reptile> =
  dataSource.getRepository(Reptile);

export default {
  create: async (reptile: Reptile): Promise<Reptile> => {
    return await reptileRepository.save(reptile);
  },

  getAll: async (): Promise<Reptile[]> => {
    return await reptileRepository.find();
  },

  getReptileById: async (id: number): Promise<Reptile> => {
    return await reptileRepository.findOneByOrFail({ id });
  },

  getReptileByName: async (name: string): Promise<Reptile> => {
    return await reptileRepository.findOneByOrFail({ name });
  },

  addToFamily: async (name: string, type: string): Promise<Reptile> => {
    const reptileToAdd: Reptile = await reptileRepository.findOneByOrFail({
      name,
    });
    const targetFamily: Family = await familyRepository.findOneByOrFail({
      type,
    });
    if (reptileToAdd === null || targetFamily === null) {
      throw new Error("Erreur à l'ajout de la famille ");
    }
    reptileToAdd.family = targetFamily;
    return await reptileRepository.save(reptileToAdd);
  },
};
