# joro-spider

![alt text](https://raw.githubusercontent.com/JasperCherry/public-content/main/joro.png)

joro-spider is a javascript tool for tracking user behaviour on the website

## Installation

Use the cdn link

```html
<script src="https://cdn.jsdelivr.net/npm/joro-spider@1.0.8/index_cdn.min.js"></script>
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

// starts spider activity
joro.start();

// logs out data stream
joro.streamData = (data) => {
  console.log({ data });
};

// stops spider activity
joro.stop();
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
