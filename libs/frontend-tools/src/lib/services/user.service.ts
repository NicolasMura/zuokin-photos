import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment, NotificationService, ErrorHandlingService, User } from '@zuokin-photos/frontend-tools';
import { GlobalService } from './global-service.service'; // strangely weird, but need to be imported like this...


/**
 * User Service
 * Providing user information and login status utilities
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends GlobalService {
  protected baseUrlUser = environment.backendApi.baseUrlUser;

  /**
   * Private current logged user, as a behavior subject so we can provide a default value
   * Nobody outside the UserService should have access to this BehaviorSubject
   */
  private readonly currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null as any);
  /**
   * Expose the observable$ part of the currentUser subject (read only stream)
   */
  readonly currentUser$: Observable<User> = this.currentUser.asObservable();
  /**
   * Users
   */
  public users: User[] = [];

  /**
   * Variables representing a part of application state, in a Redux inspired way
   */
  private userStore: {
    currentUser: User,
    users: User[],
    familyUsers: User[]
  } = {
    currentUser: null as any,
    users: [],
    familyUsers: []
  };

  constructor(
    private http: HttpClient,
    protected notificationService: NotificationService,
    protected errorHandlingService: ErrorHandlingService
  ) {
    super(errorHandlingService);
  }

  /**
   * Get current user
   */
  public getCurrentUser(): User {
    return this.currentUser.getValue();
  }

  /**
   * Set current user
   */
  public setCurrentUser(userDecoded: User & { iat: number, exp: number, sub: string } | null): void {
    let user: User | null = null;
    console.log(userDecoded);

    if (userDecoded) {
      user = new User(
        userDecoded.username,
        userDecoded.email,
        userDecoded.mobile,
        userDecoded.isAdmin,
        userDecoded.created_at,
        userDecoded.profile,
        userDecoded.sub
      );
    }
    console.log(user);

    this.userStore.currentUser = user as User;
    this.currentUser.next(Object.assign({}, this.userStore).currentUser);
  }

  /**
   * Get all users
   */
  public getUsers(): User[] {
    return this.userStore.users;
  }

  /**
   * Get all users from backend
   */
  public getAllUsers(): Observable<User[]> {
    const url = `${this.baseUrlUser}`;
    return this.http.get<User[]>(url)
      .pipe(
        delay(1000),
        map((users: User[]) => {
          const usersWellFormatted = users.map((user: User) => new User(
            user.username || '',
            user.email,
            user.mobile || '',
            user.isAdmin,
            user.created_at,
            user.profile,
            user._id
          ));

          this.users = usersWellFormatted;
          this.userStore.users = usersWellFormatted;

          return usersWellFormatted;
        }),
        catchError(error => this.handleError(error))
      );
  }
}
