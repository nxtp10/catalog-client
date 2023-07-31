
import { TSearchParams } from "../api/api_pb";


export const DEFAUFT_LOCATION = { lat: 55.75926820140689, lng: 37.61608880013228 }
export const DEFAULT_SEARCH_PARAMS: TSearchParams.AsObject = {
    shopid: 0,
    filterstr: '',
    limit: 50,
    minprice: 0,
    maxprice: 0,
    radius: 10,
    latitude: DEFAUFT_LOCATION.lat,
    longitude: DEFAUFT_LOCATION.lng,
    sortby: 0,
    offset: 0,
}

export const IMAGES_ROOT_DIR = "/images/"
export const IMAGES_COMMON_DIR = "/images/common/"
export const IMAGES_LOUPE = IMAGES_COMMON_DIR + "loupe.png"
export const IMAGES_EARTH = IMAGES_COMMON_DIR + "earth.png"
export const NO_IMAGE_MIN = IMAGES_COMMON_DIR + 'no_image_min.jpg'
export const NO_IMAGE_MED = IMAGES_COMMON_DIR + 'no_image_med.jpg'
export const NO_IMAGE_MAX = IMAGES_COMMON_DIR + 'no_image_max.jpg'

//export const HOST = 'https://tovarytut.ru:443'
export const HOST = 'http://192.168.1.249:80' 
//export const HOST = 'http://localhost' 

export const SITE_NAME = 'ТоварыТУТ'
