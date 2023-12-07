import { Controller, Get, Route, SuccessResponse } from 'tsoa'

import {
  CommitmentDto,
  CommitmentDtoList,
  InvestorCommitmentType,
  InvestorDto,
  InvestorDtoList,
  ListMeta,
  PreqinClient,
} from '../models'

export interface Address {
  address: string
  city: string
  state: string
  country: string
}

export interface Investor {
  id: string
  name: string
  address: Address
}

export interface InvestorList {
  data: Investor[]
  meta: ListMeta
}

export interface InvestorCommitment {
  fundId: string
  fundName: string
  fundManagerId: string
  fundManagerName: string
  managerExperience: string
  fundCurrency: string
  fundSizeMn: string
  committedMn: string
  vintage: string
  primarySector: string
  benchmarkLocations: string
}

export interface InvestorCommitmentList {
  data: InvestorCommitment[]
  meta: ListMeta
}

export const mapInvestorDtoToEntity = (dto: InvestorDto): Investor => ({
  id: dto.firmID,
  name: dto.firmName,
  address: {
    address: dto.address,
    city: dto.city,
    state: dto.state,
    country: dto.country,
  },
})

export const mapInvestorListDtoToEntity = (dto: InvestorDtoList): InvestorList => ({
  data: dto.data.map(mapInvestorDtoToEntity),
  meta: dto.meta,
})

export const mapCommitmentDtoToEntity = ({
  fundId,
  fundName,
  fundManagerId,
  fundManagerName,
  managerExperience,
  fundCurrency,
  fundSizeMn,
  committedMn,
  vintage,
  primarySector,
  benchmarkLocations,
}: CommitmentDto): InvestorCommitment => ({
  fundId,
  fundName,
  fundManagerId,
  fundManagerName,
  managerExperience,
  fundCurrency,
  fundSizeMn,
  committedMn,
  vintage,
  primarySector,
  benchmarkLocations,
})

export const mapCommitmentListDtoToEntity = (dto: CommitmentDtoList): InvestorCommitmentList => ({
  data: dto.data.map(mapCommitmentDtoToEntity),
  meta: dto.meta,
})

@Route('investors')
export class InvestorsController extends Controller {
  /** @summary ListInvestors */
  @SuccessResponse('200', 'Ok')
  @Get()
  public async ListInvestors(): Promise<undefined | InvestorList> {
    const list = await PreqinClient.getInstance().fetchInvestorList()
    if (!list) {
      this.setStatus(404)
      return
    }
    return mapInvestorListDtoToEntity(list)
  }

  /** @summary GetInvestor */
  @SuccessResponse('200', 'Ok')
  @Get('{id}')
  public async GetInvestor(id: string): Promise<undefined | Investor> {
    const investor = await PreqinClient.getInstance().fetchInvestor(id)
    if (!investor) {
      this.setStatus(404)
      return
    }
    return mapInvestorDtoToEntity(investor)
  }

  /** @summary GetInvestorCommitments */
  @SuccessResponse('200', 'Ok')
  @Get('{id}/commitments/{commitmentType}')
  public async GetInvestorCommitments(
    id: string,
    commitmentType: InvestorCommitmentType,
  ): Promise<undefined | InvestorCommitmentList> {
    const commitments = await PreqinClient.getInstance().fetchCommitmentList(id, commitmentType)
    if (!commitments) {
      this.setStatus(404)
      return
    }
    return mapCommitmentListDtoToEntity(commitments)
  }
}
