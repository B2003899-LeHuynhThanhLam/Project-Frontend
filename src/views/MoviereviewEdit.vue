<template>
    <div v-if="moviereview" class="edit-form">
        <h4 style="color: black;">Hiệu chỉnh</h4>
        <moviereviewForm
            :moviereview="moviereview"
            @moviereview-submit="updatemoviereview"
            @moviereview-delete="deletemoviereview"
        />
        <p>{{ message }}</p>
    </div>
    
    <div v-else>
        <br />
        <p>Không tìm thấy bài đánh giá .</p>
    </div>
</template>
<script>
import moviereviewService from "../services/moviereview.service";
import moviereviewForm from "../components/MoviereviewForm";
export default {
    name: "moviereviewEdit",
    components: {
        moviereviewForm,
    },
    data() {
        return {
            moviereview: null,
            message: "",
        };
    },
    methods: {
        async getmoviereview(id) {
            const [error, response] = await this.handle(moviereviewService.get(id));
            if (error) {
                console.log(error);
            } else {
            this.moviereview = response.data;
            console.log(response.data);
            }
        },
        async updatemoviereview(data) {
            const [error, response] = await this.handle(
                moviereviewService.update(this.moviereview.id, data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.message = "Bài đánh giá được cập nhật thành công.";
            }
        },
        async deletemoviereview() {
            const [error, response] = await this.handle(
                moviereviewService.delete(this.moviereview.id)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.$router.push({ name: "moviereview" });
            }
        },
        },
        mounted() {
            this.message = "";
            this.getmoviereview(this.$route.params.id);
        },
    };
</script>
<style>
.edit-form {
    max-width: 750px;
    margin: auto;
}
</style>