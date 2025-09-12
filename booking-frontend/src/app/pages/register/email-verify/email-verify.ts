import { Component } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { AuthServices } from "../../../services/AuthServices";

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.html',
  imports: [
    RouterModule
  ],
})
export class EmailVerify{
    constructor(
    private route: ActivatedRoute,
    private authService: AuthServices
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.confirmEmail(token).subscribe();
      }
    });
  }
}