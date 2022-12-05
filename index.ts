import { of, throwError } from 'rxjs';
import { delay, tap, mergeMap, repeat, catchError } from 'rxjs/operators';
console.clear();

let requestCount = 1;
const produceResponse = () =>
  requestCount++ % 3 === 0 ? throwError('sad face') : of(new Date());

const fakeDelayedRequest = () => produceResponse();

const write = (response) => {
  if (response) {
    console.log(`IS: ${response}`);
    document.open();
    document.write(response);
  }
};

const poll = of({}).pipe(
  mergeMap((_) =>
    fakeDelayedRequest().pipe(
      catchError((e) => {
        console.error(e);
        return of(false);
      })
    )
  ),
  tap(write),
  delay(1000),

  repeat()
);

poll.subscribe();
