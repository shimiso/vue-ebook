import axios from 'axios'
import { setLocalForage } from '../utils/localForage'

export function flatList() {
  return axios({
    method: 'get',
    url: `/book/flat-list`
  })
}

export function shelf() {
  return axios({
    method: 'get',
    url: `/book/shelf`
  })
}

export function home() {
  return axios({
    method: 'get',
    url: `/book/home`
  })
}

export function detail(book) {
  return axios({
    method: 'get',
    url: `/appBaseUrl/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}

export function list() {
  return axios({
    method: 'get',
    url: `/book/list`
  })
}

export function download(book, onSucess, onError, onProgress) {
  if (onProgress == null) {
    onProgress = onError
    onError = null
  }
  return axios.create({
    baseURL: 'http://47.99.166.157/epub',
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: progressEvent => {
      if (onProgress) onProgress(progressEvent)
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      setLocalForage(book.fileName, blob,
        () => onSucess(book),
        err => onError(err))
    }).catch(err => {
      if (onError) onError(err)
    })
}
