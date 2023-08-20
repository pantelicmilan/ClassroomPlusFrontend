import { Component } from '@angular/core';
import { CriticalErrorSnapshotService } from '../../services/others/critical-error-snapshot.service';
import { AuthService } from 'src/app/services/others/auth.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {
  constructor(private errorSnapshotService: CriticalErrorSnapshotService, private authService: AuthService){}

  ngOnInit(){
    if(this.statusCode == 401) this.authService.logout()
  }
  statusCode: number | null = this.errorSnapshotService.getStoredErrorStatusCode();
  errorMessage: string | null = this.errorSnapshotService.getStoredErrorMessage();
  errorSourceUrl: string | null = this.errorSnapshotService.getStoredErrorSourceUrl();
}
