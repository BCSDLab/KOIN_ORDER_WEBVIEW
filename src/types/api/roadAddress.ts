export interface AddressSearchRequest {
  confmKey: string;
  currentPage: number;
  countPerPage: number;
  keyword: string;
  resultType?: 'xml' | 'json';
  hstryYn?: 'Y' | 'N';
  firstSort?: 'none' | 'road' | 'location';
  addInfoYn?: 'Y' | 'N';
}

export interface AddressSearchResponse {
  results: {
    common: CommonResponse;
    juso: Juso[];
  };
}

export interface CommonResponse {
  totalCount: string;
  currentPage: number;
  countPerPage: number;
  errorCode: string;
  errorMessage: string;
}

export interface Juso {
  roadAddr: string;
  roadAddrPart1: string;
  roadAddrPart2?: string;
  jibunAddr: string;
  engAddr: string;
  zipNo: string;
  admCd: string;
  rnMgtSn: string;
  bdMgtSn: string;
  detBdNmList?: string;
  bdNm?: string;
  bdKdcd: string;
  siNm: string;
  sggNm: string;
  emdNm: string;
  liNm?: string;
  rn: string;
  udrtYn: string; // '0' | '1'
  buldMnnm: number;
  buldSlno: number;
  mtYn: string; // '0' | '1'
  lnbrMnnm: number;
  lnbrSlno: number;
  emdNo: string;
  hstryYn: string;
  relJibun?: string;
  hemdNm?: string;
}
