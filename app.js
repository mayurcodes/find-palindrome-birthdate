var checkButton = document.querySelector("#button-check");
var dateInput = document.querySelector("#input-date");
var outputDiv = document.querySelector("#div-output");

function clickEventHandler() {

    var birthdate = dateInput.value.split("-");
    var dateInNum = {
        day: Number(birthdate[2]),
        month: Number(birthdate[1]),
        year: Number(birthdate[0])
    };

    if (dateInput.value != "") {

        var palindromeCheck = checkPalindromeForDateFormats(dateInNum);

        if (palindromeCheck == true) {
            outputDiv.innerText = "Awesome!!! Your birthdate is a palindrom.";

        } else {
            var outputNextDate = nextPalindromeDate(dateInNum);
            var outputPreviousDate = previousPalindromeDate(dateInNum);
            
            if (outputNextDate[0] < outputPreviousDate[0]) {
                outputDiv.innerText = "Ooops....Your birthdate is not a palindrome. " + "\r\n The nearest palindrome date is " +   outputNextDate[1] + ", " + "you missed by " + outputNextDate[0] + ((outputNextDate[0] == 1) ? " day!!" : " days!!");
            } else {
                outputDiv.innerText = "Ooops....Your birthdate is not a palindrome. " + "\r\n The nearest palindrome date is " + outputPreviousDate[1] + ", " + "you missed by " + outputPreviousDate[0] + ((outputPreviousDate[0] == 1) ? " day!!" : " days!!");

            }
        }


    } else {
        outputDiv.innerText = "Please select date.";
    }

}

checkButton.addEventListener("click", clickEventHandler);


function stringReverse(bdate) {
    return bdate.split('').reverse().join('');
}

function checkPalindrome(bdate) {
    var isPalindrome = stringReverse(bdate);
    if (bdate == isPalindrome) {
        return true;
    }
    return false;
}

function leapYear(year) {

    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function numberToString(dateInNum) {
    var bdateString = {
        day: '',
        month: '',
        year: ''
    };

    if (dateInNum.day < 10) {
        bdateString.day = '0' + dateInNum.day;
    } else {
        bdateString.day = dateInNum.day.toString();
    }
    if (dateInNum.month < 10) {
        bdateString.month = '0' + dateInNum.month;
    } else {
        bdateString.month = dateInNum.month.toString();
    }
    bdateString.year = dateInNum.year.toString();

    return bdateString;
}

function dateFormats(bdate) {
    var dateStr = numberToString(bdate);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);

    return [ddmmyyyy, mmddyyyy, yyyymmdd, yymmdd, ddmmyy, mmddyy];

}

function checkPalindromeForDateFormats(bdate) {
    var palindromeList = dateFormats(bdate);

    for (i = 0; i < palindromeList.length; i++) {
        if (checkPalindrome(palindromeList[i])) {
            return true;
            break;
        }

    }
    return false;
}

function getNextDate(bdate) {
    var day = bdate.day + 1;
    var month = bdate.month;
    var year = bdate.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month == 2) {
        if (leapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            } else {
                if (day > 28) {
                    day = 1;
                    month++;
                }
            }
        }

    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function nextPalindromeDate(bdate) {
    var daysCounter = 0;
    var nextDate = getNextDate(bdate);

    while (1) {
        daysCounter++;
        var isPalindrome = checkPalindromeForDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    // do{
    //     daysCounter++;
    //     var  isPalindrome = checkPalindromeForDateFormats(nextDate);
    //     nextDate = getNextDate(nextDate);
    // }while(isPalindrome != true)

    var nearDate = nextDate.day + "-" + nextDate.month + "-" + nextDate.year;

    return [daysCounter, nearDate];
}

function getPreviousDate(bdate) {
    var day = bdate.day - 1;
    var month = bdate.month;
    var year = bdate.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day == 0) {
        month--;

        if (month == 0) {
            year--;
            month = 12;
            day = 31;
        } else if (month == 2) {
            if (leapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = daysInMonth[month - 1];
        }
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function previousPalindromeDate(bdate) {
    var daysCounter = 0;
    var previousDate = getPreviousDate(bdate);

    for (;;) {
        daysCounter++;
        var isPalindrome = checkPalindromeForDateFormats(previousDate);
        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);

    }

    // do{
    //     daysCounter++;
    //     var  isPalindrome = checkPalindromeForDateFormats(previousDate);
    //     previousDate = getPreviousDate(previousDate);
    // }while(isPalindrome != true)

    var nearDate = previousDate.day + "-" + previousDate.month + "-" + previousDate.year;

    return [daysCounter, nearDate];
}