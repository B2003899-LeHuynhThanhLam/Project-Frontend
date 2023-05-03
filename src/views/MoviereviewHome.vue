<template>
    <div class="row">
        <div class="col-md-12">
            <div class="mb-3 input-group">
                <input type="text" class="form-control" placeholder="Tìm theo tên" v-model="nameToSearch" />
                <div class="input-group-append">
                    <button class="btn " type="button" @click="searchName">
                        Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div v-if="currentmoviereview">
                <moviereviewFullDetails :moviereview="currentmoviereview" />
            </div>
            <carousel :autoplay="3000">
                <slide v-for="(banner, index) in banners" :key="index" :style="{
                    background: `url(${banner.url})`
                }" class="banner-item">
                </slide>

                <template #addons>
                    <navigation />
                    <pagination />
                </template>
            </carousel>
        </div>
        <div class="col-md-4">
            <h4 style="color: black" font-family: Comic Sans MS >Bài đánh giá</h4>
            <div class="list-group">
                <div class="list-group-item" :class="{ active: index == currentIndex }"
                    v-for="(moviereview, index) in moviereviews" :key="moviereview.id"
                    @click="setActivemoviereview(moviereview, index)">
                    <div class="d-flex w-100 justify-content-between">
                        <strong class="mb-1" style="color: #B03060">{{ moviereview.title }}</strong>
                    </div>
                    <p class="mb-1 font-italic text-secondary">{{ moviereview.moviename }}</p>

                </div>
            </div>

            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="goToAddmoviereview">
                Thêm mới
            </button>

            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="removeAllmoviereviews">
                Xóa tất cả
            </button>
        </div>

    </div>
</template>


<script>
import moviereviewService from "../services/moviereview.service";
import moviereviewFullDetails from "../components/MoviereviewFullDetails";
import banners from '../config/banners'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
    name: "moviereviewHome",
    components: {
        moviereviewFullDetails,
        Carousel,
        Slide,
        Navigation,
        Pagination
    },
    data() {
        return {
            moviereviews: [],
            currentmoviereview: null,
            currentIndex: -1,
            nameToSearch: "",
            banners
        };
    },
    methods: {
        setActivemoviereview(moviereview, index) {
            this.currentmoviereview = moviereview;
            this.currentIndex = moviereview ? index : -1;
        },

        async retrievemoviereviews() {
            const [error, response] = await this.handle(
                moviereviewService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.moviereviews = response.data;
                console.log(response.data);
            }
        },

        refreshList() {
            this.retrivemoviereviews();
            this.currentmoviereview = null;
            this.currentIndex = -1;
        },

        async removeAllmoviereviews() {
            const [error, response] = await this.handle(
                moviereviewService.deleteAll()
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.refreshList();
            }
        },
        goToAddmoviereview() {
            this.$router.push("/addmoviereview");
        },
        async searchName() {
            const [error, response] = await this.handle(
                moviereviewService.findByName(this.nameToSearch)
            );
            if (error) {
                console.log(error);
            } else {
                this.moviereviews = response.data;
                this.setActivemoviereview(null);
                console.log(response.data);
            }
        },

    },
    mounted() {
        this.retrievemoviereviews();
    },
};
</script>

<style scoped>
#title {
    font-family: "Playfair Display";
    color: #dc05e3;
}

.list-group-item.active {
    z-index: 2;
    /* color: #e9ec31; */
    background-color: white;
    border-color: #010101ab;
    box-shadow: 0 0 0 0.2rem white(253, 252, 250, 0.315);
}

.list-group-item:hover {
    color: #f8f8f8;
    background-color:#FFC0CB;
}
/* Nút tùm kiếm */
.btn:hover {
    /* color: #823232;
    background-color: rgb(12, 95, 38); */
    box-shadow: 0 0 0 0.2rem white(253, 252, 250, 0.315);
    
}
.btn{
    color: #111112;
    background-color: #f4d4ff;
}
/* Khung tìm kiếm theo tựa phim trang chủ*/
.form-control:focus {
    color: #000000;
    font-weight: 400;
    background-color: #ffffff;
    border-color: #d062d0fd;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(167, 97, 189, 0.315);
}

.banner-item {
    width: 100%;
    height: 400px;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
}
</style>
<!-- 
Trang chu -->