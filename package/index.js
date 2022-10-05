const joro = {};
joro.scrollWait = false;
joro.scrollThrottle = 500;
joro.presenceThrottle = 1000;
joro.presenceTimeout = 6;
joro.streamData = function(data) { };

joro.createCommonData = function(type) {
  const data = {};
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

joro.start = async function(type) {
  let joroUserId = localStorage.getItem('joroUserId');

  if (!joroUserId) {
    joroUserId = crypto.randomUUID();
    localStorage.setItem('joroUserId', joroUserId);
  }

  joro.userId = joroUserId;

  document.addEventListener('scroll', function(event){
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
    const data = joro.createCommonData('click');
    data.mouseX = event.pageX;
    data.mouseY = event.pageY;
    joro.streamData(data);
  });

  for (let i = 0; i < joro.presenceTimeout; i += 1) {
    const data = joro.createCommonData('presence');
    joro.streamData(data);
    await joro.delayPresence(joro.presenceThrottle);
  }
};

module.exports = joro
