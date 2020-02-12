import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Comment } from '../../shared/comment'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Dish } from '../../shared/dish';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentFrm: FormGroup
  commnentObj: Comment

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {

                this.commentFrm = this.formBuilder.group({
                  rating: 5,
                  comment:['',Validators.required],
                  author:['',Validators.required]
                })
  }

  dismiss(){
    this.viewCtrl.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
  onSubmit(){
    this.commnentObj = this.commentFrm.value
    this.commnentObj.date = new Date().toISOString()
    console.dir(this.commnentObj)
    this.viewCtrl.dismiss(this.commnentObj)
  }
}
