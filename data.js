/**
 * @file Get calendar data.
 * @author wuguoan(kwokonwoo@gmail.com)
 */
(function () {
    var datepicker = {};

    // 获取月份数据主函数
    datepicker.getMonthData = function(year, month) {
        var result = [];
        if (!year || !month) {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }

        // 获取当月的第一天并判断是周几
        var firstDay = new Date(year, month - 1, 1);
        var firstDayWeekDay = firstDay.getDay();
        if (firstDayWeekDay === 0) {
            firstDayWeekDay = 7;
        }

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        var lastDayOfLastMonth = new Date(year, month - 1, 0);
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        // 当前月份1号前要显示上个月的日期数量
        var preMonthDayCount = firstDayWeekDay - 1;
        
        // 获取当前月份最后一天的日期
        var lastDay = new Date(year, month, 0);
        var lastDate = lastDay.getDate();

        // 遍历表格并对date的值进行判断
        for (var i = 0; i < 7*6; i++) {
            var date = i + 1 - preMonthDayCount;
            var showDate = date;
            var thisMonth = month;

            if (date <= 0) {
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } 
            if (date > lastDate) {
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }

            if (thisMonth === 0) {
                thisMonth = 12;
            }
            if (thisMonth === 13) {
                thisMonth = 1;
            }

            result.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            });

        }

        return {
            year: year,
            month: month,
            days: result
        }; 
    };
    
    // 将datepicker暴露出去
    window.datepicker = datepicker;
})();
