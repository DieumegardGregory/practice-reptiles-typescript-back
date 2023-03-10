import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Reptile } from "../entities/Reptile";
import { Family } from "../entities/Family";
import { Order } from "../entities/Order";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "gregrun",
  password: "example",
  database: "reptiles",
  synchronize: true,
  entities: [User, Reptile, Family, Order],
});
