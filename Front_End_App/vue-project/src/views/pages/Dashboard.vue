<template class="p-3 mb-2 bg-dark text-white">
    <div class="p-3 mb-2 bg-dark text-white">
        <h1 class="text-center text-info display-4"><strong>Welcome to the dashboard</strong></h1>
        <br />
        <form class="container">
            <div class="row">

                <div class="col">
                    <div class="text-center">
                        <h5 class="text-center text-info ">Add new Article:</h5>
                        <label class="text-center text-info display-7 " for="article"><strong>Article title:
                            </strong></label>
                        <input type="article" name="articletitle" v-model="title" />
                        <br />
                        <label class="text-center text-info display-7 " for="author"><strong>Author: </strong></label>
                        <input type="article" name="author" v-model="author" />
                        <br />
                        <label class="text-center text-info display-7 " for="text"><strong>Article text:</strong>
                        </label>
                        <input type="article" name="articletext" v-model="article_text" />
                        <br />
                        <form class="text-center">
                            <button class="btn btn-outline-info" @click="CreateArticle"> Click here to create a new
                                article</button>
                            <div v-if="error">{{ error }}</div>
                            <br />
                        </form>

                        <br />
                        <h5 class="text-center text-info ">Delete a Comment:</h5>
                        <label class="text-center text-info display-7 " for="deleteCom"><strong> Enter Comment
                                ID:</strong>
                        </label>
                        <input type="CommentDel" name="CommentDel" v-model="CommentDel" />
                        <form class="text-center">
                            <button class="btn btn-outline-info" @click="DelComment"> Click here to delete a
                                comment</button>
                            <div v-if="error">{{ error }}</div>
                            <br />
                        </form>

                        <br />
                        <h5 class="text-center text-info ">Delete an Article:</h5>
                        <label class="text-center text-info display-7 " for="deleteArt"><strong> Enter Article
                                ID:</strong>
                        </label>
                        <input type="ArticleDel" name="ArticleDel" v-model="ArticleDel" />
                        <form class="text-center">
                            <button class="btn btn-outline-info" @click="DelArticle"> Click here to delete an
                                article</button>
                            <div v-if="error">{{ error }}</div>
                            <br />
                        </form>

                        <br />
                        <h5 class="text-center text-info ">Add new User:</h5>
                        <label class="text-center text-info display-7 " for="first_name"><strong> First Name:</strong>
                        </label>
                        <input type="first_name" name="first_name" v-model="first_name" />
                        <br />
                        <label class="text-center text-info display-7 " for="last_name"><strong> Last
                                Name:</strong></label>
                        <input type="last_name" name="last_name" v-model="last_name" />
                        <br />

                        <label class="text-center text-info display-7 " for="email"><strong> Email:</strong></label>
                        <input type="email" name="email" v-model="email" />
                        <br />
                        <label class="text-center text-info display-7 " for="password"><strong> Password:</strong>
                        </label>
                        <input type="password" name="password" v-model="password" />
                        <br />
                        <form class="text-center">
                            <button class="btn btn-outline-info" @click="CreateUser"> Click here to create a new
                                user</button>
                            <div v-if="error">{{ error }}</div>
                            <br />
                            <br />
                        </form>
                    </div>
                </div>
                <div class="col">
                    <div class="text-center">

                    <h5 class="text-center text-info ">All users currently in the system:</h5>
                    <em v-if="loading">Loading users...</em>

                    <ul v-if="users.length" className="list-unstyled">
                        <li v-for="user in users" :key="user.user_id" href="#" class="text-info display-10">
                            <!--{{  article.title + ' by ' + article.author }}-->
                            <!--<router-link :to="'/users/' + user.user_id">-->
                            {{ user.first_name + ' ' + user.last_name + ' ' + user.email + ' ' + user.user_id }}
                            <!--    </router-link>    -->
                        </li>
                    </ul>
                </div>
                </div>




            </div>



            <form class="text-center">
                <br />
                <button class="btn btn-outline-info" @submit.prevent="handleSubmit" v-on:click="handleSubmit">
                    Logout</button>
                <div v-if="error">{{ error }}</div>
            </form>
        </form>
    </div>
</template>

<script>
import { usersService } from "../../services/users.service";
import { articleService } from "../../services/article.service";
import { commentsService } from "../../services/comments.service";

export default {
    data() {
        return {
            title: "",
            author: "",
            article_text: "",
            article: {},

            createdArticle: false,

            first_name: "",
            last_name: "",
            email: "",
            password: "",
            createdUser: false,

            users: [],
            error: "",
            loading: true,

            deletedcomment: false,
            CommentDel: "",
            ArticleDel: "",
            deletedarticle: false

        }
    },
    methods: {
        handleSubmit(e) {
            //this.submitted = true
            //this.error = ""
            //const  {email, password} = this

            alert("button clicked")

            usersService.logOut()
                .then((res) => {
                    localStorage.removeItem("user_id")
                    localStorage.removeItem("session_token")
                    console.log("Auth - go to home")
                    this.$router.push("/")
                })
                .catch(error => {
                    this.error = error;
                    this.loading = false;
                })



        },
        CreateArticle() {
            alert("button clicked")
            console.log("clicked")

            articleService.CreateArticle(this.title, this.author, this.article_text)
                .then((res) => {
                    alert("article has been created")
                    this.createdArticle = true;
                    this.title = "";
                    this.author = "";
                    this.article_text = "";
                })
                .catch(error => {
                    this.error = error
                })
        },
        CreateUser() {
            alert("button clicked")
            console.log("clicked")

            usersService.CreateUser(this.first_name, this.last_name, this.email, this.password)

                .then((res) => {
                    alert("user has been created")
                    this.createdUser = true;
                    this.first_name = "";
                    this.last_name = "";
                    this.email = "";
                    this.password = "";
                    window.location.reload();
                })
                .catch(error => {
                    this.error = error
                })
        },
        DelComment() {
            let CommentId = this.CommentDel;
            commentsService.DelComment(CommentId)
                .then((res) => {
                    this.deletedcomment = true;
                    this.CommentDel = ""
                })
                .catch(error => {
                    this.error = error
                })
        },
        DelArticle() {
            let ArticleId = this.ArticleDel;
            articleService.DelArticle(ArticleId)
                .then((res) => {
                    this.deletedarticle = true;
                    this.ArticleDel = ""
                })
                .catch(error => {
                    this.error = error
                })
        }

    },
    mounted() {
        usersService.getAllUsers()
            .then(users => {
                this.users = users
                this.loading = false
            })
            .catch(error => this.error = error);


    }
}


</script>