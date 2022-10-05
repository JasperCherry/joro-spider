const joro = {};
joro.scrollWait = false;
joro.scrollThrottle = 500;
joro.presenceThrottle = 1000;
joro.streamData = function(data) { };

function createCommonData(type) {
  const data = {};
  data.type = type;
  data.timestamp = Date.now();
  data.url = window.location.href;
  data.windowWidth = window.innerWidth;
  data.windowHeight = window.innerHeight;
  data.userId = joro.userId;

  return data;
}

function main() {
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
          const data = createCommonData('scroll');
          data.scrollX = window.scrollX;
          data.scrollY = window.scrollY;
          joro.streamData(data);
      }, joro.scrollThrottle);
    }
  });

  document.addEventListener('click', function(event){
    const data = createCommonData('click');
    data.mouseX = event.pageX;
    data.mouseY = event.pageY;
    joro.streamData(data);
  });

  setInterval(function () {
    const data = createCommonData('presence');
    joro.streamData(data);
  }, joro.presenceThrottle);
};

main();
