export interface IListBank {
    content: Content[]
    pageable: Pageable
    totalPages: number
    last: boolean
    totalElements: number
    first: boolean
    sort: Sort
    numberOfElements: number
    size: number
    number: number
    empty: boolean
  }
  
  export interface Content {
    id: number
    status: Status
    descricao: string
    codigo: string
    selected?: Boolean
  }
  
  export interface Status {
    id: string
    descricao: string
  }
  
  export interface Pageable {
    sort: Sort
    pageSize: number
    pageNumber: number
    offset: number
    paged: boolean
    unpaged: boolean
  }
  
  export interface Sort {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  

  