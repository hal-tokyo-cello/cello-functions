import { MemoryDatabase } from "../db/memory";
import { ApiError, ApiResponse } from "../types";

export const isApiError = (res: ApiResponse<any>): res is ApiError => res.body.error != undefined;

export class TestMemoryDB extends MemoryDatabase {
  public static refresh(): TestMemoryDB {
    this.storage = new TestMemoryDB();
    return this.instance;
  }
}
