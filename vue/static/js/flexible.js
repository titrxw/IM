/**
 * YDUI ??߳đ??��??��?
 * remݰ��??��???ݰ�\??���z?px / 100 = �W???rem  ��?: 100px = 1rem
 */
!function (window) {

    /* ݰ�\??��??����?�_? */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55�?�q�a?320px��???đ????11.2�?�ɧ�??420px��????�Ϥ� */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    })();

    /* ����????��???�r?�?�W?????���^?1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* ����??IOS??�r? */
        doc.documentElement.classList.add('ios');
        /* IOS8���?Ď?html����??hairline?��???�����?��?��??? */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);