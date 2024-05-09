import { ApiResponse, ApisauceInstance } from "apisauce"

// services
import { GeneralApiProblem, getGeneralApiProblem } from "../api/apiProblem"

// interfaces
import { LoginInfo } from "./auth.types"

// async storage
import { saveString } from "../../utils/storage/storage"

export class AuthApi {
  private api: ApisauceInstance

  constructor(api: ApisauceInstance) {
    this.api = api
  }

  async postLogin(payload: LoginInfo): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    try {
      const response: ApiResponse<any> = await this.api.post(`/auth/login`, payload)
      if (response.ok) {
        this.api.setHeader("Authorization", `Bearer ${response.data.access_token}`)
        await saveString("refresh_token", response.data.refresh_token)
        await saveString("access_token", response.data.access_token)
        return { kind: "ok", data: response.data.id }
      }
      throw new Error(JSON.stringify(getGeneralApiProblem(response)))
    } catch (e) {
      console.log(e)
      return { kind: "unknown", temporary: true }
    }
  }
}
