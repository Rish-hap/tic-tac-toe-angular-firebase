import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from "axios";
import { url } from "../utils/url";
let AvatarsServiceService = class AvatarsServiceService {
    constructor() {
        this.avatars = [];
    }
    getAvatars(someData) {
        return new Observable((observer) => {
            if (this.avatars.length === 0) {
                (async () => {
                    let data = await axios.get(`${url}/avatars/allAvatars`, {
                        headers: {
                            auth_header: 'no'
                        }
                    })
                        .then((res) => {
                        return res.data;
                    })
                        .catch((err) => {
                        return {
                            success: false,
                            message: "Unable to fetch avatars"
                        };
                    });
                    observer.next(data);
                })();
            }
            else {
                if (someData) {
                    observer.next({
                        data: [...someData]
                    });
                }
                else {
                    observer.next({
                        data: [...this.avatars]
                    });
                }
            }
        });
    }
    async get_avatars_from_backend() {
        let data = {};
        try {
            data = await axios.get(`${url}/avatars/allAvatars`, {
                headers: {
                    auth_header: 'no'
                }
            })
                .then((res) => {
                return res.data;
            })
                .catch((err) => {
                return {
                    success: false,
                    message: "Unable to fetch avatars"
                };
            });
        }
        catch (error) {
            data = {
                success: false,
                message: "Unable to fetch avatars"
            };
        }
        return data;
    }
    async check_avatars() {
        if (this.avatars.length === 0) {
            let data_from_backend = await this.get_avatars_from_backend();
            if (data_from_backend === null || data_from_backend === void 0 ? void 0 : data_from_backend.success) {
                this.avatars = [...data_from_backend.data];
            }
        }
    }
    async set_avatars_to_backend(avatars) {
        let data = {};
        try {
            data = await axios.post(`${url}/avatars/update`, {
                avatars: [...avatars]
            })
                .then((res) => {
                return res.data;
            })
                .catch((err) => {
                return {
                    success: false,
                    message: "Unable to fetch avatars"
                };
            });
        }
        catch (error) {
            data = {
                success: false,
                message: "Unable to fetch avatars"
            };
        }
        return data;
    }
    getStaticAvatars() {
        return [...this.avatars];
    }
    setAvatars(data) {
        this.avatars = [...data];
        this.set_avatars_to_backend([...data]);
        // this.getAvatars([...data])
    }
};
AvatarsServiceService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AvatarsServiceService);
export { AvatarsServiceService };
//# sourceMappingURL=avatars-service.service.js.map