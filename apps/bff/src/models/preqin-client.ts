import axios, { AxiosError } from 'axios'
import querystring from 'querystring'

import { getEnv } from '../utils'

// TODO: Reduce code duplication, e.g. axios client

const BASE_URL = getEnv('PREQIN_BASE_URL', 'string', '')
const CLIENT_ID = getEnv('PREQIN_CLIENT_ID', 'string', '')
const CLIENT_SECRET = getEnv('PREQIN_CLIENT_SECRET', 'string', '')
const IN_SCOPE_FIRMS = getEnv('IN_SCOPE_FIRMS', 'string', '')

const RESOURCES = ['Investor', 'InvestorCommitment', 'Token', 'RefreshToken'] as const
type Resource = (typeof RESOURCES)[number]

const INVESTOR_COMMITMENT_TYPES = ['PE', 'PD', 'RE', 'INF', 'NR', 'HF'] as const
export type InvestorCommitmentType = (typeof INVESTOR_COMMITMENT_TYPES)[number]

export interface InvestorDto {
  firmID: string
  firmName: string
  address: string
  city: string
  state: string
  country: string
  // ...Additional Props
}

export interface InvestorDtoList {
  data: InvestorDto[]
  meta: ListMeta
}

export interface CommitmentDto {
  investorId: string
  investorName: string
  fundId: string
  fundName: string
  fundManagerId: string
  fundManagerName: string
  fundCurrency: string
  fundSizeMn: string
  committedMn: string
  vintage: string
  fundType: string
  primarySector: string
  domicile: string
  benchmarkLocations: string
  managerExperience: string
}

export interface CommitmentDtoList {
  data: CommitmentDto[]
  meta: ListMeta
}

export interface ListMeta {
  total: number
  returned: number
  page: number
}

class PrivatePreqinClient {
  private token: string = ''
  private tokenExp: number = 0

  public clientState: 'off' | 'init' | 'ready' = 'off'

  constructor() {
    if (this.clientState === 'off') {
      this.init().catch((err) => {
        console.error(err)
        process.exit(1)
      })
    }
  }

  private resolveApiPath: Record<Resource, (...args: any[]) => string> = {
    Investor: () => '/api/investor',
    Token: () => '/connect/token',
    RefreshToken: () => '/connect/refresh_token',
    InvestorCommitment: ({
      commitmentType,
      investorId,
    }: {
      commitmentType: InvestorCommitmentType
      investorId: string
    }) => `/api/investor/commitment/${commitmentType}/${investorId}`,
  }

  private async init(): Promise<void> {
    this.clientState = 'init'
    const token = await this.getToken()
    if (!token) {
      return this.init()
    }
    this.refreshToken(token[0], token[1])
    this.clientState = 'ready'
  }

  private async getToken(): Promise<undefined | [string, number]> {
    try {
      const { data } = await axios.post<{
        access_token: string
        expires_in: number
        token_type: string
        refresh_token: string
      }>(
        this.resolveApiPath.Token(),
        querystring.stringify({
          username: CLIENT_ID,
          apikey: CLIENT_SECRET,
        }),
        {
          baseURL: BASE_URL,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      this.token = data.access_token
      this.tokenExp = data.expires_in + Date.now()
      return [data.refresh_token, data.expires_in]
    } catch (err) {
      console.error(err)
      return
    }
  }

  private async refreshToken(refreshToken: string, waitForMs: number): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(async () => {
        try {
          const { data } = await axios.post<{
            access_token: string
            expires_in: number
            token_type: string
            refresh_token: string
          }>(
            this.resolveApiPath.RefreshToken(),
            querystring.stringify({
              refresh_token: refreshToken,
            }),
            {
              baseURL: BASE_URL,
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          this.token = data.access_token
          this.tokenExp = data.expires_in + Date.now()
          this.refreshToken(data.refresh_token, data.expires_in)
        } catch (err) {
          console.error(err)
          const msToExp = this.tokenExp - Date.now()
          this.refreshToken(refreshToken, msToExp > 0 ? msToExp : 0)
        }
        resolve()
      }, waitForMs / 2),
    )
  }

  public async fetchInvestorList(): Promise<undefined | InvestorDtoList> {
    try {
      const { data } = await axios.get<InvestorDtoList>(this.resolveApiPath.Investor(), {
        baseURL: BASE_URL,
        params: {
          FirmID: IN_SCOPE_FIRMS,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      })
      return data
    } catch (err) {
      const { status, response } = err as AxiosError
      console.error(status, response?.data)
      return
    }
  }

  public async fetchInvestor(investorId: string): Promise<undefined | InvestorDto> {
    try {
      const { data } = await axios.get<InvestorDtoList>(this.resolveApiPath.Investor(), {
        baseURL: BASE_URL,
        params: {
          FirmID: investorId,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      })
      return data.data[0]
    } catch (err) {
      const { status, response } = err as AxiosError
      console.error(status, response?.data)
      return
    }
  }

  public async fetchCommitmentList(
    investorId: string,
    commitmentType: InvestorCommitmentType,
  ): Promise<undefined | CommitmentDtoList> {
    try {
      const { data } = await axios.get<CommitmentDtoList>(
        this.resolveApiPath.InvestorCommitment({ investorId, commitmentType }),
        {
          baseURL: BASE_URL,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
        },
      )
      return data
    } catch (err) {
      const { status, response } = err as AxiosError
      console.error(status, response?.data)
      return
    }
  }
}

export class PreqinClient {
  private static instance: PrivatePreqinClient

  constructor() {
    throw new Error('Use PreqinClient.getInstance()')
  }

  public static getInstance(): PrivatePreqinClient {
    if (!PreqinClient.instance) {
      PreqinClient.instance = new PrivatePreqinClient()
    }
    return PreqinClient.instance
  }
}
