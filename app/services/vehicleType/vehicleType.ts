import { ApiResponse, ApisauceInstance } from "apisauce"

// services
import { GeneralApiProblem, getGeneralApiProblem } from "../api/apiProblem"

export class VehicleTypeApi {
  private api: ApisauceInstance

  constructor(api: ApisauceInstance) {
    this.api = api
  }

  async getVehicleType(): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.api.get(`/vehicle-types`)
    if (response.ok) {
      return { kind: "ok", data: response.data }
    } else {
      return getGeneralApiProblem(response)
    }
  }
}
