# joro-spider

![alt text](https://raw.githubusercontent.com/JasperCherry/public-content/main/joro.png)

Joro-spider is a javascript tool for tracking user behaviour while using website.
It tracks 3 types of user interactions: click, scroll and presence. Clicks and scrolls are based on event listeners. Presence data generator has a countdown limit, after which it will stop delivering information.

## Installation

Use the cdn link

```html
<script src="https://cdn.jsdelivr.net/npm/joro-spider@1.0.9/index_cdn.min.js"></script>
```

or use the npm

```javascript
npm install joro-spider
```
and import content
```javascript
const createJoro = require('joro-spider');
```

## Usage

```javascript
// creates spider
const joro = createJoro();

// logs out data stream
joro.streamData = (data) => {
  console.log({ data });
};

// starts spider activity
joro.start();

// stops spider activity
joro.stop();

// check if spider is actively streaming data
console.log(joro.isActive);
```

Custom configuration

```javascript
const config = {
  // pickup name
  spiderName: 'my spider',
  // throttle scroll data (default 500ms)
  scrollThrottle: 500,
  // throttle presence data (default 1000ms)
  presenceThrottle: 1000,
  // user presence measurements between presenceThrottle time units (default 60 pings)
  presencePings: 60,
};

// creates spider
const joro = createJoro(config);
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
