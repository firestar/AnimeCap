/**
 * Created by Nathaniel on 4/2/2017.
 */

import {Component, Input, ElementRef} from '@angular/core';
import { ShowService } from '../database/show.service';
import { AccountService } from '../database/account.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { EpisodeService } from '../database/episode.service';
import 'rxjs/Rx';
import { WSService } from '../database/ws.service';
import { ControlService} from '../database/control.service';

@Component({
  selector: 'slave',
  templateUrl: 'slave.component.html'
})
export class SlavePage {
    constructor(private account: AccountService, private router: Router, private route: ActivatedRoute, private episodeService: EpisodeService, private element: ElementRef, private ws: WSService, private control: ControlService) {
    }
    ngOnInit(){
        let self = this;
        let waitForAccount = function() {
            if(self.account.checked && self.account.sessionKey!=null) {
                self.ws.subscribe('/listen/load', self.account.sessionKey, function (data) {
                    let episode = JSON.parse(data.body);
                    console.log(episode);
                    self.router.navigate(['/watch', episode.id, episode.title, 'episode_' + episode.episodeNumber], {
                        relativeTo: self.route,
                        skipLocationChange: false
                    });
                });
            }
        }
        waitForAccount();
    }
    ngOnDestroy(){
        let self = this;
        self.ws.unsubscribe('/listen/load');
    }
}
