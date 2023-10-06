<template class="p-3 mb-2 bg-dark text-white">
    <div class="p-3 mb-2 bg-dark text-white">
        <h2 class="text-center text-info display-5" ><strong>{{ article.title }} </strong></h2>
        <h2 class="text-center text-info display-6" ><strong> Written by: {{ article.author }}</strong></h2>
        <h3  class="text-center text-info display-6" ><strong> Published: {{ article.date_published }}</strong></h3>
       <br/>
        <p class="text-center text-info" > {{ article.article_text }}</p>

        <h2 class="text-center text-info"><strong> Comments ({{ comments.length }})</strong></h2>
        <form class="text-center" @submit.prevent="handleSubmit">
            <input type="text" name="text" v-model="comment" />
            <br/>
            <button class="btn btn-outline-info" @submit.prevent="handleSubmit" v-on:click="increment">ADD</button>
            <br/>
            <div v-show="submitted && !comment">item is required</div>
            <br/>
            <ul  className="list-unstyled">
                <li v-for="(comment, index) in comments" :key="index"  href="#" class="text-info display-10">
                    <!-- {{ comment.comment_id }}--> {{ comment.comment_text }} {{ comment.date_published }}  ({{ comment.comment_id }})

                </li>
            </ul>

        </form>
        <!--<comment />-->

    </div>




</template>


<script>
import { articleService } from "../../services/article.service";
import { commentsService } from "../../services/comments.service"
//import comment from "../components/Comment.vue"

export default {
    data() {
        return {
            article: {},
            comments: [],
            num_comments: null,
            comment: "",
            error: "",

            submitted: false
        }
    },
    mounted() {
        this.article.loading = true;
        this.comments.loading = true;

        articleService.getOne(this.$route.params.id)
            .then((article) => {
                this.article = article;
                commentsService.getAll(this.$route.params.id)
                    .then((comments) => {
                        this.comments = comments
                        this.num_comments = comments.length
                    })
                    .catch(error => this.error = error)
                //commentsService.CreateComment(this.$route.params.id)
                /*.then((comments) => {}
                    this.comments = comments.comment_text
                    this.comments.add(comment_text)
                   this.num_comments = comments.length
                })*/
                //.catch(error => this.error = error)
            })
            .catch(error => this.error = error);
    },
    //components: {
    //  comment
    // },
    methods: {
        handleSubmit(e) {
            // this.submitted = true
            //nst {comment} = this

            if (!(this.comment)) {
                this.error = "Make sure you enter comment"
                return;
            }
            commentsService.CreateComment(this.$route.params.id, this.comment)
            window.location.reload();
            this.comments.push(this.comment)



                .then((res) => {

                    commentsService.getAll(this.$route.params.id)
                        .then((comments) => {
                            this.comments = comments;
                            this.submitted = true;
                            this.num_comments = comments.length

                        })
                        .catch(error => this.error = error)

                })
                .catch(error => this.error = error)
        },
        increment() {
            this.num_comments++;
        }

    }
}
</script>