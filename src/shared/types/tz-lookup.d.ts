declare module 'tz-lookup' {
  /**
   * 위도와 경도를 받아 IANA 타임존 ID를 반환
   * @param lat 위도 (Latitude)
   * @param lng 경도 (Longitude)
   * @returns IANA timezone string (예: 'Asia/Seoul')
   */
  function tzlookup(lat: number, lng: number): string;
  export default tzlookup;
}