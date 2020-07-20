function getResults() {
    let fulltime = $('#fulltime');
    let checked = fulltime.prop('checked');
    let description = $('#description').val();
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fulltime: checked,
            description: description,
        }),
    };
    return getResults;
}

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
