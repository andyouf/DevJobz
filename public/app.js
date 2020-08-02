$('#job-search').on('submit', async function (event) {
    event.preventDefault();
    try {
        const response = await fetch(`/job-search`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: $("#description").val(),
                fulltime: $("#fulltime").val()
            })
        });
        const { results } = await response.json();
        console.log("these are the results:", results);
        updateResults(results);
    } catch (error) {
        console.log(error)
    }
});




function updateResults(results) {
    const root = $('#results');
    root.empty();
    results.forEach(function (results) {
        root.append(renderResults(results));

    });
}


function renderResults(results) {
    const { id, type, company, location, title, description, how_to_apply } = results;

    let resultEl =
        $(` <div class = "job-results">
    <div class = "jobs-info>
        <h2> ${results.title}</h2>
       
        <h4> ${results.company}</h4>
        <p> ${results.location}, ${results.type}</p>
        <p>${results.description}</p>
        <p>${results.how_to_apply}</p>
    </div>
    </div>`).data("results", results)
    return resultEl
}

async function fetchQuote() {
    const response = await fetch('/cowspiration');
    const { cow } = await response.json();

    $('#results').empty().append($(`<pre class="cow">${cow}</pre>`).addClass('open'))
}

fetchQuote();
