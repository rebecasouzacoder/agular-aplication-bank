export interface IBankDetailsResponse {
    id: number
    status: Status
    descricao: string
    codigo: string
  }
  
  export interface Status {
    id: string
    descricao: string
  }