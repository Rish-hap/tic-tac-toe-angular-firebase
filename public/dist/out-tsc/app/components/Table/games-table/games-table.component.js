import { __decorate } from "tslib";
import { Component } from '@angular/core';
let GamesTableComponent = class GamesTableComponent {
    constructor(gamesInfoService, searchClient) {
        this.gamesInfoService = gamesInfoService;
        this.searchClient = searchClient;
        this.gamesInfo = [];
        this.paginated_data = [];
        this.params = {
            total: 0,
            active: 1,
            pages: 0,
            limit: 1
        };
        this.gamesInfoService.get_games_info(Object.assign({}, this.params))
            .subscribe(val => {
            this.gamesInfo = [...val.data];
        });
        this.paginate_data = this.paginate_data.bind(this);
        this.search_callback = this.search_callback.bind(this);
    }
    search_callback(info) {
        this.searchClient.search(Object.assign({}, info)).subscribe(result => {
            console.log(result, "val in search_callback");
            if (result.success) {
                // this.paginated_data =  result.data
                this.gamesInfo = result.data;
            }
            else {
                window.alert(result.message);
            }
        });
    }
    paginate_data(info) {
        console.log(info, "info in paginate_data");
        const { active, limit } = info;
        if (!!this.gamesInfo) {
            this.paginated_data = [...[...this.gamesInfo].slice((active - 1) * limit, (active - 1) * limit === 0 ? limit : active * limit)];
        }
    }
    ngOnInit() {
        this.gamesInfo = this.gamesInfoService.getStaticGames();
    }
};
GamesTableComponent = __decorate([
    Component({
        selector: 'app-games-table',
        templateUrl: './games-table.component.html',
        styleUrls: ['./games-table.component.scss']
    })
], GamesTableComponent);
export { GamesTableComponent };
//# sourceMappingURL=games-table.component.js.map