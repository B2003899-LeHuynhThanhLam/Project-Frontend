<template>
    <Form 
        @submit="$emit('moviereview-submit', moviereviewLocal)"
        :validation-schema="schema"    
    >
        <div class="form-group">
            <label for="title">Tên phim</label>
            <Field
                name="title"
                type="text"
                class="form-control"
                v-model="moviereviewLocal.title"
            />
            <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="moviename">Thể loại</label>
            <Field
                name="moviename"
                type="moviename"
                class="form-control"
                v-model="moviereviewLocal.moviename"
            />
            <ErrorMessage name="moviename" class="error-feedback" /> 
        </div>
        <div>
            <label for="author">Đạo diễn</label>
            <Field
                name="author"
                type="text"
                class="form-control"
                v-model="moviereviewLocal.author"
            />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div>
            <label for="reviewer">Người đánh giá</label>
            <Field
                name="reviewer"
                type="text"
                class="form-control"
                v-model="moviereviewLocal.reviewer"
            />
            <ErrorMessage name="reviewer" class="error-feedback" />
        </div>
        <div>
            <label for="intro">Giới thiệu</label>
            <Field
                name="intro"
                as="textarea"
                class="form-control"
                v-model="moviereviewLocal.intro" 
            />
            <ErrorMessage name="intro" class="error-feedback" />
        </div>
        <div>
            <label for="content">Đánh giá</label>
            <Field
                name="content"
                as="textarea"
                class="form-control"
                v-model="moviereviewLocal.content" 
            />
            <ErrorMessage name="content" class="error-feedback" />
        </div>
        <div class="form-group form-check check">
            <input 
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="moviereviewLocal.favorite"
            />
            <label for="favorite" class="form-check-label">
                <p>Yêu thích</p>
            </label>
        </div>

        <div class="form-group">
            <button class="btn btn-outline-secondary">Lưu</button>
            <button
                v-if="moviereviewLocal.id"
                type="button"
                class="ml-2 btn btn-outline-secondary"
                @click="$emit('moviereview-delete', moviereviewLocal.id)"
            >
                Xóa
            </button>
        </div>

    </form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage} from "vee-validate";

export default {
    name: "moviereviewForm",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["moviereview-submit", "moviereview-delete"],
    props: ["moviereview"],
    data() {
        const schema = yup.object().shape({
            title: yup
                .string()
                .required("Tên phim phải có giá trị.")
                .min(2, "Tên phim có ít nhất 2 ký tự.")
                .max(100, "Tên phim có nhiều nhất 100 ký tự."),
            moviename: yup
                .string()
                .required("Thể loại phim phải có giá trị.")
                .min(2, "Thể loại phim phải có ít nhất 2 ký tự.")
                .max(100, "Thể loại phim có nhiều nhất 100 ký tự."),
            author: yup
                .string()
                .required("Tên Đạo diễn phải có giá trị.")
                .min(2, "Tên Đạo diễn phải có ít nhất 2 ký tự.")
                .max(50, "Tên Đạo diễn có nhiều nhất 50 ký tự."),
            reviewer: yup
                .string()
                .required("Tên người đánh giá phải có giá trị.")
                .min(2, "Tên người đánh giá phải có ít nhất 2 ký tự.")
                .max(50, "Tên người đánh giá có nhiều nhất 50 ký tự."),
            intro: yup
                .string()
                .required("Giới thiệu phải có giá trị.")
                .min(50, "Giới thiệu phải có ít nhất 50 ký tự.")
                .max(2000, "Giới thiệu có nhiều nhất 2000 ký tự."),   
            content: yup
                .string()
                .required("Nội dung đánh giá phải có giá trị.")
                .min(50, "Nội dung đánh giá phải có ít nhất 50 ký tự.")
                .max(2000, "Nội dung đánh giá có nhiều nhất 2000 ký tự."),          
        });
        return {
            moviereviewLocal: this.moviereview,
            schema,
        };
    },
};
</script>

<style>
    @import "../assets/styles/main.css";    
</style>