
export const IS_DEBUG: boolean = true

const DEV_URL: string = 'http://185.182.219.90/admin'
const PROD_URL: string = 'https://doschamp.doscar.kz/admin'

export const BASE_URL: string = IS_DEBUG ? DEV_URL : PROD_URL
