import { ApiResponse, ApisauceInstance } from "apisauce"

// services
import { GeneralApiProblem, getGeneralApiProblem } from "../api/apiProblem"

export class ParkingTicketApi {
  private api: ApisauceInstance

  constructor(api: ApisauceInstance) {
    this.api = api
  }

  async getMyParkingTicket(): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    try {
      const response: ApiResponse<any> = await this.api.get(`/parking-tickets/my`)
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
