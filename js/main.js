const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const validate = document.getElementById('validate');
const searchBooks = async searchText => {
    const res = await fetch('../data/books.json');
    const books = await res.json();
    let matches = books.filter(book => {
        const regex = new RegExp(`^${searchText}`,'gi');
        return book.title.match(regex) || book.author.match(regex);
    })
    console.log(matches);
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    outputHtml(matches);
}
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches
            .map(
                match => `
                <div class="card card-body mb-1">
                    <h4>${match.title} (${match.author}) <span
                    class="text-primary">
                    ${match.year}</h4>
                    <small>country: ${match.country} / pages:${match.pages}</small>
                </div>
                `
            )
            .join('');
        matchList.innerHTML = html;
                
    } else {
        validate.innerHTML = `Sorry this book is among the top 100`;
    }
}
search.addEventListener('input',() => searchBooks(search.value))   