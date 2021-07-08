import { Component, OnInit }   from '@angular/core'
import { GamesInfoService  }   from "../../../services/games-info.service"
import { SearchClientService } from 'src/app/services/search-client.service'
import { Game                } from "src/app/model/game.model"

@Component({
  selector: 'app-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.scss']
})

export class GamesTableComponent implements OnInit {
 gamesInfo:Game[] = []
 paginated_data:Game[] = []
 params:{ total:number, active:number, pages:number, limit:number} = {
  total:0,
  active:1,
  pages:0,
  limit:1
}

  constructor(private gamesInfoService: GamesInfoService, private searchClient: SearchClientService) { 
    this.gamesInfoService.get_games_info({...this.params})
    .subscribe(val=>{
      this.gamesInfo = [...val.data]
    })
    this.paginate_data = this.paginate_data.bind(this)
    this.search_callback = this.search_callback.bind(this)
  }


  search_callback(info:any):void {
    this.searchClient.search({...info}).subscribe(result=>{
      console.log(result,"val in search_callback")
      if(result.success){
        // this.paginated_data =  result.data
        this.gamesInfo = result.data
      }else{
        window.alert(result.message)
      }
      
    })
  }

  paginate_data(info:any):void {
    console.log(info,"info in paginate_data")
    const {  active, limit  } = info
    if(!!this.gamesInfo){
      this.paginated_data = [...[...this.gamesInfo].slice((active-1) * limit, (active-1) * limit===0?limit:active*limit)]
    }
  }

  ngOnInit(): void {
    this.gamesInfo  = this.gamesInfoService.getStaticGames()
  }

}
