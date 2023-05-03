<template>
    <div class="jumbotron p-4 p-md-5 text-dark rounded bg-light">
        <div class="col-md-12">
                <div class="row overflow-hidden flex-md-row">
                    <div class="col d-flex flex-column position-static">
                        <p  
                            font-weight=400;
                            class="d-inline-block mb-2" 
                            style="color: black"
                            >
                            Người đánh giá : {{ moviereview.reviewer }}
                        </p>
                    </div>
                </div>
        </div>
        <div class="col-md-12 px-0 py-3 border-bottom">
          <h1 class="display-4 font-italic text-center" id="title">{{ moviereview.title }}</h1>
        </div>

        <div class="border-top p-1">
            <h2 class="px-1 py-3 font-weight-bold text-center" id="title"> {{ moviereview.moviename }}</h2>
            <p class="font-italic text-right" style="font-size: 30px; color: #8B0A50">{{ moviereview.author }}</p>
        </div>

        <div class="col-md-12 p-3">
          <h5 class="font-weight-bold"  style="color: #8B0A50">Giới thiệu</h5>
          <p class="text-justify">{{ moviereview.intro }}</p>
          <h5 class="font-weight-bold"  style="color: #8B0A50">Đánh giá</h5>
          <p class="text-justify">{{ moviereview.content }}</p>
        </div>
        
        <div class="row mb-2">
            <div class="col-md-6">
                    <div class="col p-3 d-flex flex-column position-static">
                        <strong class="d-inline-block" style="color: red">
                            Yêu thích:
                            <i v-if="moviereview.favorite" style="color: red" class="fas fa-heart"></i>
                            <i v-else class="far fa-heart"></i>
                        </strong>
                    </div>
            </div>
            <div class="col-md-6">
                    <div class="col p-3 d-flex flex-column position-static">
                        <strong class="d-inline-block text-right" >
                            <router-link style="color: #8B0A50" :to="'/editmoviereview/' + moviereview.id">
                                <span >Chỉnh sửa <i class="far fa-edit"></i></span>
                            </router-link>
                        </strong>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "moviereviewFullDetails",
    props: ["moviereview"],
    
};
</script>

<style>
#title {
    font-family: "sans-serif";
    color: #8B0A50;
}

</style>

<!-- DONE -->
