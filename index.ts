import { of, throwError } from 'rxjs';
import { delay, tap, mergeMap, repeat, catchError } from 'rxjs/operators';
console.clear();

let requestCount = 1;
const produceResponse = () =>
  requestCount++ % 3 === 0 ? throwError('sad face') : of(new Date());

const fakeDelayedRequest = () => produceResponse();

const writ = (response) => {
  if (response) {
    console.log(`ISo: ${response}`);
    document.open();
    document.write(response);
  }
};

const poll = of({}).pipe(
  mergeMap((_) => fakeDelayedRequest()),
  tap(writ),
  delay(1000),

  repeat()
);

poll.subscribe();
