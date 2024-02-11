// ==UserScript==
// @name         TiCatFix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  TiCat double click with long press
// @author       https://github.com/Pirulax
// @match        http://91.102.224.55/ticat/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=224.55
// @grant        none
// @require      https://raw.githubusercontent.com/john-doherty/long-press-event/master/dist/long-press-event.min.js
// ==/UserScript==

function setIntervalN(fn, interval, cnt) {
    var ran = 0;
    var id = setInterval(() => {
        if (++ran > cnt) {
             clearInterval(id);
        } else {
             fn();
        }
    }, interval);
}

setTimeout(function() {
    'use strict';
    
    // Long press as double click
    document.body.setAttribute('data-long-press-delay', '200')
    document.addEventListener('long-press', function (e) {
        console.log(e);
        e.target.dispatchEvent(
            new MouseEvent('dblclick', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            })
        )
    });
    
    setTimeout(() => { // Page load delay
        setIntervalN(() => {
            // Hide useless inner scroll bar
            for (let e of document.getElementsByClassName('x-grid3-scroller')) {
                e.style.overflow = 'hidden'
            }
            
            // Remove "Datum za resavanje" from everywhere
            for (const e of document.querySelectorAll(".x-grid3-td-DateTimeToSolved > div")) {
                e.parentElement.style.display = 'none'
                e.style.display = 'none'
            }

            // Make "Br" column wider
            const BR_COL_WIDTH = 60; // px
            for (const e of document.querySelectorAll(".x-grid3-hd-Broj, .x-grid3-td-Broj")) {
                e.style.width = `${BR_COL_WIDTH}px`;
            }
            for (const e of document.querySelectorAll(".x-grid3-col-Broj")) {
                e.style.width = `${BR_COL_WIDTH - 6}px`;
            }
        }, 1000, 10);
    }, 2500);
}, 1000)
