const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e){
    e.preventDefault();
    // extract user's input
    // console.dir(form); find the input is in elements - query
    // check the input value on the log => console.log(form.elements.query.value);
    const searchTerm = form.elements.query.value;
    // if more than query
    const config = { params: { q: searchTerm}};
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    //img.src = res.data[0].show.image.medium;
    makeImages(res.data);
    form.elements.query.value = '';
})

const makeImages = (shows) => {
    for (let result of shows){
        // no images in some case
        if (result.show.image){
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
        
    }
}