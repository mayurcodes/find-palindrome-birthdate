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

    var palindromeCheck = checkPalindromeForDateFormats(dateInNum);

    if (palindromeCheck == true) {
        outputDiv.innerHTML = "Awesome!!! Your birthdate is palindrom.";

    } else
        outputDiv.innerHTML = "Ooops....Your birthdate is not palindrome.";
        console.log(nearPalindromeDate(dateInNum));

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
    if (year % 4 === 0) {
        return true;
    }
    if (year % 400 === 0) {
        return true;
    }
    if(year % 100 === 0){
        return false;
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

function nearPalindromeDate(bdate) {
    var daysCounter = 0;
    var neardate = getNextDate(bdate);

    while (1) {
        daysCounter++;
        var isPalindrome = checkPalindromeForDateFormats(neardate);
        if (isPalindrome) {
            break;
        }
        neardate = getNextDate(neardate);
    }

    // do{
    //     daysCounter++;
    //     var  isPalindrome = checkPalindromeForDateFormats(neardate);
    //     neardate = getNextDate(neardate);
    // }while(isPalindrome != true)

    return [daysCounter, neardate];
}