import {NgModule, Component, Injectable} from '@angular/core';
//import { Http , Response} from '@angular/http' ;
import {JsonpModule, Jsonp, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

class SearchItem {
  constructor(public track: string,
              public artist: string,
              public link: string,
              public thumbnail: string,
              public artistId: string) {
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
	apiRoot: string = 'https://itunes.apple.com/search?term=good';
	//https://itunes.apple.com/search?term=love&media=music&limit=3/
	term: string = 'good'; 
	//sufix: string= '&media=music&limit=2&callback=JSONP_CALLBACK`;
//	apiAll = apiRoot + term ;//+ sufix;
	
/* json */
	constructor(private jsonp: Jsonp) {
	}

 searchCity(term: string) {
	console.log("Done in");
	
//	console.log(`${this.apiRoot}?term=${term}&media=music&limit=2&callback=JSONP_CALLBACK`);
	console.log(`${this.apiRoot}&media=music&limit=2&callback=JSONP_CALLBACK`);
	
//   let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=2&callback=JSONP_CALLBACK`;
   let apiURL = `${this.apiRoot}&media=music&limit=2&callback=JSONP_CALLBACK`;
    return this.jsonp.request(apiURL)
        .map(res => { return res.json().results.map(item => {
			console.log("Done out");
			  
            return new SearchItem(
                item.trackName,
                item.artistName,
                item.trackViewUrl,
                item.artworkUrl30,
                item.artistId
            );
          });
        });
  }
}




/*	
	constructor(private http: Http) { }
	cityName = '';
	cityHumid = '';
	
searchCity() {

this.http.get('http://api.openweathermap.org/data/2.5/weather?APPID=0ba5e82df49a15a79cec569618c56215&q=' + this.cityName )
.subscribe (
(res: Response) => {const weatherCity = res.json() ;
console.log(weatherCity)
this.cityHumid = weatherCity.main.humidity;
this.cityName = weatherCity.main.city;
console.log(this.cityName);
}
)

}
	title = 'app works';
	
}
*/