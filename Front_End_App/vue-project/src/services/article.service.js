const getAll = () => {
    return fetch("http://localhost:3333/articles")
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw "something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

const getOne = (id) => {
    return fetch("http://localhost:3333/articles/" + id)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}
const CreateArticle = (title, author, article_text) => {
    return fetch("http://localhost:3333/articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
        },

        body: JSON.stringify({
            "title": title,
            "author": author,
            "article_text": article_text
        })
    })

        .then((response) => {
            if (response.status === 201) {
                return response.json();

            } else if (response.status === 400) {
                throw "bad request"
            }
        })
}//)//,

const DelArticle = (id) => {
    return fetch("http://localhost:3333/articles/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                throw "not found"
            } else {
                throw "something wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

export const articleService = {
    getAll,
    getOne,
    CreateArticle,
    DelArticle
}