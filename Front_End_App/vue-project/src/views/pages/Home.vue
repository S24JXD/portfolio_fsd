<template class="p-3 mb-2 bg-dark text-white">
    <div class="p-3 mb-2 bg-dark text-white">
        <!--<form class="text-info">-->
        <h2 class="text-center text-info display-1" ><strong> Welcome to my blog! </strong></h2>
  <!--  </form>--><br />
        <em v-if="loading">Loading articles...</em>

        <ul v-if="articles.length">
            <li v-for="article in articles" :key="article.article_id" href="#" class="text-info display-10">
                <!--{{  article.title + ' by ' + article.author }}-->
                <router-link href="#" class="text-info" :to="'/article/' + article.article_id">
                    {{ article.title + ' by ' + article.author + ' Article ID: ' + article.article_id}}
                </router-link>
            </li>
        </ul>
    </div>

    <div v-if="error">
        {{ error }}
    </div>

</template>




<script>
import { articleService } from "../../services/article.service"

export default {
    data() {
        return {
            articles: [],
            error: "",
            loading: true
        }
    },
    mounted() {
        articleService.getAll()
            .then(articles => {
                this.articles = articles
                this.loading = false
            })
            .catch(error => this.error = error);
    }
}
</script>