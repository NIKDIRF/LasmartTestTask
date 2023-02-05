export class HttpClient {
    private readonly base: string;
    constructor(baseUrl: string) {
        this.base = baseUrl;
    }

    public async fetch(method: string, endpoint: string, body?: BodyInit, headers: Record<string, string> = {'Accept': 'application/json', 'Content-Type': 'application/json'}): Promise<any> {
        try {
            let response = await fetch(`${this.base}/${endpoint}`, {
                body: body,
                method: method,
                headers: headers
            });
            let jsonResponse = await response.json();
            return jsonResponse;
        } catch (ex) {
            console.log(`Не удалось получить данные по эндпоину: ${endpoint}`)
            throw ex;
        }


    }
}

export interface Point {
    color: string,
    comments: Comment[],
    id?: number
    radius: number,
    x: number,
    y: number
}

export interface Comment {
    id?: number
    pointId? : number
    text: string,
    backgroundColor: string,

}