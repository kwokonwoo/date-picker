/**
 * @file Render the data and add event listener.
 * @author wuguoan(kwokonwoo@gmail.com)
 */
(function () {
    var $wrapper;
    var monthData;
    var datepicker = window.datepicker;

    // 绘制表格函数
    datepicker.buildUi = function(year, month) {
        monthData = datepicker.getMonthData(year, month);

        var html = ''
            + '<div class="datepicker-header">' 
            +     '<span class="datepicker-btn datepicker-pre-yr">&lt;&lt;</span>' 
            +     '<span class="datepicker-btn datepicker-pre-mth">&lt;</span>' 
            +     '<span class="datepicker-curr-mth">' + monthData.year + ' 年 ' + monthData.month + ' 月' + '</span>' 
            +     '<span class="datepicker-btn datepicker-next-yr">&gt;&gt;</span>' 
            +     '<span class="datepicker-btn datepicker-next-mth">&gt;</span>' 
            + '</div>' 
            + '<div class="datepicker-body">' 
            +     '<table>' 
            +         '<thead>' 
            +             '<tr>' 
            +                 '<th>一</th>' 
            +                 '<th>二</th>' 
            +                 '<th>三</th>' 
            +                 '<th>四</th>' 
            +                 '<th>五</th>' 
            +                 '<th>六</th>' 
            +                 '<th>日</th>' 
            +             '</tr>' 
            +         '</thead>' 
            +         '<tbody>';

        var currentDay = new Date().getDate();
        var currentMonth = new Date().getMonth() + 1;
        var currentYear = new Date().getFullYear();

        // 动态dom处理及相关className添加
        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i];

            if (i % 7 === 0) {
                html += '<tr>';
            }
            
            if (date.month === monthData.month) {
                if (date.date === currentDay && monthData.year===currentYear && date.month === currentMonth) {
                    html += '<td data-date=" ' + date.date + '" class="current-month-light current-day-light">' + date.showDate + '</td>';
                } 
                else {
                    html += '<td data-date=" ' + date.date + '" class="current-month-light">' + date.showDate + '</td>';
                }
            } 
            else {
                html += '<td data-date=" ' + date.date + '" class="sibling-month-light">' + date.showDate + '</td>';
            }

            if (i % 7 === 6) {
                html += '</tr>';
            }
        }

        html +=   '</tbody>' 
        +      '</table>' 
        + '</div>';

        return html;
    };

    // 渲染日历函数
    datepicker.render = function(direction) {
        var year, month;

        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }

        switch (direction) {
            case 'prev':
                month--;
                break;
            case 'next':
                month++;
                break;
            case 'prevyear':
                year--;
                break;
            case 'nextyear':
                year++;
                break;
        } 

        var html = datepicker.buildUi(year, month);

        $wrapper = document.querySelector('.datepicker-wrapper');
        if (!$wrapper) {
            $wrapper = document.createElement('div');
            $wrapper.className = 'datepicker-wrapper';
            document.body.appendChild($wrapper);
        }

        $wrapper.innerHTML = html;
    };

    // 初始化和事件绑定函数
    datepicker.init = function(input) {
        datepicker.render();

        var $input = document.querySelector(input);
        var isOpen = false;

        // 显示和隐藏日历事件绑定
        $input.addEventListener('click', function() {
            if (isOpen) {
                $wrapper.classList.remove('datepicker-wrapper-show');
                isOpen = false;
            } 
            else {
                $wrapper.classList.add('datepicker-wrapper-show');

                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.top = top + height + 2 + 'px';
                isOpen = true;
            }
        }, false);

        // 切换年份、月份事件绑定
        $wrapper.addEventListener('click', function(e) {
            var cls = e.target.classList;

            switch (true) {
                case cls.contains('datepicker-pre-mth'):
                    datepicker.render('prev');
                    break;
                case cls.contains('datepicker-next-mth'):
                    datepicker.render('next');
                    break;
                case cls.contains('datepicker-pre-yr'):
                    datepicker.render('prevyear');
                    break;
                case cls.contains('datepicker-next-yr'):
                    datepicker.render('nextyear');
                    break;
            }
        }, false);

        // 返回所选日期事件绑定
        $wrapper.addEventListener('click', function(e) {
            var $target = e.target;

            if ($target.tagName.toLowerCase() !== 'td') {
                return;
            }
            else {
                var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
                $input.value = format(date);

                $wrapper.classList.remove('datepicker-wrapper-show');
                isOpen = false;
            }
        }, false);

    };

    // 格式化日期函数
    function format(date) {
        result = '';

        // 在个位数前加上0使得日期显示统一
        var prefix = function(num) {
            if (num <= 9) {
                return '0' + num;
            }

            return num;
        };

        result += date.getFullYear() + '-';
        result += prefix(date.getMonth() + 1) + '-';
        result += prefix(date.getDate());

        return result;
    }
})();
