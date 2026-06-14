import { seriesModel } from "../models/series.model.js";

class SeriesRepositroy {
  async create(data) {
    return await seriesModel.create(data);
  }

  async findByName(name) {
    return await seriesModel.findOne({
      name,
      isDeleted: false,
    });
  }

  async findAll() {
    return await seriesModel.find({ isDeleted: false }).sort({ createdAt: -1 });
  }
  async findById(id) {
    return await seriesModel.findOne({
      _id: id,
      isDeleted: false,
    });
  }
  
  async findBySeason(season) {
    return await seriesModel.findOne({
      season,
      isDeleted: false,
    });
  }

  async updateById(id, data) {
    return await seriesModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async softDeleteById(id, userId) {
    return await seriesModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
        updatedBy: userId,
      },
      { new: true },
    );
  }
}


export const seriesRepo = new SeriesRepositroy()