import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  loadingText: string = "Loading."
  private intervalId: any;

  ngOnInit(){
    this.intervalId = setInterval(() => {
          this.changeLoadingText();
    }, 300);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  changeLoadingText() {
    const count = this.loadingText.split(".").length - 1;
    let newText = 
    count == 1 ? "Loading.." :
    count == 2 ? "Loading...":
    count == 3 ? "Loading." : "Loading."
    this.loadingText = newText
  }
}
