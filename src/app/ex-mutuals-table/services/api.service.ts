import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private readonly apiSubroute: string = "/api";
  private readonly unfollowRoute: string = this.apiSubroute + "/unfollow";
  private readonly exMutualsRoute: string = this.apiSubroute + "/ex-mutuals";
  private readonly userDataRoute: string = this.apiSubroute + "/user"

  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  setAuthHeaders(oauth: string , oauthSecret: string): void {
    this.headers.append("oauth", oauth);
    this.headers.append("oauthSecret", oauthSecret);
  }

  getUserData(screenName: string): Observable<UserData> {
    return this.http.get<UserData>(
      this.userDataRoute + "?screenName=" + screenName,
      { headers: this.headers } );
  }

  unfollow(screenName: string): void {
    this.http.get<string>(
      this.unfollowRoute + "?screenName=" + screenName,
      { headers: this.headers } );
  }

  getMutuals(screenName: string): Observable<string[]> {
    return this.http.get<string[]>(
      this.exMutualsRoute + "?screenName=" + screenName,
      { headers: this.headers } );
  }
}
