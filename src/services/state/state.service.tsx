import { BehaviorSubject, Observable } from "rxjs";

const earthquake$: BehaviorSubject<any | null> = new BehaviorSubject(null);

export const setState = (earthquake: any) => {
    earthquake$.next(earthquake);
}

export const getState = (): Observable<any> => earthquake$.asObservable();