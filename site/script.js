(function () {
  var bar = document.getElementById('bar');
  var hero = document.querySelector('.hero');

  if (bar && hero) {
    function sync() {
      var trigger = hero.offsetTop + hero.offsetHeight - 80;
      bar.classList.toggle('on', window.pageYOffset > trigger);
    }

    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  var btn = document.getElementById('copy');
  var toast = document.getElementById('toast');
  var WX = 'li18689683';
  var timer;

  function tip(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('on'); }, 1600);
  }

  if (btn) {
    btn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(WX).then(
          function () { tip('已复制'); },
          function () { tip('长按上面的号复制'); }
        );
      } else {
        var ta = document.createElement('textarea');
        ta.value = WX;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          tip('已复制');
        } catch (e) {
          tip('长按上面的号复制');
        }
        document.body.removeChild(ta);
      }
    });
  }
})();
