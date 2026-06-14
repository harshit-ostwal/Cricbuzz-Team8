import ApiResponse from "../../core/http/api.response.js";
import { seriesService } from "./series.service.js";

class SeriesController {

    async createSeries(req, res) {
      const userId = req.user.id
      const reponseData = await seriesService.createSeries(req.body, userId)

     return ApiResponse.created(reponseData, "Series created successfully").send(res)
    }

    async getAllSeries(req, res) {
        const reponseData = await seriesService.getAllSeries()

       return ApiResponse.ok(reponseData, "Get all seires successfully").send(res)
    }
}


export const seriesController = new SeriesController()