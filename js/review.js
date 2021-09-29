function reviews() {

    $.getJSON('https://www.bokadirekt.se/api/places/getReviews/36026', function (data) {

        let dataArrays = data.items;
        let score, text, date, userName;
        let divRow, hrElement, divHead, divName, divDate, buttonRate, spanRate, divText, divRate;
        let scoreList = [];

        for (let i = 0; i < dataArrays.length; i++) {
            let count = dataArrays[i];
            score = count.review.score;
            text = count.review.text;
            date = count.createdAt;
            userName = count.author.name;

            divRow = document.createElement("div");
            divRow.className = "row";

            hrElement = document.createElement('hr');

            divHead = document.createElement("div");
            divHead.className = "col-sm-3";

            divName = document.createElement('div');
            divName.className = "review-block-name";
            divName.innerHTML = userName;

            divDate = document.createElement('div');
            divDate.className = "review-block-date";
            divDate.innerHTML = date;

            const divBody = document.createElement("div");
            divBody.className = "col-sm-9";

            divRate = document.createElement('div');
            divRate.className = "review-block-rate";

            for (let j = 0; j < score; j++) {

                buttonRate = document.createElement('button');
                buttonRate.type = "button";
                buttonRate.ariaLabel = "Left Align";
                buttonRate.className = "btn btn-warning btn-xs";

                spanRate = document.createElement('span')
                spanRate.className = "glyphicon glyphicon-star";
                spanRate.ariahidden = true;

                buttonRate.appendChild(spanRate);
                divRate.appendChild(buttonRate);
            }
            divText = document.createElement('div');
            divText.className = "review-block-description";
            divText.innerHTML = text;

            divHead.appendChild(divName);
            divHead.appendChild(divDate);
            divBody.appendChild(divRate);
            divBody.appendChild(divText);
            divRow.appendChild(divHead);
            divRow.appendChild(divBody);

            document.getElementById('reviewBody').appendChild(divRow);
            document.getElementById('reviewBody').appendChild(hrElement);
            scoreList.push(score)
        }
        rating(scoreList);
    });
}

function rating(scoreList) {
    let number = 0;
    for (let i = 0; i < scoreList.length; i++) {
        number += scoreList[i];
    }
    let sum = (number / scoreList.length).toString().slice(0, 3);

    let head = document.createElement('h2');
    head.className = "bold padding-bottom-7"
    head.innerHTML = sum + " <small>/ 5</small>";

    let oneSum = (number / scoreList.length).toString().slice(0, 1);

    switch (parseInt(oneSum)) {
        case 5:
            createBodyRating(5);
            break;
        case 4:
            createBodyRating(4);
            break;
        case 3:
            createBodyRating(3);
            break;
        case 2:
            createBodyRating(2);
            break;
        case 1:
            createBodyRating(1);
            break;

    }

    document.getElementById('ratingHandle').appendChild(head);

}

function createBodyRating(number) {

    let rateDiv, buttonRate, spanRate;

    rateDiv = document.createElement('div');
    rateDiv.className = "rating-block";

    for (let j = 0; j < number; j++) {

        buttonRate = document.createElement('button');
        buttonRate.type = "button";
        buttonRate.ariaLabel = "Left Align";
        buttonRate.className = "btn btn-warning btn-sm";

        spanRate = document.createElement('span')
        spanRate.className = "glyphicon glyphicon-star";
        spanRate.ariahidden = true;

        buttonRate.appendChild(spanRate);
        rateDiv.appendChild(buttonRate);
    }
    document.getElementById('ratingHandleButton').appendChild(rateDiv);
}

reviews();

