

const TypeWriter = function (txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method

TypeWriter.prototype.type = function () {
    // Current Index of word
    const current = this.wordIndex % this.words.length;
    // Get Full text of current word
    const fullTxt = this.words[current];
    // Check if deleting
    if (this.isDeleting) {
        // remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element 
    this.txtElement.innerHTML = `<span><svg class="search" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>${this.txt}</span>`;

    // Initial type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        // make pause at end
        typeSpeed = this.wait;
        // set delete to true
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // pause b4 start typing
        typeSpeed = 500;
    }


    setTimeout(() => this.type(), typeSpeed)
}

// INIT ON DOM LOAD
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // INIT TYPEWRITER

    new TypeWriter(txtElement, words, wait);
}


function myFunction() {

    // check for focus
    // var isFocused = (document.activeElement === dummyEl);

    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}




// Countriy's line chart
document.addEventListener('DOMContentLoaded', function () {
    const chart = Highcharts.chart('container', {
        title: {
            text: 'Covid Visualized Data'
        },
        subtitle: {
            text: 'Country Name'
        },
        chart: {
            type: 'line',
            zoomType: 'x'
        }, responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        enabled: false
                    }
                }
            }]
        },
        xAxis: {
            categories: $('#date')[0].innerText.split(",")
        },
        yAxis: {
            gridLineWidth: 1
        },
        tooltip: {
            backgroundColor: 'white',
            borderColor: 'black',
            borderRadius: 10,
            borderWidth: 0.5
        },
        series: [{
            name: 'cases',
            allowPointSelect: true,
            data: $('#pastCases')[0].innerText.split(",").map(x => +x),
            color: "black"
        },
        {
            name: 'deaths',
            allowPointSelect: true,
            data: $('#pastDeaths')[0].innerText.split(",").map(x => +x),
            color: "red"
        }]


    });
});


function discord() {
    alert("Discord username: 𝕋𝕠𝕜𝕪𝕠#8848")
}