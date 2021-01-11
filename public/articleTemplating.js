	
function getArticleHtml(articleData) {

	let html = '<div class="col-lg-14 col-md-13 col-sm-20 article-body">'

	// Title
	html += '<header>'
	html += '<h1>'
	html += articleData.title
	html += '</h1>'
	html += '</header>'

	// Main image
	html += '<div class="ksf-article-images">'
	html += '<div class="ksf-article-image-container">'
	html += '<img src="'+ articleData.listImage.url +'"/>'
	html += '</div>'
	html += getImageMetaHtml(articleData.listImage)
	html += '</div>'

	// Author and meta
	html += '<div class="ksf-article-metas">'
	html += '<p class="byline">'
	if (articleData.authors != null && articleData.authors.length > 0) {
		html += '<span class="byline">'
		html += '<a class="author">'
		html += articleData.authors[0].byline
		html += '</a>'
		html += '</span>'
	}

	html += '</br>'
	if (articleData.premium === true) {
		html += '<span class="premium-badge">Premium</span>'
	}
	html += '</p>'
	html += '</div>'

	// Article body
	html += '<p class="ingress">'
	html += articleData.preamble
	html += '</p>'

	html += '<div class="text">'
	for (let i=0; i<articleData.body.length; i++) {
		let item = articleData.body[i]
		if ('html' in item) {
			html += '<p>'+ item['html'] +'</p>'
		} else if ('headline' in item) {
			html += '<strong class="subheadline1">'+ item['headline'] +'</strong>'
		} else if ('footnote' in item) {
			html += '<subheadline3>'+ item['footnote'] +'</subheadline3>'
		} else if ('image' in item) {
			html += '<div class="ksf-article-images center">'
			html += '<img src="'+ item['image'].url +'"/>'
			html += getImageMetaHtml(item['image'])
			html += '</div>'
		} else if ('box' in item) {
			html += getBoxHtml(item['box'])
		}
	}

	html += getRelatedArticlesHtml(articleData.relatedArticles)

	// End
	html += '</div>'
	return html
}

function getImageMetaHtml(imageData) {
	let html = '<div class="ksf-image-meta">'
	html += '<p>'
	html += imageData.caption
	html += '<span class="ksf-image-photographer">'
	html += 'Bild: '+ imageData.byline
	html += '</span>'
	html += '</p>'
	html += '</div>'
	return html
}

function getBoxHtml(boxData) {
	let html = '<div class="factbox">'
	html += '<ksf-collapsible-factbox class="factbox">'
	html += '<div class="bg">'
	html += '<h5 class="title">'+ boxData.headline +'</h5>'
	html += '<h3 class="subtitle">'+ boxData.title +'</h3>'
	html += '<div class="ksf-collapsible">'
	html += '<div class="factsbody">'
	for (let i=0; i<boxData.content.length; i++) {
		let p = boxData.content[i]
		html += '<p>'+ p +'</p>'
	}
	html += '</div>'
	html += '</div>'
	html += '</div>'
	html += '</ksf-collapsible-factbox>'
	html += '</div>'
	return html
}

function getRelatedArticlesHtml(relatedData) {
	if (relatedData.length == 0) {
		return ''
	}
	let html = '<div class="article-element-related-wrap">'
	html += '<ul class="departments">'
	html += '<li><a>Relaterade artiklar</li></a>'
	html += '</ul>'
	html += '<div class="ksf-related-elements">'

	for (let i=0; i<relatedData.length; i++) {
		let article = relatedData[i]
		let articleUrl = apiUrl +'/article/'+ article.uuid
		html += '<div class="ksf-article-element ksf-related-element article-element-extrasmall">'
		html += '<div class="article-element-textwrap">'
		html += '<h4><a href="'+ articleUrl +'">'+ article.title +'</a></h4>'
		html += '</div>'

		html += '<div class="article-element-imgwrap">'
		html += '<div class="ksf-article-images">'
		html += '<a href="'+ articleUrl +'">'
		html += '<div class="ksf-article-image-container">'
		html += '<img src="'+ article.listImage.thumb +'"/>'
		html += '</div>'
		html += '</a>'
		html += '</div>'
		html += '</div>'
		html += '</div>'
	}
	html += '</div>'
	html += '</div>'

	return html
}

