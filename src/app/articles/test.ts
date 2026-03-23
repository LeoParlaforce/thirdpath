import { getPostData } from "../../lib/posts"

async function test() {
  try {
    const post = await getPostData("local-seo-therapists")
    console.log("Titre :", post.title)
    console.log("Résumé :", post.summary)
    console.log("Contenu HTML :", post.contentHtml.slice(0, 200), "…")
  } catch (e) {
    console.error("Erreur :", e)
  }
}

test()