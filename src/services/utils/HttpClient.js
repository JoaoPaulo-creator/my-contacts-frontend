import delay from '../../utils/delay'

export default class HttpClient {

    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    async get(path){
        const response = await fetch(`${this.baseUrl}${path}`)
        await delay(0.5)
        return response.json()
    }

}