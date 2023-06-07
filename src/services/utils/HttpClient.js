import delay from '../../utils/delay'
import APIError from '../../errors/APIError'

export default class HttpClient {

    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    async get(path){
        await delay(0.5)

        const response = await fetch(`${this.baseUrl}${path}`)

        let body = null
        const contentType = response.headers.get('Content-type')

        if(contentType.includes('application/json')){
            body = await response.json()
        }

        if(response.ok){
            return body
        }

        /*
         Utilizando de optional chaining para verificar se o valor do body é null ou undefined
         */
        throw new APIError(response, body)
    }

}