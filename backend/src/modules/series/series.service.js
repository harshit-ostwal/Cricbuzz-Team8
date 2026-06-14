import { da } from "zod/v4/locales";
import ApiError from "../../core/http/api.error.js";
import { seriesRepo } from "../../repository/series.repository.js";

class SeriesService {
  async createSeries(data, userId) {
    // check series  name and season alrady exist thorw error
    const existingName = await seriesRepo.findByName(data.name);

    if (existingName) {
      throw ApiError.conflict("Series name already exists");
    }

    const existingSeason = await seriesRepo.findBySeason(data.season);

    if (existingSeason) {
      throw ApiError.conflict("Series season already exists");
    }

    return await seriesRepo.create({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  async getAllSeries() {
     return await seriesRepo.findAll()
  }
}

export const seriesService = new SeriesService();
