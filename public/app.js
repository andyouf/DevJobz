async function getResults() {
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
        return results;
    } catch (error) {
        console.log(error)
    }
}

getResults();

$('#job-search').on('submit', async function (event) {
    event.preventDefault();
    try {
        const response = await fetch(`/job-search`, getResults());
        const { results } = await response.json();
        updateResults(results);
    } catch (error) {
        console.error;
    }
});




function updateResults(results) {
    const root = $('#results');
    root.empty();
    results.forEach(function (results) {
        root.append(renderResults(results));
        console.log(data);
    });
}


function renderResults(results) {
    const { id, type, company, location, title, description, how_to_apply }

    let resultEl =
        $(` <div class = "job-results">
    <div class = "jobs-info>
        <h2> ${results.title}</h2>
        <p> ${full_time ? full_time : ""}
        <h4> ${results.company}</h4>
        <p> ${results.location}, ${results.type}</p>
        <p>${results.description}</p>
        <p>${results.how_to_apply}</p>
    </div>
    </div>`).data("results", results)
    return resultEl
}
