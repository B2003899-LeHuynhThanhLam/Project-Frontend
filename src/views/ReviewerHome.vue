<template>
    <div class="list row">
        
        <div class="col-md-12">
            <div class="mb-3 input-group">
                <input 
                    type="text"
                    class="form-control"
                    placeholder="Tìm theo tên"
                    v-model="nameToSearch"/>
                <div class="input-group-append">
                    <button 
                        class="btn btn-outline-secondary"
                        type="button"
                        @click="searchName"
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <h4 style="color: black">Người đánh giá</h4>
            <ul class="list-group">
                <li
                    class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(reviewer, index) in reviewers"
                    :key="reviewer.id"
                    @click="setActiveReviewer(reviewer, index)"    
                >
                    <span style="color: black">{{ reviewer.name }}</span>
                </li>
            </ul>

            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="goToAddReviewer">
                Thêm mới
            </button>

            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="removeAllReviewers">
                Xóa tất cả
            </button>
        </div>
        <div class="col-md-8">
            <div v-if="currentReviewer">
                <ReviewerDetails 
                    :reviewer="currentReviewer"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ReviewerDetails from "../components/ReviewerDetails";
import ReviewerService from "../services/reviewer.service";


export default {
    name: "ReviewerHome",
    components: {
        ReviewerDetails,
    },
    data() {
        return {
            reviewers: [],
            currentReviewer: null,
            currentIndex: -1,
            nameToSearch: "",
        };
    },
    methods: {
        setActiveReviewer(reviewer, index) {
            this.currentReviewer = reviewer;
            this.currentIndex = reviewer ? index : -1;
        },

        async retrieveReviewers() {
            const [error, response] = await this.handle(
                ReviewerService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.reviewers = response.data;
                console.log(response.data);
            }
        },
        
        refreshList() {
            this.retriveReviewers();
            this.currentReviewer = null;
            this.currentIndex = -1;
        },

        async removeAllReviewers() {
            const [error, response] = await this.handle(
                ReviewerService.deleteAll()
            );
            if (error){
                console.log(error);
            } else {
                console.log(response.data);
                this.refreshList();
            }
        },
        goToAddReviewer() {
            this.$router.push("/addreviewer");
        },
        async searchName() {
            const [error, response] = await this.handle(
                ReviewerService.findByName(this.nameToSearch)
            );
            if(error){
                console.log(error);
            } else {
                this.reviewers = response.data;
                this.setActiveReviewer(null);
                console.log(response.data);
            }
        },
        
    }, 
    mounted() {
        this.retrieveReviewers();
    },   
};
</script>

<style>
.list {
    text-align: left;
    max-width: 900px;
    margin: auto;
}
.list-group-item.active {
  z-index: 2;
  color: #f8f7f7;
  background-color: #f3c9f5;
  border-color: #B03060;
}
.list-group-item:hover {
  color: #fff;
  background-color: #FFC0CB;
}

.btn:hover {
    color: black;
    /* border-color: #000000ab;  */
    /* color: #1a088d; */
    /* Tìm kiếm, thêm mới, xóa tất cả trang chủ */
    background-color: #f5baf6;
}
.form-control:focus {
  color: black;
  background-color: #fff;
  border-color: #fefcffab;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(190, 82, 240, 0.315);
}
.btn{
    /* Đăng xuất */
    color: #000000;
    background-color: #f9c0f2;
}
</style>