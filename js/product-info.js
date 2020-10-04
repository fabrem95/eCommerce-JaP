var product = {};
var comments = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

            htmlContentToAppend += `
                <div class="carousel-item">
                    <img src="`+ imageSrc +`" class="rounded d-block w-100" alt="...">
                </div>
            `
        }

    htmlContentToAppend += `
            <a class="carousel-control-prev ml-5" href="#productImagesGallery" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#productImagesGallery" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
    `
    document.getElementById("product-infoGallery").innerHTML = htmlContentToAppend;
    document.getElementsByClassName("carousel-item")[0].classList.add("active")
}

function starRate(num) {
    const starOn = `<span class="fa fa-star checked"></span>`
    const starOff = `<span class="fa fa-star"></span>`

    return(
        starOn.repeat([num]) +
        starOff.repeat([5-num]))
}

function showComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comments = array[i];

        htmlContentToAppend += `
        <div class="border border-secondary rounded mb-2 p-2 depth-1">
            <div class="row">
                <div class="col-md-9">
                    <h6 class="font-weight-bold text-primary ml-2">` + comments.user + `</h6>
                </div>
                <div class="col-md-3">
                    <div id=`+ i.toString() +` class="text-right">
                    </div>
                </div>
            </div> 
                <hr class="my-3">
                <div>
                    <p class="ml-2">` + comments.description + `</p>
                </div>
                <div>
                    <p class="text-right mb-0">` + comments.dateTime + `</p>
                </div>
        </div>`

        document.getElementById("productComments").innerHTML = htmlContentToAppend
    }
    for (let i = 0; i < array.length; i++){
        let comments = array[i];

        document.getElementById(i.toString()).innerHTML = starRate(comments.score)
    }
}

function newPost(object){

    htmlContentToAppend = `
    <div class="border border-secondary rounded mb-2 p-2 depth-1">
        <div class="row">
            <div class="col-md-9">
                <h6 class="font-weight-bold text-primary ml-2">` + object.user + `</h6>
            </div>
            <div class="col-md-3">
                <div id=`+ object.id +` class="text-right">
                </div>
            </div>
        </div> 
            <hr class="my-3">
        <div>
            <p class="ml-2">` + object.description + `</p>
        </div>
        <div>
            <p class="text-right mb-0">` + object.dateTime + `</p>
        </div>
    </div>`

    document.getElementById("productComments").innerHTML += htmlContentToAppend
    document.getElementById(object.id).innerHTML = starRate(object.score)
}

function showRecommendedGallery(array1, array2){
    let htmlContentToAppend = "";

    for(let i = 0; i < array2.length; i++){
        
        let recommended = array1[array2[i]];
            
            htmlContentToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <p class="">`+ recommended.name +`<p>
                    <img class="img-fluid img-thumbnail" src="` + recommended.imgSrc + `" alt="">
                </div>
            </div>`
    
            document.getElementById("relatedProducts").innerHTML = htmlContentToAppend
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productCostHTML = document.getElementById("productCost");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = "US$ " + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});

// Desplegar comentarios
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
        {
            comments = resultObj.data;

            showComments(comments);
            
            const commentUser = document.getElementById('commentUser')
            const keyUser = localStorage.getItem("user");

            commentUser.innerHTML = keyUser
    }
})
});

// Imprimir nuevo comentario
document.getElementById('submit').onclick = (e) => {
    e.preventDefault()
    const newCommScore = document.getElementsByName('star')
    const newCommUser = document.getElementById('commentUser')
    const newComment = document.getElementById('newComment')
    const genDate = new Date()
    const year = genDate.getFullYear()
    const month = genDate.getMonth()
    const day = genDate.getDate()
    const hour = genDate.getHours()
    const min = genDate.getMinutes()
    const sec = genDate.getSeconds()
    const date = year + "-" + (month+1) + "-" + day + " " + hour + ":" + min + ":" + sec
    
    for (let i = 0; i < newCommScore.length; i++) {
        
        if (newCommScore[i].checked){
            
            const newComent = {
                id: Date.now(),
                score: newCommScore[i].value,
                description: newComment.value.toString(),
                user: newCommUser.textContent,
                dateTime: date
            }
            newPost(newComent)
        } 
    }
}

// Galeria de productos recomendados
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj2){
        if (resultObj2.status === "ok")
        {
            totalProducts = resultObj2.data;
    
            //Muestro las imagenes en forma de galería
            showRecommendedGallery(totalProducts, product.relatedProducts);
        }
    });
});

