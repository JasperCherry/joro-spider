const joro = {};
joro.spiderName = '';
joro.scrollThrottle = 500;
joro.presenceThrottle = 1000;
joro.presenceTimeout = 60;
joro.scrollWait = false;
joro.stopSpider = false;
joro.streamData = function(data) { };

joro.createCommonData = function(type) {
  const data = {};
  data.type = type;
  data.timestamp = Date.now();
  data.url = window.location.href;
  data.windowWidth = window.innerWidth;
  data.windowHeight = window.innerHeight;
  data.userId = joro.userId;
  data.spiderName = joro.spiderName;

  return data;
}

joro.delayPresence = function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

joro.start = async function(config) {
  joro.spiderName = config?.spiderName || joro.spiderName;
  joro.scrollThrottle = config?.scrollThrottle || joro.scrollThrottle;
  joro.presenceThrottle = config?.presenceThrottle || joro.presenceThrottle;
  joro.presenceTimeout = config?.presenceTimeout || joro.presenceTimeout;

  let joroUserId = localStorage.getItem('joroUserId');
  if (!joroUserId) {
    joroUserId = crypto.randomUUID();
    localStorage.setItem('joroUserId', joroUserId);
  }
  joro.userId = joroUserId;

  document.addEventListener('scroll', function(event){
    if (joro.stopSpider) return;

    if (!joro.scrollWait) {
      joro.scrollWait = true;
      setTimeout(function () {
          joro.scrollWait = false;
          const data = joro.createCommonData('scroll');
          data.scrollX = window.scrollX;
          data.scrollY = window.scrollY;
          joro.streamData(data);
      }, joro.scrollThrottle);
    }
  });

  document.addEventListener('click', function(event){
    if (joro.stopSpider) return;

    const data = joro.createCommonData('click');
    data.mouseX = event.pageX;
    data.mouseY = event.pageY;
    joro.streamData(data);
  });

  for (let i = 0; i < joro.presenceTimeout; i += 1) {
    if (joro.stopSpider) return;

    const data = joro.createCommonData('presence');
    joro.streamData(data);
    await joro.delayPresence(joro.presenceThrottle);
  }
};

joro.stop = function() {
  joro.stopSpider = true;
}
