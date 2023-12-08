import axios, { AxiosError } from 'axios'
import { GetManyParams, GetOneParams } from 'react-admin'

const baseURL = import.meta.env.VITE_BFF_BASE_URL as string

type AssetClass = 'PE' | 'PD' | 'RE' | 'INF' | 'NR' | 'HF'

export const AssetClassOptions: { key: AssetClass, value: string }[] = [{
  key: 'PE',
  value: 'Private Equity',
}, {
  key: 'PD',
  value: 'Private Debt',
}, {
  key: 'RE',
  value: 'Real Estate',
}, {
  key: 'INF',
  value: 'Infrastructure',
}, {
  key: 'NR',
  value: 'Natural Resources',
}, {
  key: 'HF',
  value: 'Hedge Funds',
}]

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

export type List<T> = {
  data: T[]
  meta: ListMeta
}

export interface ListMeta {
  total: number
  returned: number
  page: number
}

const resolveURL = (investor?: string, assetClass?: AssetClass): string => {
  if (!investor) return `/investors`
  if (investor && !assetClass) return `/investors/${investor}`
  return `/investors/${investor}/commitments/${assetClass}`
}

const handleAxiosError = (error: AxiosError) => Promise.reject({ status: error.code, data: error.message })

const getList = async (_resource: string, params: GetManyParams) => {
  const {meta:{investor, assetClass} = {}} = params
  console.log(_resource, investor, assetClass)
  try {
    const { data: { data, meta } } = await axios.get<List<unknown>>(resolveURL(investor, assetClass), {
      baseURL,
    })
    return Promise.resolve({
      data,
      pageInfo: {
        hasPreviousPage: meta.page !== 1,
        hasNextPage: meta.total > meta.page * meta.returned,
      }
    })
  } catch (err) {
    return handleAxiosError(err as AxiosError)
  }
}

const getOne = async (_resource: string, params: GetOneParams) => {
  const { id: investor } = params
  try {
    const { data } = await axios.get(resolveURL(investor), {
      baseURL,
    })
    return Promise.resolve({ data })
  } catch (err) {
    return handleAxiosError(err as AxiosError)
  }
}

const DataProvider = {
  getList,
  getOne,
  getMany: () => {throw new Error('getMany: NotImplemented')},
  create: () => {throw new Error('create: NotImplemented')},
  update: () => {throw new Error('update: NotImplemented')},
  delete: () => {throw new Error('delete: NotImplemented')},
}

export default DataProvider
