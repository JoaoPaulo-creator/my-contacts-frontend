import delay from '../../utils/delay'
import APIError from '../../errors/APIError'

export default class HttpClient {

    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    get(path, options){
        return this.makeRequest(path, { method: 'GET', headers: options?.headers })
    }

    post(path, options){
        return this.makeRequest(path, {
            method: 'POST',
            body: options?.body,
            headers: options?.headers
        })
    }
    put(path, options){
        return this.makeRequest(path, {
            method: 'PUT',
            body: options?.body,
            headers: options?.headers
        })
    }

    async makeRequest(path, options) {
        await delay(0.5)

        const headers = new Headers({
            'Content-type': 'application/json'
        })

        // Esse if foi criado com o proposito de evitar o preflight nas requests
        // Desta forma, nao se gasta processamento fazendo a requisicao
        // Sendo assim, o preflight acontecera somente quando houver o header abaixo
        // if(options.body) {
        //     headers.append('Content-type', 'application/json')
        // }

        if(options.headers) {
            // Esta eh uma forma de iterar um header
            // Object.keys(options.headers).forEach((name) => {
            //     headers.append(name, options.headers[name])
            // })
            Object.entries(options.headers).forEach(([name, value]) => {
                headers.append(name, value)
            })
        }


        const response = await fetch(`${this.baseUrl}${path}`, {
            method: options.method,
            headers,
            body: JSON.stringify(options.body)
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
