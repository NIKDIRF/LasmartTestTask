var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class HttpClient {
    constructor(baseUrl) {
        this.base = baseUrl;
    }
    fetch(method, endpoint, body, headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield fetch(`${this.base}/${endpoint}`, {
                    body: body,
                    method: method,
                    headers: headers
                });
                let jsonResponse = yield response.json();
                return jsonResponse;
            }
            catch (ex) {
                console.log(`Не удалось получить данные по эндпоину: ${endpoint}`);
                throw ex;
            }
        });
    }
}
