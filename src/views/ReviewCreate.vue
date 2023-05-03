<template>
    <div class="create-form">
        <div>
        <h4 style="color: black
            ">Thêm bài đánh giá</h4>
        <moviereviewForm
            :moviereview="moviereview"
            @moviereview-submit="createmoviereview"
        />
        <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import moviereviewService from "../services/moviereview.service";
import moviereviewForm from "../components/MoviereviewForm";
export default {
    name: "ReviewCreate",
    components: {
        moviereviewForm,
    },
    data() {
        return {
            moviereview: {},
            message: "",
        };
    },
    methods: {
        async createmoviereview(data) {
            const [error, response] = await this.handle(
                moviereviewService.create(data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.message = "Bài đánh giá được thêm thành công.";
                this.$router.push('/')
            }
        },
        },
    };
</script>
<style>
.create-form {
    max-width: 750px;
    margin: auto;
}
</style>