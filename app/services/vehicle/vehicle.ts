import { ApiResponse, ApisauceInstance } from "apisauce"

// services
import { GeneralApiProblem, getGeneralApiProblem } from "../api/apiProblem"

// interfaces
import { VehicleInfo } from "./vehicle.types"

export class VehicleApi {
  private api: ApisauceInstance

  constructor(api: ApisauceInstance) {
    this.api = api
  }

  async postVehicle(payload: VehicleInfo): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.api.post(`/vehicles`, payload)
    if (response.ok) {
      return { kind: "ok", data: response.data }
    } else {
      return getGeneralApiProblem(response)
    }
  }

  async postVehiclePublic(
    payload: VehicleInfo,
    userId: string,
  ): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.api.post(
      `/vehicles/public/user/${userId}`,
      payload,
    )
    if (response.ok) {
      return { kind: "ok", data: response.data }
    } else {
      return getGeneralApiProblem(response)
    }
  }

  async getMyVehicles(): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.api.get(`/vehicles/my`)
    if (response.ok) {
      return { kind: "ok", data: response.data }
    } else {
      return getGeneralApiProblem(response)
    }
  }

  async deleteVehicle(vehicleId: number): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.api.delete(`/vehicles/${vehicleId}`)
    if (response.ok) {
      return { kind: "ok", data: response.data }
    } else {
      return getGeneralApiProblem(response)
    }
  }
}
