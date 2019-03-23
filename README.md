# Trump Approval Fetcher

Fetches Donald Trump’s latest approval ratings, scraping them from RealClearPolitics.

And that’s all.

Thanks to RCP for the open-ish JSONP API. Or maybe just don’t say anything.

Returns a Promise, which resolves to Object:

```js
{
  date: Date,         // datetime of latest poll average, as reported by RCP)
  favorable: Float,   // percentage Favorable ratings (eg: 40.8% would be .408)
  unfavorable: Float  // percentage Unfavorabel ratings
}
```

Real example (note that `date` is being console.log'd but it is indeed a `Date`:

```js
{
  date: 2019-02-13T06:00:00.000Z, // trust me, it's a Date
  favorable: 0.408,
  unfavorable: 0.554
}
```

You’ll probably get `ECONNRESET` errors if you try too much; RCP wasn’t born yesternanosecond.

See also: [thetrump.report](//thetrump.report) ([`trump-dot-report`](//github.com/unitof/trump-dot-report))
