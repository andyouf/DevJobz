const BASE_URL = 'https://jobs.github.com/positions'

async function getResults(endpointURL) {
    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.log(error);
    }
}

async function updateResults() {
    const fullTime = $("#fulltime#").val();
    const description = $("#description").val();
    const data = await getResults('http:///localhost:3000/job-search')
    renderResults(data);

    console.log(data);
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
renderResults()

function bootstrap() {
    updateResults();
}