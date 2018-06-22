import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpResponse
} from '@angular/common/http';

import {Injectable, Injector} from "@angular/core";
import {MessageService} from "primeng/components/common/messageservice";
import {Observable} from "rxjs/internal/Observable";
import {finalize, tap} from "rxjs/operators";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  messageService: MessageService;

  constructor(
    private injector: Injector
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ok: string;
    let response;

    if (!this.messageService)
      this.messageService = this.injector.get(MessageService); // get it here within intercept

    return next.handle(request)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => {
            ok = 'failed'
            response = error;
          }
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          if (ok === 'failed') {
            if (response.status === 401) {
              this.messageService.add({severity: 'error', summary: 'Error', detail: 'Authentication failed!'});
            } else if (response.status === 403) {
              this.messageService.add({severity: 'error', summary: 'Error', detail: 'Permission denied!'});
            } else {
              this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something happaned!'});
            }
          }
        })
      );
  }
}
