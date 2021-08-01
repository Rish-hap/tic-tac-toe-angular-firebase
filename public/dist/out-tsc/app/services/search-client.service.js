import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { url } from '../utils/url';
let SearchClientService = class SearchClientService {
    constructor() { }
    search(data) {
        return new Observable((observer) => {
            (async () => {
                let items = await axios.get(`${url}/games/search?player1=${data.player1}&player2=${data.player2}&avatar1=${data.avatar1}&avatar2=${data.avatar2}`, {
                    headers: {
                        auth_header: 'no'
                    }
                })
                    .then((res) => {
                    observer.next(res.data);
                    return res.data;
                })
                    .catch((err) => {
                    observer.next({
                        success: false,
                        message: "Unable to fetch Games"
                    });
                    return;
                });
            })();
        });
    }
};
SearchClientService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SearchClientService);
export { SearchClientService };
//# sourceMappingURL=search-client.service.js.map