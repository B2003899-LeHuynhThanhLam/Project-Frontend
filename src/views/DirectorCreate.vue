<!-- <template>
    <div class="create-form">
        <div>
        <h4 style="color: #756262">Thêm đạo diễn</h4>
        <AuthorForm
            :author="author"
            @author-submit="createAuthor"
        />
        <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import AuthorService from "../services/author.service";
import AuthorForm from "../components/AuthorForm";
export default {
    name: "DirectorCreat",
    components: {
        AuthorForm,
    },
    data() {
        return {
            author: {},
            message: "",
        };
    },
    methods: {
        async createAuthor(data) {
            const [error, response] = await this.handle(
                AuthorService.create(data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.message = "Đạo diễn được thêm thành công!";
            }
        },
        },
    };
</script>
<style>
.create-form {
    max-width: 400px;
    margin: auto;
}
</style> -->