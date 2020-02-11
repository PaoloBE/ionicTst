import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommentPage } from '../../pages/comment/comment'

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;
  //comment: Comment;
  commentFrm: FormGroup;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              @Inject('BaseURL') private BaseURL,
              public favoriteService: FavoriteProvider,
              public toastCtrl: ToastController,
              public actsheetCtrl: ActionSheetController,
              private formBuilder: FormBuilder,public modalCtrl: ModalController
              ) {
    this.dish = navParams.get('dish');
    this.favorite = this.favoriteService.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
    this.commentFrm = this.formBuilder.group({
      rating: 5,
      comment:['',Validators.required],
      author:['',Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites(){
    this.favorite = this.favoriteService.addFavorite(this.dish.id)
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();
  }
  callActSh(){
    const actionSheet = this.actsheetCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorite',
          handler: () => {
            this.addToFavorites()
          }
        },{
          text: 'Add Comment',
          handler: () => {
            let modal = this.modalCtrl.create(CommentPage);
            modal.present();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}