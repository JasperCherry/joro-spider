function createJoro(config) {
  const joro = {};
  joro.spiderName = config?.spiderName || '';
  joro.scrollThrottle = config?.scrollThrottle || 500;
  joro.presenceThrottle = config?.presenceThrottle || 1000;
  joro.presenceTimeout = config?.presenceTimeout || 60;
  joro.scrollWait = false;
  joro.spiderRunning = false;
  joro.streamData = function(data) { };

  joro.createCommonData = function(type) {
    const data = {};
    data.spiderName = joro.spiderName;
    data.type = type;
    data.timestamp = Date.now();
    data.url = window.location.href;
    data.windowWidth = window.innerWidth;
    data.windowHeight = window.innerHeight;
    data.userId = joro.userId;

    return data;
  }

  joro.delayPresence = function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  joro.handleClickEvent = function(event) {
    const data = joro.createCommonData('click');
    data.mouseX = event.pageX;
    data.mouseY = event.pageY;
    joro.streamData(data);
  }

  joro.handleScrollEvent = function(event) {
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
  }

  joro.start = async function() {
    if (joro.spiderRunning) {
      return;
    } else {
      joro.spiderRunning = true;
    }

    let joroUserId = localStorage.getItem('joroUserId');
    if (!joroUserId) {
      joroUserId = crypto.randomUUID();
      localStorage.setItem('joroUserId', joroUserId);
    }
    joro.userId = joroUserId;

    document.addEventListener('click', joro.handleClickEvent);
    document.addEventListener('scroll', joro.handleScrollEvent);

    for (let i = 0; i < joro.presenceTimeout; i += 1) {
      if (!joro.spiderRunning) break;

      const data = joro.createCommonData('presence');
      joro.streamData(data);
      await joro.delayPresence(joro.presenceThrottle);
    }
  };

  joro.stop = function() {
    joro.spiderRunning = false;
    document.removeEventListener('click', joro.handleClickEvent);
    document.removeEventListener('scroll', joro.handleScrollEvent);
  }

  return joro;
}

module.exports = createJoro
