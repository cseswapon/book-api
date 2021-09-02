const myFunction = () =>
{
    setTimeout(showPage, 3000);
}

const showPage = () =>
{
    document.getElementById("loading").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}
// create custom id // whith global variable //
const result = document.getElementById('about-result');
// button click //
const searchBook = () =>
{
    const inputText = document.getElementById('input-text');
    const inputTextValue = inputText.value;
    inputText.value = '';
    if (inputTextValue === '') {    // empty error handlig
        document.getElementById('empty').style.display = 'block';
        document.getElementById('card-display').style.display = 'none';
        document.getElementById('about-result').style.display = 'none';
        document.getElementById('error').style.display = 'none';
    } else {
        document.getElementById('empty').style.display = 'none';
        const url = `https://openlibrary.org/search.json?q=${inputTextValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => booksearch(data.docs))
        // spinner add 
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('about-result').style.display = 'none';
        document.getElementById('card-display').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        result.style.display = 'none';
    }
}
// api call with function //
const booksearch = data =>
{
    // console.log(data);
    if (data.length === 0) {    // error massage 
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('about-result').style.display = 'none';
        document.getElementById('card-display').style.display = 'none';
        document.getElementById('empty').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    } else {
        document.getElementById('error').style.display = 'none';
        document.getElementById('card-display').style.display = 'block';
        // errror message //
        result.innerText = `About ${data.length} search results available`;
        result.style.display = 'block';
        const card = document.getElementById('card-title');
        card.textContent = '';
        document.getElementById('spinner').style.display = 'none';
        data?.forEach(book =>
        {
            // console.log(book);
            // console.log(book.text[2]);
            // card ready with deynamic //
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : '10909258'}-L.jpg" class="card-img-top img-fluid mx-auto h-50" alt="Book img not found">
            <div class="card-body">
                <h5 class="card-title">${book.title ? book.title : 'not found result'}</h5><hr>
                <p class="card-text"><span><strong>Author : </strong></span>${book.author_name ? book.author_name : 'not found'}</p>
                <p class="card-text"><span><strong>Publisher : </span>${book.publisher ? book.publisher : 'not found'} </strong></p>
            </div>
            <div class="card-footer">
                <small class="text-muted">
                <span><strong>1<sup>st</sup> Publish year : </strong>${book.first_publish_year ? book.first_publish_year : ' '}</span>
                </small>
            </div>
        </div>
            `;
            card.appendChild(div);
        });
        // spinner hide 
        document.getElementById('spinner').style.display = 'none';
    }
}