
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


export const HOST = window.location.protocol+'//'+window.location.hostname

export const IMAGES_MIN_DIR = "/images/min/"
export const IMAGES_MED_DIR = "/images/med/"
export const IMAGES_MAX_DIR = "/images/max/"

export const NO_IMAGE_MIN = '/static/img/no_image_min.jpg'
export const NO_IMAGE_MED = '/static/img/no_image_med.jpg'
export const NO_IMAGE_MAX = '/static/img/no_image_max.jpg'


export const SITE_NAME = 'Catalog'



