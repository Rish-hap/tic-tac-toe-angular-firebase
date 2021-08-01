const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are Typescript Date objects
export function time_diff(a: any, b: any) {
    let ret = Math.abs(a - b) / 1000
    return ret
}


export function parseJwt (token:any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};