import { Controller, Get, Route, SuccessResponse } from 'tsoa'

import { PreqinClient } from '../models/preqin-client'

@Route('health')
export class HealthCheckController extends Controller {
  /** @summary GetHealthCheck */
  @SuccessResponse('200', 'Ok')
  @Get()
  public async GetHealthCheck(): Promise<{ ok: boolean }> {
    return {
      ok: PreqinClient.getInstance().clientState === 'ready',
    }
  }
}
