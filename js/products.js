const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_BY_PROD_PRICE_DESC = "PrecioDesc";
const ORDER_BY_PROD_PRICE_ASC = "PrecioAsc";

const prodSearch = document.getElementById("prodSearch");

var currentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

const sortProduct = (criteria, array) => {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_PRICE_DESC){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_PRICE_ASC){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

const showProductList = () => {

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductArray.length; i++){
        let product = currentProductArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class="col-12 col-md-3 p-1">
                <a href="product-info.html" class="card custom-card col-12 col-md-12 mb-2 p-0 h-100 list-group-item-action">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="bd-placeholder-img card-img-top">
                        <h5 class="m-3">`+ product.name +`</h5>

                    <div class="card-body">
                        <p class="card-text text-truncate">` + product.description + `</p>
                    </div>
                    <hr>
                            
                    <div class="row">
                        <div class="col-6 col-md-6 text-md-center text-center"><small class="text-muted">` + product.soldCount + ` artículos</small></div>
                        <div class="col-6 col-md-6 text-md-center text-center"><h5 class="font-weight-bold">US$ `+ product.cost +`</h5></div>
                    </div>
                </a>
            </div>
            `
        } 
        document.getElementById("products").innerHTML = htmlContentToAppend;
    }
}

const sortAndShowProduct = (sortCriteria, productArray) => {
    currentSortCriteria = sortCriteria;

    if(productArray != undefined){
        currentProductArray = productArray;
    }

    currentProductArray = sortProduct(currentSortCriteria, currentProductArray);

    //Muestro las categorías ordenadas
    showProductList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProduct(ORDER_ASC_BY_NAME, resultObj.data);
        }
        prodSearch.addEventListener("keyup", (e) => {
            const searchString = prodSearch.value.toLowerCase()
            const products = resultObj.data
            const currentProductArray= products.filter( product => { 
                return (product.name.toLowerCase().includes(searchString) || 
                product.description.toLowerCase().includes(searchString))})
            sortAndShowProduct(ORDER_ASC_BY_NAME, currentProductArray);
        })
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("sortByPriceAsc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_PRICE_DESC);
    });

    document.getElementById("sortByPriceDesc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_PRICE_ASC);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductList();
    });
});