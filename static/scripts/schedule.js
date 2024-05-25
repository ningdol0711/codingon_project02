// public/js/calendar.js

import { Calendar } from 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.4/main.min.js';

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    // 이벤트 데이터를 서버에서 주입된 전역 변수로부터 가져옵니다.
    const events = window.f1Schedule;

    const calendar = new Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: events,
        eventRender: function(info) {
            const tooltip = new Tooltip(info.el, {
                title: info.event.extendedProps.description,
                placement: 'top',
                trigger: 'hover',
                container: 'body'
            });
        }
    });

    calendar.render();
});
