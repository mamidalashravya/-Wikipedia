let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendresults(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultItemEl = document.createElement("div");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);


    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);


    searchResultsEl.appendChild(resultItemEl);
}


function displayresult(searchResults) {
    spinnerEl.classList.add("d-none");


    for (let result of searchResults) {
        createAndAppendresults(result);
    }
}




function getsearchResults(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.add("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET",
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let {
                    search_results
                } = data;
                displayresult(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", getsearchResults);