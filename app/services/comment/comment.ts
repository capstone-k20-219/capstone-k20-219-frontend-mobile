import { ApiResponse, ApisauceInstance } from "apisauce"

// services
import { GeneralApiProblem, getGeneralApiProblem } from "../api/apiProblem"

// interfaces
import { CommentInfo } from "./comment.types"

export class CommentApi {
  private api: ApisauceInstance

  constructor(api: ApisauceInstance) {
    this.api = api
  }

  async postComment(payload: CommentInfo): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    try {
      const response: ApiResponse<any> = await this.api.post(`/comments`, payload)
      if (response.ok) {
        return { kind: "ok", data: response.data }
      }
      throw new Error(JSON.stringify(getGeneralApiProblem(response)))
    } catch (e) {
      console.log(e)
      return { kind: "unknown", temporary: true }
    }
  }

  async getServiceComments(
    serviceId: string,
  ): Promise<{ kind: "ok"; data: any } | GeneralApiProblem> {
    try {
      const response: ApiResponse<any> = await this.api.get(`/comments/services/${serviceId}`)
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
