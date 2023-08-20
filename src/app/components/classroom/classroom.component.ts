import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RealtimeNotificationsService } from '../../services/others/realtime-notifications.service';
import { ClassroomHttpService } from 'src/app/services/http/classroom-http-service.service';
import { UserHttpService } from 'src/app/services/http/user-http-service.service';
import { ClassroomEnrollmentHttpService } from 'src/app/services/http/classroom-enrollment-http-service.service';
import { CommentHttpService } from 'src/app/services/http/comment-http-service.service';
import { PostHttpService } from 'src/app/services/http/post-http-service.service';
import { IsCommentBarOnOrOffOnPosts } from 'src/app/models/applicationLogicModels/classroomComponent/IsCommentBarOnOrOffOnPost';
import { CommentsDrafts } from 'src/app/models/applicationLogicModels/classroomComponent/CommentDrafts';
import { IsPostsEditModeOnOrOff } from 'src/app/models/applicationLogicModels/classroomComponent/IsPostsEditModeOnOrOff';
import { CommentsEditModeDictionary } from 'src/app/models/applicationLogicModels/classroomComponent/CommentsEditModeDictionary';
import { PostsEditModeDictionary } from 'src/app/models/applicationLogicModels/classroomComponent/PostsEditModeDictionary';
import { IsCommentsEditModesOnOrOff } from 'src/app/models/applicationLogicModels/classroomComponent/IsCommentsEditModesOnOrOff';
import { Comment } from 'src/app/models/responseModels/Comment';
import { Post } from 'src/app/models/responseModels/Post';
import { User } from 'src/app/models/responseModels/User';
import { Classroom } from 'src/app/models/responseModels/Classroom';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css', './posts.css', './header.css', './comments.css']
})
export class ClassroomComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private realtimeNotification: RealtimeNotificationsService,
    private classroomHttp: ClassroomHttpService,
    private userHttp: UserHttpService,
    private classroomEnrollmentHttp: ClassroomEnrollmentHttpService,
    private commentHttp: CommentHttpService,
    private postHttp: PostHttpService
    ) {}

  private readonly postsPerPage: number = 15;
  private currentPostPage: number = 1;

  private readonly minimumLengthOfClassroomName: number = 4;
  private readonly maximumLengthOfClassroomName: number = 30;

  private readonly minimumCommentLength: number = 3;
  private readonly maximumCommentLength: number = 200;

  private readonly minimumPostDescriptionLength: number = 6
  private readonly maximumPostDescriptionLength: number = 300

  private readonly minimumPostNameLength: number = 6
  private readonly maximumPostNameLength: number = 100

  isEndOfPostList: boolean = false;

  currentLoggedUser: User | null = null;
  openedClassroomInfo: Classroom | null = null;
  isCurrentLoggedUserClassroomOwner: boolean = false;
  searchSpecificPostFieldText: string = "";
  classroomMembers: User[] | null = null;

  isErrorInDeletingPost: boolean = false;
  isPostCreatedSuccessfuly: boolean = false;
  isEditPostDataAndDbDataSame: boolean = false;
  isErrorInCreatingPost: boolean = false;
  isErrorInEditingPost: boolean = false;
  postDeleteErrorMessage: string = "Error with deleting post!";
  postCreatingErrorMessage: string = "Error with creating post!";
  postEditErrorMessage: string = "Error with post editing!";

  isErrorInEditingComment : boolean = false;
  isErrorInDeletingComment :boolean = false;
  isEditCommentDataAndDbDataSame: boolean = false;
  commentCreatingErrorMessage: string = "Error with creating comment!"
  commentEditingErrorMessage: string = "Error in editing comment!";
  commentDeleteErrorMessage: string = "Error with deleting comment!";
  isErrorInCreatingComment: boolean = false;

  isErrorWithLeavingFromClassroom: boolean = false;
  isEditModeForClassroomNameTurnedOn: boolean = false;
  isErrorInEditingClassroomName: boolean = false;
  isErrorInDeletingClassroom: boolean = false;
  isDeleteClassroomDialogBoxOpened: boolean = false;
  isLeaveClassroomDialogBoxOpened: boolean = false;
  isEditClassroomNameAndDbDataSame : boolean = false;
  classroomNameEditErrorMessage: string ="Error with editing classroom name!";
  classroomDeleteErrorMessage: string = "Error with deleting classroom, try again later!";
  classroomLeavingErrorMessage: string ="Error with leaving from classroom!";

  isPostsOnDisplaySwitch: boolean = true;

  isCommentsHiddenOnPost: IsCommentBarOnOrOffOnPosts = {}
  commentDrafts: CommentsDrafts = {}
  isPostEditModeOn: IsPostsEditModeOnOrOff = {}
  postEditModeDataDrafts: PostsEditModeDictionary = {}
  isCommentEditModeOn: IsCommentsEditModesOnOrOff = {}

  commentEditModeDataDrafts: CommentsEditModeDictionary = {}

  postsCountAfterFilter: number = 0;
  postDraftTitle: string = "";
  postDraftContent: string = "";
  postForDeleteId: number|null = null;

  classroomNameEditDraft: string = "";

  isLoading: boolean = true;
  isLoadingSpinnerOn: boolean = false;
  isPostForDeletePopupOn: boolean = false;

  showOrDisplayCommentInPostSwitch(postId:number){
    const isElementInHashlist = this.isCommentsHiddenOnPost.hasOwnProperty(postId);
    if(isElementInHashlist == true){
      this.isCommentsHiddenOnPost[postId] = !this.isCommentsHiddenOnPost[postId]
    }else{
      this.isCommentsHiddenOnPost[postId] = true;
    }
  }

  getPaginatedPostListByClassroomId(){
    this.isLoadingSpinnerOn = true;

    if(this.openedClassroomInfo?.id==null) return;
    if(this.openedClassroomInfo?.posts == null) return;
  
    this.postHttp.getPaginatedPostListByClassroomId(
      this.openedClassroomInfo?.id, 
      this.postsPerPage, 
      this.currentPostPage+1).subscribe(
      (response)=>{
        if(response.length != this.postsPerPage || response.length == 0){
          this.isEndOfPostList = true;
        }
        if(response.length > 0){
          this.currentPostPage = this.currentPostPage + 1;
        }
        this.isLoadingSpinnerOn = false;
        response.forEach(post => {
          this.showOrDisplayCommentInPostSwitch(post.id)
        });
        this.openedClassroomInfo!.posts = this.openedClassroomInfo?.posts.concat(response) as Post[];
      },
      (error)=>{
        this.isLoadingSpinnerOn = false;

      }
    )
  }
  ngOnInit(){
    this.route.params.subscribe(params=> {
      const id = params['id']
      this.classroomHttp.getOwnedClassroomByClassroomId(id, this.postsPerPage).subscribe(
        (response)=>{

          this.openedClassroomInfo = response;
          //
          if(response.posts.length < this.postsPerPage){
            this.isEndOfPostList = true;
          }

          this.classroomNameEditDraft = response.name;

          this.postsCountAfterFilter = response.posts.length

          for(let i = 0; i< response.posts.length; i++){
            this.showOrDisplayCommentInPostSwitch(response.posts[i].id)
          }

          this.userHttp.getCurrentUserInfo().subscribe(
            (currentUser)=>{
              if(currentUser.id == response.creatorId){
                this.isCurrentLoggedUserClassroomOwner = true;
              }
              this.currentLoggedUser = currentUser;
              this.classroomEnrollmentHttp.getClassroomsEnrollmentsByClassroomId(this.openedClassroomInfo!.id)
              .subscribe(
                (response)=>{
                  const userList = response.map(user => user.user);
                  this.classroomMembers = userList
                  this.isLoading = false;
                }
              )
            },

            (error)=> {
              this.router.navigate(["/main/dashboard"])
            }
            )

            this.userHttp.getCurrentUserInfo().subscribe(
              (currentUser)=>{
                if(currentUser.id == response.creatorId){
                  this.isCurrentLoggedUserClassroomOwner = true;
                }else{
                }
                console.log(currentUser)
  
                this.currentLoggedUser = currentUser;
  
                this.classroomEnrollmentHttp.getClassroomsEnrollmentsByClassroomId(this.openedClassroomInfo!.id)
                .subscribe(
                  (response)=>{
                    const userList = response.map(user => user.user);
                    this.classroomMembers = userList
                    console.log("evo vam memberi:")
                    console.log(this.classroomMembers)
                    this.isLoading = false;
                  }
                )
                console.log("trenutni korisnik:")
                console.log(this.currentLoggedUser)
              },
              (error)=> {
                this.router.navigate(["/main/dashboard"])
              }
            )

            console.log(response)
          },

          (error)=>{
            this.router.navigate(["/main/dashboard"])
          }
        )
      })

    this.realtimeNotification.addPostCreatedListener((message)=>{
      if(this.openedClassroomInfo?.id == message.classroomId){
        this.addNewPostCard(
          message.comments, 
          message.createdDate, 
          message.description, 
          message.id, 
          message.name
          )
      }
    })

    this.realtimeNotification.addPostDeletedListener((postId, classroomId, groupName)=>{
      if(this.openedClassroomInfo?.id == classroomId){
        this.deletePostCard(postId)
      }
    })
  }

  backToDashboard() : void {
    this.router.navigate(["/main/dashboard"])
  }

  isPostHiddenAfterFilter(post: Post): boolean {
    let inputText = this.searchSpecificPostFieldText;
    if (inputText == ""){
      return false;
    } 
    let { name, description } = post;
    inputText = inputText.toLowerCase();
    name = name.toLowerCase();
    description = description.toLowerCase();
    if (!name.includes(inputText) && !description.includes(inputText)) {
      return true;
    }
    return false;
  }

  updatePostsCountAfterFilter(): void {
   this.postsCountAfterFilter  = this.openedClassroomInfo!.posts.filter(post => !this.isPostHiddenAfterFilter(post)).length;
  }

  createCommentSubmit(postId: number) : void{
    this.isLoadingSpinnerOn = true;
    const draftForThisComment = this.commentDrafts[postId]
    if(draftForThisComment == undefined) {
      this.isErrorInCreatingComment = true;
      return;
    }

    this.commentHttp.createComment(draftForThisComment, postId)
    .subscribe(
      (response)=>{
        this.isLoadingSpinnerOn = false;
        const posts = this.openedClassroomInfo?.posts
        if(posts == undefined) return;

        const postWithTargetIndex = posts.findIndex((post) => post.id === postId);
        if (postWithTargetIndex !== -1) {
          this.openedClassroomInfo?.posts[postWithTargetIndex].comments.splice(0, 0, {  
            id: response.id,
            content: response.content,
            userId: response.userId,
            postId: response.postId,
            createdDate: response.createdDate,
            edited: response.edited,
            user: response.user
        });
          this.commentDrafts[postId] = "";
        }
      },
      (error)=>{
        this.isLoadingSpinnerOn = false;
        this.commentCreatingErrorMessage= error.error.error;
        this.isErrorInCreatingComment = true; console.log(error) 
      })
  }

  createPostSubmit(classroomId: number) : void{
    const title = this.postDraftTitle
    const content = this.postDraftContent
    this.isLoadingSpinnerOn = true;
    this.postHttp.createPost(title,content,classroomId)
    .subscribe(
      (response)=>{
        this.postDraftTitle = "";
        this.postDraftContent = "";
        this.isLoadingSpinnerOn = false;
        this.addNewPostCard(
          response.comments, 
          response.createdDate, 
          response.description, 
          response.id, 
          response.name
          )
          
        this.realtimeNotification.sendNotificationToGroup(
          { 
            comments: response.comments,
            createdDate: response.createdDate,
            description: response.description,
            id: response.id,
            name: response.name,
            creatorUsername: this.openedClassroomInfo!.creator.username,
            classroomId: this.openedClassroomInfo!.id
          }, 
          this.openedClassroomInfo!.id.toString()
          )
      },
      (error)=>{
        this.isLoadingSpinnerOn = false;
        this.postCreatingErrorMessage= error.error.error;
        this.isErrorInCreatingPost = true;
      })
  }

  postEditModeSwitch(post: Post) : void{
    const {id: postId, name, description} = post;
    this.isPostEditModeOn[postId] = 
    this.isPostEditModeOn.hasOwnProperty(postId) ?  !this.isPostEditModeOn[postId] : true;
    if(this.isPostEditModeOn[postId] == true){
      this.postEditModeDataDrafts[postId] = {name, description}
    }
  }

  commentEditModeSwitch(comment: Comment) : void {
    const {id: commentId, content} = comment;
    this.isCommentEditModeOn[commentId] =
    this.isCommentEditModeOn.hasOwnProperty(commentId) ? !this.isCommentEditModeOn[commentId] : true;
    if(this.isCommentEditModeOn[commentId] == true){
      this.commentEditModeDataDrafts[commentId] = {content};
    }
  }

  deletePostSubmit(postId: number): void {
    this.isLoadingSpinnerOn = true;
    this.isPostForDeletePopupOn = false;
    this.postHttp.deletePostByPostId(postId)
    .subscribe(
      (response)=>{
        this.isLoadingSpinnerOn = false;
        this.postForDeleteId = null;
        this.deletePostCard(postId)
        this.realtimeNotification.sendPostDeletedDataToGroup(
          postId, this.openedClassroomInfo!.id, this.openedClassroomInfo!.id.toString()
        )
      },
      (error)=>{
        this.isLoadingSpinnerOn = false;
        this.isErrorInDeletingPost = true;
        this.postDeleteErrorMessage = error.error.error;
      })
  }

  activateDeletePostPopup(postId: number) : void{
    this.postForDeleteId = postId;
    this.isPostForDeletePopupOn = true;
  }

  editCommentSubmit(comment: Comment) : void{
    this.isLoadingSpinnerOn = true;
    const {id: commentId} = comment;
    if(this.commentEditModeDataDrafts[comment.id].content == comment.content){
      this.isEditCommentDataAndDbDataSame = true;
      return;
    }

    if (
      this.commentEditModeDataDrafts[comment.id].content.length < this.minimumCommentLength ||
      this.commentEditModeDataDrafts[comment.id].content.length > this.maximumCommentLength
    )
    {
      this.isErrorInEditingComment = true;
      this.commentEditingErrorMessage = "Your edited comment must be min: 3 max 200 characters!";
      return;
    }

    this.commentHttp.editComment(commentId, this.commentEditModeDataDrafts[commentId].content)
    .subscribe(
      (response)=>{
        this.isLoadingSpinnerOn = false;
        let editedCommentFound : boolean = false;
        this.isCommentEditModeOn[commentId] == false
        if(this.openedClassroomInfo?.posts === undefined) return;

        this.openedClassroomInfo?.posts.forEach((post) => {
          if(post.id == comment.postId){
            post.comments.forEach(iterativeComment => {
              if(iterativeComment.id == commentId){
                iterativeComment.content = this.commentEditModeDataDrafts[commentId].content;
                iterativeComment.edited = true;
                iterativeComment.createdDate = response.createdDate;
                editedCommentFound = true;
                this.isCommentEditModeOn[commentId] = false;
                return;
              }
            })
            if(editedCommentFound == true){
              return;
            }
          }});
      },
      (error)=>{
        this.isLoadingSpinnerOn = false;
        this.isErrorInEditingComment = true;
        this.commentEditingErrorMessage = error.error.error;
      })
  }

  deleteCommentSubmit(comment: Comment) : void{
    const {id: commentId} = comment;
    this.isLoadingSpinnerOn = true;

    this.commentHttp.deleteComment(commentId)
    .subscribe(

      (response)=>{
        this.isLoadingSpinnerOn = false;
        if(this.openedClassroomInfo?.posts == undefined) return;
        this.openedClassroomInfo?.posts.forEach((post)=>{
          if(post.id == comment.postId){
            for(let i=0; i<post.comments.length; i++){
              if(post.comments[i].id == commentId){
                post.comments.splice(i, 1);
                break;
              }}
            }})

      },
      (error)=>{
         this.isLoadingSpinnerOn = false;
         this.isErrorInDeletingComment = true;
         this.commentDeleteErrorMessage = error.error.error;
      }
    )
  }

  editPostSubmit(post: Post, classroomId: number){
    const {description, name} = this.postEditModeDataDrafts[post.id]
    this.isLoadingSpinnerOn = true;
    if (
      description.length > this.minimumPostDescriptionLength &&
      description.length < this.maximumPostDescriptionLength &&
      name.length > this.minimumPostNameLength &&
      name.length < this.maximumPostNameLength 
      ){

        if(this.openedClassroomInfo?.posts == undefined){
          return;
        }
        let isDataSame : boolean = false;
        this.openedClassroomInfo.posts.forEach((p)=>{
          if(p.id == post.id){
            if(p.name == name && p.description == description){
              this.isLoadingSpinnerOn = false;
              this.isEditPostDataAndDbDataSame = true
            }
            return;
          }
        })

        if(isDataSame){
          return;
        }

        this.postHttp.editPost(post.id, name, description, classroomId)
        
        .subscribe(
          (response)=>{
            this.isLoadingSpinnerOn = false;
            this.isPostEditModeOn[post.id]=false;

            this.openedClassroomInfo?.posts.forEach((postElement)=>{
              if(postElement.id == post.id ){
                postElement.name = name;
                postElement.description = description;
                postElement.createdDate = response.createdDate;
              }
            })
          },
          (error)=>{
            this.isLoadingSpinnerOn = false;
            this.postEditErrorMessage = error.error.error;
            this.isErrorInEditingPost = true;
          }
        )
    }
  }

  classroomNameEditModeSwitch(){
    if(this.openedClassroomInfo?.name == null) return;
    this.classroomNameEditDraft = this.openedClassroomInfo?.name;
    this.isEditModeForClassroomNameTurnedOn = !this.isEditModeForClassroomNameTurnedOn;
  }

  editClassroomNameSubmit(){
    this.isLoadingSpinnerOn = true;
   if(
    this.classroomNameEditDraft.length < this.minimumLengthOfClassroomName || 
    this.classroomNameEditDraft.length > this.maximumLengthOfClassroomName
    ){
      this.isErrorInEditingClassroomName = true;
      this.classroomNameEditErrorMessage = "Classroom name must have min: 4 , max:30 characters :/";
      return;
   }

   if(this.classroomNameEditDraft == this.openedClassroomInfo?.name){
      this.isErrorInEditingClassroomName = true;
      this.classroomNameEditErrorMessage = "Please change classroom name first and then you can make edit request!";
      return;
   }

    this.classroomHttp.editClassroom(this.openedClassroomInfo!.id, this.classroomNameEditDraft)
    .subscribe(
      (response)=>{
        this.isLoadingSpinnerOn = false;
        if(this.openedClassroomInfo?.name == undefined || this.openedClassroomInfo?.name == null) return;
        this.openedClassroomInfo.name = response.name;
        this.isEditModeForClassroomNameTurnedOn = false;
      },
      (error)=>{
        this.isLoadingSpinnerOn = false;
        this.isErrorInEditingClassroomName = true;
        this.classroomNameEditErrorMessage = error.error.error;
      }
    )
  }

  deleteClassroomSubmit(){
    this.isDeleteClassroomDialogBoxOpened = false;
    this.isLoadingSpinnerOn = true;
    this.classroomHttp.deleteClassroomByClassroomId(this.openedClassroomInfo!.id)
    .subscribe(
      (response)=>{
        this.isLoadingSpinnerOn = false;
        this.isDeleteClassroomDialogBoxOpened = false;
        this.router.navigate(["/main/dashboard/my-classrooms/owned"])
      },
      (error)=>{
        this.isLoadingSpinnerOn = false;
        this.classroomDeleteErrorMessage = error.error.error;
        this.isErrorInDeletingClassroom = true;
      }

    )
  }

  leaveClassroomDialogBoxSwitch(){
    this.isLeaveClassroomDialogBoxOpened = !this.isLeaveClassroomDialogBoxOpened;
  }

  leaveClassroomSubmit(){
    this.isLeaveClassroomDialogBoxOpened = false;
    this.isLoadingSpinnerOn = true;
    this.classroomEnrollmentHttp.deleteClassroomEnrollmentWhereClassroomIdAndCurrentUserId(this.openedClassroomInfo!.id)
    .subscribe(
      (response)=>{
        this.isLoadingSpinnerOn = false;
        this.realtimeNotification.leaveGroup(this.openedClassroomInfo!.id.toString())
        this.router.navigate(["/main/dashboard/my-classrooms/joined"])
      },
      (error)=>{
        this.isLoadingSpinnerOn = false;
        this.isErrorWithLeavingFromClassroom = true;
        this.classroomLeavingErrorMessage = error.error.error;
      }
    )
  }

  postsOrMembersRenderSwitch(){
    this.isPostsOnDisplaySwitch = !this.isPostsOnDisplaySwitch
  }

  private deletePostCard(postId: number) {
    const posts = this.openedClassroomInfo?.posts;

    if (posts == undefined) return;

    posts.forEach((post, i) => {
      if (posts[i].id == postId) this.openedClassroomInfo?.posts.splice(i, 1)
    })

    this.postsCountAfterFilter--;
  }

  private addNewPostCard(comments: any[], createdDate: string, description: string, id: number, name: string) {
    this.openedClassroomInfo?.posts.splice(0, 0, {
      comments,
      createdDate,
      description,
      id,
      name
    })
    this.postsCountAfterFilter++;
    this.isCommentsHiddenOnPost[id] = true;
  }



}
