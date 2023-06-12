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

    async post(path, body){
        await delay(0.5)


        const headers = new Headers( {
            'Content-type': 'application/json'
        })

        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })

        let responseBody = null
        const contentType = response.headers.get('Content-type')

        if(contentType.includes('application/json')){
            responseBody = await response.json()
        }

        if(response.ok){
            return responseBody
        }

        /*
         Utilizando de optional chaining para verificar se o valor do responseBody é null ou undefined
         */
        throw new APIError(response, responseBody)
    }

}