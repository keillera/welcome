/*globals $ particlesJS moment */
/*eslint no-console: ["error", { allow: ["log"] }] */

// スクロールをスムーズに
$(function () {
  $('.smooth-anchor').click(function () {
    const speed = 500;
    const href = $(this).attr("href");
    const target = $(href === "#" || href === "" ? 'html' : href);
    const headerHeight = $('#navbar-header').height();
    const position = target.offset().top - headerHeight;
    $('body,html').animate({scrollTop: position}, speed, 'swing');
    return false;
  });
});

// カウントダウンの時計
// 価格の自動更新
const PRICE_TABLE = [0, 2900, 2600, 2300, 2000];
const TERM_END_DATE_TIMES = [
  '2017-09-01T01:59:59Z',
  '2017-09-08T01:59:59Z',
  '2017-09-15T01:59:59Z',
  '2017-09-22T01:59:59Z',
  '2017-09-29T01:59:59Z',
].map((termEndDateTimes) => moment(termEndDateTimes));

$(function() {
  const currentDate = new Date();
  const $daysContainer = $('#countdown-timer-days');
  const $hoursContainer = $('#countdown-timer-hours');
  const $minutesContainer = $('#countdown-timer-minutes');
  const $secondsContainer = $('#countdown-timer-seconds');

  for (let i = 0; i < TERM_END_DATE_TIMES.length; i++) {
    if (currentDate <= TERM_END_DATE_TIMES[i]) {
      $('#cover-current-term').text(i);
      $('#cover-current-rate').text(PRICE_TABLE[i]);

      if (i < 3) {
        $('#cover-next-term').text(i + 1);
        $('#cover-next-rate').text(PRICE_TABLE[i + 1]);
      } else {
        $('.cover__notice').remove();
      }

      $('#countdown-timer').countdown(TERM_END_DATE_TIMES[i].toDate(), function (event) {
        $daysContainer.text(event.offset.totalDays);
        $hoursContainer.text(event.offset.hours);
        $minutesContainer.text(event.offset.minutes);
        $secondsContainer.text(event.offset.seconds);
      });

      break;
    }
  }
});

// CONTRIBUTEボタンの活性/非活性切り替え
$(function() {
  const $coverContributeButton = $('#cover-contribute-button');
  $('#cover-tac-checkbox').change(function() {
    const disabled = !$(this).is(':checked');
    $coverContributeButton.prop('disabled', disabled).toggleClass('disabled', disabled);
  });

  const $icoContributeButton = $('#ico-contribute-button');
  $('#ico-tac-checkbox').change(function() {
    const disabled = !$(this).is(':checked');
    $icoContributeButton.prop('disabled', disabled).toggleClass('disabled', disabled);
  });
});

// カバーのビデオボタンマウスオーバーで色を変更
$(function () {
  $("#cover-button").mouseover(function () {
    $(this).toggleClass('cover__caption__btn cover__caption__btn_hover');
  }).mouseout(function () {
    $(this).toggleClass('cover__caption__btn cover__caption__btn_hover');
  });
});

// カバーのビデオボタンクリックでビデオモーダル表示
$(function () {
  $("#cover-button").on('click', () => {
    $.ajax('video-modal.html', {
      timeout: 3000,
      datatype: 'html'
    }).then(function (data) {
      let video_modal = $('#video-modal').html('');
      $($.parseHTML(data)).appendTo(video_modal).modal();
    })
  });
});

// カバーの背景
//noinspection ES6ModulesDependencies
particlesJS.load('cover-particles', '/json/cover-particles.json');

// for console branding.
(function () {
  console.log("%c\u2660\u2660\u2660\u2660\u2660\u2660\u2660\u2660\u2660\u2660\u2660\u2660\u2660\u2660\u2660" +
    "\n%c\u2665\u2665\u2665\u2665\u2665\u2665\u2665\u2665\u2665\u2665\u2665\u2665\u2665\u2665\u2665\n%cALIS" +
    "\n%cThe decentralized media platform project in Japan.\n%c\u2663\u2663\u2663\u2663\u2663\u2663\u2663\u2663" +
    "\u2663\u2663\u2663\u2663\u2663\u2663\u2663\n%c\u2666\u2666\u2666\u2666\u2666\u2666\u2666\u2666\u2666\u2666\u2666" +
    "\u2666\u2666\u2666\u2666", "color: lightblue; font-size: 3em; font-weight: bold;", "color: pink; font-size: 3em;" +
    " font-weight: bold;", "color: blue; font-size: 10em; font-weight: bold; font-family: american typewriter, " +
    "brush script mt, harrington, arial, sans-serif;", "color: grey; font-size: 2em; " +
    "font-family: edwardian script itc, harrington, arial, sans-serif;", "color: lightgreen; font-size: 3em; " +
    "font-weight: bold", "color: lightgrey; font-size: 3em; font-weight: bold");
})();
