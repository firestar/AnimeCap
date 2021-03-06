/**
 * Created by Nathaniel on 4/9/2017.
 */
import { Component, Input } from '@angular/core';
import { AccountService } from '../database/account.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { GroupService } from '../database/group.service';

@Component({
    selector: 'grouplist',
    templateUrl: 'grouplisting.component.html',
    styleUrls:['grouplisting.component.css']
})
export class GroupListing {
    constructor(private account: AccountService, private router: Router, private group: GroupService){}
    groups = null;
    name = "test";
    users = {};
    groupService = null;
    new(){
        let self = this;
        self.group.join(self.account.sessionKey, self.name);
    }
    join(name){
        let self = this;
        self.group.join(self.account.sessionKey, name );
    }
    ngOnInit(){
        let self = this;
        let waitForAccount = function() {
            console.log("waiting, watch");
            if(self.account.checked) {
                self.groupService = self.group;
                self.group.groupListFunction = function(data){
                    self.groups = Object.keys(data);
                };
                self.group.joinFunction = function (data) {
                    self.router.navigate(['/group']);
                };
                self.group.listen(self.account.sessionKey);
                self.group.listing(self.account.sessionKey);
            }else{
                setTimeout(function () {
                    waitForAccount();
                }, 50);
            }
        }
        waitForAccount();
    }
}