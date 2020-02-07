import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeaderProvider } from '../../providers/leader/leader' 
import { Leader } from '../../shared/leader'

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit{

  leaders: Leader[];
  errMessage: String;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public leaderService: LeaderProvider,
              @Inject('BaseURL') private BaseURL) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe(rsL => this.leaders=rsL,err => this.errMessage = err)
  }

}
