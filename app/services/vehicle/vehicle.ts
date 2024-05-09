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
    try {
      const response: ApiResponse<any> = await this.api.post(`/vehicles`, payload)
      if (response.ok) {
        return { kind: "ok", data: response.data }
      }
      throw new Error(JSON.stringify(getGeneralApiProblem(response)))
    } catch (e) {
      console.log(e)
      return { kind: "unknown", temporary: true }
    }
  }

  async getMyVehicles(): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    try {
      const response: ApiResponse<any> = await this.api.get(`/vehicles/my`)
      if (response.ok) {
        return { kind: "ok", data: response.data }
      }
      throw new Error(JSON.stringify(getGeneralApiProblem(response)))
    } catch (e) {
      console.log(e)
      return { kind: "unknown", temporary: true }
    }
  }

  async deleteVehicle(vehicleId: string): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    try {
      const response: ApiResponse<any> = await this.api.delete(`/vehicles/${vehicleId}`)
      if (response.ok) {
        return { kind: "ok", data: response.data }
      }
      throw new Error(JSON.stringify(getGeneralApiProblem(response)))
    } catch (e) {
      console.log(e)
      return { kind: "unknown", temporary: true }
    }
  }
}
