const searchBook = () =>
{
    const inputText = document.getElementById('input-text');
    const inputTextValue = inputText.value;
    inputText.value = '';
    if (inputTextValue === '') {
        document.getElementById('empty').style.display = 'block';
        document.getElementById('card-display').style.display = 'none';
        document.getElementById('about-result').style.display = 'none';
        document.getElementById('error').style.display = 'none';
    } else {
        document.getElementById('empty').style.display = 'none';
        const url = `http://openlibrary.org/search.json?q=${inputTextValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => booksearch(data.docs))
    }
}

const booksearch = data =>
{
    // console.log(data);
    if (data.length === 0) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('about-result').style.display = 'none';
        document.getElementById('card-display').style.display = 'none';
        document.getElementById('empty').style.display = 'none';
    } else {
        document.getElementById('error').style.display = 'none';
        document.getElementById('card-display').style.display = 'block';
        const result = document.getElementById('about-result');
        result.innerText = `About ${data.length} search results`;
        result.style.display = 'block';
        const card = document.getElementById('card-title');
        data.forEach(book =>
        {
            // console.log(book);
            // console.log(book.text[2]);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top" alt="Cover Page Is Not Found">
        <div class="card-body">
            <h5 class="card-title">${book.text[2]}</h5>
            <p class="card-text"><span><strong>Author : </strong></span>${book?.author_name}</p>
            <p class="card-text"><span><strong>1<sup>st</sup> Publish : </strong>${book?.first_publish_year}</span></p>
        </div>
    </div>
        `;
            card.appendChild(div);
        });
    }
}